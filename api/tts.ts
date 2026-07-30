import {
  synthesizeSpeech,
  type TTSCompanion,
  type TTSConfig
} from "../src/ttsService.js";

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

function getTTSConfig(): TTSConfig {
  return {
    provider: process.env.TTS_PROVIDER || "minimax",
    apiKey: process.env.TTS_API_KEY || "",
    voiceIdMomo: process.env.TTS_VOICE_ID_MOMO || "",
    voiceIdYaya: process.env.TTS_VOICE_ID_YAYA || "",
    groupId: process.env.TTS_GROUP_ID || process.env.MINIMAX_GROUP_ID,
    minimaxEndpoint: process.env.TTS_MINIMAX_ENDPOINT,
    model: process.env.TTS_MODEL,
  };
}

function normalizeCompanion(value: unknown): TTSCompanion | null {
  if (value === "momo" || value === "yaya") return value;
  return null;
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "GET") {
      const config = getTTSConfig();
      return json({
        ok: true,
        provider: config.provider || "minimax",
        hasApiKey: Boolean(config.apiKey),
        hasMomoVoice: true,
        hasYayaVoice: true,
        usesDefaultMomoVoice: !config.voiceIdMomo,
        usesDefaultYayaVoice: !config.voiceIdYaya,
        hasGroupId: Boolean(config.groupId),
        hasCustomEndpoint: Boolean(config.minimaxEndpoint),
        model: config.model || "speech-02-hd",
      });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "method_not_allowed" }, 405);
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400);
    }

    const text = String(body.text || "").trim();
    const companion = normalizeCompanion(body.companion || body.character);

    if (!text || text.length > 2000) {
      return json({ ok: false, error: "invalid_text" }, 400);
    }

    if (!companion) {
      return json({ ok: false, error: "invalid_companion" }, 400);
    }

    const result = await synthesizeSpeech({
      text,
      companion,
      config: getTTSConfig(),
    });

    if (!result.ok) {
      console.warn("[MoYa TTS]", result.error, result.provider, result.companion);
      return json(result, 200);
    }

    return json(result);
  }
};
