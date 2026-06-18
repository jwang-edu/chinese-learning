import "./data/hanzi-db.js";
import "./data/word-db.js";

const CHARACTER_DATA = {
  一: { pinyin: "yi", parts: ["一"], layout: "single" },
  二: { pinyin: "er", parts: ["一", "一"], layout: "vertical" },
  三: { pinyin: "san", parts: ["一", "一", "一"], layout: "vertical" },
  人: { pinyin: "ren", parts: ["丿", "㇏"], layout: "overlap" },
  大: { pinyin: "da", parts: ["一", "人"], layout: "vertical" },
  天: { pinyin: "tian", parts: ["一", "大"], layout: "vertical" },
  口: { pinyin: "kou", parts: ["口"], layout: "single" },
  日: { pinyin: "ri", parts: ["日"], layout: "single" },
  月: { pinyin: "yue", parts: ["月"], layout: "single" },
  火: { pinyin: "huo", parts: ["丷", "人"], layout: "vertical" },
  水: { pinyin: "shui", parts: ["水"], layout: "single" },
  木: { pinyin: "mu", parts: ["木"], layout: "single" },
  林: { pinyin: "lin", parts: ["木", "木"], layout: "leftRight" },
  森: { pinyin: "sen", parts: ["木", "木", "木"], layout: "topBottomDouble" },
  明: { pinyin: "ming", parts: ["日", "月"], layout: "leftRight" },
  朋: { pinyin: "peng", parts: ["月", "月"], layout: "leftRight" },
  好: { pinyin: "hao", parts: ["女", "子"], layout: "leftRight" },
  妈: { pinyin: "ma", parts: ["女", "马"], layout: "leftRight" },
  姐: { pinyin: "jie", parts: ["女", "且"], layout: "leftRight" },
  他: { pinyin: "ta", parts: ["亻", "也"], layout: "leftRight" },
  你: { pinyin: "ni", parts: ["亻", "尔"], layout: "leftRight" },
  们: { pinyin: "men", parts: ["亻", "门"], layout: "leftRight" },
  休: { pinyin: "xiu", parts: ["亻", "木"], layout: "leftRight" },
  体: { pinyin: "ti", parts: ["亻", "本"], layout: "leftRight" },
  位: { pinyin: "wei", parts: ["亻", "立"], layout: "leftRight" },
  住: { pinyin: "zhu", parts: ["亻", "主"], layout: "leftRight" },
  语: { pinyin: "yu", parts: ["讠", "吾"], layout: "leftRight" },
  说: { pinyin: "shuo", parts: ["讠", "兑"], layout: "leftRight" },
  话: { pinyin: "hua", parts: ["讠", "舌"], layout: "leftRight" },
  请: { pinyin: "qing", parts: ["讠", "青"], layout: "leftRight" },
  课: { pinyin: "ke", parts: ["讠", "果"], layout: "leftRight" },
  清: { pinyin: "qing", parts: ["氵", "青"], layout: "leftRight" },
  河: { pinyin: "he", parts: ["氵", "可"], layout: "leftRight" },
  海: { pinyin: "hai", parts: ["氵", "每"], layout: "leftRight" },
  湖: { pinyin: "hu", parts: ["氵", "胡"], layout: "leftRight" },
  洋: { pinyin: "yang", parts: ["氵", "羊"], layout: "leftRight" },
  江: { pinyin: "jiang", parts: ["氵", "工"], layout: "leftRight" },
  红: { pinyin: "hong", parts: ["纟", "工"], layout: "leftRight" },
  绿: { pinyin: "lv", parts: ["纟", "录"], layout: "leftRight" },
  纸: { pinyin: "zhi", parts: ["纟", "氏"], layout: "leftRight" },
  想: { pinyin: "xiang", parts: ["相", "心"], layout: "topBottom" },
  念: { pinyin: "nian", parts: ["今", "心"], layout: "topBottom" },
  您: { pinyin: "nin", parts: ["你", "心"], layout: "topBottom" },
  意: { pinyin: "yi", parts: ["音", "心"], layout: "topBottom" },
  草: { pinyin: "cao", parts: ["艹", "早"], layout: "topBottom" },
  花: { pinyin: "hua", parts: ["艹", "化"], layout: "topBottom" },
  苗: { pinyin: "miao", parts: ["艹", "田"], layout: "topBottom" },
  笔: { pinyin: "bi", parts: ["⺮", "毛"], layout: "topBottom" },
  笑: { pinyin: "xiao", parts: ["⺮", "夭"], layout: "topBottom" },
  男: { pinyin: "nan", parts: ["田", "力"], layout: "topBottom" },
  看: { pinyin: "kan", parts: ["手", "目"], layout: "topBottom" },
  音: { pinyin: "yin", parts: ["立", "日"], layout: "topBottom" },
  星: { pinyin: "xing", parts: ["日", "生"], layout: "topBottom" },
  早: { pinyin: "zao", parts: ["日", "十"], layout: "topBottom" },
  时: { pinyin: "shi", parts: ["日", "寸"], layout: "leftRight" },
  晴: { pinyin: "qing", parts: ["日", "青"], layout: "leftRight" },
  问: { pinyin: "wen", parts: ["门", "口"], layout: "surround" },
  间: { pinyin: "jian", parts: ["门", "日"], layout: "surround" },
  闻: { pinyin: "wen", parts: ["门", "耳"], layout: "surround" },
  国: { pinyin: "guo", parts: ["囗", "玉"], layout: "surround" },
  园: { pinyin: "yuan", parts: ["囗", "元"], layout: "surround" },
  回: { pinyin: "hui", parts: ["囗", "口"], layout: "surround" },
  家: { pinyin: "jia", parts: ["宀", "豕"], layout: "topBottom" },
  字: { pinyin: "zi", parts: ["宀", "子"], layout: "topBottom" },
  学: { pinyin: "xue", parts: ["𭕄", "子"], layout: "topBottom" },
  安: { pinyin: "an", parts: ["宀", "女"], layout: "topBottom" },
  坐: { pinyin: "zuo", parts: ["人", "人", "土"], layout: "topDoubleBottom" },
  从: { pinyin: "cong", parts: ["人", "人"], layout: "leftRight" },
  众: { pinyin: "zhong", parts: ["人", "人", "人"], layout: "topBottomDouble" },
};

