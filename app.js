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
const PINYIN_SYLLABUS = [...(window.PINYIN_SYLLABUS || [])].sort((first, second) => first.order - second.order);

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
const WORD_RANK = new Map(WORD_DICTIONARY.map((word, index) => [word, index]));
const WORD_INDEX = buildWordIndex(WORD_DICTIONARY);
const QUESTION_TYPE_LABELS = {
  pinyinToChar: "拼音找字",
  charToPinyin: "汉字找拼音",
  assemble: "选择拼字",
  wordPractice: "组词练习",
  pinyinAudioToSymbol: "听音辨拼音",
  pinyinSymbolToAudio: "看拼音选读音",
  pinyinSymbolToChar: "拼音找汉字",
};

const state = {
  screen: "settings",
  trainingDomain: "hanzi",
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
    pinyinAudioToSymbol: 2,
    pinyinSymbolToAudio: 2,
    pinyinSymbolToChar: 2,
  },
  orderMode: "ordered",
  timeLeft: 10,
  timerId: null,
  autoNextId: null,
  timedOutQuestions: new Set(),
  dailyStats: null,
  currentSession: null,
  sessionHistory: [],
  isMistakeReview: false,
  emptyMessage: null,
  savedLists: [],
  audioPlayer: null,
  audioFallbackId: null,
  audioSequenceTimer: null,
  audioSequenceToken: 0,
  userProfile: null,
  sessionStartedAt: null,
  progressionFinalized: false,
  curriculumVolumeId: "g1a",
  curriculumSelectedCharacters: new Set(),
};

const input = document.querySelector("#characterInput");
const listNameInput = document.querySelector("#listNameInput");
const saveListButton = document.querySelector("#saveListButton");
const savedListsNode = document.querySelector("#savedLists");
const curriculumVolumesNode = document.querySelector("#curriculumVolumes");
const curriculumVolumeSummary = document.querySelector("#curriculumVolumeSummary");
const curriculumGroupsNode = document.querySelector("#curriculumGroups");
const curriculumCharactersNode = document.querySelector("#curriculumCharacters");
const curriculumSelectedCount = document.querySelector("#curriculumSelectedCount");
const addCurriculumCharactersButton = document.querySelector("#addCurriculumCharacters");
const settingsPage = document.querySelector("#settingsPage");
const pinyinSettingsPage = document.querySelector("#pinyinSettingsPage");
const settingsOnlyNodes = document.querySelectorAll(".settings-only");
const pinyinSyllabusNode = document.querySelector("#pinyinSyllabus");
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
const categoryReportList = document.querySelector("#categoryReportList");
const sessionHistoryList = document.querySelector("#sessionHistoryList");
const reviewMistakesButton = document.querySelector("#reviewMistakes");
const mistakeCount = document.querySelector("#mistakeCount");
const homePage = document.querySelector("#homePage");
const growthPage = document.querySelector("#growthPage");
const cardsPage = document.querySelector("#cardsPage");
const profileName = document.querySelector("#profileName");
const profileLevel = document.querySelector("#profileLevel");
const profileStars = document.querySelector("#profileStars");
const homeLevelSummary = document.querySelector("#homeLevelSummary");
const dailyTasksList = document.querySelector("#dailyTasksList");
const checkInWeek = document.querySelector("#checkInWeek");
const streakMessage = document.querySelector("#streakMessage");
const achievementPreviewList = document.querySelector("#achievementPreviewList");
const levelDetail = document.querySelector("#levelDetail");
const growthMapAreas = document.querySelector("#growthMapAreas");
const allAchievementsList = document.querySelector("#allAchievementsList");
const cardAlbumStars = document.querySelector("#cardAlbumStars");
const cardDrawCount = document.querySelector("#cardDrawCount");
const cardOwnedCount = document.querySelector("#cardOwnedCount");
const cardAlbumProgress = document.querySelector("#cardAlbumProgress");
const idiomCardGrid = document.querySelector("#idiomCardGrid");
const drawIdiomCardButton = document.querySelector("#drawIdiomCard");
const cardDrawMessage = document.querySelector("#cardDrawMessage");
const cardReveal = document.querySelector("#cardReveal");
const cardRevealStatus = document.querySelector("#cardRevealStatus");
const cardRevealContent = document.querySelector("#cardRevealContent");
const accountButton = document.querySelector("#accountButton");
const accountModal = document.querySelector("#accountModal");
const accountList = document.querySelector("#accountList");
const accountCreateForm = document.querySelector("#accountCreateForm");
const accountNameInput = document.querySelector("#accountNameInput");

document.querySelector("#startPractice").addEventListener("click", startPractice);
document.querySelector("#startPinyinPractice").addEventListener("click", startPinyinPractice);
document.querySelector("#backToSettings").addEventListener("click", showSettings);
saveListButton.addEventListener("click", saveCurrentList);
document.querySelector("#selectCurriculumVolume").addEventListener("click", selectCurrentCurriculumVolume);
document.querySelector("#clearCurriculumSelection").addEventListener("click", clearCurriculumSelection);
addCurriculumCharactersButton.addEventListener("click", addCurriculumCharactersToPractice);
reviewMistakesButton.addEventListener("click", startMistakeReview);
drawIdiomCardButton.addEventListener("click", drawIdiomCard);
document.querySelectorAll("[data-card-close]").forEach((button) => button.addEventListener("click", closeCardReveal));
document.querySelector("#heroStartLearning").addEventListener("click", () => switchAppPage("hanzi"));
accountButton.addEventListener("click", openAccountModal);
accountCreateForm.addEventListener("submit", createAccountFromForm);
document.querySelectorAll("[data-account-close]").forEach((button) => button.addEventListener("click", closeAccountModal));

document.querySelectorAll("[data-app-page]").forEach((button) => {
  button.addEventListener("click", () => switchAppPage(button.dataset.appPage));
});
document.querySelector("#selectSoundLessons").addEventListener("click", () => selectPinyinPhase("先学读音"));
document.querySelector("#selectCombineLessons").addEventListener("click", () => selectPinyinPhase("再学拼读"));
document.querySelector("#selectAllPinyinLessons").addEventListener("click", () => selectPinyinPhase("all"));
document.querySelector("#clearAllPinyinLessons").addEventListener("click", () => selectPinyinPhase("none"));

document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.preset;
  });
});

input.value = "明好林休妈语";
state.userProfile = window.MOYA_PROGRESS.loadProfile();
state.savedLists = loadSavedLists();
state.sessionHistory = loadSessionHistory();
renderPinyinSyllabus();
renderCurriculumPicker();
renderProgressionUI();
switchAppPage("home");
renderAccountList();

window.addEventListener("moya:progress", (event) => {
  state.userProfile = event.detail.profile;
  renderProgressionUI();
  renderAccountList();
  if (!cardsPage.classList.contains("hidden")) renderCardAlbum();
});

window.addEventListener("moya:account-change", (event) => {
  loadActiveAccountState(event.detail.profile);
});

function startPractice() {
  state.trainingDomain = "hanzi";
  state.isMistakeReview = false;
  state.sessionStartedAt = Date.now();
  state.progressionFinalized = false;
  stopTimer();
  clearAutoNext();
  const chars = getSelectedPracticeChars();
  const selectedTypes = Array.from(document.querySelectorAll("[data-type]:checked")).map((field) => field.dataset.type);
  if (!chars.length || !selectedTypes.length) return;
  state.timerDuration = Number(document.querySelector("[name='timerSetting']:checked").value);
  state.rewardStars = {
    ...state.rewardStars,
    ...Object.fromEntries(
      Array.from(document.querySelectorAll("[data-reward-type]")).map((field) => [
        field.dataset.rewardType,
        Number(field.value),
      ])
    ),
  };
  state.orderMode = document.querySelector("[name='orderSetting']:checked").value;
  state.entries = chars.map(createEntry);
  state.questionQueue = state.entries.flatMap((entry) =>
    selectedTypes
      .filter((type) => type !== "wordPractice" || hasWordPracticeQuestion(entry))
      .map((type) => ({
        entry,
        type,
        id: `${type}:${entry.char}`,
      }))
  );
  state.emptyMessage = state.questionQueue.length
    ? null
    : "这些字暂时没有可用于组词练习的真实词语。请换几个字，或导入更大的词典。";
  if (state.orderMode === "random") state.questionQueue = shuffle(state.questionQueue);
  state.screen = "practice";
  state.activeIndex = 0;
  state.mode = state.questionQueue[0]?.type || selectedTypes[0];
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
  pinyinSettingsPage.classList.add("hidden");
  settingsOnlyNodes.forEach((node) => node.classList.add("hidden"));
  practicePage.classList.remove("hidden");
  practiceStats.classList.remove("hidden");
  scrollPracticeIntoView();
  state.dailyStats = loadDailyStats();
  beginTrainingSession("hanzi", selectedTypes);
  renderDailyStats();
  render();
}

