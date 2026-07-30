(function () {
  const ERROR_LABELS = {
    timeout: "答题超时",
    pronunciation: "读音辨识",
    component: "部件与结构",
    vocabulary: "词语运用",
    recognition: "字形辨识",
    shape_confusion: "字形混淆",
    meaning_confusion: "字义混淆",
    other: "需要再复习",
  };

  function formatTime(milliseconds) {
    const totalSeconds = Math.max(0, Math.round((milliseconds || 0) / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes ? `${minutes}分${seconds}秒` : `${seconds}秒`;
  }

  function signed(value, suffix = "") {
    if (value === 0) return `持平${suffix}`;
    return `${value > 0 ? "+" : ""}${value}${suffix}`;
  }

  function renderTypeRows(result, labels, escape) {
    const rows = Object.values(result.byType || {});
    if (!rows.length) return '<p class="result-empty">本次没有分类成绩。</p>';
    return rows.map((row) => `
      <div class="result-type-row">
        <div><strong>${escape(labels[row.type] || row.type)}</strong><span>${row.correct}/${row.total} 题</span></div>
        <div class="result-progress"><span style="width:${row.accuracy}%"></span></div>
        <b>${row.accuracy}%</b>
      </div>
    `).join("");
  }

  function renderWrongAnswers(result, labels, escape) {
    if (!result.wrongAnswers.length) return '<p class="result-empty">这一轮没有错题，完成得很稳。</p>';
    return result.wrongAnswers.map((answer, index) => `
      <article class="result-wrong-item">
        <span>${index + 1}</span>
        <div>
          <small>${escape(labels[answer.type] || answer.type)} · ${escape(ERROR_LABELS[answer.errorType] || answer.errorType)}</small>
          <strong>${escape(answer.target || answer.prompt || "本题")}</strong>
          <p>你的答案：<b>${escape(answer.timedOut ? "未作答（超时）" : answer.picked || "未作答")}</b></p>
          <p>正确答案：<b>${escape(answer.correctAnswer || answer.target)}</b></p>
        </div>
      </article>
    `).join("");
  }

  function renderComparison(comparison) {
    if (!comparison) return '<p class="result-empty">这是第一次完成这组练习，下一次就能看到进步对比。</p>';
    return `
      <div class="result-comparison-grid">
        <span><small>正确率变化</small><strong>${signed(comparison.accuracyChange, "%")}</strong></span>
        <span><small>错题变化</small><strong>${signed(comparison.wrongChange, "题")}</strong></span>
        <span><small>平均速度变化</small><strong>${signed(Math.round(comparison.averageDurationChangeMs / 1000), "秒")}</strong></span>
        <span><small>星星变化</small><strong>${signed(comparison.starsChange, "★")}</strong></span>
      </div>
    `;
  }

  function renderTrend(recent) {
    if (!recent.length) return '<p class="result-empty">完成更多练习后，这里会显示近期趋势。</p>';
    return `<div class="result-trend">${recent.map((item) => `
      <div title="${item.accuracy}%">
        <span style="height:${Math.max(6, item.accuracy)}%"></span>
        <b>${item.accuracy}%</b>
        <small>${new Date(item.startedAt).toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" })}</small>
      </div>
    `).join("")}</div>`;
  }

  function render({ result, comparison, recent, labels, escape, canContinueLesson, companionHTML = "" }) {
    return `
      <div class="result-report-page">
        <section class="result-overview">
          <div class="result-score-ring" style="--result-score:${result.accuracy}"><strong>${result.accuracy}%</strong><small>总体正确率</small></div>
          <div class="result-overview-copy">
            <p>练习完成</p><h2>${escape(result.listName)}</h2>
            <div class="result-stat-grid">
              <span><strong>${result.total}</strong><small>已作答</small></span>
              <span><strong>${result.correct}</strong><small>答对</small></span>
              <span><strong>${result.wrong}</strong><small>错题</small></span>
              <span><strong>${result.stars}</strong><small>星星</small></span>
              <span><strong>${formatTime(result.durationMs)}</strong><small>总用时</small></span>
              <span><strong>${formatTime(result.averageDurationMs)}</strong><small>平均每题</small></span>
            </div>
          </div>
        </section>
        <section class="result-report-section"><header><p>分项表现</p><h3>各题型正确率</h3></header>${renderTypeRows(result, labels, escape)}</section>
        <section class="result-report-section"><header><p>回头看一眼</p><h3>本次错题</h3></header>${renderWrongAnswers(result, labels, escape)}</section>
        <div class="result-report-columns">
          <section class="result-report-section"><header><p>和自己比赛</p><h3>上次成绩对比</h3></header>${renderComparison(comparison)}</section>
          <section class="result-report-section"><header><p>一点点向上</p><h3>近期训练趋势</h3></header>${renderTrend(recent)}</section>
        </div>
        ${companionHTML}
        <div class="card-actions result-actions">
          <button class="primary-action" type="button" id="resultReviewWrong" ${result.wrong ? "" : "disabled"}>练习本次错题</button>
          <button class="secondary-action" type="button" id="resultRetry">再练一次</button>
          <button class="secondary-action" type="button" id="finishNextLesson">${canContinueLesson ? "学习下一个字" : "返回设置"}</button>
          <button class="secondary-action" type="button" id="finishBack">返回设置</button>
        </div>
      </div>
    `;
  }

  window.MOYA_RESULT_PAGE = { render };
})();
