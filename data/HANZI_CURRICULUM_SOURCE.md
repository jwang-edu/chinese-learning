# 统编版小学语文写字表来源

本项目只收录教学索引数据：册次、课次和写字表中的单字，不收录教材正文、图片或版面。

- 教材册次与附录参考：人民教育出版社《义务教育教科书 语文》
  https://www.pep.com.cn/products/jc/jks/201608/t20160823_1369629.shtml
- 十二册结构化写字表来源：汉字奥秘《义务教育教科书·语文（统编版）一至六年级各册写字表》
  https://www.hanziaomi.com/bkzl_main_tbjc.html
- 三年级下册、四年级上册、六年级上册的汇总页有少量缺字，逐课数据另与以下分册写字表交叉核对：
  - https://m.cngwzj.com/gushi/KeWen/86601/
  - https://m.cngwzj.com/pygushi/KeWen/86602/
  - https://m.cngwzj.com/gushi/KeWen/86606/

字表可使用以下命令从保存的 GB2312/GBK HTML 页面重新生成：

```bash
node scripts/build-curriculum-data.mjs source.html data/hanzi-curriculum.js
```