function startPinyinPractice() {
  stopTimer();
  stopSpeech();
  clearAutoNext();
  state.isMistakeReview = false;
  state.sessionStartedAt = Date.now();
  state.progressionFinalized = false;
  const selectedLessonIds = new Set(
    Array.from(document.querySelectorAll("[data-pinyin-lesson]:checked")).map((field) => field.dataset.pinyinLesson)
  );
  const selectedTypes = Array.from(document.querySelectorAll("[data-pinyin-type]:checked")).map(
    (field) => field.dataset.pinyinType
  );
  if (!selectedLessonIds.size || !selectedTypes.length) return;

  const lessons = PINYIN_SYLLABUS.filter((lesson) => selectedLessonIds.has(lesson.id));
  state.trainingDomain = "pinyin";
  state.timerDuration = Number(document.querySelector("[name='pinyinTimerSetting']:checked").value);
  state.orderMode = document.querySelector("[name='pinyinOrderSetting']:checked").value;
  state.entries = lessons.flatMap((lesson) =>
    lesson.items.map((item, index) => ({
      ...item,
      id: `${lesson.id}:${index}:${item.pinyin}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonRule: lesson.rule,
      lessonItems: lesson.items.map((lessonItem, lessonIndex) => ({
        ...lessonItem,
        id: `${lesson.id}:${lessonIndex}:${lessonItem.pinyin}`,
      })),
    }))
  );
  state.questionQueue = state.entries.flatMap((entry) =>
    selectedTypes.map((type) => ({
      entry,
      type,
      id: `${type}:${entry.id}`,
    }))
  );
  if (state.orderMode === "random") state.questionQueue = shuffle(state.questionQueue);
  state.emptyMessage = null;
  state.screen = "practice";
  state.activeIndex = 0;
  state.mode = state.questionQueue[0]?.type || selectedTypes[0];
  state.selectedAnswer = null;
  state.choiceOptions = new Map();
  state.score = 0;
  state.scoredQuestions = new Set();
  state.timedOutQuestions = new Set();
  settingsPage.classList.add("hidden");
  pinyinSettingsPage.classList.add("hidden");
  settingsOnlyNodes.forEach((node) => node.classList.add("hidden"));
  practicePage.classList.remove("hidden");
  practiceStats.classList.remove("hidden");
  scrollPracticeIntoView();
  state.dailyStats = loadDailyStats();
  beginTrainingSession("pinyin", selectedTypes);
  renderDailyStats();
  render();
}

function showSettings() {
  stopTimer();
  stopSpeech();
  stopAudioOptionSequence();
  clearAutoNext();
  if (!["hanzi", "pinyin"].includes(state.trainingDomain)) state.trainingDomain = "hanzi";
  state.screen = "settings";
  state.emptyMessage = null;
  homePage.classList.add("hidden");
  growthPage.classList.add("hidden");
  cardsPage.classList.add("hidden");
  settingsOnlyNodes.forEach((node) => node.classList.remove("hidden"));
  settingsPage.classList.toggle("hidden", state.trainingDomain !== "hanzi");
  pinyinSettingsPage.classList.toggle("hidden", state.trainingDomain !== "pinyin");
  practicePage.classList.add("hidden");
  practiceStats.classList.add("hidden");
  progressText.textContent = "0 / 0";
  timerText.textContent = `${state.timerDuration}s`;
  updateScoreDisplay();
  state.dailyStats = loadDailyStats();
  renderDailyStats();
  renderSavedLists();
  updateNavigation(state.trainingDomain);
}

function switchAppPage(page) {
  stopTimer();
  stopSpeech();
  stopAudioOptionSequence();
  clearAutoNext();
  state.screen = ["home", "growth", "cards"].includes(page) ? page : "settings";
  if (page === "hanzi" || page === "pinyin") state.trainingDomain = page;
  homePage.classList.toggle("hidden", page !== "home");
  growthPage.classList.toggle("hidden", page !== "growth");
  cardsPage.classList.toggle("hidden", page !== "cards");
  settingsPage.classList.toggle("hidden", page !== "hanzi");
  pinyinSettingsPage.classList.toggle("hidden", page !== "pinyin");
  practicePage.classList.add("hidden");
  practiceStats.classList.add("hidden");
  updateNavigation(page);
  state.dailyStats = loadDailyStats();
  renderDailyStats();
  renderProgressionUI();
  if (page === "hanzi") renderSavedLists();
  if (page === "cards") renderCardAlbum();
}

function switchTrainingDomain(domain) {
  switchAppPage(domain === "pinyin" ? "pinyin" : "hanzi");
}

function accountScopedKey(name) {
  return window.MOYA_PROGRESS.accountStorageKey(name);
}

function canReadLegacyAccountData() {
  return window.MOYA_PROGRESS.getActiveAccountId() === "local-primary";
}

function loadActiveAccountState(profile = window.MOYA_PROGRESS.loadProfile()) {
  stopTimer();
  stopSpeech();
  stopAudioOptionSequence();
  clearAutoNext();
  state.userProfile = profile;
  state.savedLists = loadSavedLists();
  state.sessionHistory = loadSessionHistory();
  state.dailyStats = loadDailyStats();
  state.currentSession = null;
  state.score = 0;
  state.scoredQuestions = new Set();
  state.timedOutQuestions = new Set();
  input.value = "";
  renderSavedLists();
  renderDailyStats();
  renderProgressionUI();
  renderAccountList();
  if (!cardsPage.classList.contains("hidden")) renderCardAlbum();
}

function openAccountModal() {
  renderAccountList();
  accountModal.classList.remove("hidden");
  accountNameInput.focus();
}

function closeAccountModal() {
  accountModal.classList.add("hidden");
  accountNameInput.value = "";
}

function createAccountFromForm(event) {
  event.preventDefault();
  const profile = window.MOYA_PROGRESS.createAccount(accountNameInput.value);
  loadActiveAccountState(profile);
  accountNameInput.value = "";
  closeAccountModal();
}

function renderAccountList() {
  const accounts = window.MOYA_PROGRESS.loadAccounts();
  const activeId = window.MOYA_PROGRESS.getActiveAccountId();
  accountList.innerHTML = accounts.map((account) => {
    const active = account.id === activeId;
    return `<button type="button" data-account-id="${escapeAttribute(account.id)}" class="${active ? "active" : ""}" ${active ? "aria-current=\"true\"" : ""}>
      <span class="account-avatar" aria-hidden="true"></span>
      <span><strong>${escapeHTML(account.name)}</strong><small>${active ? "正在学习" : "点击切换"}</small></span>
      <b>${active ? "✓" : "切换"}</b>
    </button>`;
  }).join("");
  accountList.querySelectorAll("[data-account-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.accountId === activeId) return;
      const profile = window.MOYA_PROGRESS.setActiveAccount(button.dataset.accountId);
      loadActiveAccountState(profile);
      closeAccountModal();
    });
  });
}

function updateNavigation(page) {
  document.querySelectorAll(".training-domain-tabs [data-app-page]").forEach((button) => {
    button.classList.toggle("active", button.dataset.appPage === page);
  });
}

function renderProgressionUI() {
  const profile = state.userProfile;
  if (!profile) return;
  const progress = window.MOYA_PROGRESS.getLevelProgress(profile);
  profileName.textContent = profile.name;
  profileLevel.textContent = progress.level.english;
  profileStars.textContent = `${profile.totalStars} ★`;
  homeLevelSummary.innerHTML = `
    <div><span>${escapeHTML(progress.level.icon)}</span><strong>${escapeHTML(progress.level.name)}</strong><small>Lv.${window.MOYA_LEVELS.indexOf(progress.level) + 1}</small></div>
    <div class="global-progress-track"><span style="width:${progress.percent}%"></span></div>
    <p>${progress.next ? `距离 ${escapeHTML(progress.next.name)} 还需 ${progress.remaining} 颗星` : "你已经成为中文小大师"}</p>
    <b>${profile.totalStars} ★</b>
  `;
  renderDailyTasks(profile);
  renderCheckIn(profile);
  renderAchievements(profile);
  renderGrowthMap(profile, progress);
}

function renderDailyTasks(profile) {
  const tasks = window.MOYA_PROGRESS.ensureTodayTasks(profile);
  dailyTasksList.innerHTML = window.MOYA_DAILY_TASKS.map((task) => {
    const status = tasks[task.id];
    const complete = status.progress >= task.target;
    const percent = Math.min(100, Math.round((status.progress / task.target) * 100));
    return `<article class="daily-task-row">
      <span class="task-icon" aria-hidden="true">${escapeHTML(task.icon)}</span>
      <div><strong>${escapeHTML(task.name)}</strong><div class="task-progress"><span style="width:${percent}%"></span></div><small>${status.progress}/${task.target}</small></div>
      <b>★ +${task.reward}</b>
      <button type="button" data-claim-task="${escapeAttribute(task.id)}" ${!complete || status.claimed ? "disabled" : ""}>${status.claimed ? "已完成" : complete ? "领取" : "去完成"}</button>
    </article>`;
  }).join("");
  dailyTasksList.querySelectorAll("[data-claim-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = window.MOYA_PROGRESS.claimTask(state.userProfile, button.dataset.claimTask);
      if (result?.amount) showGlobalStarToast(result.amount, result.reason);
    });
  });
}

function renderCheckIn(profile) {
  const days = Array.from({ length: 7 }, (_, index) => new Date(Date.now() - (6 - index) * 86400000));
  const today = window.MOYA_PROGRESS.dateKey();
  checkInWeek.innerHTML = days.map((date) => {
    const key = window.MOYA_PROGRESS.dateKey(date);
    const checked = profile.checkInHistory.includes(key);
    const isToday = key === today;
    return `<div class="checkin-day ${checked ? "checked" : ""} ${isToday ? "today" : ""}">
      <span>${date.toLocaleDateString("zh-CN", { weekday: "short" }).replace("周", "")}</span>
      <b aria-label="${checked ? "已打卡" : "未打卡"}">${checked ? "★" : isToday ? "芽" : "·"}</b>
      <small>${date.getMonth() + 1}.${date.getDate()}</small>
    </div>`;
  }).join("");
  const nextReward = profile.streakDays < 3 ? `连续 3 天可额外获得 10 星` : profile.streakDays < 7 ? `连续 7 天可额外获得 30 星` : "坚持学习，每一天都在发光";
  streakMessage.textContent = `已连续学习 ${profile.streakDays} 天 · ${nextReward}`;
}

function renderAchievements(profile) {
  const cards = window.MOYA_ACHIEVEMENTS.map((achievement) => {
    const unlock = profile.achievements[achievement.id];
    return `<article class="achievement-card ${unlock ? "unlocked" : "locked"}">
      <span aria-hidden="true">${unlock ? escapeHTML(achievement.icon) : "锁"}</span>
      <strong>${escapeHTML(achievement.name)}</strong>
      <small>${escapeHTML(achievement.condition)}</small>
      <em>${unlock ? new Date(unlock.unlockedAt).toLocaleDateString("zh-CN") : achievement.future ? "未来开放" : "继续加油"}</em>
    </article>`;
  });
  achievementPreviewList.innerHTML = cards.slice(0, 4).join("");
  allAchievementsList.innerHTML = cards.join("");
}

function renderGrowthMap(profile, progress) {
  levelDetail.innerHTML = `
    <div class="level-emblem"><span>${escapeHTML(progress.level.icon)}</span></div>
    <div class="level-copy"><p>当前等级</p><h3>${escapeHTML(progress.level.name)} <small>${escapeHTML(progress.level.english)}</small></h3><span>${escapeHTML(progress.level.description)}</span><div class="global-progress-track"><span style="width:${progress.percent}%"></span></div><b>${progress.next ? `再收集 ${progress.remaining} 颗星升级` : "最高等级已达成"}</b></div>
    <strong>${profile.totalStars}<small>颗星</small></strong>
  `;
  growthMapAreas.innerHTML = window.MOYA_GROWTH_AREAS.map((area, index) => {
    const unlocked = profile.unlockedAreas.includes(area.id);
    return `<article class="map-area area-${index + 1} ${unlocked ? "unlocked" : "locked"}">
      <span class="map-area-icon" aria-hidden="true">${unlocked ? escapeHTML(area.icon) : "锁"}</span>
      <div><strong>${escapeHTML(area.name)}</strong><small>${escapeHTML(area.description)}</small></div>
      <b>${unlocked ? "已点亮" : area.future ? "即将开放" : `${area.unlockStars} 星解锁`}</b>
    </article>`;
  }).join("");
}

function renderCardAlbum() {
  const cards = window.MOYA_IDIOM_CARDS || [];
  const rules = window.MOYA_CARD_RULES;
  const collection = state.userProfile.cardCollection || {};
  const drawCount = getTodayCardDrawCount();
  const ownedCards = cards.filter((card) => getOwnedCardCount(collection[card.id]) > 0);

  cardAlbumStars.textContent = `${state.userProfile.totalStars} ★`;
  cardDrawCount.textContent = `${drawCount} / ${rules.dailyLimit}`;
  cardOwnedCount.textContent = `${ownedCards.length} / ${cards.length}`;
  cardAlbumProgress.textContent = `${ownedCards.length} / ${cards.length}`;

  const atLimit = drawCount >= rules.dailyLimit;
  const lacksStars = state.userProfile.totalStars < rules.drawCost;
  drawIdiomCardButton.disabled = atLimit || lacksStars;
  drawIdiomCardButton.textContent = atLimit
    ? "今天已经抽满 5 次"
    : lacksStars
      ? `还需要 ${rules.drawCost - state.userProfile.totalStars} 颗星`
      : `抽一张熊猫卡 · ${rules.drawCost} ★`;

  idiomCardGrid.innerHTML = cards.map((card) => {
    const count = getOwnedCardCount(collection[card.id]);
    const owned = count > 0;
    return `<article class="idiom-card ${owned ? "owned" : "locked"}">
      <div class="idiom-card-number">${card.order}</div>
      ${owned && count > 1 ? `<span class="idiom-card-count">×${count}</span>` : ""}
      <div class="idiom-card-art" ${getCardArtStyle(card)} aria-hidden="true"></div>
      <div class="idiom-card-copy">
        <h4>${owned ? escapeHTML(card.idiom) : "待收集"}</h4>
        <p class="idiom-pinyin">${owned ? escapeHTML(card.pinyin) : "抽卡后揭晓"}</p>
        ${owned ? `<p><b>释义</b>${escapeHTML(card.meaning)}</p><p><b>例句</b>${escapeHTML(card.example)}</p>` : '<p class="locked-card-note">使用星星抽取这张成语卡。</p>'}
      </div>
      ${owned ? `<button type="button" data-card-view="${escapeAttribute(card.id)}">查看卡片</button>` : ""}
    </article>`;
  }).join("");

  idiomCardGrid.querySelectorAll("[data-card-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = cards.find((item) => item.id === button.dataset.cardView);
      const count = getOwnedCardCount(collection[button.dataset.cardView]);
      if (card) showCardReveal(card, `已收藏 ${count} 张`);
    });
  });
}

function drawIdiomCard() {
  const cards = window.MOYA_IDIOM_CARDS || [];
  const rules = window.MOYA_CARD_RULES;
  const drawCount = getTodayCardDrawCount();
  if (drawCount >= rules.dailyLimit) {
    cardDrawMessage.textContent = "今天已经抽过 5 次，明天再来吧。";
    return;
  }
  if (state.userProfile.totalStars < rules.drawCost) {
    cardDrawMessage.textContent = `还需要 ${rules.drawCost - state.userProfile.totalStars} 颗星星。`;
    return;
  }

  const card = cards[Math.floor(Math.random() * cards.length)];
  const previousCount = getOwnedCardCount(state.userProfile.cardCollection[card.id]);
  const spent = window.MOYA_PROGRESS.spendStars(state.userProfile, rules.drawCost, "抽取水果成语卡");
  if (!spent.success) return;

  const now = new Date().toISOString();
  state.userProfile.cardCollection[card.id] = {
    count: previousCount + 1,
    firstDrawnAt: state.userProfile.cardCollection[card.id]?.firstDrawnAt || now,
    lastDrawnAt: now,
  };
  const today = window.MOYA_PROGRESS.dateKey();
  state.userProfile.dailyCardDraws[today] = drawCount + 1;
  state.userProfile.cardDrawHistory.unshift({ cardId: card.id, drawnAt: now, duplicate: previousCount > 0 });
  state.userProfile.cardDrawHistory = state.userProfile.cardDrawHistory.slice(0, 200);
  window.MOYA_PROGRESS.saveProfile(state.userProfile);

  cardDrawMessage.textContent = previousCount > 0
    ? `抽到了重复卡：${card.idiom}，现在共有 ${previousCount + 1} 张。`
    : `新卡加入卡册：${card.idiom}！`;
  renderCardAlbum();
  showCardReveal(card, previousCount > 0 ? `重复卡 · 第 ${previousCount + 1} 张` : "抽到了新卡！");
}

function getTodayCardDrawCount() {
  const today = window.MOYA_PROGRESS.dateKey();
  return Math.max(0, Number(state.userProfile.dailyCardDraws?.[today]) || 0);
}

function getOwnedCardCount(record) {
  if (typeof record === "number") return Math.max(0, record);
  return Math.max(0, Number(record?.count) || 0);
}

function getCardArtStyle(card) {
  const positions = ["0%", "33.333%", "66.667%", "100%"];
  return `style="--card-sheet:url('assets/cards/card-sheet-${card.sheet}.jpg');--card-x:${positions[card.panel] || "0%"}"`;
}

function showCardReveal(card, status) {
  cardRevealStatus.textContent = status;
  cardRevealContent.innerHTML = `
    <div class="revealed-card-art" ${getCardArtStyle(card)} aria-hidden="true"></div>
    <span class="revealed-card-number">第 ${card.order} 张</span>
    <h3 id="revealedCardTitle">${escapeHTML(card.idiom)}</h3>
    <p class="idiom-pinyin">${escapeHTML(card.pinyin)}</p>
    <p><b>释义</b>${escapeHTML(card.meaning)}</p>
    <p><b>例句</b>${escapeHTML(card.example)}</p>
  `;
  cardReveal.classList.remove("hidden");
  cardReveal.querySelector("[data-card-close]")?.focus();
}

function closeCardReveal() {
  cardReveal.classList.add("hidden");
}

function showGlobalStarToast(amount, reason) {
  const toast = document.createElement("div");
  toast.className = "global-star-toast";
  toast.innerHTML = `<strong>★ +${amount}</strong><span>${escapeHTML(reason)}</span>`;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 1800);
}

function renderPinyinSyllabus() {
  pinyinSyllabusNode.innerHTML = "";
  PINYIN_SYLLABUS.forEach((lesson, index) => {
    const card = document.createElement("label");
    card.className = "syllabus-card";
    card.innerHTML = `
      <input type="checkbox" data-pinyin-lesson="${escapeAttribute(lesson.id)}" ${index === 0 ? "checked" : ""} />
      <span class="syllabus-order">${escapeHTML(lesson.order)}</span>
      <span class="syllabus-copy">
        <small>${escapeHTML(lesson.phase)}</small>
        <strong>${escapeHTML(lesson.title)}</strong>
        <span>${escapeHTML(lesson.rule)}</span>
        <em>${escapeHTML(lesson.items.map((item) => item.pinyin).join(" · "))}</em>
      </span>
    `;
    pinyinSyllabusNode.appendChild(card);
  });
}

function selectPinyinPhase(phase) {
  document.querySelectorAll("[data-pinyin-lesson]").forEach((field) => {
    const lesson = PINYIN_SYLLABUS.find((item) => item.id === field.dataset.pinyinLesson);
    field.checked = phase === "all" || lesson?.phase === phase;
  });
}

function getSelectedPracticeChars() {
  const typedChars = Array.from(input.value).filter(isChineseChar);
  const listChars = Array.from(document.querySelectorAll("[data-list-select]:checked"))
    .flatMap((field) => state.savedLists.find((list) => list.id === field.dataset.listSelect)?.chars || []);
  return Array.from(new Set([...typedChars, ...listChars]));
}

function getCurriculumVolumes() {
  return window.MOYA_HANZI_CURRICULUM?.volumes || [];
}

function getCurrentCurriculumVolume() {
  const volumes = getCurriculumVolumes();
  return volumes.find((volume) => volume.id === state.curriculumVolumeId) || volumes[0];
}

function getVolumeCharacters(volume) {
  return Array.from(new Set(volume?.groups.flatMap((group) => Array.from(group.characters)) || []));
}

function renderCurriculumPicker() {
  const volumes = getCurriculumVolumes();
  const volume = getCurrentCurriculumVolume();
  if (!volume || !curriculumVolumesNode) return;

  state.curriculumVolumeId = volume.id;
  curriculumVolumesNode.innerHTML = volumes.map((item) => `
    <button type="button" data-curriculum-volume="${escapeAttribute(item.id)}" class="${item.id === volume.id ? "active" : ""}" aria-pressed="${item.id === volume.id}">
      <span>${escapeHTML(item.label)}</span><small>${item.characterCount} 字</small>
    </button>
  `).join("");
  curriculumVolumesNode.querySelectorAll("[data-curriculum-volume]").forEach((button) => {
    button.addEventListener("click", () => {
      state.curriculumVolumeId = button.dataset.curriculumVolume;
      renderCurriculumPicker();
    });
  });

  const volumeCharacters = getVolumeCharacters(volume);
  const selectedInVolume = volumeCharacters.filter((char) => state.curriculumSelectedCharacters.has(char)).length;
  curriculumVolumeSummary.textContent = `${volume.label} · 已选 ${selectedInVolume}/${volumeCharacters.length} 字`;
  curriculumGroupsNode.innerHTML = volume.groups.map((group) => {
    const chars = Array.from(group.characters);
    const selectedCount = chars.filter((char) => state.curriculumSelectedCharacters.has(char)).length;
    const isComplete = selectedCount === chars.length;
    return `
      <button type="button" data-curriculum-group="${escapeAttribute(group.id)}" class="${isComplete ? "selected" : ""}" aria-pressed="${isComplete}">
        <span>${escapeHTML(group.title)}</span><small>${selectedCount}/${chars.length}</small>
      </button>
    `;
  }).join("");
  curriculumGroupsNode.querySelectorAll("[data-curriculum-group]").forEach((button) => {
    button.addEventListener("click", () => toggleCurriculumGroup(button.dataset.curriculumGroup));
  });

  curriculumCharactersNode.innerHTML = volumeCharacters.map((char) => {
    const selected = state.curriculumSelectedCharacters.has(char);
    return `<button type="button" data-curriculum-character="${char}" class="${selected ? "selected" : ""}" aria-pressed="${selected}" aria-label="${char}${selected ? "，已选择" : ""}">${char}</button>`;
  }).join("");
  curriculumCharactersNode.querySelectorAll("[data-curriculum-character]").forEach((button) => {
    button.addEventListener("click", () => {
      const char = button.dataset.curriculumCharacter;
      if (state.curriculumSelectedCharacters.has(char)) state.curriculumSelectedCharacters.delete(char);
      else state.curriculumSelectedCharacters.add(char);
      renderCurriculumPicker();
    });
  });

  curriculumSelectedCount.textContent = String(state.curriculumSelectedCharacters.size);
  addCurriculumCharactersButton.disabled = state.curriculumSelectedCharacters.size === 0;
}

function toggleCurriculumGroup(groupId) {
  const group = getCurrentCurriculumVolume()?.groups.find((item) => item.id === groupId);
  if (!group) return;
  const chars = Array.from(group.characters);
  const remove = chars.every((char) => state.curriculumSelectedCharacters.has(char));
  chars.forEach((char) => remove
    ? state.curriculumSelectedCharacters.delete(char)
    : state.curriculumSelectedCharacters.add(char));
  renderCurriculumPicker();
}

function selectCurrentCurriculumVolume() {
  getVolumeCharacters(getCurrentCurriculumVolume()).forEach((char) => state.curriculumSelectedCharacters.add(char));
  renderCurriculumPicker();
}

function clearCurriculumSelection() {
  state.curriculumSelectedCharacters.clear();
  renderCurriculumPicker();
}

function addCurriculumCharactersToPractice() {
  const current = Array.from(input.value).filter(isChineseChar);
  input.value = Array.from(new Set([...current, ...state.curriculumSelectedCharacters])).join("");
  input.focus();
}

function getCheckedListChars() {
  return Array.from(document.querySelectorAll("[data-list-select]:checked"))
    .flatMap((field) => state.savedLists.find((list) => list.id === field.dataset.listSelect)?.chars || []);
}

function syncInputWithCheckedLists() {
  const checkedChars = getCheckedListChars();
  if (checkedChars.length) {
    input.value = Array.from(new Set(checkedChars)).join("");
    return;
  }
  input.value = "";
}

function loadSavedLists() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(accountScopedKey("hanzi-practice:saved-lists")) ||
        (canReadLegacyAccountData() ? localStorage.getItem("hanzi-practice:saved-lists") : null)
    );
    return Array.isArray(saved)
      ? saved.filter((list) => list?.id && list?.name && Array.isArray(list.chars))
      : [];
  } catch {
    return [];
  }
}

function persistSavedLists() {
  localStorage.setItem(accountScopedKey("hanzi-practice:saved-lists"), JSON.stringify(state.savedLists));
}

function saveCurrentList() {
  const chars = Array.from(new Set(Array.from(input.value).filter(isChineseChar)));
  if (!chars.length) return;
  const name = listNameInput.value.trim() || `练习单 ${state.savedLists.length + 1}`;
  const existing = state.savedLists.find((list) => list.name === name);
  if (existing) {
    existing.chars = chars;
    existing.updatedAt = Date.now();
  } else {
    state.savedLists.unshift({
      id: `list-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name,
      chars,
      updatedAt: Date.now(),
    });
  }
  listNameInput.value = "";
  persistSavedLists();
  renderSavedLists();
}

function renderSavedLists() {
  const selectedIds = new Set(
    Array.from(document.querySelectorAll("[data-list-select]:checked")).map((field) => field.dataset.listSelect)
  );
  if (!state.savedLists.length) {
    savedListsNode.innerHTML = `<p class="saved-list-empty">还没有保存的练习单。</p>`;
    return;
  }

  savedListsNode.innerHTML = "";
  state.savedLists.forEach((list) => {
    const card = document.createElement("article");
    card.className = "saved-list-card";
    card.innerHTML = `
      <label class="saved-list-select">
        <input type="checkbox" data-list-select="${escapeAttribute(list.id)}" ${selectedIds.has(list.id) ? "checked" : ""} />
        <span>
          <strong>${escapeHTML(list.name)}</strong>
          <small>${escapeHTML(list.chars.join(""))}</small>
        </span>
      </label>
      <div class="saved-list-actions">
        <button type="button" data-list-load="${escapeAttribute(list.id)}">载入</button>
        <button type="button" data-list-edit="${escapeAttribute(list.id)}">编辑</button>
        <button type="button" data-list-delete="${escapeAttribute(list.id)}">删除</button>
      </div>
      <div class="saved-list-editor hidden" data-list-editor="${escapeAttribute(list.id)}">
        <input data-list-name-edit="${escapeAttribute(list.id)}" type="text" maxlength="18" value="${escapeAttribute(list.name)}" />
        <textarea data-list-chars-edit="${escapeAttribute(list.id)}" rows="2">${escapeHTML(list.chars.join(""))}</textarea>
        <div class="saved-list-actions">
          <button type="button" data-list-save-edit="${escapeAttribute(list.id)}">保存修改</button>
          <button type="button" data-list-cancel-edit="${escapeAttribute(list.id)}">取消</button>
        </div>
      </div>
    `;
    savedListsNode.appendChild(card);
  });

  savedListsNode.querySelectorAll("[data-list-load]").forEach((button) => {
    button.addEventListener("click", () => {
      const list = state.savedLists.find((item) => item.id === button.dataset.listLoad);
      if (list) input.value = list.chars.join("");
    });
  });
  savedListsNode.querySelectorAll("[data-list-select]").forEach((field) => {
    field.addEventListener("change", syncInputWithCheckedLists);
  });
  savedListsNode.querySelectorAll("[data-list-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const editor = savedListsNode.querySelector(`[data-list-editor="${cssEscape(button.dataset.listEdit)}"]`);
      editor?.classList.toggle("hidden");
    });
  });
  savedListsNode.querySelectorAll("[data-list-cancel-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      const editor = savedListsNode.querySelector(`[data-list-editor="${cssEscape(button.dataset.listCancelEdit)}"]`);
      editor?.classList.add("hidden");
    });
  });
  savedListsNode.querySelectorAll("[data-list-save-edit]").forEach((button) => {
    button.addEventListener("click", () => saveEditedList(button.dataset.listSaveEdit));
  });
  savedListsNode.querySelectorAll("[data-list-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.savedLists = state.savedLists.filter((item) => item.id !== button.dataset.listDelete);
      persistSavedLists();
      renderSavedLists();
      syncInputWithCheckedLists();
    });
  });
}

