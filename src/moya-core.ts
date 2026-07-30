/* =================================================================
 * MoYa Hanzi (墨雅) — COMPANION CORE (typed, logic-only)
 * -----------------------------------------------------------------
 * NOTE TO CODEX:
 *   Single-file TypeScript core. NO user interface, NO DOM, NO CSS,
 *   NO framework. Build your own UI and call the exports below.
 *   Rendering (markdown → DOM/components) is YOUR layer.
 *
 *   Flow:
 *     1. Lesson:        LESSONS[char]
 *     2. Wrong answer:  classifyError(target, picked) -> HanziErrorType
 *     3. Learner:       newStudentProfile() + noteError/noteCorrect/noteHelp
 *     4. Ask companion: await runCompanion({...})   // applies all 3 gates
 *                       - result.text is markdown — render it yourself
 *                       - stream via onToken(textSoFar)
 *                       - log via onEvent(evt)       // events only, no chat text
 *
 *   Only runtime dependency: fetch (browser, or Node 18+).
 *   Compiler libs: needs "DOM" lib (or @types/node) for fetch /
 *   TextDecoder / ReadableStream types. Target ES2018+.
 *   SECURITY: never ship the API key to a browser — proxy in production.
 * ================================================================= */

/* =================================================================
 * TYPES
 * ================================================================= */

export type Companion = "momo" | "yaya";

/** PART 3 — the seven diagnosable mistake categories. */
export type HanziErrorType =
  | "shape_confusion"
  | "radical_confusion"
  | "pronunciation_confusion"
  | "tone_error"
  | "meaning_confusion"
  | "structure_confusion"
  | "memory_decay";

/** Which 4-part feedback template a companion produced. */
export type FeedbackType = "cognitive_4part" | "affective_4part";

export interface MomoExplanation {
  logic: string;
  pronunciationTip: string;
  confusionTip?: string;
}

export interface YayaExplanation {
  culturalNote: string;
  dailyUse: string;
  story: string;
  encouragement: string;
}

/** PART 2 — one Hanzi lesson record. */
export interface HanziLesson {
  character: string;
  pinyin: string;
  meaning: string;
  radical: string;
  structure: string;
  strokes: number;
  words: string[];
  sentence: string;
  sentenceGloss: string;
  imageUrl?: string;
  momoExplanation: MomoExplanation;
  yayaExplanation: YayaExplanation;
}

/** PART 4 — student profile. */
export interface StudentProfile {
  ageGroup: string;
  knownCharacters: string[];
  weakCharacters: string[];
  commonErrorTypes: Partial<Record<HanziErrorType, number>>;
  confidenceLevel: number; // 0..1
  streakDays: number;
  momoClicks: number;
  yayaClicks: number;
  helpSeekingPattern: Companion[];
}

export interface ClickRates {
  momoClickRate: number;
  yayaClickRate: number;
}

/* PART 8 — research logging types. */
export interface ResearchEvent {
  event: string;
  [key: string]: unknown;
}

export type CompanionEvent =
  | { event: "companion_query"; companion: Companion; character: string; errorType: HanziErrorType | null }
  | { event: "safe_redirect"; gate: 1 | 3; companion: Companion; character: string }
  | { event: "feedback_shown"; companion: Companion; character: string; feedbackType: FeedbackType };

export type LoggedEvent = ResearchEvent & { timestamp: string };

export interface Logger {
  events: LoggedEvent[];
  log(evt: ResearchEvent): LoggedEvent;
}

export interface CreateLoggerOptions {
  sink?: (row: LoggedEvent) => void;
}

export interface ApiConfig {
  url: string;
  model: string;
}

export interface RunCompanionParams {
  which: Companion;
  lesson: HanziLesson;
  userText: string;
  errorType?: HanziErrorType | null;
  apiKey: string;
  onToken?: ((textSoFar: string) => void) | null;
  onEvent?: ((evt: CompanionEvent) => void) | null;
  fetchImpl?: typeof fetch | null;
  api?: ApiConfig;
}

export interface CompanionResult {
  ok: boolean;
  redirected: boolean;
  gate: 1 | 3 | null;
  text: string;            // markdown — render in your UI
  feedbackType: FeedbackType | null;
  error?: string;
}

