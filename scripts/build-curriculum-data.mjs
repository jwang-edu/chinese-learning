import { readFile, writeFile } from "node:fs/promises";

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "data/hanzi-curriculum.js";
if (!inputPath) throw new Error("Usage: node scripts/build-curriculum-data.mjs source.html [output.js]");

const sourceBytes = await readFile(inputPath);
const html = new TextDecoder("gbk").decode(sourceBytes);
const volumeMeta = [
  ["g1a", 1, "上册"], ["g1b", 1, "下册"],
  ["g2a", 2, "上册"], ["g2b", 2, "下册"],
  ["g3a", 3, "上册"], ["g3b", 3, "下册"],
  ["g4a", 4, "上册"], ["g4b", 4, "下册"],
  ["g5a", 5, "上册"], ["g5b", 5, "下册"],
  ["g6a", 6, "上册"], ["g6b", 6, "下册"],
];

// The twelve-volume index page is short by a few characters in these three
// volumes. These lesson lists are cross-checked against the individual PEP
// writing-table pages linked in data/HANZI_CURRICULUM_SOURCE.md.
const verifiedVolumeOverrides = {
  g3b: [
    ["课文 1", "融燕鸳鸯惠崇芦芽短梅溪泛减"], ["课文 2", "凑拂集聚形掠偶尔沾倦闲纤痕"],
    ["课文 3", "瓣蓬胀裂姿势仿佛随蹈止"], ["课文 5", "守株待宋耕触颈释其"],
    ["课文 6", "骄傲谦虚懦弱提尘捧代价"], ["课文 7", "鹿塘映欣赏匀致配传哎狮叹"],
    ["课文 9", "符欲魂借酒何牧兄独异佳"], ["课文 10", "术伟录册保存约验阿欧洲社"],
    ["课文 11", "赵省县匠设计史创举且智慧历"], ["课文 13", "斗芬芳内醒寿苏强示昆修建组"],
    ["课文 14", "蜜蜂辨阻跨括检查确误途陌"], ["课文 16", "淌秘密栋梯铃乘绪篇越"],
    ["课文 17", "状狐狸丁零巧克肠继续抬麻烦"], ["课文 18", "墨染竿腾碎拨浪葫爽蘑菇"],
    ["课文 19", "表胆鬼理夺骂仇差付倍虽泡件"], ["课文 20", "皂廊剩碗悠若透娇扯仰串婴希"],
    ["课文 22", "呈幻诱润芒冰剑普通模型"], ["课文 23", "宁官汪险参攻推迅速退煤铁"],
    ["课文 24", "必胡灿骑秒凶猛接庙威武镇"], ["课文 25", "性卷货取夹夸务衬衫负责艺"],
    ["课文 27", "漏喂胖驴贼狼莫厉抱架胶粘偏"],
  ],
  g4a: [
    ["课文 1", "潮据堤阔盼滚顿逐渐堵犹崩震霎余"], ["课文 2", "淘牵鹅卵坑洼填庄稼俗跃葡萄稻熟"],
    ["课文 5", "豌按舒适恐僵硬枪耐探愉曾"], ["课文 6", "蚊即科横竖绳系蝇证研究达驾驶"],
    ["课文 7", "唤纪技改程超亿核奥益联质哲任善"], ["课文 9", "暮吟题侧峰庐缘降费须逊输"],
    ["课文 10", "虎操占嫩顺均叠隙茎柄萎瞧固"], ["课文 11", "宅临慎选择址良穴厅卧专寸卫较"],
    ["课文 12", "睁翻斧劈缓浊丈撑竭累血液奔茂滋"], ["课文 13", "帝曰溺返衔"],
    ["课文 14", "悲惨兽佩坚违抗环锁既狠著愤获"], ["课文 16", "嗅呆奈巢齿躯掩护幼搏庞量愣"],
    ["课文 17", "级链颤攀猴鲫念辫呵"], ["课文 18", "摸甚跪捶绕顽脖脱概惹昏握摔凭掐"],
    ["课文 19", "段俩练套裤逃罩亏挖撤堂砸锅"], ["课文 20", "否旋况兵败椅仍尤恨帅预溃品丑豪"],
    ["课文 21", "塞秦征词催醉杰亦雄项"], ["课文 22", "肃晰振胸怀赞效凡顾训斥"],
    ["课文 25", "戎尝诸竞唯"], ["课文 26", "豹派娶媳妇淹逼浮旱徒扔饶骗灌溉"],
  ],
  g6a: [
    ["课文 1", "毯陈裳虹蹄腐稍微"], ["课文 2", "缀幽雅案拙薄糊蕾襟恍怨"],
    ["课文 3", "德鹊蝉"], ["课文 5", "律崖渡索"],
    ["课文 6", "寇副榴弹抡贯棋悬沸涧雹屹悦屈"], ["课文 7", "政府宾栏汇爆宣帜阅制坦距隆射"],
    ["课文 10", "凛疙瘩棍裁筹橡雕跺颓沮丧趴屉"], ["课文 11", "谜尚氧倾揭斑燥漠磁抵御素盗培"],
    ["课文 13", "咆哮嗓淌哑揪呻废"], ["课文 14", "汹涌澎湃熄掀困唉淋嘿糟嘛皱勺"],
    ["课文 16", "棚苔藓坪蔗瀑增缝谚"], ["课文 17", "袖篷缩疯瓦柜喧甩嚷酱唇蹦梯"],
    ["课文 18", "涯莺"], ["课文 19", "莹裹篮蔼资矿慷慨贡滥基睹"],
    ["课文 22", "哉巍弦轴锦曝矣"], ["课文 23", "谱莱茵盲纯键缕陶"],
    ["课文 25", "郑拜租厨毡羞撒缚猬伶俐窜"], ["课文 26", "搁综澄萍藻漾焰削瞬凝骤掷陡"],
  ],
};

