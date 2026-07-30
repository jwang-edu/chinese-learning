export type TTSCompanion = "momo" | "yaya";

export type TTSAudio =
  | { kind: "dataUrl"; dataUrl: string; mimeType: string }
  | { kind: "url"; url: string; mimeType?: string };

export interface TTSChunk {
  text: string;
  audio: TTSAudio;
}

export interface TTSConfig {
  provider: string;
  apiKey: string;
  voiceIdMomo: string;
  voiceIdYaya: string;
  groupId?: string;
  minimaxEndpoint?: string;
  model?: string;
}

export interface SynthesizeSpeechParams {
  text: string;
  companion: TTSCompanion;
  config: TTSConfig;
}

export interface SynthesizeSpeechResult {
  ok: boolean;
  provider: string;
  companion: TTSCompanion;
  chunks: TTSChunk[];
  cached: boolean;
  error?: string;
}

type CachedSpeech = {
  chunks: TTSChunk[];
  createdAt: number;
};

const CACHE_LIMIT = 120;
const DEFAULT_MINIMAX_VOICES: Record<TTSCompanion, string> = {
  momo: "male-qn-qingse",
  yaya: "female-shaonv",
};
const speechCache = new Map<string, CachedSpeech>();

export async function synthesizeSpeech(params: SynthesizeSpeechParams): Promise<SynthesizeSpeechResult> {
  const provider = normalizeProvider(params.config.provider);
  const voiceId = selectVoiceId(params.companion, params.config);
  const text = normalizeText(params.text);

  if (!text) return failure(provider, params.companion, "empty_text");
  if (!params.config.apiKey) return failure(provider, params.companion, "missing_tts_api_key");
  if (!voiceId) return failure(provider, params.companion, "missing_voice_id");

  const cacheKey = makeCacheKey(provider, voiceId, text);
  const cached = speechCache.get(cacheKey);
  if (cached) {
    return {
      ok: true,
      provider,
      companion: params.companion,
      chunks: cached.chunks,
      cached: true,
    };
  }

  try {
    const chunks = await synthesizeByProvider(provider, text, voiceId, params.config);
    remember(cacheKey, chunks);
    return {
      ok: true,
      provider,
      companion: params.companion,
      chunks,
      cached: false,
    };
  } catch (error) {
    console.error("[MoYa TTS]", error);
    return failure(provider, params.companion, normalizeTTSError(error));
  }
}

export function splitIntoSentenceChunks(text: string): string[] {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  const parts = normalized.match(/[^。！？!?；;]+[。！？!?；;]?/g) || [normalized];
  const chunks: string[] = [];
  let current = "";

  for (const part of parts.map((item) => item.trim()).filter(Boolean)) {
    if ((current + part).length <= 140) {
      current = `${current}${part}`;
    } else {
      if (current) chunks.push(current);
      current = part;
    }
  }

  if (current) chunks.push(current);
  return chunks.flatMap(splitLongChunk).slice(0, 8);
}

async function synthesizeByProvider(
  provider: string,
  text: string,
  voiceId: string,
  config: TTSConfig
): Promise<TTSChunk[]> {
  if (provider === "minimax") return synthesizeWithMiniMax(text, voiceId, config);
  if (provider === "elevenlabs") throw new Error("elevenlabs_not_implemented");
  if (provider === "cosyvoice" || provider === "local") throw new Error("local_tts_not_implemented");
  throw new Error(`unsupported_tts_provider:${provider}`);
}

async function synthesizeWithMiniMax(text: string, voiceId: string, config: TTSConfig): Promise<TTSChunk[]> {
  const endpoint = getMiniMaxEndpoint(config);
  const model = config.model || "speech-02-hd";
  const sentenceChunks = splitIntoSentenceChunks(text);
  const output: TTSChunk[] = [];

  for (const chunk of sentenceChunks) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${normalizeApiKey(config.apiKey)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        text: chunk,
        stream: false,
        voice_setting: {
          voice_id: voiceId,
          speed: 0.92,
          vol: 1,
          pitch: 0,
        },
        audio_setting: {
          sample_rate: 32000,
          bitrate: 128000,
          format: "mp3",
          channel: 1,
        },
      }),
    });

    if (!response.ok) throw new Error(`minimax_http_${response.status}`);

    const data = await response.json();
    assertMiniMaxSuccess(data);
    const audio = extractAudio(data);
    if (!audio) throw new Error("minimax_audio_missing");
    output.push({ text: chunk, audio });
  }

  return output;
}