/* =================================================================
 * provider config (swap this one block to change provider)
 * ================================================================= */
export const DEFAULT_API: ApiConfig = {
  url: "https://api.deepseek.com/chat/completions",
  model: "deepseek-chat"
};

/* =================================================================
 * PART 2 — HANZI LEARNING DATA MODEL
 * ================================================================= */
export const LESSONS: Record<string, HanziLesson> = {
  "林": {
    character: "林", pinyin: "lín", meaning: "woods", radical: "木",
    structure: "left + right (two 木 side by side)", strokes: 8,
    words: ["树林", "森林", "林子"],
    sentence: "小路两边有一片树林。",
    sentenceGloss: "There is a wood on both sides of the small path.",
    momoExplanation: {
      logic: "Two 木 (tree) standing side by side = a small wood.",
      pronunciationTip: "lín — second tone, rising, like asking ‘lín?’",
      confusionTip: "林 has TWO 木; 森 has THREE 木 (a bigger forest)."
    },
    yayaExplanation: {
      culturalNote: "Trees and woods carry ideas of growth and shelter in Chinese culture.",
      dailyUse: "You might hear 树林 when family talks about a walk or a park.",
      story: "Two trees keeping each other company — that is 林.",
      encouragement: "You are noticing how parts build meaning. That is real reading."
    }
  },
  "森": {
    character: "森", pinyin: "sēn", meaning: "forest", radical: "木",
    structure: "top + bottom-pair (three 木 stacked)", strokes: 12,
    words: ["森林", "森森", "阴森"],
    sentence: "大熊猫住在很深的森林里。",
    sentenceGloss: "Giant pandas live deep in the forest.",
    momoExplanation: {
      logic: "Three 木 together = many trees = a forest. More trees than 林.",
      pronunciationTip: "sēn — first tone, high and level, hold it steady.",
      confusionTip: "Count the 木: 森 = 3 trees, 林 = 2 trees."
    },
    yayaExplanation: {
      culturalNote: "A 森林 is home to the 大熊猫 (panda), a beloved symbol of China.",
      dailyUse: "You may meet 森林 in stories, nature shows, and school readings.",
      story: "Three trees gathering becomes a whole forest full of life.",
      encouragement: "Every character you compare makes the next one easier."
    }
  },
  "家": {
    character: "家", pinyin: "jiā", meaning: "home / family", radical: "宀",
    structure: "top (roof 宀) over bottom", strokes: 10,
    words: ["家人", "回家", "国家"],
    sentence: "放学以后我就回家。",
    sentenceGloss: "After school I go home.",
    momoExplanation: {
      logic: "宀 is a roof; under the roof there is a 豕 (pig) — an old home kept animals.",
      pronunciationTip: "jiā — first tone, high and level.",
      confusionTip: "The roof radical 宀 also appears in 字, 安, 室 — look for the roof."
    },
    yayaExplanation: {
      culturalNote: "家 means both house and family — in Chinese, home is the people, not only the place.",
      dailyUse: "You say 回家 (go home) and 家人 (family) almost every day.",
      story: "A roof over the ones you love — that single character holds your whole family.",
      encouragement: "This character may already live in your home. You are learning who you are."
    }
  }
};

/* =================================================================
 * PART 3 — ERROR DIAGNOSIS SYSTEM
 * ================================================================= */
export const ERROR_LABELS: Record<HanziErrorType, string> = {
  shape_confusion: "Shape confusion",
  radical_confusion: "Radical confusion",
  pronunciation_confusion: "Pronunciation confusion",
  tone_error: "Tone error",
  meaning_confusion: "Meaning confusion",
  structure_confusion: "Structure confusion",
  memory_decay: "Memory fading"
};

const stripTones = (s: string): string =>
  s.replace(/[āáǎàēéěèīíǐìōóǒòūúǔù]/g, "");

export function classifyError(
  target: string,
  picked: string,
  lessons: Record<string, HanziLesson> = LESSONS
): HanziErrorType {
  const t = lessons[target];
  const p = lessons[picked];
  if (!t || !p) return "meaning_confusion";
  if (t.radical === p.radical && t.character !== p.character) {
    return Math.abs(t.strokes - p.strokes) <= 4 ? "shape_confusion" : "structure_confusion";
  }
  if (stripTones(t.pinyin) === stripTones(p.pinyin)) return "pronunciation_confusion";
  return "meaning_confusion";
}