const HANZI_DATABASE = { ...CHARACTER_DATA, ...(window.HANZI_DB || {}) };

const WORD_BANK = {
  一: ["一天", "一人", "一个"],
  二: ["二月", "二人"],
  三: ["三天", "三人"],
  人: ["大人", "人们", "好人"],
  大: ["大人", "大火", "大门"],
  天: ["明天", "天空", "今天"],
  口: ["门口", "口语"],
  日: ["日月", "生日"],
  月: ["月亮", "明月"],
  火: ["大火", "火山"],
  水: ["河水", "海水", "清水"],
  木: ["木头", "树木", "木马"],
  林: ["树林", "林子"],
  森: ["森林"],
  明: ["明天", "明月", "明白"],
  朋: ["朋友"],
  好: ["好人", "你好", "好学"],
  妈: ["妈妈"],
  姐: ["姐姐"],
  他: ["他们", "他人"],
  你: ["你好", "你们"],
  们: ["你们", "他们", "人们"],
  休: ["休息", "午休"],
  体: ["身体", "体育"],
  位: ["座位", "个位"],
  住: ["住口", "住家"],
  语: ["语文", "语言", "口语"],
  说: ["说话", "小说"],
  话: ["说话", "电话"],
  请: ["请问", "请坐"],
  课: ["上课", "课文"],
  清: ["清水", "清早", "清明"],
  河: ["河水", "小河"],
  海: ["海水", "大海"],
  湖: ["湖水", "西湖"],
  洋: ["海洋", "洋人"],
  江: ["江河", "长江"],
  红: ["红花", "红日"],
  绿: ["绿草", "绿色"],
  纸: ["白纸", "纸张"],
  想: ["想念", "想法"],
  念: ["想念", "念书"],
  您: ["您好"],
  意: ["意思", "心意"],
  草: ["草地", "绿草"],
  花: ["花朵", "红花"],
  苗: ["禾苗", "树苗"],
  笔: ["铅笔", "笔画"],
  笑: ["笑脸", "大笑"],
  男: ["男孩", "男人"],
  看: ["看见", "看书"],
  音: ["音乐", "拼音"],
  星: ["星星", "星光"],
  早: ["早上", "清早"],
  时: ["时间", "小时"],
  晴: ["晴天", "晴日"],
  问: ["请问", "问好"],
  间: ["中间", "时间"],
  闻: ["新闻", "听闻"],
  国: ["国家", "中国"],
  园: ["公园", "花园"],
  回: ["回家", "回来"],
  家: ["回家", "家人"],
  字: ["汉字", "写字"],
  学: ["学生", "学习"],
  安: ["安心", "平安"],
  坐: ["坐下", "请坐"],
  从: ["从前", "从来"],
  众: ["众人", "大众"],
};

const WORD_DICTIONARY = [...new Set([...(window.WORD_DB || []), ...Object.values(WORD_BANK).flat()])];
const WORD_INDEX = buildWordIndex(WORD_DICTIONARY);