function getMiniMaxEndpoint(config: TTSConfig): string {
  if (config.minimaxEndpoint) return config.minimaxEndpoint;
  if (config.groupId) {
    const groupId = encodeURIComponent(config.groupId);
    return `https://api.minimax.io/v1/t2a_v2?GroupId=${groupId}`;
  }
  return "https://api.minimax.chat/v1/t2a_v2";
}

function normalizeApiKey(apiKey: string): string {
  return apiKey.replace(/^Bearer\s+/i, "").trim();
}

function assertMiniMaxSuccess(data: unknown): void {
  const record = data as Record<string, unknown>;
  const base = record.base_resp as Record<string, unknown> | undefined;
  const statusCode = Number(base?.status_code ?? 0);
  if (statusCode && statusCode !== 0) {
    throw new Error(`minimax_status_${statusCode}`);
  }
}

function extractAudio(data: unknown): TTSAudio | null {
  const record = data as Record<string, unknown>;
  const nested = record?.data as Record<string, unknown> | undefined;
  const url = firstString([
    record.audio_url,
    record.audioUrl,
    nested?.audio_url,
    nested?.audioUrl,
    nested?.url,
  ]);

  if (url) return { kind: "url", url, mimeType: "audio/mpeg" };

  const audio = firstString([
    record.audio,
    record.audio_base64,
    record.audioBase64,
    nested?.audio,
    nested?.audio_base64,
    nested?.audioBase64,
  ]);

  if (!audio) return null;
  const base64 = looksLikeHex(audio) ? hexToBase64(audio) : audio;
  return {
    kind: "dataUrl",
    dataUrl: `data:audio/mpeg;base64,${base64}`,
    mimeType: "audio/mpeg",
  };
}

function normalizeProvider(provider: string): string {
  return (provider || "minimax").trim().toLowerCase();
}

function normalizeText(text: string): string {
  return stripMarkdown(text).replace(/\s+/g, " ").trim().slice(0, 1200);
}

function stripMarkdown(text: string): string {
  return String(text || "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function selectVoiceId(companion: TTSCompanion, config: TTSConfig): string {
  const customVoice = companion === "yaya" ? config.voiceIdYaya : config.voiceIdMomo;
  return customVoice || DEFAULT_MINIMAX_VOICES[companion];
}

function makeCacheKey(provider: string, voiceId: string, text: string): string {
  return `${provider}:${voiceId}:${text}`;
}

function remember(key: string, chunks: TTSChunk[]): void {
  if (speechCache.size >= CACHE_LIMIT) {
    const oldest = speechCache.keys().next().value;
    if (oldest) speechCache.delete(oldest);
  }
  speechCache.set(key, { chunks, createdAt: Date.now() });
}

function failure(provider: string, companion: TTSCompanion, error: string): SynthesizeSpeechResult {
  return { ok: false, provider, companion, chunks: [], cached: false, error };
}

function normalizeTTSError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error || "");
  if (message === "minimax_status_1008") return "insufficient_tts_balance";
  if (message === "minimax_http_401" || message === "minimax_http_403") {
    return "invalid_tts_api_key";
  }
  return "tts_generation_failed";
}

function firstString(values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function looksLikeHex(value: string): boolean {
  return value.length > 20 && value.length % 2 === 0 && /^[0-9a-f]+$/i.test(value);
}

function hexToBase64(hex: string): string {
  let binary = "";
  for (let index = 0; index < hex.length; index += 2) {
    binary += String.fromCharCode(parseInt(hex.slice(index, index + 2), 16));
  }
  return btoa(binary);
}

function splitLongChunk(chunk: string): string[] {
  if (chunk.length <= 160) return [chunk];
  const pieces: string[] = [];
  for (let index = 0; index < chunk.length; index += 140) {
    pieces.push(chunk.slice(index, index + 140));
  }
  return pieces;
}
