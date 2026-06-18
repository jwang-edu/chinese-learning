import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const require = createRequire(import.meta.url);
const inputPath = process.argv[2] || "node_modules/cedict";
const outputPath = process.argv[3] || "data/word-db.js";
const sourceMode = inputPath === "node_modules/cedict" || inputPath === "cedict-package" ? "package" : "file";

const wordScores = new Map();

if (sourceMode === "package") {
  const entries = require("cedict");
  for (const entry of entries) {
    const word = entry.simplified || entry.traditional;
    const definitions = (entry.definitions || [])
      .flatMap((definition) => definition.translations || [])
      .join(" / ")
      .toLowerCase();
    if (!isGoodPracticeWord(word, definitions)) continue;
    addWord(word, entry.hsk || 0);
  }
} else {
  const text = await readFile(inputPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^\S+\s+(\S+)\s+\[[^\]]+\]\s+\/(.+)\/$/);
    if (!match) continue;

    const simplified = match[1];
    const definitions = match[2].toLowerCase();
    if (!isGoodPracticeWord(simplified, definitions)) continue;
    addWord(simplified, 0);
  }
}

const sortedWords = [...wordScores.entries()]
  .sort(([first, firstScore], [second, secondScore]) => {
    if (firstScore !== secondScore) return secondScore - firstScore;
    return first.length - second.length || first.localeCompare(second, "zh-Hans");
  })
  .map(([word]) => word);
const body = `// Generated from CC-CEDICT for classroom word-building practice.
// Source: ${sourceMode === "package" ? "npm package cedict" : basename(inputPath)}
// CC-CEDICT data is licensed under Creative Commons Attribution-ShareAlike.
window.WORD_DB = ${JSON.stringify(sortedWords, null, 2)};
`;

await writeFile(outputPath, body, "utf8");
console.log(`Wrote ${sortedWords.length} words to ${outputPath}`);

function addWord(word, hsk) {
  const score = scoreWord(word, hsk);
  wordScores.set(word, Math.max(wordScores.get(word) || 0, score));
}

function scoreWord(word, hsk) {
  let score = 0;
  if (hsk > 0) score += 100 - hsk * 8;
  if (word.length === 2) score += 20;
  if (word.length === 3) score += 8;
  if (isClassroomFriendly(word)) score += 12;
  return score;
}

function isGoodPracticeWord(word, definitions) {
  if (!/^[\u3400-\u9fff]{2,4}$/u.test(word)) return false;
  if (/[·〇零]/u.test(word)) return false;

  const blockedDefinitionHints = [
    "surname",
    "variant of",
    "old variant",
    "archaic",
    "abbr.",
    "abbreviation",
    "classifier",
    "measure word",
    "see also",
    "loanword",
    "japanese",
    "buddhist",
    "place name",
    "person name",
    "given name",
    "name of",
    "used in",
    "onom.",
  ];
  if (blockedDefinitionHints.some((hint) => definitions.includes(hint))) return false;

  const blockedWords = new Set([
    "的确",
    "得了",
    "不了",
    "为了",
    "着呢",
    "妈的",
    "他妈",
    "他妈的",
    "傻子",
    "笨蛋",
    "杀人",
    "死人",
    "死亡",
    "毒品",
    "色情",
    "成人",
    "暴力",
    "学习字",
    "认读字",
    "练习字",
    "书写字",
  ]);
  return !blockedWords.has(word);
}

function isClassroomFriendly(word) {
  return /[一二三上下中大小人天月日水火木林山口手心子女学语文书课家国园花草明好朋妈爸姐哥弟妹老师生时早问说看听写读]/u.test(word);
}