const state = {
  screen: "settings",
  entries: [],
  questionQueue: [],
  activeIndex: 0,
  mode: "pinyinToChar",
  selectedAnswer: null,
  placed: {},
  assemblyChoices: [],
  assemblyChoicesKey: "",
  assemblyWrongScored: false,
  choiceOptions: new Map(),
  score: 0,
  scoredQuestions: new Set(),
  timerDuration: 10,
  rewardStars: {
    pinyinToChar: 2,
    charToPinyin: 2,
    assemble: 2,
    wordPractice: 2,
  },
  orderMode: "ordered",
  timeLeft: 10,
  timerId: null,
  autoNextId: null,
  timedOutQuestions: new Set(),
  dailyStats: null,
};

const input = document.querySelector("#characterInput");
const settingsPage = document.querySelector("#settingsPage");
const practicePage = document.querySelector("#practicePage");
const practiceStats = document.querySelector(".practice-only");
const practiceArea = document.querySelector("#practiceArea");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#scoreText");
const scoreStars = document.querySelector("#scoreStars");
const timerText = document.querySelector("#timerText");
const dailyDate = document.querySelector("#dailyDate");
const dailyStars = document.querySelector("#dailyStars");
const dailyDone = document.querySelector("#dailyDone");
const dailyCorrect = document.querySelector("#dailyCorrect");
const dailyWrong = document.querySelector("#dailyWrong");
const dailySummary = document.querySelector("#dailySummary");

document.querySelector("#startPractice").addEventListener("click", startPractice);
document.querySelector("#backToSettings").addEventListener("click", showSettings);

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.preset;
  });
});

input.value = "明好林休妈语";
showSettings();

function startPractice() {
  stopTimer();
  clearAutoNext();
  const chars = Array.from(new Set(Array.from(input.value).filter(isChineseChar)));
  const selectedTypes = Array.from(document.querySelectorAll("[data-type]:checked")).map((field) => field.dataset.type);
  if (!chars.length || !selectedTypes.length) return;
  state.timerDuration = Number(document.querySelector("[name='timerSetting']:checked").value);
  state.rewardStars = Object.fromEntries(
    Array.from(document.querySelectorAll("[data-reward-type]")).map((field) => [
      field.dataset.rewardType,
      Number(field.value),
    ])
  );
  state.orderMode = document.querySelector("[name='orderSetting']:checked").value;
  state.entries = chars.map(createEntry);
  state.questionQueue = state.entries.flatMap((entry) =>
    selectedTypes.map((type) => ({
      entry,
      type,
      id: `${type}:${entry.char}`,
    }))
  );
  if (state.orderMode === "random") state.questionQueue = shuffle(state.questionQueue);
  state.screen = "practice";
  state.activeIndex = 0;
  state.mode = state.questionQueue[0].type;
  state.selectedAnswer = null;
  state.placed = {};
  state.assemblyChoices = [];
  state.assemblyChoicesKey = "";
  state.assemblyWrongScored = false;
  state.choiceOptions = new Map();
  state.score = 0;
  state.scoredQuestions = new Set();
  state.timedOutQuestions = new Set();
  settingsPage.classList.add("hidden");
  practicePage.classList.remove("hidden");
  practiceStats.classList.remove("hidden");
  state.dailyStats = loadDailyStats();
  renderDailyStats();
  render();
}

function showSettings() {
  stopTimer();
  clearAutoNext();
  state.screen = "settings";
  settingsPage.classList.remove("hidden");
  practicePage.classList.add("hidden");
  practiceStats.classList.add("hidden");
  progressText.textContent = "0 / 0";
  timerText.textContent = `${state.timerDuration}s`;
  updateScoreDisplay();
}

function createEntry(char) {
  const saved = readSavedEntry(char);
  const defaults = HANZI_DATABASE[char] || { pinyin: "", parts: [char], layout: "single" };
  return {
    char,
    pinyin: saved?.pinyin ?? defaults.pinyin,
    parts: saved?.parts ?? defaults.parts,
    layout: saved?.layout ?? defaults.layout,
  };
}

function readSavedEntry(char) {
  try {
    const saved = JSON.parse(localStorage.getItem(`hanzi-practice:${char}`));
    if (saved && Array.isArray(saved.parts)) return saved;
  } catch {
    return null;
  }
  return null;
}

function saveEntry(entry) {
  localStorage.setItem(`hanzi-practice:${entry.char}`, JSON.stringify(entry));
}

function isChineseChar(char) {
  return /[\u3400-\u9fff]/u.test(char);
}

function render() {
  if (state.screen !== "practice") return;
  const currentQuestion = currentQuestionItem();
  state.mode = currentQuestion?.type || state.mode;
  progressText.textContent = `${state.questionQueue.length ? state.activeIndex + 1 : 0} / ${state.questionQueue.length}`;
  updateScoreDisplay();

  if (!state.questionQueue.length) {
    practiceArea.innerHTML = `
      <div class="empty-state">
        <div>
          <h2>输入几个汉字开始练习</h2>
          <p>支持拼音辨字、看字选拼音，也可以把部件拖进田字格拼字。</p>
        </div>
      </div>
    `;
    return;
  }

  if (state.mode === "pinyinToChar") renderChoiceQuiz("pinyinToChar");
  if (state.mode === "charToPinyin") renderChoiceQuiz("charToPinyin");
  if (state.mode === "wordPractice") renderChoiceQuiz("wordPractice");
  if (state.mode === "assemble") renderAssembly();
  startTimer();
}

