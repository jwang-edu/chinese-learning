(function () {
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function createSession(options = {}) {
    const now = new Date().toISOString();
    return {
      version: 1,
      id: options.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      accountId: options.accountId || "local-primary",
      domain: options.domain || "hanzi",
      listName: options.listName || "本次练习",
      characters: [...new Set(options.characters || [])],
      types: [...new Set(options.types || [])],
      orderMode: options.orderMode || "ordered",
      timerDuration: Number(options.timerDuration) || 0,
      startedAt: options.startedAt || now,
      completedAt: null,
      answers: [],
      stars: 0,
    };
  }

  function createAnswer(options = {}) {
    return {
      questionId: String(options.questionId || ""),
      type: options.type || "unknown",
      target: String(options.target || ""),
      pinyin: String(options.pinyin || ""),
      prompt: String(options.prompt || ""),
      picked: options.picked == null ? "" : String(options.picked),
      correctAnswer: options.correctAnswer == null ? "" : String(options.correctAnswer),
      entry: options.entry ? clone(options.entry) : null,
      correct: Boolean(options.correct),
      timedOut: Boolean(options.timedOut),
      errorType: options.errorType || null,
      durationMs: Math.max(0, Number(options.durationMs) || 0),
      stars: Number(options.stars) || 0,
      answeredAt: options.answeredAt || new Date().toISOString(),
      attempts: Array.isArray(options.attempts) ? [...options.attempts] : [],
    };
  }

  function recordAnswer(session, answerInput) {
    if (!session) return null;
    const answer = createAnswer(answerInput);
    const existing = session.answers.find((item) => item.questionId === answer.questionId);
    if (!existing) {
      answer.attempts.push({
        picked: answer.picked,
        correct: answer.correct,
        timedOut: answer.timedOut,
        answeredAt: answer.answeredAt,
      });
      session.answers.push(answer);
      return answer;
    }

    existing.attempts.push({
      picked: answer.picked,
      correct: answer.correct,
      timedOut: answer.timedOut,
      answeredAt: answer.answeredAt,
    });
    existing.picked = answer.picked || existing.picked;
    existing.correctAnswer = answer.correctAnswer || existing.correctAnswer;
    existing.timedOut = existing.timedOut || answer.timedOut;
    existing.errorType = existing.errorType || answer.errorType;
    existing.durationMs = Math.max(existing.durationMs, answer.durationMs);
    existing.stars += answer.stars;
    // A question remains incorrect when the learner needed an incorrect attempt first.
    existing.correct = existing.correct && answer.correct;
    existing.answeredAt = answer.answeredAt;
    return existing;
  }

  function finalizeSession(session, options = {}) {
    if (!session) return null;
    session.completedAt = options.completedAt || new Date().toISOString();
    session.stars = Number(options.stars ?? session.stars) || 0;
    return clone(session);
  }

  window.MOYA_RESULT_MODEL = {
    createSession,
    createAnswer,
    recordAnswer,
    finalizeSession,
  };
})();