/* =================================================================
 * PART 4 — STUDENT PROFILE  (factory + stateless updaters)
 * ================================================================= */
export function newStudentProfile(overrides: Partial<StudentProfile> = {}): StudentProfile {
  return {
    ageGroup: "elementary",
    knownCharacters: [],
    weakCharacters: [],
    commonErrorTypes: {},
    confidenceLevel: 0.5,
    streakDays: 1,
    momoClicks: 0,
    yayaClicks: 0,
    helpSeekingPattern: [],
    ...overrides
  };
}

export function clickRates(profile: StudentProfile): ClickRates {
  const total = profile.momoClicks + profile.yayaClicks;
  return {
    momoClickRate: total ? +(profile.momoClicks / total).toFixed(2) : 0,
    yayaClickRate: total ? +(profile.yayaClicks / total).toFixed(2) : 0
  };
}

export function noteError(
  profile: StudentProfile,
  errorType: HanziErrorType,
  character: string
): StudentProfile {
  profile.commonErrorTypes[errorType] = (profile.commonErrorTypes[errorType] || 0) + 1;
  if (!profile.weakCharacters.includes(character)) profile.weakCharacters.push(character);
  profile.confidenceLevel = Math.max(0, +(profile.confidenceLevel - 0.05).toFixed(2));
  return profile;
}

export function noteCorrect(profile: StudentProfile, character: string): StudentProfile {
  if (!profile.knownCharacters.includes(character)) profile.knownCharacters.push(character);
  profile.confidenceLevel = Math.min(1, +(profile.confidenceLevel + 0.05).toFixed(2));
  return profile;
}

export function noteHelp(profile: StudentProfile, which: Companion): StudentProfile {
  if (which === "momo") profile.momoClicks++;
  else profile.yayaClicks++;
  profile.helpSeekingPattern.push(which);
  return profile;
}

/* =================================================================
 * PART 8 — RESEARCH DATA LOGGING (events only; never log chat text)
 * ================================================================= */
export function createLogger(options: CreateLoggerOptions = {}): Logger {
  const events: LoggedEvent[] = [];
  return {
    events,
    log(evt: ResearchEvent): LoggedEvent {
      const row: LoggedEvent = { timestamp: new Date().toISOString(), ...evt };
      events.push(row);
      if (options.sink) options.sink(row);
      return row;
    }
  };
}

/* =================================================================
 * PART 5 — THREE-LAYER SAFETY SYSTEM
 * ================================================================= */

// ---- Gate 1: Scope Guard (runs BEFORE any AI call) ----
// Fast local check. Upgrade path: add a small LLM scope-classifier
// for fuzzy inputs the keywords miss.
const BLOCKED_TOPICS: RegExp[] = [
  /\b(suicid|self[-\s]?harm|kill myself|hurt myself)\b/i,
  /\b(depress|anxious|panic|therapy|therapist|counsel)\b/i,
  /\b(doctor|medicine|medication|symptom|diagnos|sick|pain)\b/i,
  /\b(lawyer|legal|sue|court|police)\b/i,
  /\b(boyfriend|girlfriend|dating|crush)\b/i,
  /\b(politic|election|government|religion|god|pray)\b/i,
  /\b(money|buy|shopping|price|crypto|stock)\b/i,
  // target genuine distress, NOT the word "family" — heritage learners
  // SHOULD talk about family (that's Yaya's Funds-of-Knowledge work).
  /\bmy (mom|dad|parent|parents|family)\b[^.?!]{0,30}\b(yell|hit|fight|hurt|scream|scare|hate|divorce|drunk|cry)/i,
  /\b(address|phone number|password|where do you live)\b/i
];
const LEARNING_HINTS =
  /[\u4e00-\u9fff]|pinyin|tone|radical|stroke|character|word|sentence|pronounce|mean|read|write|forest|woods|home|family.*character/i;

export function isLearningRelatedMessage(text: string): boolean {
  if (BLOCKED_TOPICS.some((rx) => rx.test(text))) return false;
  if (LEARNING_HINTS.test(text)) return true;
  return text.trim().length <= 120; // short, non-blocked → companion handles it, scoped by Gate 2
}