function renderChoiceQuiz(mode) {
  const entry = currentEntry();
  const options = getChoiceOptions(entry, mode);
  const questionTimedOut = state.timedOutQuestions.has(currentQuestionKey());
  const answered = state.selectedAnswer !== null || questionTimedOut;
  const prompt = getPromptHTML(entry, mode);
  const kicker = getQuestionKicker(mode);
  const promptClass = getPromptClass(mode);

  practiceArea.innerHTML = `
    <article class="quiz-card">
      <div>
        <p class="question-kicker">${kicker}</p>
        <p class="${promptClass}">${prompt}</p>
      </div>
      <div class="answer-options" id="answerOptions"></div>
      <div id="feedback" class="feedback"></div>
      <div class="card-actions">
        <button class="primary-action" type="button" id="nextCard">下一张</button>
        <button class="secondary-action" type="button" id="resetAnswer">重答</button>
      </div>
    </article>
  `;

  const optionsNode = document.querySelector("#answerOptions");
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.disabled = answered;
    if (state.selectedAnswer) {
      if (option.value === getCorrectValue(entry, mode)) button.classList.add("correct");
      if (option.value === state.selectedAnswer && option.value !== getCorrectValue(entry, mode)) {
        button.classList.add("wrong");
      }
    }
    button.addEventListener("click", () => {
      if (state.timedOutQuestions.has(currentQuestionKey())) return;
      state.selectedAnswer = option.value;
      const isCorrect = option.value === getCorrectValue(entry, mode);
      const scoreChange = recordScore(isCorrect);
      stopTimer();
      renderChoiceQuiz(mode);
      const feedback = document.querySelector("#feedback");
      feedback.textContent = isCorrect
        ? `答对了。${formatScoreChange(scoreChange)}`
        : `再看一次，正确答案是 ${getCorrectLabel(entry, mode)}。${formatScoreChange(scoreChange)}`;
      feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
      if (isCorrect) {
        if (scoreChange > 0) launchStarBurst();
        scheduleAutoNext();
      }
    });
    optionsNode.appendChild(button);
  });

  document.querySelector("#nextCard").addEventListener("click", nextCard);
  document.querySelector("#resetAnswer").addEventListener("click", () => {
    state.selectedAnswer = null;
    state.timedOutQuestions.delete(currentQuestionKey());
    render();
  });
}

function buildOptions(entry, mode) {
  const correct = {
    value: getCorrectValue(entry, mode),
    label: getCorrectLabel(entry, mode),
  };
  const pool = state.entries
    .filter((item) => item.char !== entry.char)
    .map((item) => ({
      value: getCorrectValue(item, mode),
      label: getCorrectLabel(item, mode),
    }))
    .filter((item) => item.value);

  if (mode === "wordPractice") {
    const primary = uniqueOptions(pool).filter((item) => item.value !== correct.value);
    const fallback = uniqueOptions(
      Object.keys(CHARACTER_DATA).map((char) => ({ value: char, label: char }))
    ).filter((item) => item.value !== correct.value && !primary.some((primaryItem) => primaryItem.value === item.value));
    const distractors = [...shuffle(primary), ...shuffle(fallback)].slice(0, 3);
    return shuffle([correct, ...distractors]);
  }

  const fallbackPool =
    mode === "pinyinToChar"
      ? Object.keys(HANZI_DATABASE).map((char) => ({ value: char, label: char }))
      : Object.entries(HANZI_DATABASE).map(([char, data]) => ({ value: data.pinyin, label: data.pinyin || char }));

  const unique = uniqueOptions([...pool, ...fallbackPool]).filter((item) => item.value !== correct.value);
  return shuffle([correct, ...shuffle(unique).slice(0, 5)]);
}

function getChoiceOptions(entry, mode) {
  const key = `${mode}:${entry.char}`;
  if (!state.choiceOptions.has(key)) {
    state.choiceOptions.set(key, buildOptions(entry, mode));
  }
  return state.choiceOptions.get(key);
}

