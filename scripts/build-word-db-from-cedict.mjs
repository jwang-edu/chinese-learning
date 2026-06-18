import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const inputPath = process.argv[2] || "data/cedict_ts.u8";
const outputPath = process.argv[3] || "data/word-db.js";

const text = await readFile(inputPath, "utf8");
const words = new Set();

for (const line of text.split(/\r?\n/)) {
  if (!line || line.startsWith("#")) continue;

  const match = line.match(/^\S+\s+(\S+)\s+\[[^\]]+\]\s+\/(.+)\/$/);
  if (!match) continue;

  const simplified = match[1];
  const definitions = match[2].toLowerCase();
  if (!isGoodPracticeWord(simplified, definitions)) continue;
  words.add(simplified);
}

const sortedWords = [...words].sort((first, second) => first.length - second.length || first.localeCompare(second, "zh-Hans"));
const body = `// Generated from CC-CEDICT for classroom word-building practice.
// Source file: ${basename(inputPath)}
// CC-CEDICT is licensed under Creative Commons Attribution-ShareAlike 4.0 International.
window.WORD_DB = ${JSON.stringify(sortedWords, null, 2)};
`;

await writeFile(outputPath, body, "utf8");
console.log(`Wrote ${sortedWords.length} words to ${outputPath}`);

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
  ]);
  return !blockedWords.has(word);
}