// ---- Gate 3: Output Filter (runs AFTER the AI responds) ----
const UNSAFE_OUTPUT: RegExp[] = [
  /\bbest friend\b/i,
  /\bonly i (understand|get) you\b/i,
  /\bdon'?t tell (your )?(parents|teacher|mom|dad)\b/i,
  /\bi need you\b/i,
  /\bi love you\b/i,
  /\b(our secret|keep this between us)\b/i,
  /\byou should (take|stop taking) /i, // medical-ish
  /\b(diagnos|prescri)/i,
  /\bsue|lawsuit|legal advice\b/i
];

export function passesOutputFilter(text: string): boolean {
  return !UNSAFE_OUTPUT.some((rx) => rx.test(text));
}

/* =================================================================
 * PART 6 — SAFE REDIRECT RESPONSES
 * ================================================================= */
export const SAFE_REDIRECT: Record<Companion, string> = {
  momo:
    "That question is outside today’s Chinese lesson. I can help you understand this character’s structure, pronunciation, or a learning strategy.",
  yaya:
    "Let’s return to today’s Chinese learning. I can help explain how this character is used in daily life, or share its cultural meaning."
};

/* =================================================================
 * PART 1 — THEORY-DRIVEN PROMPTS (buildPrompt)
 * Gate 2 (Prompt Boundary) lives inside these system prompts.
 * The required 4-part feedback structure is enforced here.
 * ================================================================= */
export function buildMomoPrompt(lesson: HanziLesson, errorType?: HanziErrorType | null): string {
  return `You are Momo (墨墨), a Cognitive Learning Coach inside the MoYa Hanzi app for young Chinese heritage learners in the US.

THEORY: Vygotsky's ZPD (scaffold, don't just give the answer), metacognition (what went wrong, why, how to improve), formative assessment, and supporting the learner's sense of competence ("I can learn this").

SCOPE (Gate 2): You ONLY answer questions about the current MoYa Hanzi lesson — the character, pinyin, pronunciation, radicals, structure, words, sentences, and learning strategies. You are NOT a doctor, counselor, parent, teacher, or friend. You do not answer unrelated questions. If asked something off-topic, redirect to Chinese learning.

CURRENT LESSON: ${lesson.character} (${lesson.pinyin}, "${lesson.meaning}"). Radical ${lesson.radical}. Structure: ${lesson.structure}. Logic: ${lesson.momoExplanation.logic} Pronunciation: ${lesson.momoExplanation.pronunciationTip} ${lesson.momoExplanation.confusionTip || ""}
${errorType ? `The learner just made a "${ERROR_LABELS[errorType]}" mistake — address it specifically.` : ""}

RESPONSE FORMAT — you MUST use exactly these four markdown headers, in order, one or two short sentences each. Keep it warm, simple, and age-appropriate:
#### Observation
#### Reason
#### Strategy
#### Next Step`;
}

export function buildYayaPrompt(lesson: HanziLesson, errorType?: HanziErrorType | null): string {
  return `You are Yaya (雅雅), a Cultural & Emotional Learning Companion inside the MoYa Hanzi app for young Chinese heritage learners in the US.

THEORY: Krashen's affective filter (lower anxiety, be gentle), Self-Determination Theory (relatedness, autonomy), Norton's identity & investment (connect Chinese to who they are), and Funds of Knowledge (family language is a valuable resource). Chinese is family, memory, belonging, and culture — not only a school subject.

SCOPE (Gate 2): You ONLY answer questions about the current MoYa Hanzi lesson — its meaning, cultural significance, and everyday/family use. You are NOT a therapist, best friend, parent, or counselor. You do not give advice outside learning, you never create emotional dependency, and you never discourage involving family or teachers. If asked something off-topic, gently redirect to Chinese learning.

CURRENT LESSON: ${lesson.character} (${lesson.pinyin}, "${lesson.meaning}"). Cultural note: ${lesson.yayaExplanation.culturalNote} Daily use: ${lesson.yayaExplanation.dailyUse} Story: ${lesson.yayaExplanation.story}
${errorType ? `The learner just struggled with this character — be encouraging and reassuring.` : ""}

RESPONSE FORMAT — you MUST use exactly these four markdown headers, in order, one or two short sentences each. Warm, simple, age-appropriate:
#### Empathy
#### Cultural Connection
#### Family / Life Connection
#### Encouragement`;
}

