(function () {
  function percentage(correct, total) {
    return total ? Math.round((correct / total) * 100) : 0;
  }

  function inferErrorType(answer) {
    if (answer.timedOut) return "timeout";
    if (answer.errorType) return answer.errorType;
    if (["charToPinyin", "pinyinAudioToSymbol", "pinyinSymbolToAudio"].includes(answer.type)) return "pronunciation";
    if (answer.type === "assemble") return "component";
    if (answer.type === "wordPractice") return "vocabulary";
    if (["pinyinToChar", "pinyinSymbolToChar"].includes(answer.type)) return "recognition";
    return "other";
  }

  function calculate(session) {
    const answers = Array.isArray(session?.answers) ? session.answers : [];
    const completed = answers.filter((answer) => answer.correct || answer.timedOut || answer.attempts?.length);
    const correct = completed.filter((answer) => answer.correct).length;
    const wrongAnswers = completed.filter((answer) => !answer.correct);
    const durationMs = session?.completedAt
      ? Math.max(0, new Date(session.completedAt).getTime() - new Date(session.startedAt).getTime())
      : completed.reduce((sum, answer) => sum + (answer.durationMs || 0), 0);
    const byType = {};

    completed.forEach((answer) => {
      const row = byType[answer.type] || { type: answer.type, total: 0, correct: 0, wrong: 0, durationMs: 0 };
      row.total += 1;
      row[answer.correct ? "correct" : "wrong"] += 1;
      row.durationMs += answer.durationMs || 0;
      byType[answer.type] = row;
    });
    Object.values(byType).forEach((row) => {
      row.accuracy = percentage(row.correct, row.total);
      row.averageDurationMs = row.total ? Math.round(row.durationMs / row.total) : 0;
    });

    const errorCounts = {};
    wrongAnswers.forEach((answer) => {
      const type = inferErrorType(answer);
      errorCounts[type] = (errorCounts[type] || 0) + 1;
    });
    const weakestType = Object.values(byType)
      .filter((row) => row.total)
      .sort((first, second) => first.accuracy - second.accuracy || second.total - first.total)[0] || null;

    return {
      id: session?.id || "",
      accountId: session?.accountId || "",
      domain: session?.domain || "hanzi",
      listName: session?.listName || "本次练习",
      characters: session?.characters || [],
      types: session?.types || [],
      startedAt: session?.startedAt || null,
      completedAt: session?.completedAt || null,
      total: completed.length,
      correct,
      wrong: wrongAnswers.length,
      accuracy: percentage(correct, completed.length),
      stars: Number(session?.stars) || 0,
      durationMs,
      averageDurationMs: completed.length ? Math.round(durationMs / completed.length) : 0,
      byType,
      wrongAnswers: wrongAnswers.map((answer) => ({ ...answer, errorType: inferErrorType(answer) })),
      errorCounts,
      weakestType,
    };
  }

  function signature(result) {
    return [
      result.domain,
      [...(result.characters || [])].sort().join(""),
      [...(result.types || [])].sort().join("|"),
    ].join(":");
  }

  function findComparable(current, history = []) {
    const currentSignature = signature(current);
    return history
      .map((item) => item.summary || calculate(item))
      .find((item) => item.id !== current.id && signature(item) === currentSignature) || null;
  }

  function compare(current, previous) {
    if (!previous) return null;
    return {
      previousId: previous.id,
      accuracyChange: current.accuracy - previous.accuracy,
      wrongChange: current.wrong - previous.wrong,
      averageDurationChangeMs: current.averageDurationMs - previous.averageDurationMs,
      starsChange: current.stars - previous.stars,
    };
  }

  function createAiSummary(result, comparison) {
    return {
      total: result.total,
      correct: result.correct,
      wrong: result.wrong,
      accuracy: result.accuracy,
      weakestType: result.weakestType?.type || null,
      errorCounts: result.errorCounts,
      reviewCharacters: [...new Set(result.wrongAnswers.map((answer) => answer.target).filter(Boolean))],
      comparison,
    };
  }

  window.MOYA_RESULT_CALCULATOR = {
    calculate,
    compare,
    findComparable,
    createAiSummary,
  };
})();
