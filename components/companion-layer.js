(function () {
  const ERROR_LABELS = {
    timeout: "答题时间不够",
    pronunciation: "读音辨识还不稳定",
    component: "部件顺序或结构容易混淆",
    vocabulary: "词语中的用字需要复习",
    recognition: "相近字形容易混淆",
    shape_confusion: "相近字形容易混淆",
    meaning_confusion: "字义或用法容易混淆",
    other: "有些知识点需要再看一次",
  };

  const COMPANION_IMAGES = {
    momo: {
      avatar: "assets/companions/momo-avatar.png",
      explanation: "assets/companions/momo-explanation.png",
      result: "assets/companions/momo-result.png",
    },
    yaya: {
      avatar: "assets/companions/yaya-avatar.png",
      explanation: "assets/companions/yaya-explanation.png",
      result: "assets/companions/yaya-result.png",
    },
  };

  function renderMarkdown(markdown, escape) {
    return escape(markdown || "")
      .replace(/^#### (.*)$/gm, "<strong>$1</strong>")
      .replace(/^### (.*)$/gm, "<strong>$1</strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n{2,}/g, "<br><br>")
      .replace(/\n/g, "<br>");
  }

  function getMessageSpeaker(message) {
    if (message.role === "user") return "我";
    if (message.which === "yaya") return "Yaya";
    return "Momo";
  }

  function renderAudioControl(message, index, options) {
    if (message.role !== "assistant") return "";
    if (message.audioLoading) {
      return `<small class="companion-voice-state">${message.which === "yaya" ? "Yaya" : "Momo"} is speaking...</small>`;
    }
    if (message.audioChunks?.length || message.browserSpeech) {
      return `<button type="button" class="companion-replay-button" data-companion-replay="${index}">🔊 Listen again</button>`;
    }
    if (message.audioError && options.voiceEnabled) {
      return `<small class="companion-voice-state">${escape(message.audioError)}</small>`;
    }
    return "";
  }

  function unifiedChatBox(options) {
    const escape = options.escape;
    const messages = options.chats?.thread || [];
    const messageHTML = messages.length
      ? messages.map((message, index) => `
          <div class="companion-chat-message ${message.role} ${message.which || ""}">
            <span>${getMessageSpeaker(message)}</span>
            <p>${message.role === "assistant" ? renderMarkdown(message.text, escape) : escape(message.text)}</p>
            ${renderAudioControl(message, index, options)}
          </div>
        `).join("")
      : `<p class="companion-chat-empty">有问题可以轻轻问一句。</p>`;
    return `
      <div class="companion-chat companion-chat-unified" data-companion-chat="auto">
        <div class="companion-chat-toolbar">
          <span>AI voice</span>
          <button type="button" data-companion-voice-toggle aria-pressed="${options.voiceEnabled ? "true" : "false"}">${options.voiceEnabled ? "Voice on" : "Muted"}</button>
        </div>
        <div class="companion-chat-log" aria-live="polite">${messageHTML}</div>
        <label>
          <span>问 Momo 和 Yaya</span>
          <textarea name="message" rows="2" maxlength="300" placeholder="可以问：这个字怎么记？生活里怎么用？"></textarea>
        </label>
        <button type="button" data-companion-send="auto" ${options.loading ? "disabled" : ""}>${options.loading ? "思考中..." : "发送"}</button>
      </div>
    `;
  }

  function explanationCards(lesson, options) {
    const escape = options.escape;
    if (!lesson) return "";
    return `
      <section class="companion-layer companion-layer-explanation" aria-label="Momo 和 Yaya 汉字讲解">
        <article class="companion-block companion-block-momo">
          <img class="companion-character-image" src="${COMPANION_IMAGES.momo.explanation}" alt="Momo学习教练" />
          <header><b>Momo</b><span>理性学习教练</span></header>
          <h3>结构与读音</h3>
          <p><strong>结构：</strong>${escape(lesson.momoExplanation.structure)}</p>
          <p><strong>部首：</strong>${escape(lesson.momoExplanation.radical)}</p>
          <p><strong>笔画：</strong>${escape(lesson.momoExplanation.strokes)} 画</p>
          <p>${escape(lesson.momoExplanation.logic)}</p>
          <p>${escape(lesson.momoExplanation.pronunciationTip)}</p>
          ${lesson.momoExplanation.confusionTip ? `<p><strong>易错点：</strong>${escape(lesson.momoExplanation.confusionTip)}</p>` : ""}
          <button type="button" data-companion-speak="momo">播放 Momo 讲解</button>
        </article>
        <article class="companion-block companion-block-yaya">
          <img class="companion-character-image" src="${COMPANION_IMAGES.yaya.explanation}" alt="Yaya文化伙伴" />
          <header><b>Yaya</b><span>文化与情绪伙伴</span></header>
          <h3>生活与文化</h3>
          <p>${escape(lesson.yayaExplanation.culturalNote)}</p>
          <p>${escape(lesson.yayaExplanation.dailyUse)}</p>
          <p>${escape(lesson.yayaExplanation.story)}</p>
          <p><strong>${escape(lesson.yayaExplanation.encouragement)}</strong></p>
          <button type="button" data-companion-speak="yaya">播放 Yaya 讲解</button>
        </article>
        <section class="companion-chat-card">${unifiedChatBox(options)}</section>
      </section>
    `;
  }

  function practiceLayer(options) {
    const { activePanel, lesson, typeLabel, escape } = options;
    const momoHint = lesson
      ? `先看题目里的读音或关键部件。这个字是${lesson.momoExplanation.structure}，不要急着选择。`
      : "先看题目提示，再排除最不像的选项。我不会直接公布答案。";
    const yayaHint = "慢慢来。选错只是告诉我们哪里值得再练一次。";
    const panel = activePanel === "momo"
      ? `<section class="companion-simple-panel momo"><button type="button" data-companion-close>关闭</button><h3>Momo 提示</h3><p>${escape(typeLabel)}</p><p>${escape(momoHint)}</p>${unifiedChatBox(options)}</section>`
      : activePanel === "yaya"
        ? `<section class="companion-simple-panel yaya"><button type="button" data-companion-close>关闭</button><h3>Yaya 陪伴</h3><p>${escape(yayaHint)}</p>${unifiedChatBox(options)}</section>`
        : "";
    return `
      <div class="companion-layer companion-layer-practice">
        <div class="companion-buttons">
          <button type="button" class="companion-float-button momo ${activePanel === "momo" ? "active" : ""}" data-companion="momo" aria-label="打开 Momo 提示"><img src="${COMPANION_IMAGES.momo.avatar}" alt="" /><strong>Momo</strong></button>
          <button type="button" class="companion-float-button yaya ${activePanel === "yaya" ? "active" : ""}" data-companion="yaya" aria-label="打开 Yaya 鼓励"><img src="${COMPANION_IMAGES.yaya.avatar}" alt="" /><strong>Yaya</strong></button>
        </div>
        ${panel}
      </div>
    `;
  }

  function resultCards(result, labels, options) {
    const escape = options.escape;
    if (!result) return "";
    const mainError = Object.entries(result.errorCounts || {}).sort((a, b) => b[1] - a[1])[0];
    const mainErrorText = mainError ? ERROR_LABELS[mainError[0]] || mainError[0] : "这一轮没有明显错误";
    const reviewCharacters = [...new Set(result.wrongAnswers.map((answer) => answer.target).filter(Boolean))];
    const weakestLabel = result.weakestType ? labels[result.weakestType.type] || result.weakestType.type : "暂无薄弱题型";
    const encouragement = result.accuracy >= 90
      ? "你完成得很稳，也认真坚持到了最后。"
      : result.accuracy >= 60
        ? "你已经掌握了大部分内容，错题正好告诉我们下一步练哪里。"
        : "这次遇到的内容有些难，但你把整轮练习做完了，这就是很重要的进步。";
    return `
      <section class="companion-layer companion-layer-result" aria-label="Momo 和 Yaya 结果解读">
        <article class="companion-block companion-block-momo">
          <img class="companion-character-image companion-result-image" src="${COMPANION_IMAGES.momo.result}" alt="Momo正在分析学习结果" />
          <header><b>Momo</b><span>结果诊断</span></header>
          <h3>这一轮的学习分析</h3>
          <p>总体正确率 <strong>${result.accuracy}%</strong>，答错 ${result.wrong} 题。</p>
          <p><strong>主要错误点：</strong>${escape(mainErrorText)}</p>
          <p><strong>相对薄弱题型：</strong>${escape(weakestLabel)}</p>
          <p><strong>建议复习：</strong>${reviewCharacters.length ? escape(reviewCharacters.join("、")) : "可以继续学习新内容"}</p>
          <p>${result.wrong ? "下一轮先慢读题目，再比较读音、部件或词语位置。" : "保持现在的节奏，可以增加一点新挑战。"}</p>
          <button type="button" data-companion-speak="momo">播放 Momo 解读</button>
        </article>
        <article class="companion-block companion-block-yaya">
          <img class="companion-character-image companion-result-image" src="${COMPANION_IMAGES.yaya.result}" alt="Yaya正在鼓励学习者" />
          <header><b>Yaya</b><span>鼓励与连接</span></header>
          <h3>今天的努力被看见了</h3>
          <p>${escape(encouragement)}</p>
          <p>答错不是失败，它只是帮我们找到下一颗需要照顾的小芽。</p>
          <p>你每多认识一个中文声音和汉字，就多了一种和家人、故事与文化连接的方式。</p>
          <p><strong>休息一下，我们下一次继续。</strong></p>
          <button type="button" data-companion-speak="yaya">播放 Yaya 鼓励</button>
        </article>
        <section class="companion-chat-card">${unifiedChatBox(options)}</section>
      </section>
    `;
  }

  function render(options) {
    if (options.stage === "explanation") return explanationCards(options.lesson, options);
    if (options.stage === "result") return resultCards(options.result, options.labels, options);
    return practiceLayer(options);
  }

  window.MOYA_COMPANION_LAYER = { render };
})();