function uniqueOptions(options) {
  const seen = new Set();
  return options.filter((option) => {
    if (!option.value || seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

function getCorrectValue(entry, mode) {
  return mode === "pinyinToChar" || mode === "wordPractice" ? entry.char : entry.pinyin;
}

function getCorrectLabel(entry, mode) {
  return mode === "pinyinToChar" || mode === "wordPractice" ? entry.char : entry.pinyin || "待补拼音";
}

function getQuestionKicker(mode) {
  if (mode === "pinyinToChar") return "选择这个拼音对应的汉字";
  if (mode === "charToPinyin") return "选择这个汉字的拼音";
  return "选择词语中缺少的汉字";
}

function getPromptClass(mode) {
  if (mode === "pinyinToChar") return "prompt-display pinyin";
  if (mode === "wordPractice") return "word-prompt";
  return "prompt-display";
}

function getPromptHTML(entry, mode) {
  if (mode === "pinyinToChar") return escapeHTML(entry.pinyin || "?");
  if (mode === "charToPinyin") return escapeHTML(entry.char);
  const question = getWordQuestion(entry);
  return question.word
    .split("")
    .map((char, index) =>
      index === question.targetIndex
        ? `<span class="word-blank">${escapeHTML(entry.pinyin || "?")}</span>`
        : `<span>${escapeHTML(char)}</span>`
    )
    .join("");
}

function getWordQuestion(entry) {
  const words = getWordsForChar(entry.char);
  const word = words[0] || getFallbackWord(entry.char);
  return {
    word,
    targetIndex: Math.max(0, word.indexOf(entry.char)),
  };
}

function getWordsForChar(char) {
  return sortWordCandidates([...(WORD_BANK[char] || []), ...(WORD_INDEX.get(char) || [])], char);
}

function sortWordCandidates(words, char) {
  return [...new Set(words)]
    .filter((word) => word.includes(char) && word.length >= 2 && word.length <= 4)
    .sort((first, second) => {
      const firstPreferred = preferredWordScore(first, char);
      const secondPreferred = preferredWordScore(second, char);
      if (firstPreferred !== secondPreferred) return secondPreferred - firstPreferred;
      return first.length - second.length;
    });
}

function preferredWordScore(word, char) {
  let score = 0;
  if (word.length === 2) score += 4;
  if (word.length === 3) score += 2;
  if (word.indexOf(char) === 0) score += 1;
  if (/[的了着过]/u.test(word)) score -= 3;
  return score;
}

function buildWordIndex(words) {
  const index = new Map();
  uniqueOptions(words.map((word) => ({ value: word }))).forEach(({ value: word }) => {
    Array.from(new Set(Array.from(word).filter(isChineseChar))).forEach((char) => {
      if (!index.has(char)) index.set(char, []);
      index.get(char).push(word);
    });
  });
  return index;
}

function getFallbackWord(char) {
  const templates = ["学习", "认读", "练习", "书写"];
  const template = templates[char.codePointAt(0) % templates.length];
  return `${template}${char}`;
}

function renderAssembly() {
  const entry = currentEntry();
  const zones = getZones(entry);
  ensureAssemblyChoices(entry);
  const placedChoiceIds = new Set(Object.values(state.placed));
  const remainingChoices = state.assemblyChoices.filter((choice) => !placedChoiceIds.has(choice.id));
  const nextIndex = Object.keys(state.placed).length;
  const nextPart = entry.parts[nextIndex] || "";
  const isComplete = entry.parts.every((_, index) => state.placed[index] !== undefined);
  const questionTimedOut = state.timedOutQuestions.has(currentQuestionKey());

  practiceArea.innerHTML = `
    <div class="assemble-shell">
      <div class="tianzige layout-${escapeAttribute(entry.layout)}" id="tianzige" aria-label="田字格"></div>
      <div class="assemble-panel">
        <div class="assembly-prompt">
          <p class="question-kicker">根据拼音，按顺序选择正确部件</p>
          <p class="prompt-display pinyin">${escapeHTML(entry.pinyin || "待补拼音")}</p>
        </div>
        <div>
          <span class="field-label">候选部件</span>
          <div class="part-bank" id="partBank"></div>
        </div>
        <div id="assemblyFeedback" class="feedback"></div>
        <div class="card-actions">
          <button class="secondary-action" type="button" id="resetAssembly">重置</button>
          <button class="secondary-action" type="button" id="nextAssembly">下一字</button>
        </div>
        <p class="hint">提示：如果某个字没有拆分好，可以去“字卡设置”里输入部件，用空格分隔。</p>
      </div>
    </div>
  `;

  const grid = document.querySelector("#tianzige");
  zones.forEach((zone, index) => {
    const node = document.createElement("div");
    node.className = `drop-zone zone-${index} ${state.placed[index] !== undefined ? "filled" : ""}`;
    node.dataset.zone = String(index);
    node.style.left = `${zone.x}%`;
    node.style.top = `${zone.y}%`;
    node.style.width = `${zone.w}%`;
    node.style.height = `${zone.h}%`;
    node.style.setProperty("--part-size", zone.size || "116px");
    node.style.setProperty("--part-x", zone.tx || "0%");
    node.style.setProperty("--part-y", zone.ty || "0%");
    node.textContent = index + 1;
    if (state.placed[index] !== undefined) {
      const choice = state.assemblyChoices.find((item) => item.id === state.placed[index]);
      const placed = document.createElement("div");
      placed.className = "placed-part";
      placed.textContent = choice?.part || "";
      if (choice) node.appendChild(placed);
    }
    grid.appendChild(node);
  });
  if (isComplete) {
    const completed = document.createElement("div");
    completed.className = "completed-character";
    completed.textContent = entry.char;
    grid.appendChild(completed);
  }

  const bank = document.querySelector("#partBank");
  remainingChoices.forEach((choice) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "part-chip";
    chip.textContent = choice.part;
    chip.dataset.choiceId = choice.id;
    chip.disabled = !nextPart || questionTimedOut || isComplete;
    chip.addEventListener("click", () => chooseAssemblyPart(choice));
    bank.appendChild(chip);
  });

  const feedback = document.querySelector("#assemblyFeedback");
  if (questionTimedOut) {
    feedback.textContent = "时间到，进入下一题吧。";
    feedback.className = "feedback bad";
  } else if (nextPart) {
    feedback.textContent = `请选择第 ${nextIndex + 1} 个部件。`;
  } else {
    feedback.textContent = "已经拼好了。";
    feedback.className = "feedback good";
  }

  document.querySelector("#resetAssembly").addEventListener("click", () => {
    state.placed = {};
    state.assemblyChoices = [];
    state.assemblyChoicesKey = "";
    state.assemblyWrongScored = false;
    renderAssembly();
  });
  document.querySelector("#nextAssembly").addEventListener("click", nextCard);
}

function ensureAssemblyChoices(entry) {
  const key = `${entry.char}:${entry.parts.join("|")}`;
  if (state.assemblyChoicesKey === key && state.assemblyChoices.length) return;

  const required = entry.parts.map((part, index) => ({
    id: `correct-${index}`,
    part,
  }));
  const requiredParts = new Set(entry.parts);
  const distractorPool = shuffle(
    Object.values(HANZI_DATABASE)
      .flatMap((item) => item.parts || [])
      .filter((part) => part && !requiredParts.has(part))
  );
  const seenDistractors = new Set();
  const distractors = [];
  for (const part of distractorPool) {
    if (seenDistractors.has(part)) continue;
    seenDistractors.add(part);
    distractors.push({ id: `distractor-${distractors.length}`, part });
    if (required.length + distractors.length >= 5) break;
  }

  state.assemblyChoices = shuffle([...required, ...distractors]).slice(0, Math.max(5, required.length));
  state.assemblyChoicesKey = key;
}

function getZones(entry) {
  const count = entry.parts.length;
  const layouts = {
    single: [{ x: 12, y: 10, w: 76, h: 80, size: "176px" }],
    leftRight: [
      { x: 2, y: 5, w: 48, h: 90, size: "150px", tx: "7%" },
      { x: 50, y: 5, w: 48, h: 90, size: "150px", tx: "-7%" },
    ],
    vertical: Array.from({ length: count }, (_, index) => ({
      x: 16,
      y: 8 + (index * 84) / count,
      w: 68,
      h: 80 / count,
    })),
    topBottom: [
      { x: 10, y: 1, w: 80, h: 50, size: "132px", ty: "8%" },
      { x: 10, y: 48, w: 80, h: 50, size: "132px", ty: "-8%" },
    ],
    leftMiddleRight: [
      { x: 1, y: 7, w: 33, h: 86, size: "118px", tx: "8%" },
      { x: 33.5, y: 7, w: 33, h: 86, size: "118px" },
      { x: 66, y: 7, w: 33, h: 86, size: "118px", tx: "-8%" },
    ],
    topMiddleBottom: [
      { x: 10, y: 0, w: 80, h: 34, size: "96px", ty: "8%" },
      { x: 10, y: 33, w: 80, h: 34, size: "96px" },
      { x: 10, y: 66, w: 80, h: 34, size: "96px", ty: "-8%" },
    ],
    surround: [
      { x: 3, y: 3, w: 94, h: 94, size: "174px" },
      { x: 26, y: 28, w: 48, h: 46, size: "92px" },
    ],
    topBottomDouble: [
      { x: 27, y: 0, w: 46, h: 46, size: "104px", ty: "7%" },
      { x: 4, y: 47, w: 46, h: 50, size: "108px", tx: "7%", ty: "-4%" },
      { x: 50, y: 47, w: 46, h: 50, size: "108px", tx: "-7%", ty: "-4%" },
    ],
    topDoubleBottom: [
      { x: 4, y: 3, w: 46, h: 48, size: "108px", tx: "7%" },
      { x: 50, y: 3, w: 46, h: 48, size: "108px", tx: "-7%" },
      { x: 12, y: 50, w: 76, h: 48, size: "118px", ty: "-6%" },
    ],
    overlap: Array.from({ length: count }, (_, index) => ({
      x: 14 + index * 24,
      y: 14,
      w: 56,
      h: 72,
    })),
  };
  const zones = layouts[entry.layout] || layouts.single;
  return zones.length === count ? zones : layouts.vertical;
}

function chooseAssemblyPart(choice) {
  const entry = currentEntry();
  const feedback = document.querySelector("#assemblyFeedback");
  if (state.timedOutQuestions.has(currentQuestionKey())) return;
  const zoneIndex = Object.keys(state.placed).length;
  const expectedPart = entry.parts[zoneIndex];
  if (!expectedPart) return;

  if (choice.part !== expectedPart) {
    const scoreChange = recordAssemblyMistake();
    feedback.textContent = `这个部件不在这里。${formatScoreChange(scoreChange)}`;
    feedback.className = "feedback bad";
    return;
  }

  state.placed[zoneIndex] = choice.id;
  const isComplete = entry.parts.every((_, index) => state.placed[index] !== undefined);
  renderAssembly();

  const nextFeedback = document.querySelector("#assemblyFeedback");
  if (isComplete) {
    const scoreChange = recordScore(true);
    stopTimer();
    nextFeedback.textContent = `拼对了。${formatScoreChange(scoreChange)}`;
    nextFeedback.className = "feedback good";
    if (scoreChange > 0) launchStarBurst();
    scheduleAutoNext();
  } else {
    nextFeedback.textContent = "选对了，继续。";
    nextFeedback.className = "feedback good";
  }
}

function recordScore(isCorrect) {
  const key = currentQuestionKey();
  if (state.scoredQuestions.has(key)) return 0;
  state.scoredQuestions.add(key);
  const delta = isCorrect ? state.rewardStars[state.mode] || 1 : -1;
  state.score += delta;
  updateScoreDisplay();
  updateDailyStats({ correct: isCorrect, stars: delta });
  return delta;
}

function recordAssemblyMistake() {
  state.score -= 1;
  updateScoreDisplay();
  updateDailyStats({ correct: false, stars: -1 });
  return -1;
}

function todayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function dailyStorageKey() {
  return `hanzi-practice-daily:${todayKey()}`;
}

function loadDailyStats() {
  const fallback = { date: todayKey(), stars: 0, done: 0, correct: 0, wrong: 0 };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(dailyStorageKey())) };
  } catch {
    return fallback;
  }
}

