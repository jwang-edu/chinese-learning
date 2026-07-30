import { describe, it, expect } from "vitest";
import {
  classifyError,
  isLearningRelatedMessage,
  passesOutputFilter,
  runCompanion,
  LESSONS,
  type RunCompanionParams
} from "./moya-core";

/* --- a fake fetch that streams given text as DeepSeek SSE frames --- */
function fakeFetch(replyText: string): typeof fetch {
  const frames = [...replyText].map(
    (ch) => `data: ${JSON.stringify({ choices: [{ delta: { content: ch } }] })}\n`
  );
  frames.push("data: [DONE]\n");
  const enc = new TextEncoder();
  let i = 0;
  return (async () => ({
    ok: true,
    status: 200,
    body: {
      getReader: () => ({
        read: async () =>
          i < frames.length
            ? { done: false, value: enc.encode(frames[i++]) }
            : { done: true, value: undefined }
      })
    }
  })) as unknown as typeof fetch;
}

const base = (over: Partial<RunCompanionParams>): RunCompanionParams => ({
  which: "momo",
  lesson: LESSONS["林"],
  userText: "why is 林 not 森?",
  apiKey: "test-key",
  ...over
});

describe("PART 3 — error diagnosis", () => {
  it("林 vs 森 → shape_confusion", () => {
    expect(classifyError("林", "森")).toBe("shape_confusion");
  });
  it("林 vs 家 → meaning_confusion", () => {
    expect(classifyError("林", "家")).toBe("meaning_confusion");
  });
  it("unknown character → meaning_confusion fallback", () => {
    expect(classifyError("林", "X")).toBe("meaning_confusion");
  });
});

describe("PART 5 Gate 1 — scope guard", () => {
  it("allows on-topic Chinese", () => {
    expect(isLearningRelatedMessage("怎么读这个字？")).toBe(true);
  });
  it("allows on-topic English", () => {
    expect(isLearningRelatedMessage("how do I pronounce this character")).toBe(true);
  });
  it("blocks self-harm", () => {
    expect(isLearningRelatedMessage("I want to hurt myself")).toBe(false);
  });
  it("blocks family distress", () => {
    expect(isLearningRelatedMessage("my dad yells at me")).toBe(false);
  });
  it("allows heritage / family-connection talk", () => {
    expect(
      isLearningRelatedMessage("my family is from Guangzhou, what does 家 mean")
    ).toBe(true);
  });
});

describe("PART 5 Gate 3 — output filter", () => {
  it("blocks dependency language", () => {
    expect(passesOutputFilter("I am your best friend")).toBe(false);
  });
  it("blocks secrecy language", () => {
    expect(passesOutputFilter("Don't tell your parents about this")).toBe(false);
  });
  it("allows normal feedback", () => {
    expect(passesOutputFilter("Count the trees in 林.")).toBe(true);
  });
});

describe("runCompanion — full path with gates", () => {
  it("Gate 1 redirects off-topic before calling the model", async () => {
    const r = await runCompanion(base({ userText: "do you like my crush?" }));
    expect(r.redirected).toBe(true);
    expect(r.gate).toBe(1);
    expect(r.text).toBe(
      "That question is outside today’s Chinese lesson. I can help you understand this character’s structure, pronunciation, or a learning strategy."
    );
  });

  it("happy path returns markdown + feedbackType", async () => {
    const r = await runCompanion(
      base({ fetchImpl: fakeFetch("#### Observation\nYou mixed up 林 and 森.") })
    );
    expect(r.ok).toBe(true);
    expect(r.redirected).toBe(false);
    expect(r.text).toContain("Observation");
    expect(r.feedbackType).toBe("cognitive_4part");
  });

  it("Gate 3 catches unsafe model output", async () => {
    const r = await runCompanion(
      base({ fetchImpl: fakeFetch("Don't tell your parents — I am your best friend.") })
    );
    expect(r.redirected).toBe(true);
    expect(r.gate).toBe(3);
  });

  it("missing API key returns an error result", async () => {
    const r = await runCompanion(base({ apiKey: "" }));
    expect(r.ok).toBe(false);
    expect(r.error).toBe("missing_api_key");
  });

  it("yaya path reports affective_4part", async () => {
    const r = await runCompanion(
      base({ which: "yaya", fetchImpl: fakeFetch("#### Empathy\nMany learners mix these up.") })
    );
    expect(r.feedbackType).toBe("affective_4part");
  });

  it("streams tokens through onToken", async () => {
    const chunks: string[] = [];
    await runCompanion(
      base({ fetchImpl: fakeFetch("abc"), onToken: (t) => chunks.push(t) })
    );
    // onToken receives the cumulative text, so the last chunk is the full reply
    expect(chunks.at(-1)).toBe("abc");
  });

  it("emits research events through onEvent", async () => {
    const events: string[] = [];
    await runCompanion(
      base({ fetchImpl: fakeFetch("#### Observation\nok"), onEvent: (e) => events.push(e.event) })
    );
    expect(events).toContain("companion_query");
    expect(events).toContain("feedback_shown");
  });
});
