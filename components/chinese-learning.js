(function setupChineseLearningSection() {
  const course = window.MOYA_CHINESE_COURSE;
  const root = document.querySelector("#chineseLearningPage");
  if (!course || !root) return;

  const unit = course.units[0];
  let lesson = unit.lessons[0];
  const artSources = Object.fromEntries(
    ["tree", "grove", "timber", "house", "bridge", "pavilion", "material", "board", "column", "railing", "frame", "tower", "pine", "plum", "peach", "willow", "osmanthus", "garden"]
      .map((name) => [name, `assets/courses/${name}.png`])
  );
  const stepLabels = ["认识", "理解", "应用", "读诗", "文化", "回顾"];
  const state = {
    view: "overview",
    step: 0,
    card: 0,
    matches: {},
    matchChecked: false,
    completionResult: null,
    pronunciationOrders: {},
    matchingOrders: {},
    chat: [
      {
        role: "assistant",
        text: lesson.aiGreeting,
      },
    ],
    pronunciations: {},
    reflection: [],
  };

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function artSource(art) {
    return `${artSources[art] || artSources.house}?v=2`;
  }

  function shuffled(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function lessonStorageKey(suffix) {
    const accountId = window.MOYA_PROGRESS?.getActiveAccountId?.() || "local-primary";
    return `moya:course:${unit.id}:${lesson.id}:${suffix}:${accountId}`;
  }

  function loadLessonReflection() {
    try {
      state.reflection = JSON.parse(localStorage.getItem(lessonStorageKey("reflection")) || "[]");
    } catch {
      state.reflection = [];
    }
  }

  function resetLessonState() {
    state.step = 0;
    state.card = 0;
    state.matches = {};
    state.matchChecked = false;
    state.completionResult = null;
    state.chat = [{ role: "assistant", text: lesson.aiGreeting }];
    state.pronunciations = {};
    state.pronunciationOrders = Object.fromEntries(
      lesson.flashcards.map((card) => [card.character, shuffled(card.pinyinChoices)])
    );
    state.matchingOrders = Object.fromEntries(
      lesson.matching.map((item) => [item.id, shuffled(item.choices)])
    );
    loadLessonReflection();
  }

  function renderOverview() {
    return `
      <header class="course-hero">
        <div>
          <p class="course-kicker">独立课程 · Chinese Learning Journey</p>
          <h2>${escapeHTML(course.title)}</h2>
          <p>从汉字出发，在图片、对话、生活主题、古诗与文化中发现中文。</p>
        </div>
        <div class="course-hero-mark" aria-hidden="true"><span>木</span><small>一字一世界</small></div>
      </header>
      <section class="unit-overview" aria-labelledby="woodUnitTitle">
        <div class="unit-heading">
          <div><span>第一单元</span><h3 id="woodUnitTitle">${escapeHTML(unit.title)}</h3><p>${escapeHTML(unit.subtitle)}</p></div>
          <b>${unit.lessons.length} / 3 课已开放</b>
        </div>
        ${unit.lessons.map((item, lessonIndex) => `
          <article class="lesson-entry-card">
            <img class="lesson-entry-art lesson-art" src="${artSource(item.heroArt)}" alt="${escapeHTML(item.title)}主题插画" />
            <div class="lesson-entry-copy">
              <p>第 ${item.number} 课 · ${item.method}</p>
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.overviewDescription)}</p>
              <div class="lesson-step-preview">${stepLabels.map((label, index) => `<span><i>${index + 1}</i>${label}</span>`).join("")}</div>
              <button class="course-primary" type="button" data-course-start="${lessonIndex}">开始第${item.number === 1 ? "一" : item.number === 2 ? "二" : item.number}课 <span aria-hidden="true">→</span></button>
            </div>
          </article>`).join("")}
        <div class="future-lessons" aria-label="即将开放的课程">
          <article><span>第 3 课</span><strong>等待发芽</strong><small>Coming soon</small></article>
        </div>
      </section>`;
  }

  function renderLessonShell(content) {
    return `
      <header class="lesson-coursebar">
        <button type="button" data-course-overview aria-label="返回第一单元">← 第一单元 · ${escapeHTML(unit.title)}</button>
        <div><span>第 ${lesson.number} 课</span><strong>${escapeHTML(lesson.title)}</strong></div>
        <small>约 ${lesson.estimatedMinutes} 分钟</small>
      </header>
      <nav class="lesson-stepper" aria-label="课程步骤">
        ${stepLabels.map((label, index) => `
          <button type="button" data-course-step="${index}" class="${state.step === index ? "active" : ""} ${state.step > index ? "complete" : ""}" aria-current="${state.step === index ? "step" : "false"}">
            <i>${state.step > index ? "✓" : index + 1}</i><span>${label}</span>
          </button>`).join("")}
      </nav>
      <section class="lesson-stage">${content}</section>
      <footer class="lesson-actions">
        <button class="course-secondary" type="button" data-course-prev ${state.step === 0 ? "disabled" : ""}>← 上一步</button>
        <span>第 ${state.step + 1} 步，共 ${stepLabels.length} 步</span>
        <button class="course-primary" type="button" data-course-next>${state.step === stepLabels.length - 1 ? "完成课程" : "下一步 →"}</button>
      </footer>`;
  }

  function renderFlashcards() {
    const card = lesson.flashcards[state.card];
    const selectedPronunciation = state.pronunciations[card.character];
    const pronunciationCorrect = selectedPronunciation === card.pinyin;
    return `
      <header class="stage-heading"><p>Step 1 · 认知与作答</p><h2>${escapeHTML(lesson.stepCopy.flashcardTitle)}</h2><span>${escapeHTML(lesson.stepCopy.flashcardDescription)}</span></header>
      <div class="flashcard-viewer">
        <button type="button" class="card-arrow" data-card-prev aria-label="上一张卡片">←</button>
        <article class="learning-flashcard">
          <img class="flashcard-picture lesson-art" src="${artSource(card.art)}" alt="${escapeHTML(card.chineseDefinition)}" />
          <div class="flashcard-copy">
            <div class="flashcard-character"><strong>${card.character}</strong><button type="button" data-speak="${card.character}" aria-label="朗读${card.character}">🔊</button></div>
            <div class="pronunciation-choice">
              <span>选择发音 · Choose the pronunciation</span>
              <div>${(state.pronunciationOrders[card.character] || card.pinyinChoices).map((choice) => `<button type="button" data-pronunciation="${choice}" data-character="${card.character}" class="${selectedPronunciation === choice ? (choice === card.pinyin ? "correct" : "wrong") : ""}">${choice}</button>`).join("")}</div>
              ${selectedPronunciation ? `<p class="${pronunciationCorrect ? "correct" : "wrong"}">${pronunciationCorrect ? `读对了：${card.character} · ${card.pinyin}` : `再听一次：${card.character}读 ${card.pinyin}`}</p>` : ""}
            </div>
            <p class="flashcard-english">${escapeHTML(card.english)}</p>
            <hr />
            <p><b>中文</b>${escapeHTML(card.chineseDefinition)}</p>
            <p lang="en"><b>English</b>${escapeHTML(card.englishDefinition)}</p>
          </div>
        </article>
        <button type="button" class="card-arrow" data-card-next aria-label="下一张卡片">→</button>
      </div>
      <div class="flashcard-dots" aria-label="选择认知卡">
        ${lesson.flashcards.map((item, index) => `<button type="button" data-card-index="${index}" class="${index === state.card ? "active" : ""}" aria-label="${item.character}">${item.character}</button>`).join("")}
      </div>`;
  }

  function renderAIChat() {
    return `
      <header class="stage-heading"><p>Step 2 · AI 伴学</p><h2>和墨墨一起理解${lesson.number === 1 ? "建筑字" : "植物字"}</h2><span>听解释、看词语，也可以说出你的发现。</span></header>
      <div class="ai-learning-grid">
        <section class="ai-explanation-panel">
          <div class="ai-guide"><img src="assets/companions/momo-avatar.png" alt="" /><div><strong>墨墨的小提示</strong><p>${escapeHTML(lesson.aiGuide)}</p></div></div>
          <div class="vocabulary-examples">
            ${lesson.vocabulary.map((item) => `<article><div><strong>${item.word}</strong><span>${item.pinyin}</span><small>${item.english}</small></div><p>${item.sentence}<br /><span lang="en">${item.translation}</span></p></article>`).join("")}
          </div>
        </section>
        <section class="course-chat" aria-label="AI 学习对话">
          <div class="course-chat-log" aria-live="polite">
            ${state.chat.map((message) => `<div class="${message.role}"><span>${message.role === "user" ? "我" : "墨墨"}</span><p>${escapeHTML(message.text)}</p></div>`).join("")}
          </div>
          <div class="chat-suggestions">
            ${lesson.aiSuggestions.map((text) => `<button type="button" data-chat-suggestion="${escapeHTML(text)}">${escapeHTML(text)}</button>`).join("")}
          </div>
          <form data-course-chat-form>
            <label for="courseChatInput">我想问墨墨</label>
            <div><input id="courseChatInput" maxlength="180" placeholder="输入关于“木”的问题…" /><button type="submit">发送</button></div>
          </form>
        </section>
      </div>`;
  }

  function renderMatching() {
    return `
      <header class="stage-heading"><p>Step 3 · ${escapeHTML(lesson.stepCopy.matchingKicker)}</p><h2>${escapeHTML(lesson.stepCopy.matchingTitle)}</h2><span>${escapeHTML(lesson.stepCopy.matchingDescription)}</span></header>
      <div class="architecture-matches">
        ${lesson.matching.map((item) => {
          const selected = state.matches[item.id];
          const status = state.matchChecked ? (selected === item.answer ? "correct" : "wrong") : "";
          return `<article class="${status}">
            <img class="match-picture lesson-art" src="${artSource(item.art)}" alt="${escapeHTML(lesson.stepCopy.matchingAlt)}" />
            <div class="match-options">${(state.matchingOrders[item.id] || item.choices).map((choice) => `<button type="button" data-match-id="${item.id}" data-match-choice="${choice}" class="${selected === choice ? "selected" : ""}">${choice}</button>`).join("")}</div>
            ${state.matchChecked ? `<p>${selected === item.answer ? "答对了！" : `再看看：这是${item.answer}。`}</p>` : ""}
          </article>`;
        }).join("")}
      </div>
      <div class="match-check-row"><button class="course-primary" type="button" data-check-matches ${Object.keys(state.matches).length < lesson.matching.length ? "disabled" : ""}>检查答案</button><span>${state.matchChecked ? `${lesson.matching.filter((item) => state.matches[item.id] === item.answer).length} / ${lesson.matching.length} 配对正确` : `选好 ${lesson.matching.length} 张图片后再检查`}</span></div>`;
  }

  function renderClassic() {
    return `
      <header class="stage-heading"><p>Step 4 · 原典阅读</p><h2>${escapeHTML(lesson.stepCopy.classicTitle)}</h2><span>${escapeHTML(lesson.stepCopy.classicDescription)}</span></header>
      <article class="classic-reading">
        <img class="classic-art lesson-art" src="${artSource(lesson.classic.art || "tower")}" alt="${escapeHTML(lesson.classic.title)}主题插画" />
        <div class="classic-copy">
          <h3>${lesson.classic.title}</h3>
          <p>${lesson.classic.dynasty} · ${lesson.classic.author}</p>
          ${lesson.classic.lines.map((line) => `<div class="poem-line"><strong>${line.text}</strong><span>${line.pinyin}</span><small lang="en">${line.translation}</small></div>`).join("")}
          <button type="button" data-speak="${lesson.classic.lines.map((line) => line.text).join("，")}">▶ 听一听</button>
          <blockquote><span>${lesson.classic.note}</span><small lang="en">${lesson.classic.englishNote}</small></blockquote>
        </div>
      </article>`;
  }

  function renderCulture() {
    return `
      <header class="stage-heading"><p>Step 5 · 文化探索</p><h2>${escapeHTML(lesson.stepCopy.cultureTitle)}</h2><span>${escapeHTML(lesson.stepCopy.cultureDescription)}</span></header>
      <div class="culture-feature"><img class="lesson-art" src="${artSource(lesson.stepCopy.cultureArt)}" alt="${escapeHTML(lesson.stepCopy.cultureAlt)}" /><p>${escapeHTML(lesson.stepCopy.cultureIntro)}</p></div>
      <div class="culture-cards">${lesson.culture.map((item) => `<article><span>${item.icon}</span><p>${item.english}</p><h3>${item.title}</h3><p>${item.body}</p><p lang="en" class="culture-english">${item.englishBody}</p></article>`).join("")}</div>`;
  }

  function renderReflection() {
    const prompts = lesson.stepCopy.reflectionPrompts;
    return `
      <header class="stage-heading"><p>Step 6 · 成长日志</p><h2>把今天的发现收进成长日志</h2><span>没有标准答案，选出最像你今天感受的句子。</span></header>
      <section class="reflection-panel">
        <div class="reflection-tree" aria-hidden="true"><span>木</span><i></i><i></i><i></i></div>
        <div>
          <h3>今天，我……</h3>
          <div class="reflection-prompts">${prompts.map((prompt) => `<button type="button" data-reflection="${prompt}" class="${state.reflection.includes(prompt) ? "selected" : ""}">${state.reflection.includes(prompt) ? "✓ " : ""}${prompt}</button>`).join("")}</div>
          <label for="reflectionNote">还想记下什么？</label>
          <textarea id="reflectionNote" rows="4" placeholder="${escapeHTML(lesson.stepCopy.reflectionPlaceholder)}">${escapeHTML(localStorage.getItem(lessonStorageKey("reflection-note")) || "")}</textarea>
          <p class="reflection-summary">${state.reflection.length ? `墨墨看到你今天有 ${state.reflection.length} 个新发现。知识就像树，一点一点长出新的枝叶。` : "选一选，让墨墨看见你今天的收获。"}</p>
        </div>
      </section>`;
  }

  function calculateCourseResult() {
    const pronunciationCorrect = lesson.flashcards.filter(
      (card) => state.pronunciations[card.character] === card.pinyin
    ).length;
    const matchingCorrect = lesson.matching.filter(
      (item) => state.matches[item.id] === item.answer
    ).length;
    const total = lesson.flashcards.length + lesson.matching.length;
    const correct = pronunciationCorrect + matchingCorrect;
    const scoreStars = correct * 2 + 5;
    const accountId = window.MOYA_PROGRESS?.getActiveAccountId?.() || "local-primary";
    const storageKey = lessonStorageKey("results");
    let previous = { attempts: [], bestCorrect: 0, bestStars: 0 };
    try {
      previous = { ...previous, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch {
      previous = { attempts: [], bestCorrect: 0, bestStars: 0 };
    }
    const awardedStars = Math.max(0, scoreStars - (Number(previous.bestStars) || 0));
    const result = {
      total,
      correct,
      wrong: total - correct,
      pronunciationCorrect,
      matchingCorrect,
      scoreStars,
      awardedStars,
      unitId: unit.id,
      unitTitle: unit.title,
      lessonId: lesson.id,
      lessonNumber: lesson.number,
      lessonTitle: lesson.title,
      completedAt: new Date().toISOString(),
    };
    const record = {
      attempts: [...(Array.isArray(previous.attempts) ? previous.attempts : []), result].slice(-20),
      bestCorrect: Math.max(Number(previous.bestCorrect) || 0, correct),
      bestStars: Math.max(Number(previous.bestStars) || 0, scoreStars),
      lastCompletedAt: result.completedAt,
    };
    localStorage.setItem(storageKey, JSON.stringify(record));
    window.MOYA_RECORD_COURSE_RESULT?.(result);
    return result;
  }

  function renderCompletion() {
    const result = state.completionResult;
    const accuracy = Math.round((result.correct / result.total) * 100);
    return `
      <section class="course-completion" aria-labelledby="courseCompletionTitle">
        <div class="completion-seal" aria-hidden="true">木</div>
        <p>第一单元 · 第 ${lesson.number} 课</p>
        <h2 id="courseCompletionTitle">完成《${escapeHTML(lesson.title)}》</h2>
        <p>${escapeHTML(lesson.stepCopy.completionSummary)}</p>
        <div class="completion-score-grid">
          <article><span>作答</span><strong>${result.total}</strong><small>道题</small></article>
          <article><span>答对</span><strong>${result.correct}</strong><small>${accuracy}%</small></article>
          <article><span>发音</span><strong>${result.pronunciationCorrect}/5</strong><small>Step 1</small></article>
          <article><span>配对</span><strong>${result.matchingCorrect}/5</strong><small>Step 3</small></article>
          <article class="completion-stars"><span>本次获得</span><strong>${result.awardedStars} ★</strong><small>${result.awardedStars ? "已加入成长记录" : "本课星星已领取"}</small></article>
        </div>
        <div class="completion-actions">
          <button class="course-secondary" type="button" data-course-retry>再学一次</button>
          <button class="course-primary" type="button" data-course-finish>返回第一单元</button>
        </div>
      </section>`;
  }

  function renderStep() {
    return [renderFlashcards, renderAIChat, renderMatching, renderClassic, renderCulture, renderReflection][state.step]();
  }

  function render() {
    root.innerHTML = state.view === "overview"
      ? renderOverview()
      : state.view === "completion"
        ? renderCompletion()
        : renderLessonShell(renderStep());
    bindEvents();
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.78;
    window.speechSynthesis.speak(utterance);
  }

  async function sendChat(text) {
    const cleaned = text.trim();
    if (!cleaned) return;
    state.chat.push({ role: "user", text: cleaned });
    state.chat.push({ role: "assistant", text: "墨墨正在想一想……", loading: true });
    render();
    const replyIndex = state.chat.length - 1;
    try {
      const response = await fetch("/api/companion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ which: "momo", character: "木", userText: `正在学习第一单元“木”、第${lesson.number}课“${lesson.title}”。请用简短中英双语、适合儿童的方式回答：${cleaned}` }),
      });
      const data = await response.json();
      if (!response.ok || !data?.text) throw new Error("AI unavailable");
      state.chat[replyIndex] = { role: "assistant", text: data.text };
    } catch {
      const fallback = lesson.id === "wood-and-plants"
        ? cleaned.includes("桃花")
          ? "可以说：“春天，公园里的桃花开了。” We can say: “In spring, the peach blossoms bloom in the park.”"
          : cleaned.includes("松")
            ? "松树四季常青，在中国文化里常象征坚韧和长寿。Pine often symbolizes resilience and longevity in Chinese culture."
            : "这些植物字都有木字旁，因为它们与树木和木本植物有关。These characters share the wood radical because they name trees or woody plants."
        : cleaned.includes("造")
          ? "可以说：“山脚下有一座美丽的木屋。” We can say: “There is a beautiful wooden house at the foot of the mountain.”"
          : "木头经过选择、切割和连接，可以变成柱子、横梁和屋顶。Wood can be shaped and joined to become posts, beams, and roofs.";
      state.chat[replyIndex] = { role: "assistant", text: fallback };
    }
    render();
  }

  function bindEvents() {
    root.querySelectorAll("[data-course-start]").forEach((button) => button.addEventListener("click", () => {
      lesson = unit.lessons[Number(button.dataset.courseStart)] || unit.lessons[0];
      resetLessonState();
      state.view = "lesson";
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    root.querySelector("[data-course-overview]")?.addEventListener("click", () => {
      state.view = "overview";
      render();
    });
    root.querySelectorAll("[data-course-step]").forEach((button) => button.addEventListener("click", () => {
      state.step = Number(button.dataset.courseStep);
      render();
    }));
    root.querySelector("[data-course-prev]")?.addEventListener("click", () => {
      state.step = Math.max(0, state.step - 1);
      render();
    });
    root.querySelector("[data-course-next]")?.addEventListener("click", () => {
      if (state.step === stepLabels.length - 1) {
        localStorage.setItem(lessonStorageKey("complete"), new Date().toISOString());
        state.completionResult = calculateCourseResult();
        state.view = "completion";
      } else {
        state.step += 1;
      }
      render();
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    root.querySelector("[data-course-retry]")?.addEventListener("click", () => {
      state.view = "lesson";
      resetLessonState();
      render();
    });
    root.querySelector("[data-course-finish]")?.addEventListener("click", () => {
      state.view = "overview";
      render();
    });
    root.querySelector("[data-card-prev]")?.addEventListener("click", () => {
      state.card = (state.card - 1 + lesson.flashcards.length) % lesson.flashcards.length;
      render();
    });
    root.querySelector("[data-card-next]")?.addEventListener("click", () => {
      state.card = (state.card + 1) % lesson.flashcards.length;
      render();
    });
    root.querySelectorAll("[data-card-index]").forEach((button) => button.addEventListener("click", () => {
      state.card = Number(button.dataset.cardIndex);
      render();
    }));
    root.querySelectorAll("[data-speak]").forEach((button) => button.addEventListener("click", () => speak(button.dataset.speak)));
    root.querySelectorAll("[data-pronunciation]").forEach((button) => button.addEventListener("click", () => {
      state.pronunciations[button.dataset.character] = button.dataset.pronunciation;
      render();
      if (button.dataset.pronunciation === lesson.flashcards[state.card].pinyin) speak(button.dataset.character);
    }));
    root.querySelectorAll("[data-chat-suggestion]").forEach((button) => button.addEventListener("click", () => sendChat(button.dataset.chatSuggestion)));
    root.querySelector("[data-course-chat-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = event.currentTarget.querySelector("input");
      sendChat(input.value);
    });
    root.querySelectorAll("[data-match-choice]").forEach((button) => button.addEventListener("click", () => {
      state.matches[button.dataset.matchId] = button.dataset.matchChoice;
      state.matchChecked = false;
      render();
    }));
    root.querySelector("[data-check-matches]")?.addEventListener("click", () => {
      state.matchChecked = true;
      render();
    });
    root.querySelectorAll("[data-reflection]").forEach((button) => button.addEventListener("click", () => {
      const prompt = button.dataset.reflection;
      state.reflection = state.reflection.includes(prompt)
        ? state.reflection.filter((item) => item !== prompt)
        : [...state.reflection, prompt];
      localStorage.setItem(lessonStorageKey("reflection"), JSON.stringify(state.reflection));
      render();
    }));
    root.querySelector("#reflectionNote")?.addEventListener("input", (event) => {
      localStorage.setItem(lessonStorageKey("reflection-note"), event.target.value);
    });
  }

  loadLessonReflection();
  render();
})();