const volumes = volumeMeta.map(([id, grade, term], index) => {
  const sectionNumber = String(index + 1).padStart(2, "0");
  const start = html.indexOf(`<a name="${sectionNumber}"></a>`);
  const nextNumber = String(index + 2).padStart(2, "0");
  const nextMarker = index === volumeMeta.length - 1 ? html.length : html.indexOf(`<a name="${nextNumber}"></a>`, start + 1);
  const returnMarker = html.indexOf("返回", start + 1);
  const end = returnMarker > start && returnMarker < nextMarker ? returnMarker : nextMarker;
  if (start < 0) throw new Error(`Missing volume marker ${sectionNumber}`);
  const section = html.slice(start, end > start ? end : html.length);
  const expectedCount = Number(section.match(/[（(](\d+)[）)]/)?.[1] || 0);
  const parsedGroups = verifiedVolumeOverrides[id]
    ? verifiedVolumeOverrides[id].map(([title, characters], groupIndex) => ({ id: `${id}-${groupIndex + 1}`, title, characters }))
    : parseGroups(section, id);
  const groups = normalizeGroups(parsedGroups, id);
  const listedCharacters = groups.flatMap((group) => Array.from(group.characters));
  const uniqueCharacters = unique(listedCharacters);
  return { id, grade, term, label: `${chineseNumber(grade)}年级${term}`, expectedCount, characterCount: listedCharacters.length, uniqueCharacterCount: uniqueCharacters.length, groups };
});

const output = {
  version: "2026-06-2",
  edition: "义务教育教科书·语文（统编版）",
  listType: "写字表",
  source: "https://www.hanziaomi.com/bkzl_main_tbjc.html",
  officialReference: "https://www.pep.com.cn/products/jc/jks/201608/t20160823_1369629.shtml",
  volumes,
};

await writeFile(
  outputPath,
  `// Generated curriculum index. See data/HANZI_CURRICULUM_SOURCE.md.\nwindow.MOYA_HANZI_CURRICULUM = ${JSON.stringify(output, null, 2)};\n`,
  "utf8"
);

for (const volume of volumes) {
  console.log(`${volume.label}: ${volume.characterCount}/${volume.expectedCount || "?"} characters, ${volume.groups.length} groups`);
}

