window.MOYA_LEVELS = [
  { id: "sprout", name: "小墨芽", english: "Little Sprout", min: 0, max: 49, icon: "芽", description: "刚刚发芽的小朋友" },
  { id: "morning-star", name: "启明星", english: "Morning Star", min: 50, max: 199, icon: "晨", description: "开始探索中文世界" },
  { id: "character-star", name: "小字星", english: "Character Star", min: 200, max: 499, icon: "字", description: "认识越来越多汉字" },
  { id: "reading-star", name: "书声星", english: "Reading Star", min: 500, max: 999, icon: "书", description: "可以读出更多中文声音" },
  { id: "bridge-star", name: "星桥星", english: "Bridge Star", min: 1000, max: 1999, icon: "桥", description: "连接语言、家庭与文化" },
  { id: "wenqu-star", name: "文曲星", english: "Wenqu Star", min: 2000, max: null, icon: "文", description: "中文小大师" },
];

window.MOYA_DAILY_TASKS = [
  { id: "learn-characters", name: "学习 5 个新汉字", target: 5, reward: 10, metric: "newCharacters", icon: "字" },
  { id: "pinyin-lesson", name: "完成 1 个拼音关卡", target: 1, reward: 10, metric: "pinyinLessons", icon: "音" },
  { id: "review-items", name: "复习 10 道旧题", target: 10, reward: 10, metric: "reviewItems", icon: "习" },
  { id: "study-minutes", name: "连续学习 10 分钟", target: 10, reward: 10, metric: "studyMinutes", icon: "时" },
];

window.MOYA_ACHIEVEMENTS = [
  { id: "character-50", name: "识字小达人", condition: "认识 50 个汉字", icon: "花", metric: "learnedCharacters", target: 50 },
  { id: "pinyin-initials", name: "拼音小能手", condition: "完成所有声母关卡", icon: "音", metric: "pinyinInitials", target: 1 },
  { id: "reading-10", name: "阅读小明星", condition: "完成 10 个阅读任务", icon: "读", metric: "readingTasks", target: 10, future: true },
  { id: "streak-7", name: "坚持小标兵", condition: "连续学习 7 天", icon: "恒", metric: "streakDays", target: 7 },
  { id: "stars-500", name: "文曲小种子", condition: "累计获得 500 星", icon: "星", metric: "totalStars", target: 500 },
];

window.MOYA_GROWTH_AREAS = [
  { id: "pinyin", name: "拼音乐园", description: "听声音，拼出音节", unlockStars: 0, icon: "音" },
  { id: "hanzi", name: "汉字乐园", description: "认读汉字，发现字形", unlockStars: 0, icon: "字" },
  { id: "reading", name: "阅读花园", description: "绘本与短句即将开放", unlockStars: 500, icon: "读", future: true },
  { id: "stories", name: "故事山谷", description: "中文故事即将开放", unlockStars: 1000, icon: "故", future: true },
  { id: "culture", name: "文化小院", description: "节日与传统即将开放", unlockStars: 2000, icon: "礼", future: true },
];
