# Vercel 部署说明

这个项目按 Vite 静态站点准备，部署方式与数学训练工具一致。

## GitHub

1. 在 GitHub 新建一个仓库。
2. 把本目录内容推送到仓库根目录。
3. 不需要提交 `node_modules`、`dist`、`.vercel`，它们已经写入 `.gitignore`。

## Vercel

在 Vercel 导入 GitHub 仓库后，使用以下设置：

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

`vercel.json` 已经配置了所有路径回到 `index.html`，适合这个单页练习工具。