function saveEditedList(id) {
  const list = state.savedLists.find((item) => item.id === id);
  if (!list) return;
  const nameField = savedListsNode.querySelector(`[data-list-name-edit="${cssEscape(id)}"]`);
  const charsField = savedListsNode.querySelector(`[data-list-chars-edit="${cssEscape(id)}"]`);
  const chars = Array.from(new Set(Array.from(charsField?.value || "").filter(isChineseChar)));
  if (!chars.length) return;

  list.name = nameField?.value.trim() || list.name;
  list.chars = chars;
  list.updatedAt = Date.now();
  persistSavedLists();
  renderSavedLists();
  syncInputWithCheckedLists();
}

function cssEscape(value) {
  return window.CSS?.escape ? window.CSS.escape(value) : String(value).replace(/["\\]/g, "\\$&");
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
          <h2>${escapeHTML(state.emptyMessage || "输入几个汉字开始练习")}</h2>
          <p>组词练习只使用词典里的真实词语，不再自动生成假词。</p>
        </div>
      </div>
    `;
    return;
  }

  if (state.mode === "pinyinToChar") renderChoiceQuiz("pinyinToChar");
  if (state.mode === "charToPinyin") renderChoiceQuiz("charToPinyin");
  if (state.mode === "wordPractice") renderChoiceQuiz("wordPractice");
  if (state.mode === "assemble") renderAssembly();
  if (isPinyinTrainingMode(state.mode)) renderPinyinQuiz(state.mode);
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
    <article class="quiz-card mode-${escapeAttribute(mode)} ${answered ? "answered" : ""}">
      ${getQuizJourneyHTML()}
      <section class="question-stage">
        <p class="question-kicker">${kicker}</p>
        <p class="${promptClass}">${prompt}</p>
      </section>
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

function isPinyinTrainingMode(mode) {
  return ["pinyinAudioToSymbol", "pinyinSymbolToAudio", "pinyinSymbolToChar"].includes(mode);
}

function renderPinyinQuiz(mode) {
  stopAudioOptionSequence();
  stopSpeech();
  const entry = currentEntry();
  const options = getPinyinChoiceOptions(entry, mode);
  const questionTimedOut = state.timedOutQuestions.has(currentQuestionKey());
  const answered = state.selectedAnswer !== null || questionTimedOut;
  const kicker = {
    pinyinAudioToSymbol: "听读音，选择正确的拼音",
    pinyinSymbolToAudio: "听一听三个读音，选择与拼音相同的一项",
    pinyinSymbolToChar: "选择与这个拼音匹配的汉字",
  }[mode];
  const prompt = mode === "pinyinAudioToSymbol"
    ? `<button class="sound-prompt-button" type="button" id="replayPinyinSound">播放读音</button>`
    : `<p class="prompt-display pinyin pinyin-training-prompt">${escapeHTML(entry.pinyin)}</p>`;

  practiceArea.innerHTML = `
    <article class="quiz-card pinyin-quiz-card mode-${escapeAttribute(mode)} ${answered ? "answered" : ""}">
      ${getQuizJourneyHTML()}
      <div class="pinyin-lesson-label">
        <span>${escapeHTML(entry.lessonTitle)}</span>
        <small>${escapeHTML(entry.lessonRule)}</small>
      </div>
      <section class="question-stage pinyin-question-stage">
        <p class="question-kicker">${kicker}</p>
        ${prompt}
      </section>
      <div class="${mode === "pinyinSymbolToAudio" ? "audio-answer-options" : "answer-options"}" id="pinyinAnswerOptions"></div>
      <div id="feedback" class="feedback"></div>
      <div class="card-actions">
        <button class="primary-action" type="button" id="nextPinyinCard">下一题</button>
        ${mode === "pinyinSymbolToAudio" ? "" : '<button class="secondary-action" type="button" id="replayCurrentPinyin">再听一次</button>'}
      </div>
    </article>
  `;

  const optionsNode = document.querySelector("#pinyinAnswerOptions");
  options.forEach((option, index) => {
    if (mode === "pinyinSymbolToAudio") {
      const choice = document.createElement("div");
      choice.className = "audio-choice";
      if (state.selectedAnswer) {
        if (option.value === getPinyinCorrectValue(entry, mode)) choice.classList.add("correct");
        if (option.value === state.selectedAnswer && option.value !== getPinyinCorrectValue(entry, mode)) {
          choice.classList.add("wrong");
        }
      }
      choice.innerHTML = `
        <strong>读音 ${index + 1}</strong>
        <button class="audio-replay-button" type="button" aria-label="重听读音 ${index + 1}" data-pinyin-play="${escapeAttribute(option.item.id)}"><span aria-hidden="true">↻</span><span>重听</span></button>
        <button class="audio-select-button" type="button" aria-label="选择读音 ${index + 1}" data-pinyin-select="${escapeAttribute(option.value)}" ${answered ? "disabled" : ""}><span aria-hidden="true">✓</span><span>选择</span></button>
      `;
      choice.dataset.audioOption = option.item.id;
      optionsNode.appendChild(choice);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option.label;
    button.disabled = answered;
    if (state.selectedAnswer) {
      if (option.value === getPinyinCorrectValue(entry, mode)) button.classList.add("correct");
      if (option.value === state.selectedAnswer && option.value !== getPinyinCorrectValue(entry, mode)) {
        button.classList.add("wrong");
      }
    }
    button.addEventListener("click", () => submitPinyinAnswer(option.value, entry, mode));
    optionsNode.appendChild(button);
  });

  optionsNode.querySelectorAll("[data-pinyin-play]").forEach((button) => {
    button.addEventListener("click", () => {
      const option = options.find((item) => item.item.id === button.dataset.pinyinPlay);
      if (option) {
        stopAudioOptionSequence();
        playHighlightedPinyinOption(option);
      }
    });
  });
  optionsNode.querySelectorAll("[data-pinyin-select]").forEach((button) => {
    button.addEventListener("click", () => submitPinyinAnswer(button.dataset.pinyinSelect, entry, mode));
  });

  document.querySelector("#replayPinyinSound")?.addEventListener("click", () => speakPinyinItem(entry));
  document.querySelector("#replayCurrentPinyin")?.addEventListener("click", () => speakPinyinItem(entry));
  document.querySelector("#nextPinyinCard").addEventListener("click", nextCard);

  if (mode === "pinyinAudioToSymbol" && !answered) {
    window.setTimeout(() => speakPinyinItem(entry), 80);
  }
  if (mode === "pinyinSymbolToAudio" && !answered) {
    startAudioOptionSequence(options);
  }
}

function startAudioOptionSequence(options) {
  stopAudioOptionSequence();
  const token = state.audioSequenceToken;
  const playNext = (index) => {
    if (token !== state.audioSequenceToken || index >= options.length) {
      setActiveAudioChoice(null);
      return;
    }
    playHighlightedPinyinOption(options[index], () => {
      if (token !== state.audioSequenceToken) return;
      state.audioSequenceTimer = window.setTimeout(() => playNext(index + 1), 450);
    });
  };
  state.audioSequenceTimer = window.setTimeout(() => playNext(0), 450);
}

function stopAudioOptionSequence() {
  state.audioSequenceToken += 1;
  if (state.audioSequenceTimer) {
    window.clearTimeout(state.audioSequenceTimer);
    state.audioSequenceTimer = null;
  }
  setActiveAudioChoice(null);
}

function playHighlightedPinyinOption(option, onEnded) {
  setActiveAudioChoice(option.item.id);
  speakPinyinItem(option.item, {
    onStart: () => setActiveAudioChoice(option.item.id),
    onEnd: () => {
      setActiveAudioChoice(null);
      onEnded?.();
    },
  });
}

function setActiveAudioChoice(itemId) {
  document.querySelectorAll("[data-audio-option]").forEach((choice) => {
    choice.classList.toggle("is-playing", Boolean(itemId) && choice.dataset.audioOption === itemId);
  });
}

function getPinyinChoiceOptions(entry, mode) {
  const key = `${mode}:${entry.id}`;
  if (state.choiceOptions.has(key)) return state.choiceOptions.get(key);
  const correct = makePinyinOption(entry, mode);
  const syllabusItems = PINYIN_SYLLABUS.flatMap((lesson) =>
    lesson.items.map((item, index) => ({
      ...item,
      id: `${lesson.id}:${index}:${item.pinyin}`,
    }))
  );
  const primaryPool = uniquePinyinOptions(
    entry.lessonItems.filter((item) => item.id !== entry.id).map((item) => makePinyinOption(item, mode))
  ).filter((option) => option.value !== correct.value);
  const primaryValues = new Set(primaryPool.map((option) => option.value));
  const fallbackPool = uniquePinyinOptions(
    [...state.entries, ...syllabusItems]
      .filter((item) => item.id !== entry.id)
      .map((item) => makePinyinOption(item, mode))
  ).filter((option) => option.value !== correct.value && !primaryValues.has(option.value));
  const optionCount = ["pinyinAudioToSymbol", "pinyinSymbolToAudio"].includes(mode) ? 3 : 4;
  const distractors = [...shuffle(primaryPool), ...shuffle(fallbackPool)].slice(0, optionCount - 1);
  const options = shuffle([correct, ...distractors]);
  state.choiceOptions.set(key, options);
  return options;
}

function makePinyinOption(item, mode) {
  if (mode === "pinyinSymbolToChar") return { value: item.char, label: item.char, item };
  if (mode === "pinyinSymbolToAudio") return { value: item.id, label: item.audio, item };
  return { value: item.pinyin, label: item.pinyin, item };
}

function uniquePinyinOptions(options) {
  const seen = new Set();
  return options.filter((option) => {
    if (!option.value || seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

function getPinyinCorrectValue(entry, mode) {
  if (mode === "pinyinSymbolToChar") return entry.char;
  if (mode === "pinyinSymbolToAudio") return entry.id;
  return entry.pinyin;
}

function getPinyinCorrectLabel(entry, mode) {
  if (mode === "pinyinSymbolToChar") return entry.char;
  if (mode === "pinyinSymbolToAudio") return entry.audio;
  return entry.pinyin;
}

function submitPinyinAnswer(value, entry, mode) {
  if (state.timedOutQuestions.has(currentQuestionKey()) || state.selectedAnswer !== null) return;
  state.selectedAnswer = value;
  const isCorrect = value === getPinyinCorrectValue(entry, mode);
  const scoreChange = recordScore(isCorrect);
  stopTimer();
  stopAudioOptionSequence();
  stopSpeech();
  renderPinyinQuiz(mode);
  const feedback = document.querySelector("#feedback");
  feedback.textContent = isCorrect
    ? `答对了。${formatScoreChange(scoreChange)}`
    : `正确答案是 ${getPinyinCorrectLabel(entry, mode)}。${formatScoreChange(scoreChange)}`;
  feedback.className = `feedback ${isCorrect ? "good" : "bad"}`;
  if (isCorrect) {
    if (scoreChange > 0) launchStarBurst();
    scheduleAutoNext();
  }
}

function speakPinyinItem(item, events = {}) {
  const recording = window.PINYIN_AUDIO_FILES?.[item.recordingKey || item.audio];
  if (recording?.systemVoice) return speakPinyinWithSystemVoice(item, events);
  if (recording?.src && "Audio" in window) {
    stopSpeech();
    const player = new window.Audio(recording.src);
    player.preload = "auto";
    player.playbackRate = recording.rate || 0.92;
    let settled = false;
    const fallback = () => {
      if (settled) return;
      settled = true;
      state.audioFallbackId = null;
      player.pause();
      if (state.audioPlayer === player) state.audioPlayer = null;
      speakPinyinWithSystemVoice(item, events);
    };
    const fallbackId = window.setTimeout(fallback, 3000);
    state.audioFallbackId = fallbackId;
    player.addEventListener("playing", () => {
      settled = true;
      window.clearTimeout(fallbackId);
      state.audioFallbackId = null;
      events.onStart?.();
    }, { once: true });
    player.addEventListener("ended", () => {
      if (state.audioPlayer === player) state.audioPlayer = null;
      events.onEnd?.();
    }, { once: true });
    player.addEventListener("error", fallback, { once: true });
    state.audioPlayer = player;
    player.play().catch(fallback);
    return true;
  }
  return speakPinyinWithSystemVoice(item, events);
}

function speakPinyinWithSystemVoice(item, events = {}) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    events.onEnd?.();
    return false;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  const utterance = new window.SpeechSynthesisUtterance(item.audio || item.char || item.pinyin);
  utterance.lang = "zh-CN";
  utterance.rate = 0.72;
  utterance.pitch = 1;
  let completed = false;
  const complete = () => {
    if (completed) return;
    completed = true;
    events.onEnd?.();
  };
  utterance.onstart = () => events.onStart?.();
  utterance.onend = complete;
  utterance.onerror = complete;
  const voice = window.speechSynthesis.getVoices().find((itemVoice) => /^zh-(CN|Hans)/i.test(itemVoice.lang));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
  return true;
}

function stopSpeech() {
  if (state.audioFallbackId) {
    window.clearTimeout(state.audioFallbackId);
    state.audioFallbackId = null;
  }
  if (state.audioPlayer) {
    state.audioPlayer.pause();
    state.audioPlayer.currentTime = 0;
    state.audioPlayer = null;
  }
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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
  if (!question) return "";
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
  const word = words[0];
  if (!word) return null;
  return {
    word,
    targetIndex: Math.max(0, word.indexOf(entry.char)),
  };
}

function hasWordPracticeQuestion(entry) {
  return getWordsForChar(entry.char).length > 0;
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
      const firstRank = WORD_RANK.get(first) ?? Number.MAX_SAFE_INTEGER;
      const secondRank = WORD_RANK.get(second) ?? Number.MAX_SAFE_INTEGER;
      if (firstRank !== secondRank) return firstRank - secondRank;
      return first.length - second.length;
    });
}

function preferredWordScore(word, char) {
  let score = 0;
  if (WORD_BANK[char]?.includes(word)) score += 100;
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
    <div class="assemble-shell ${isComplete || questionTimedOut ? "answered" : ""}">
      <div class="assembly-journey">${getQuizJourneyHTML()}</div>
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
  updateDailyStats({ correct: isCorrect, stars: delta, type: state.mode });
  window.MOYA_PROGRESS.recordAnswer(state.userProfile, {
    correct: isCorrect,
    domain: isPinyinTrainingMode(state.mode) ? "pinyin" : "hanzi",
    type: state.mode,
    review: state.isMistakeReview,
  });
  return delta;
}

function recordAssemblyMistake() {
  state.score -= 1;
  updateScoreDisplay();
  updateDailyStats({ correct: false, stars: -1, type: state.mode });
  return -1;
}

function todayKey() {
  return new Date().toLocaleDateString("en-CA");
}

function dailyStorageKey() {
  return accountScopedKey(`hanzi-practice-daily:${todayKey()}`);
}

function loadDailyStats() {
  const fallback = { date: todayKey(), stars: 0, done: 0, correct: 0, wrong: 0, byType: {}, wrongItems: [] };
  try {
    const legacyKey = `hanzi-practice-daily:${todayKey()}`;
    return {
      ...fallback,
      ...JSON.parse(localStorage.getItem(dailyStorageKey()) || (canReadLegacyAccountData() ? localStorage.getItem(legacyKey) : null)),
    };
  } catch {
    return fallback;
  }
}

function saveDailyStats() {
  localStorage.setItem(dailyStorageKey(), JSON.stringify(state.dailyStats));
}

function updateDailyStats(result) {
  if (!state.dailyStats || state.dailyStats.date !== todayKey()) state.dailyStats = loadDailyStats();
  if (!state.dailyStats.byType) state.dailyStats.byType = {};
  if (!Array.isArray(state.dailyStats.wrongItems)) state.dailyStats.wrongItems = [];
  state.dailyStats.done += 1;
  state.dailyStats.stars += result.stars;
  if (result.correct) {
    state.dailyStats.correct += 1;
  } else {
    state.dailyStats.wrong += 1;
  }
  updateTypeStats(state.dailyStats.byType, result.type, result);
  if (result.correct && state.isMistakeReview) {
    resolveCurrentDailyMistake();
  } else if (!result.correct) {
    saveCurrentDailyMistake();
  }
  updateCurrentSession(result);
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
  renderCategoryReport(aggregateSessionTypeStats());
  renderSessionHistory();
  renderMistakeReviewButton(stats.wrongItems || []);
}

function saveCurrentDailyMistake() {
  const question = currentQuestionItem();
  if (!question?.entry) return;
  const mistakeId = question.mistakeId || question.id;
  const existing = state.dailyStats.wrongItems.find((item) => item.id === mistakeId);
  if (existing) {
    existing.wrongCount += 1;
    existing.lastWrongAt = new Date().toISOString();
    return;
  }
  state.dailyStats.wrongItems.push({
    id: mistakeId,
    type: question.type,
    entry: JSON.parse(JSON.stringify(question.entry)),
    wrongCount: 1,
    lastWrongAt: new Date().toISOString(),
  });
}

function resolveCurrentDailyMistake() {
  const question = currentQuestionItem();
  const mistakeId = question?.mistakeId || question?.id;
  state.dailyStats.wrongItems = state.dailyStats.wrongItems.filter((item) => item.id !== mistakeId);
}

function renderMistakeReviewButton(items) {
  mistakeCount.textContent = items.length;
  reviewMistakesButton.disabled = items.length === 0;
}

function startMistakeReview() {
  const daily = loadDailyStats();
  const mistakes = Array.isArray(daily.wrongItems) ? daily.wrongItems : [];
  if (!mistakes.length) return;
  stopTimer();
  stopSpeech();
  stopAudioOptionSequence();
  clearAutoNext();
  state.isMistakeReview = true;
  state.sessionStartedAt = Date.now();
  state.progressionFinalized = false;
  state.trainingDomain = "review";
  state.entries = mistakes.map((item) => item.entry);
  state.questionQueue = mistakes.map((item, index) => ({
    entry: item.entry,
    type: item.type,
    id: `review:${index}:${item.id}`,
    mistakeId: item.id,
  }));
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
  state.dailyStats = daily;
  settingsPage.classList.add("hidden");
  pinyinSettingsPage.classList.add("hidden");
  settingsOnlyNodes.forEach((node) => node.classList.add("hidden"));
  practicePage.classList.remove("hidden");
  practiceStats.classList.remove("hidden");
  beginTrainingSession("review", [...new Set(mistakes.map((item) => item.type))]);
  renderDailyStats();
  render();
}

function updateTypeStats(target, type, result) {
  if (!type) return;
  const stats = target[type] || { done: 0, correct: 0, wrong: 0, stars: 0 };
  stats.done += 1;
  stats.stars += result.stars;
  stats[result.correct ? "correct" : "wrong"] += 1;
  target[type] = stats;
}

function beginTrainingSession(domain, types) {
  state.currentSession = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    domain,
    types,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
    stars: 0,
    done: 0,
    correct: 0,
    wrong: 0,
    byType: {},
  };
  upsertCurrentSession();
}

function updateCurrentSession(result) {
  if (!state.currentSession) return;
  state.currentSession.updatedAt = new Date().toISOString();
  state.currentSession.stars = state.score;
  state.currentSession.done += 1;
  state.currentSession[result.correct ? "correct" : "wrong"] += 1;
  updateTypeStats(state.currentSession.byType, result.type, result);
  upsertCurrentSession();
}

function upsertCurrentSession() {
  if (!state.currentSession) return;
  const existingIndex = state.sessionHistory.findIndex((item) => item.id === state.currentSession.id);
  const snapshot = JSON.parse(JSON.stringify(state.currentSession));
  if (existingIndex >= 0) state.sessionHistory.splice(existingIndex, 1);
  state.sessionHistory.unshift(snapshot);
  state.sessionHistory = state.sessionHistory.slice(0, 30);
  localStorage.setItem(accountScopedKey("hanzi-practice:sessions"), JSON.stringify(state.sessionHistory));
}

function loadSessionHistory() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(accountScopedKey("hanzi-practice:sessions")) ||
        (canReadLegacyAccountData() ? localStorage.getItem("hanzi-practice:sessions") : null)
    );
    return Array.isArray(stored) ? stored.slice(0, 30) : [];
  } catch {
    return [];
  }
}

function aggregateSessionTypeStats() {
  const totals = {};
  state.sessionHistory.forEach((session) => {
    Object.entries(session.byType || {}).forEach(([type, stats]) => {
      const target = totals[type] || { done: 0, correct: 0, wrong: 0, stars: 0 };
      target.done += stats.done || 0;
      target.correct += stats.correct || 0;
      target.wrong += stats.wrong || 0;
      target.stars += stats.stars || 0;
      totals[type] = target;
    });
  });
  return totals;
}

function renderCategoryReport(byType) {
  const rows = Object.entries(byType).sort((a, b) => b[1].done - a[1].done);
  categoryReportList.innerHTML = rows.length
    ? rows.map(([type, stats]) => {
        const accuracy = stats.done ? Math.round((stats.correct / stats.done) * 100) : 0;
        return `<div class="category-report-row">
          <div><strong>${escapeHTML(QUESTION_TYPE_LABELS[type] || type)}</strong><span>${stats.correct}/${stats.done} 题</span></div>
          <div class="accuracy-track"><span style="width:${accuracy}%"></span></div>
          <b>${accuracy}%</b>
        </div>`;
      }).join("")
    : '<p class="scoreboard-empty">完成题目后，这里会出现分类成绩。</p>';
}

function renderSessionHistory() {
  const rows = state.sessionHistory.slice(0, 5);
  sessionHistoryList.innerHTML = rows.length
    ? rows.map((session) => {
        const date = new Date(session.startedAt);
        const accuracy = session.done ? Math.round((session.correct / session.done) * 100) : 0;
        return `<div class="session-history-row">
          <span>${escapeHTML(date.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" }))}<small>${escapeHTML(date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }))}</small></span>
          <strong>${session.domain === "pinyin" ? "拼音" : session.domain === "review" ? "错题" : "汉字"} ${session.done}题</strong>
          <b>${accuracy}% · ${session.stars}★</b>
        </div>`;
      }).join("")
    : '<p class="scoreboard-empty">还没有训练记录。</p>';
}

function getQuizJourneyHTML() {
  const total = Math.max(1, state.questionQueue.length);
  const current = Math.min(total, state.activeIndex + 1);
  const percent = Math.round((current / total) * 100);
  return `<div class="quiz-journey" aria-label="答题进度 ${current} / ${total}">
    <span class="journey-mascot" aria-hidden="true"></span>
    <div class="journey-track"><span style="width:${percent}%"></span></div>
    <div class="journey-stats">
      <strong>${current}/${total}</strong>
      <span id="journeyTimer">${Math.max(0, state.timeLeft || state.timerDuration)}s</span>
      <b>${state.score} ★</b>
    </div>
  </div>`;
}

function updateScoreDisplay() {
  scoreText.textContent = `${state.score} ★`;
  const journeyScore = document.querySelector(".journey-stats b");
  if (journeyScore) journeyScore.textContent = `${state.score} ★`;
  const count = Math.max(0, Math.min(12, state.score));
  scoreStars.textContent = "★".repeat(count);
}

function startTimer() {
  stopTimer();
  if (!state.entries.length || state.mode === "library") {
    updateTimerDisplays(state.timerDuration);
    return;
  }
  const key = currentQuestionKey();
  if (state.selectedAnswer || state.timedOutQuestions.has(key)) {
    updateTimerDisplays(state.timeLeft);
    return;
  }
  state.timeLeft = state.timerDuration;
  updateTimerDisplays(state.timeLeft);
  state.timerId = window.setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplays(state.timeLeft);
    if (state.timeLeft <= 0) handleTimeout();
  }, 1000);
}

function updateTimerDisplays(seconds) {
  const label = `${Math.max(0, Number(seconds) || 0)}s`;
  timerText.textContent = label;
  const journeyTimer = document.querySelector("#journeyTimer");
  if (journeyTimer) journeyTimer.textContent = label;
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
  if (isPinyinTrainingMode(state.mode)) {
    stopSpeech();
    renderPinyinQuiz(state.mode);
    const feedback = document.querySelector("#feedback");
    feedback.textContent = `时间到。正确答案是 ${getPinyinCorrectLabel(currentEntry(), state.mode)}。${formatScoreChange(scoreChange)}`;
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
  stopSpeech();
  clearAutoNext();
  finalizeProgressionSession();
  if (state.currentSession && !state.currentSession.completedAt) {
    state.currentSession.completedAt = new Date().toISOString();
    state.currentSession.updatedAt = state.currentSession.completedAt;
    upsertCurrentSession();
    renderDailyStats();
  }
  progressText.textContent = `${state.questionQueue.length} / ${state.questionQueue.length}`;
  timerText.textContent = "完成";
  practiceArea.innerHTML = `
    <div class="empty-state completion-celebration">
      <div>
        <div class="completion-medal" aria-hidden="true"></div>
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

function scrollPracticeIntoView() {
  window.requestAnimationFrame(() => {
    practicePage.scrollIntoView?.({ behavior: "smooth", block: "start" });
  });
}

function finalizeProgressionSession() {
  if (state.progressionFinalized) return;
  state.progressionFinalized = true;
  const elapsedMinutes = state.sessionStartedAt ? Math.floor((Date.now() - state.sessionStartedAt) / 60000) : 0;
  window.MOYA_PROGRESS.recordStudyMinutes(state.userProfile, elapsedMinutes);
  if (state.trainingDomain === "hanzi") {
    const learned = window.MOYA_PROGRESS.learnCharacters(
      state.userProfile,
      state.entries.map((entry) => entry.char).filter(Boolean)
    );
    if (learned) showGlobalStarToast(learned * 5, `新学会 ${learned} 个汉字`);
  } else if (state.trainingDomain === "pinyin") {
    const lessonIds = state.entries.map((entry) => entry.lessonId).filter(Boolean);
    window.MOYA_PROGRESS.completePinyinLessons(state.userProfile, lessonIds);
    showGlobalStarToast(5, "完成拼音关卡");
  } else if (state.isMistakeReview) {
    window.MOYA_PROGRESS.awardStars(state.userProfile, 3, "完成一次复习任务");
    showGlobalStarToast(3, "完成错题复习");
  }
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
  stopSpeech();
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
