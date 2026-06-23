(function () {
  const LEGACY_PROFILE_KEY = "moya:user-profile";
  const ACCOUNTS_KEY = "moya:accounts";
  const ACTIVE_ACCOUNT_KEY = "moya:active-account-id";
  const PROFILE_VERSION = 1;

  function dateKey(date = new Date()) {
    return date.toLocaleDateString("en-CA");
  }

  function createId(prefix = "local") {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  }

  function createDefaultProfile(options = {}) {
    const id = options.id || createId();
    const name = options.name || "小墨芽";
    const now = new Date().toISOString();
    return {
      version: PROFILE_VERSION,
      id,
      name,
      avatar: "panda",
      totalStars: Math.max(0, Number(options.totalStars ?? seedStars()) || 0),
      currentLevel: "sprout",
      learnedCharacters: [],
      completedPinyinLessons: [],
      completedTasks: {},
      taskProgress: {},
      achievements: {},
      checkInHistory: [],
      unlockedAreas: ["pinyin", "hanzi"],
      lastStudyDate: null,
      streakDays: 0,
      longestStreak: 0,
      readingTasks: 0,
      totalCorrect: 0,
      consecutivePinyinCorrect: 0,
      cardCollection: {},
      cardDrawHistory: [],
      dailyCardDraws: {},
      createdAt: now,
      updatedAt: now,
    };
  }

  function profileKey(accountId = getActiveAccountId()) {
    return `${LEGACY_PROFILE_KEY}:${accountId}`;
  }

  function accountStorageKey(name, accountId = getActiveAccountId()) {
    return `moya:account:${accountId}:${name}`;
  }

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeAccounts(accounts) {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  function normalizeAccount(account) {
    return {
      id: account?.id || createId(),
      name: String(account?.name || "小墨芽").trim().slice(0, 16) || "小墨芽",
      avatar: account?.avatar || "panda",
      createdAt: account?.createdAt || new Date().toISOString(),
      updatedAt: account?.updatedAt || new Date().toISOString(),
    };
  }

  function loadAccounts() {
    const stored = readJSON(ACCOUNTS_KEY, null);
    if (Array.isArray(stored) && stored.length) {
      return stored.map(normalizeAccount);
    }

    const migratedId = "local-primary";
    const legacyProfile = readJSON(LEGACY_PROFILE_KEY, null);
    const profile = legacyProfile && typeof legacyProfile === "object"
      ? { ...createDefaultProfile({ id: migratedId, name: legacyProfile.name || "小墨芽", totalStars: 0 }), ...legacyProfile, id: migratedId }
      : createDefaultProfile({ id: migratedId });
    const account = normalizeAccount({
      id: migratedId,
      name: profile.name,
      avatar: profile.avatar,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    });
    localStorage.setItem(profileKey(migratedId), JSON.stringify(refreshProfile(profile)));
    writeAccounts([account]);
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, migratedId);
    return [account];
  }

  function getActiveAccountId() {
    const accounts = readJSON(ACCOUNTS_KEY, []);
    const active = localStorage.getItem(ACTIVE_ACCOUNT_KEY);
    if (active && accounts.some((account) => account.id === active)) return active;
    const fallback = accounts[0]?.id || "local-primary";
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, fallback);
    return fallback;
  }

  function setActiveAccount(accountId) {
    const accounts = loadAccounts();
    if (!accounts.some((account) => account.id === accountId)) return loadProfile();
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, accountId);
    const profile = loadProfile();
    window.dispatchEvent(new CustomEvent("moya:account-change", { detail: { accounts, accountId, profile } }));
    return profile;
  }

  function updateAccountFromProfile(profile) {
    const accounts = loadAccounts();
    const index = accounts.findIndex((account) => account.id === profile.id);
    const next = normalizeAccount({
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    });
    if (index >= 0) accounts[index] = { ...accounts[index], ...next };
    else accounts.push(next);
    writeAccounts(accounts);
    return accounts;
  }

  function createAccount(name) {
    const accountName = String(name || "").trim().slice(0, 16) || `小墨芽 ${loadAccounts().length + 1}`;
    const profile = createDefaultProfile({ id: createId("kid"), name: accountName, totalStars: 0 });
    localStorage.setItem(profileKey(profile.id), JSON.stringify(refreshProfile(profile)));
    const accounts = [...loadAccounts(), normalizeAccount(profile)];
    writeAccounts(accounts);
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, profile.id);
    window.dispatchEvent(new CustomEvent("moya:account-change", { detail: { accounts, accountId: profile.id, profile } }));
    window.dispatchEvent(new CustomEvent("moya:progress", { detail: { profile } }));
    return profile;
  }

  function seedStars() {
    try {
      const daily = JSON.parse(localStorage.getItem(`hanzi-practice-daily:${dateKey()}`));
      return Math.max(0, Number(daily?.stars) || 0);
    } catch {
      return 0;
    }
  }

  function loadProfile() {
    loadAccounts();
    const accountId = getActiveAccountId();
    const account = loadAccounts().find((item) => item.id === accountId);
    const fallback = createDefaultProfile({ id: accountId, name: account?.name || "小墨芽", totalStars: 0 });
    try {
      const stored = JSON.parse(localStorage.getItem(profileKey(accountId)));
      if (!stored || typeof stored !== "object") return fallback;
      const profile = { ...fallback, ...stored };
      profile.learnedCharacters = Array.isArray(profile.learnedCharacters) ? profile.learnedCharacters : [];
      profile.completedPinyinLessons = Array.isArray(profile.completedPinyinLessons) ? profile.completedPinyinLessons : [];
      profile.checkInHistory = Array.isArray(profile.checkInHistory) ? profile.checkInHistory : [];
      profile.completedTasks = profile.completedTasks || {};
      profile.taskProgress = profile.taskProgress || {};
      profile.achievements = profile.achievements || {};
      profile.cardCollection = profile.cardCollection || {};
      profile.cardDrawHistory = Array.isArray(profile.cardDrawHistory) ? profile.cardDrawHistory : [];
      profile.dailyCardDraws = profile.dailyCardDraws || {};
      return refreshProfile(profile);
    } catch {
      return fallback;
    }
  }

  function saveProfile(profile) {
    profile.updatedAt = new Date().toISOString();
    refreshProfile(profile);
    localStorage.setItem(profileKey(profile.id), JSON.stringify(profile));
    updateAccountFromProfile(profile);
    window.dispatchEvent(new CustomEvent("moya:progress", { detail: { profile } }));
    return profile;
  }

  function getLevel(stars) {
    return window.MOYA_LEVELS.find((level) => level.max === null || stars <= level.max) || window.MOYA_LEVELS.at(-1);
  }

  function getLevelProgress(profile) {
    const level = getLevel(profile.totalStars);
    const next = window.MOYA_LEVELS[window.MOYA_LEVELS.indexOf(level) + 1] || null;
    const span = next ? next.min - level.min : 1;
    return {
      level,
      next,
      percent: next ? Math.min(100, Math.round(((profile.totalStars - level.min) / span) * 100)) : 100,
      remaining: next ? Math.max(0, next.min - profile.totalStars) : 0,
    };
  }

  function refreshProfile(profile) {
    profile.currentLevel = getLevel(profile.totalStars).id;
    profile.unlockedAreas = window.MOYA_GROWTH_AREAS
      .filter((area) => profile.totalStars >= area.unlockStars && !area.future)
      .map((area) => area.id);
    evaluateAchievements(profile);
    return profile;
  }

  function awardStars(profile, amount, reason) {
    const value = Math.max(0, Number(amount) || 0);
    if (!value) return { amount: 0, reason, levelUp: false };
    const previousLevel = getLevel(profile.totalStars).id;
    profile.totalStars += value;
    saveProfile(profile);
    return { amount: value, reason, levelUp: previousLevel !== profile.currentLevel };
  }

  function spendStars(profile, amount, reason) {
    const value = Math.max(0, Number(amount) || 0);
    if (!value || profile.totalStars < value) return { spent: 0, reason, success: false };
    profile.totalStars -= value;
    saveProfile(profile);
    return { spent: value, reason, success: true };
  }

  function ensureTodayTasks(profile) {
    const today = dateKey();
    profile.taskProgress[today] ||= {};
    profile.completedTasks[today] ||= [];
    window.MOYA_DAILY_TASKS.forEach((task) => {
      profile.taskProgress[today][task.id] ||= { progress: 0, claimed: false };
    });
    return profile.taskProgress[today];
  }

  function addTaskProgress(profile, metric, amount = 1) {
    const tasks = ensureTodayTasks(profile);
    window.MOYA_DAILY_TASKS.filter((task) => task.metric === metric).forEach((task) => {
      tasks[task.id].progress = Math.min(task.target, tasks[task.id].progress + amount);
    });
    saveProfile(profile);
  }

  function claimTask(profile, taskId) {
    const task = window.MOYA_DAILY_TASKS.find((item) => item.id === taskId);
    const today = dateKey();
    const tasks = ensureTodayTasks(profile);
    if (!task || tasks[taskId].claimed || tasks[taskId].progress < task.target) return null;
    tasks[taskId].claimed = true;
    if (!profile.completedTasks[today].includes(taskId)) profile.completedTasks[today].push(taskId);
    return awardStars(profile, task.reward, `完成每日任务：${task.name}`);
  }

  function checkIn(profile) {
    const today = dateKey();
    if (profile.checkInHistory.includes(today)) return { awarded: 0, streak: profile.streakDays };
    const yesterday = dateKey(new Date(Date.now() - 86400000));
    profile.streakDays = profile.lastStudyDate === yesterday ? profile.streakDays + 1 : 1;
    profile.longestStreak = Math.max(profile.longestStreak, profile.streakDays);
    profile.lastStudyDate = today;
    profile.checkInHistory.push(today);
    profile.checkInHistory = profile.checkInHistory.slice(-120);
    let reward = 5;
    if (profile.streakDays === 3) reward += 10;
    if (profile.streakDays === 7) reward += 30;
    awardStars(profile, reward, `连续学习 ${profile.streakDays} 天`);
    return { awarded: reward, streak: profile.streakDays };
  }

  function learnCharacters(profile, characters) {
    const fresh = [...new Set(characters)].filter((char) => !profile.learnedCharacters.includes(char));
    if (!fresh.length) return 0;
    profile.learnedCharacters.push(...fresh);
    addTaskProgress(profile, "newCharacters", fresh.length);
    awardStars(profile, fresh.length * 5, `学习 ${fresh.length} 个新汉字`);
    return fresh.length;
  }

  function completePinyinLessons(profile, lessonIds) {
    const fresh = [...new Set(lessonIds)].filter((id) => !profile.completedPinyinLessons.includes(id));
    if (fresh.length) profile.completedPinyinLessons.push(...fresh);
    addTaskProgress(profile, "pinyinLessons", 1);
    awardStars(profile, 5, "完成拼音关卡");
    return fresh.length;
  }

  function recordAnswer(profile, context) {
    if (context.correct) {
      profile.totalCorrect += 1;
      if (context.domain === "pinyin") profile.consecutivePinyinCorrect += 1;
      const reward = context.domain === "pinyin" ? 2 : context.type === "assemble" || context.type === "wordPractice" ? 3 : 2;
      awardStars(profile, reward, "完成练习");
      if (context.domain === "pinyin") {
        if (profile.consecutivePinyinCorrect % 5 === 0) awardStars(profile, 5, "连续正确拼读 5 个音节");
      }
      if (context.review) addTaskProgress(profile, "reviewItems", 1);
    } else if (context.domain === "pinyin") {
      profile.consecutivePinyinCorrect = 0;
      saveProfile(profile);
    }
    checkIn(profile);
  }

  function recordStudyMinutes(profile, minutes) {
    if (minutes > 0) addTaskProgress(profile, "studyMinutes", minutes);
  }

  function evaluateAchievements(profile) {
    const initials = ["initials-bpmf", "initials-dtnl", "initials-gkh", "initials-jqx", "initials-zhchshr", "initials-zcs-yw"];
    const metrics = {
      learnedCharacters: profile.learnedCharacters.length,
      pinyinInitials: initials.every((id) => profile.completedPinyinLessons.includes(id)) ? 1 : 0,
      readingTasks: profile.readingTasks || 0,
      streakDays: profile.longestStreak || profile.streakDays,
      totalStars: profile.totalStars,
    };
    window.MOYA_ACHIEVEMENTS.forEach((achievement) => {
      if (!profile.achievements[achievement.id] && metrics[achievement.metric] >= achievement.target) {
        profile.achievements[achievement.id] = { unlockedAt: new Date().toISOString() };
      }
    });
  }

  window.MOYA_PROGRESS = {
    dateKey,
    loadAccounts,
    getActiveAccountId,
    setActiveAccount,
    createAccount,
    accountStorageKey,
    loadProfile,
    saveProfile,
    getLevel,
    getLevelProgress,
    awardStars,
    spendStars,
    ensureTodayTasks,
    addTaskProgress,
    claimTask,
    checkIn,
    learnCharacters,
    completePinyinLessons,
    recordAnswer,
    recordStudyMinutes,
  };
})();
