# 组词词典来源

当前 `word-db.js` 由 CC-CEDICT 数据生成，并保留少量课堂常用词作为补充。

项目通过 npm 包 `cedict` 使用 CC-CEDICT 数据：

- CC-CEDICT 项目主页：https://cc-cedict.org/wiki/
- MDBG 下载页：https://www.mdbg.net/chinese/dictionary?page=cedict
- npm 包：https://www.npmjs.com/package/cedict
- 数据许可证：Creative Commons Attribution-ShareAlike

重新生成词库：

```bash
npm install
npm run build:word-db
```

脚本会从 `node_modules/cedict` 读取 CC-CEDICT 词条，过滤出适合课堂组词练习的 2-4 字简体词语，并生成：

```text
data/word-db.js
```
