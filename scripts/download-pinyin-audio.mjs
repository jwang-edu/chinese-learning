import { writeFile } from "node:fs/promises";

globalThis.window = {};
await import("../data/hanzi-db.js");
await import("../data/pinyin-syllabus.js");

const manifestPath = "data/pinyin-audio-manifest.js";
const audioTexts = [
  ...new Set(window.PINYIN_SYLLABUS.flatMap((lesson) => lesson.items.map((item) => item.audio))),
];
const candidates = audioTexts
  .map((audioText) => ({ audioText, pinyin: window.HANZI_DB[audioText]?.pinyin }))
  .filter((item) => item.pinyin);

const manifest = {
  "鸡": {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Zh-j%C4%AB.ogg",
    pinyin: "jī",
    source: "https://commons.wikimedia.org/wiki/File:Zh-j%C4%AB.ogg",
    license: "CC BY 2.0 FR",
    artist: "Wei Gao, Vion Nicolas / Shtooka Project",
  },
  "西": {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Zh-x%C4%AB.ogg",
    pinyin: "xī",
    source: "https://commons.wikimedia.org/wiki/File:Zh-x%C4%AB.ogg",
    license: "CC BY 2.0 FR",
    artist: "Wei Gao, Vion Nicolas / Shtooka Project",
  },
};

Object.assign(manifest, {
  "b-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-b%C5%8D.ogg",
    pinyin: "bō",
    source: "https://commons.wikimedia.org/wiki/File:Zh-b%C5%8D.ogg",
    license: "See Wikimedia Commons source page",
    artist: "Wikimedia Commons Mandarin pronunciation collection",
    rate: 0.78,
  },
  "p-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-p%C5%8D.ogg",
    pinyin: "pō",
    source: "https://commons.wikimedia.org/wiki/File:Zh-p%C5%8D.ogg",
    license: "See Wikimedia Commons source page",
    artist: "Wikimedia Commons Mandarin pronunciation collection",
    rate: 0.78,
  },
  "m-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-m%C5%8D.ogg",
    pinyin: "mō",
    source: "https://commons.wikimedia.org/wiki/File:Zh-m%C5%8D.ogg",
    license: "See Wikimedia Commons source page",
    artist: "Wikimedia Commons Mandarin pronunciation collection",
    rate: 0.78,
  },
  "f-clear": {
    pinyin: "fó",
    systemVoice: true,
    artist: "Device standard Mandarin voice",
  },
  "ci-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-ci.ogg",
    pinyin: "cǐ",
    source: "https://commons.wikimedia.org/wiki/File:Zh-ci.ogg",
    license: "CC BY-SA 3.0 US",
    artist: "Yue Tan / Shtooka Project",
    rate: 0.82,
  },
  "si-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-si.ogg",
    pinyin: "sī",
    source: "https://commons.wikimedia.org/wiki/File:Zh-si.ogg",
    license: "CC BY-SA 3.0 US",
    artist: "Yue Tan / Shtooka Project",
    rate: 0.82,
  },
  "fo-clear": {
    pinyin: "fó",
    systemVoice: true,
    artist: "Device standard Mandarin voice",
  },
  "yun-clear": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zh-y%C3%BAn.ogg",
    pinyin: "yún",
    source: "https://commons.wikimedia.org/wiki/File:Zh-y%C3%BAn.ogg",
    license: "See Wikimedia Commons source page",
    artist: "Wikimedia Commons Mandarin pronunciation collection",
    rate: 0.88,
  },
});

for (const candidate of candidates) {
  if (manifest[candidate.audioText]) continue;
  const filename = `Zh-${candidate.pinyin}.ogg`;
  manifest[candidate.audioText] = {
    src: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`,
    pinyin: candidate.pinyin,
    source: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,
    license: "See Wikimedia Commons source page",
    artist: "Wikimedia Commons Mandarin pronunciation collection",
  };
}

await writeFile(
  manifestPath,
  `// Generated from openly licensed Wikimedia Commons pronunciation files.\nwindow.PINYIN_AUDIO_FILES = ${JSON.stringify(manifest, null, 2)};\n`,
  "utf8"
);
console.log(`Added ${Object.keys(manifest).length}/${audioTexts.length} standard pronunciation recordings.`);
