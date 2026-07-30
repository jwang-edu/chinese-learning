import {
  LESSONS,
  runCompanion,
  type Companion,
  type HanziErrorType,
  type HanziLesson
} from "../src/moya-core.js";

const ERROR_TYPES = new Set<HanziErrorType>([
  "shape_confusion",
  "radical_confusion",
  "pronunciation_confusion",
  "tone_error",
  "meaning_confusion",
  "structure_confusion",
  "memory_decay"
]);

function fallbackLesson(character: string): HanziLesson {
  return {
    character,
    pinyin: "请根据标准普通话分析",
    meaning: "当前正在学习的汉字",
    radical: "请分析这个字的部首",
    structure: "请分析这个字的结构",
    strokes: 0,
    words: [],
    sentence: "",
    sentenceGloss: "",
    momoExplanation: {
      logic: "请用儿童容易理解的方法分析字形结构。",
      pronunciationTip: "请给出简短、准确的普通话读音提示。"
    },
    yayaExplanation: {
      culturalNote: "请解释这个字与中文文化的自然联系。",
      dailyUse: "请给出儿童生活中常见的使用场景。",
      story: "请用一句简短的小故事解释。",
      encouragement: "请给予简短、真诚的鼓励。"
    }
  };
}

function json(data: unknown, status = 200): Response {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return json({ ok: false, error: "method_not_allowed" }, 405);
    }

    let body: Record<string, unknown>;

    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "invalid_json" }, 400);
    }

    const which = body.which;
    const character = String(body.character || "").trim();
    const userText = String(body.userText || "").trim();
    const rawErrorType = body.errorType;

    if (which !== "momo" && which !== "yaya") {
      return json({ ok: false, error: "invalid_companion" }, 400);
    }

    if (!/^[\u3400-\u9fff]$/u.test(character)) {
      return json({ ok: false, error: "invalid_character" }, 400);
    }

    if (!userText || userText.length > 300) {
      return json({ ok: false, error: "invalid_message" }, 400);
    }

    const apiKey = process.env.DEEPSEEK_API_KEY || "";

    if (!apiKey) {
      return json({ ok: false, error: "missing_api_key" }, 500);
    }

    const errorType =
      typeof rawErrorType === "string" &&
      ERROR_TYPES.has(rawErrorType as HanziErrorType)
        ? (rawErrorType as HanziErrorType)
        : null;

    const lesson = LESSONS[character] || fallbackLesson(character);

    const result = await runCompanion({
      which: which as Companion,
      lesson,
      userText,
      errorType,
      apiKey,
      onEvent: event => {
        console.log("[MoYa Companion]", event.event, event.companion);
      }
    });

    return json(result, result.ok ? 200 : 502);
  }
};
