import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist/data", { recursive: true });
await mkdir("dist/utils", { recursive: true });
await copyFile("app.js", "dist/app.js");
await cp("data", "dist/data", { recursive: true });
await cp("utils", "dist/utils", { recursive: true });
