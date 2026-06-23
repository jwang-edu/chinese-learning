# 拼音音频来源

拼音训练优先使用 Wikimedia Commons 上公开许可的普通话真人录音，缺少录音时回退到浏览器 `zh-CN` 语音。

音频清单及逐文件署名保存在 `pinyin-audio-manifest.js`。主要来源包括 Shtooka Project 的普通话录音；每个文件的来源页和许可证都记录在清单中。

当前明确使用的真人录音：

- `bō（玻）`、`pō（坡）`、`mō（摸）`：使用对应 Commons 普通话录音，并在声母辨识里放慢到 0.78 倍，帮助孩子听清 b/p 的送气差异和 m 的鼻音开头。
- `né（呢）`、`shī（诗）`：使用 Commons 普通话录音，并在声母辨识里放慢到 0.78 倍，帮助孩子听清 n 的鼻音和 sh 的翘舌摩擦音。
- `jī（鸡）`：Wei Gao、Vion Nicolas / Shtooka Project，CC BY 2.0 FR  
  https://commons.wikimedia.org/wiki/File:Zh-j%C4%AB.ogg
- `xī（西）`：Wei Gao、Vion Nicolas / Shtooka Project，CC BY 2.0 FR  
  https://commons.wikimedia.org/wiki/File:Zh-x%C4%AB.ogg

重新生成可匹配的在线音频清单：

```bash
npm run build:pinyin-audio
```

生成脚本按准确的 `Zh-带声调拼音.ogg` 文件名生成 Commons 地址，不采用带地区或方言前缀的录音。网页直接读取 Commons 音频地址，不在仓库中重复保存音频文件；若某个文件不存在或加载失败，会自动回退到设备的 `zh-CN` 语音。

清晰度专项调整：`b/p/m/n/sh` 使用更慢速的清晰录音；`l` 明确使用设备标准普通话读 `le（了）`，避免自动音频误播成 `lei`；`f` 明确使用设备标准普通话，避免误播成 `fú`；`si` 与 `ci` 使用 Yue Tan 的 Shtooka 录音，`yun` 使用正确的 `yún（云）` 录音。Commons 没有可用的独立 `fó` 文件，因此 `fó` 明确使用设备标准普通话。
