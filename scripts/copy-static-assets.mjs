import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist/data", { recursive: true });
await copyFile("app.js", "dist/app.js");
await cp("data", "dist/data", { recursive: true });
