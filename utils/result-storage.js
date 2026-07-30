(function () {
  const MAX_RESULTS = 100;

  function read(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function save(key, session, summary) {
    if (!key || !session?.id) return [];
    const history = read(key).filter((item) => item.id !== session.id);
    history.unshift({ ...session, summary });
    const limited = history.slice(0, MAX_RESULTS);
    localStorage.setItem(key, JSON.stringify(limited));
    return limited;
  }

  function getHistory(key, limit = MAX_RESULTS) {
    return read(key).slice(0, Math.max(0, limit));
  }

  function getRecentSummaries(key, limit = 7) {
    return getHistory(key, limit).map((item) => item.summary || window.MOYA_RESULT_CALCULATOR.calculate(item));
  }

  function getWrongAnswers(key, resultId) {
    const item = read(key).find((result) => result.id === resultId);
    return item?.summary?.wrongAnswers || [];
  }

  window.MOYA_RESULT_STORAGE = {
    save,
    getHistory,
    getRecentSummaries,
    getWrongAnswers,
  };
})();