function parseGroups(section, volumeId) {
  const rows = [...section.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => match[1]);
  const groups = [];
  let unit = "课文";
  const lastGroupBySide = [null, null];

  for (const row of rows) {
    const rowText = cleanText(row);
    const unitMatch = rowText.match(/(识字|课文|语文园地[（(]?[一二三四五六七八九十]?[）)]?)/);
    const linkedCharacters = extractLinkedCharacters(row);
    if (unitMatch && linkedCharacters.length === 0) {
      unit = unitMatch[1];
      continue;
    }

    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
    if (cells.length < 2) continue;
    const pairs = cells.length >= 5 ? [[cells[0], cells[1]], [cells[3], cells[4]]] : [[cells[0], cells[1]]];
    pairs.forEach(([numberCell, characterCell], side) => {
      const chars = extractCharacters(characterCell);
      if (!chars.length) return;
      const number = cleanText(numberCell).match(/\d+/)?.[0] || "";
      const garden = cleanText(characterCell).match(/语文园地[（(]?[一二三四五六七八九十]?[）)]?/)?.[0];
      let group = null;
      if (number || garden) {
        const title = garden || `${unit} ${number}`;
        group = { id: `${volumeId}-${groups.length + 1}`, title, characters: "" };
        groups.push(group);
        lastGroupBySide[side] = group;
      } else {
        group = lastGroupBySide[side];
      }
      if (!group) {
        group = { id: `${volumeId}-${groups.length + 1}`, title: unit, characters: "" };
        groups.push(group);
        lastGroupBySide[side] = group;
      }
      group.characters += chars.join("");
    });
  }

  return groups
    .map((group) => ({ ...group, characters: unique(Array.from(group.characters)).join("") }))
    .filter((group) => group.characters);
}

function normalizeGroups(inputGroups, volumeId) {
  const groups = inputGroups.map((group) => ({ ...group }));

  // The final source table flows from the bottom of its left column into the
  // top of its right column. That first right-column fragment continues lesson 9.
  if (volumeId === "g6b") {
    const continuationIndex = groups.findIndex((group) => group.title === "课文");
    const lessonNine = groups.find((group) => group.title === "课文 9");
    if (continuationIndex >= 0 && lessonNine) {
      lessonNine.characters += groups[continuationIndex].characters;
      groups.splice(continuationIndex, 1);
    }
  }

  groups.sort((left, right) => curriculumOrder(volumeId, left.title) - curriculumOrder(volumeId, right.title));
  return groups.map((group, index) => ({
    id: `${volumeId}-${index + 1}`,
    title: displayGroupTitle(group.title),
    characters: group.characters,
  }));
}

function curriculumOrder(volumeId, title) {
  const number = Number(title.match(/\d+/)?.[0] || 0);
  const isLiteracy = title.startsWith("识字");

  if (volumeId === "g1a") {
    if (isLiteracy && number <= 5) return number;
    if (!isLiteracy && number <= 4) return 100 + number;
    if (isLiteracy) return 200 + number;
    return 300 + number;
  }
  if (volumeId === "g1b") {
    if (isLiteracy && number <= 4) return number;
    if (!isLiteracy && number <= 11) return 100 + number;
    if (isLiteracy) return 200 + number;
    return 300 + number;
  }
  if (volumeId === "g2a") {
    if (!isLiteracy && number <= 3) return number;
    if (isLiteracy) return 100 + number;
    return 200 + number;
  }
  if (volumeId === "g2b") {
    if (!isLiteracy && number <= 7) return number;
    if (isLiteracy) return 100 + number;
    return 200 + number;
  }
  return number;
}

function displayGroupTitle(title) {
  const lesson = title.match(/^课文\s*(\d+)$/);
  if (lesson) return `第${lesson[1]}课`;
  const literacy = title.match(/^识字\s*(\d+)$/);
  if (literacy) return `识字${literacy[1]}`;
  return title.replace(/\s+/g, "");
}

function extractLinkedCharacters(fragment) {
  return [...fragment.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)]
    .flatMap((match) => Array.from(cleanText(match[1])))
    .filter((char) => /[\u3400-\u9fff]/u.test(char));
}

function extractCharacters(fragment) {
  const text = cleanText(fragment)
    .replace(/语文园地[（(]?[一二三四五六七八九十]?[）)]?/g, "")
    .replace(/返回|识字|课文/g, "");
  return Array.from(text).filter((char) => /[\u3400-\u9fff]/u.test(char));
}

function cleanText(fragment) {
  return fragment
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique(items) {
  return [...new Set(items)];
}

function chineseNumber(value) {
  return ["", "一", "二", "三", "四", "五", "六"][value];
}
