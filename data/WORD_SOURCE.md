# 组词词典来源

当前内置的 `word-db.js` 是课堂常用词基础表，作为离线 fallback 使用。

如果需要更权威、更大的词典，请使用 CC-CEDICT：

- 项目主页：https://cc-cedict.org/wiki/
- 下载页：https://www.mdbg.net/chinese/dictionary?page=cedict
- 许可证：Creative Commons Attribution-ShareAlike 4.0 International

MDBG 下载页说明该词典可用于非商业和商业用途，但需要署名，并且改进/衍生数据需要以相同许可证分享。页面同时说明禁止自动或脚本访问，因此请手动下载 `cedict_1_0_ts_utf-8_mdbg.zip` 或 `.txt.gz`，解压后把词典文本放到：

```text
data/cedict_ts.u8
```

然后运行：

```bash
npm run build:word-db
```

脚本会生成新的 `data/word-db.js`，组词练习会优先从这个大词库中取真实词语。