function saveDailyStats() {
  localStorage.setItem(dailyStorageKey(), JSON.stringify(state.dailyStats));
}

function updateDailyStats(result) {
  if (!state.dailyStats || state.dailyStats.date !== todayKey()) state.dailyStats = loadDailyStats();
  state.dailyStats.done += 1;
  state.dailyStats.stars += result.stars;
  if (result.correct) {
    state.dailyStats.correct += 1;
  } else {
    state.dailyStats.wrong += 1;
  }
  saveDailyStats();
  renderDailyStats();
}

function renderDailyStats() {
  const stats = state.dailyStats || loadDailyStats();
  dailyDate.textContent = stats.date;
  dailyStars.textContent = `${stats.stars} ★`;
  dailyDone.textContent = stats.done;
  dailyCorrect.textContent = stats.correct;
  dailyWrong.textContent = stats.wrong;
  dailySummary.textContent = stats.done
    ? `今日正确率 ${Math.round((stats.correct / stats.done) * 100)}%`
    : "今天还没有成绩。";
}

function updateScoreDisplay() {
  scoreText.textContent = `${state.score} ★`;
  const count = Math.max(0, Math.min(12, state.score));
  scoreStars.textContent = "★".repeat(count);
}

function startTimer() {
  stopTimer();
  if (!state.entries.length || state.mode === "library") {
    timerText.textContent = `${state.timerDuration}s`;
    return;
  }
  const key = currentQuestionKey();
  if (state.selectedAnswer || state.timedOutQuestions.has(key)) {
    timerText.textContent = `${state.timeLeft}s`;
    return;
  }
  state.timeLeft = state.timerDuration;
  timerText.textContent = `${state.timeLeft}s`;
  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    timerText.textContent = `${Math.max(0, state.timeLeft)}s`;
    if (state.timeLeft <= 0) handleTimeout();
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function clearAutoNext() {
  if (state.autoNextId) {
    window.clearTimeout(state.autoNextId);
    state.autoNextId = null;
  }
}

function scheduleAutoNext() {
  clearAutoNext();
  state.autoNextId = window.setTimeout(() => {
    state.autoNextId = null;
    nextCard();
  }, 900);
}

function handleTimeout() {
  stopTimer();
  const key = currentQuestionKey();
  if (state.timedOutQuestions.has(key)) return;
  state.timedOutQuestions.add(key);
  const scoreChange = recordScore(false);
  if (state.mode === "pinyinToChar" || state.mode === "charToPinyin" || state.mode === "wordPractice") {
    renderChoiceQuiz(state.mode);
    const feedback = document.querySelector("#feedback");
    feedback.textContent = `时间到。正确答案是 ${getCorrectLabel(currentEntry(), state.mode)}。${formatScoreChange(scoreChange)}`;
    feedback.className = "feedback bad";
  }
  if (state.mode === "assemble") {
    renderAssembly();
    const feedback = document.querySelector("#assemblyFeedback");
    feedback.textContent = `时间到。${formatScoreChange(scoreChange)}`;
    feedback.className = "feedback bad";
  }
}

function launchStarBurst() {
  const host = practiceArea;
  const burst = document.createElement("div");
  burst.className = "star-burst";
  burst.setAttribute("aria-hidden", "true");
  ["★", "★", "★", "★", "★", "★"].forEach((star, index) => {
    const node = document.createElement("span");
    node.textContent = star;
    node.style.setProperty("--x", `${Math.cos((index / 6) * Math.PI * 2) * 86}px`);
    node.style.setProperty("--y", `${Math.sin((index / 6) * Math.PI * 2) * 62}px`);
    burst.appendChild(node);
  });
  host.appendChild(burst);
  window.setTimeout(() => burst.remove(), 900);
}

function currentQuestionKey() {
  return currentQuestionItem()?.id || "";
}

function formatScoreChange(delta) {
  if (delta > 0) return ` +${delta} 颗星`;
  if (delta === -1) return " -1 颗星";
  return " 本题已计分";
}

function renderLibrary() {
  practiceArea.innerHTML = `
    <div class="library-grid" id="libraryGrid"></div>
  `;
  const grid = document.querySelector("#libraryGrid");
  state.entries.forEach((entry, index) => {
    const card = document.createElement("article");
    card.className = "library-card";
    card.innerHTML = `
      <div class="library-top">
        <span class="char-glyph">${escapeHTML(entry.char)}</span>
        <div class="char-meta">
          <strong>${escapeHTML(entry.char)}</strong>
          <span>修改后会保存在本机浏览器</span>
        </div>
      </div>
      <div class="edit-grid">
        <label>
          <span class="field-label">拼音</span>
          <input data-field="pinyin" data-index="${index}" value="${escapeAttribute(entry.pinyin)}" placeholder="例如 ming" />
        </label>
        <label>
          <span class="field-label">部件（空格分隔）</span>
          <input data-field="parts" data-index="${index}" value="${escapeAttribute(entry.parts.join(" "))}" placeholder="例如 日 月" />
        </label>
        <label>
          <span class="field-label">结构</span>
          <input data-field="layout" data-index="${index}" value="${escapeAttribute(entry.layout)}" placeholder="leftRight / topBottom / surround" />
        </label>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll("input").forEach((field) => {
    field.addEventListener("change", () => updateEntryField(field));
  });
}

function renderComplete() {
  stopTimer();
  clearAutoNext();
  progressText.textContent = `${state.questionQueue.length} / ${state.questionQueue.length}`;
  timerText.textContent = "完成";
  practiceArea.innerHTML = `
    <div class="empty-state">
      <div>
        <h2>练习完成</h2>
        <p>本次获得 ${escapeHTML(state.score)} ★</p>
        <div class="card-actions">
          <button class="primary-action" type="button" id="finishBack">返回设置</button>
        </div>
      </div>
    </div>
  `;
  document.querySelector("#finishBack").addEventListener("click", showSettings);
}

function updateEntryField(field) {
  const entry = state.entries[Number(field.dataset.index)];
  if (field.dataset.field === "parts") {
    entry.parts = field.value.split(/\s+/).filter(Boolean);
    if (!entry.parts.length) entry.parts = [entry.char];
  } else {
    entry[field.dataset.field] = field.value.trim();
  }
  saveEntry(entry);
  renderList();
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function escapeAttribute(value) {
  return escapeHTML(value).replace(/`/g, "&#96;");
}

function currentEntry() {
  return currentQuestionItem()?.entry;
}

function currentQuestionItem() {
  return state.questionQueue[state.activeIndex];
}

function nextCard() {
  stopTimer();
  clearAutoNext();
  if (state.activeIndex >= state.questionQueue.length - 1) {
    renderComplete();
    return;
  }
  state.activeIndex += 1;
  state.mode = currentQuestionItem().type;
  state.selectedAnswer = null;
  state.placed = {};
  state.assemblyChoices = [];
  state.assemblyChoicesKey = "";
  state.assemblyWrongScored = false;
  render();
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}