/* =================================================================
 * MODEL CALL — wraps the three gates around a streaming request.
 * No DOM. Streams via onToken(textSoFar). Emits events via onEvent.
 * Returns a plain result object for YOUR UI to render (markdown).
 * ================================================================= */
export async function runCompanion(params: RunCompanionParams): Promise<CompanionResult> {
  const {
    which,
    lesson,
    userText,
    errorType = null,
    apiKey,
    onToken = null,
    onEvent = null,
    fetchImpl = typeof fetch !== "undefined" ? fetch : null,
    api = DEFAULT_API
  } = params;

  const emit = (e: CompanionEvent): void => {
    if (onEvent) onEvent(e);
  };

  emit({ event: "companion_query", companion: which, character: lesson.character, errorType });

  // ---- Gate 1: Scope Guard ----
  if (!isLearningRelatedMessage(userText)) {
    emit({ event: "safe_redirect", gate: 1, companion: which, character: lesson.character });
    return { ok: true, redirected: true, gate: 1, text: SAFE_REDIRECT[which], feedbackType: null };
  }
  if (!apiKey) {
    return { ok: false, redirected: false, gate: null, text: "", feedbackType: null, error: "missing_api_key" };
  }
  if (!fetchImpl) {
    return { ok: false, redirected: false, gate: null, text: "", feedbackType: null, error: "no_fetch_impl" };
  }

  const system = which === "momo" ? buildMomoPrompt(lesson, errorType) : buildYayaPrompt(lesson, errorType);
  let full = "";

  try {
    const res = await fetchImpl(api.url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({
        model: api.model,
        stream: true,
        temperature: 0.7,
        messages: [
          { role: "system", content: system },
          { role: "user", content: userText }
        ]
      })
    });

    if (!res.ok) throw new Error("API returned " + res.status);
    if (!res.body) throw new Error("response has no body to stream");

    // Parse the Server-Sent Events stream.
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? ""; // keep last partial line
      for (const line of lines) {
        const s = line.trim();
        if (!s.startsWith("data:")) continue;
        const data = s.slice(5).trim();
        if (data === "[DONE]") continue;
        try {
          const json = JSON.parse(data);
          const piece: string = json.choices?.[0]?.delta?.content || "";
          if (piece) {
            full += piece;
            if (onToken) onToken(full);
          }
        } catch {
          /* ignore keep-alive / partial frames */
        }
      }
    }

    // ---- Gate 3: Output Filter ----
    if (!passesOutputFilter(full)) {
      emit({ event: "safe_redirect", gate: 3, companion: which, character: lesson.character });
      return { ok: true, redirected: true, gate: 3, text: SAFE_REDIRECT[which], feedbackType: null };
    }

    const feedbackType: FeedbackType = which === "momo" ? "cognitive_4part" : "affective_4part";
    emit({ event: "feedback_shown", companion: which, character: lesson.character, feedbackType });
    return { ok: true, redirected: false, gate: null, text: full, feedbackType };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, redirected: false, gate: null, text: "", feedbackType: null, error: message };
  }
}

/* =================================================================
 * USAGE SKETCH (reference only):
 *
 *   import {
 *     LESSONS, classifyError, newStudentProfile, noteError,
 *     noteHelp, createLogger, runCompanion
 *   } from "./moya-core";
 *
 *   const profile = newStudentProfile();
 *   const logger  = createLogger({ sink: (row) => postToBackend(row) });
 *
 *   const et = classifyError("林", "森");   // "shape_confusion"
 *   noteError(profile, et, "林");
 *   noteHelp(profile, "momo");
 *
 *   const result = await runCompanion({
 *     which: "momo", lesson: LESSONS["林"], userText: "why is 林 not 森?",
 *     errorType: et, apiKey: MY_KEY,
 *     onToken: (txt) => myRenderFn(txt),
 *     onEvent: (evt) => logger.log(evt)
 *   });
 *   // result.text -> markdown;  result.redirected -> blocked by a gate
 * ================================================================= */