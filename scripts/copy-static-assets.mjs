import { copyFile, cp, mkdir } from "node:fs/promises";

await mkdir("dist/data", { recursive: true });
await mkdir("dist/utils", { recursive: true });
await mkdir("dist/components", { recursive: true });
await mkdir("dist/assets/cards", { recursive: true });
await mkdir("dist/assets/companions", { recursive: true });
await mkdir("dist/assets/courses", { recursive: true });
await copyFile("app.js", "dist/app.js");
await cp("data", "dist/data", { recursive: true });
await cp("utils", "dist/utils", { recursive: true });
await cp("components", "dist/components", { recursive: true });
await cp("assets/cards", "dist/assets/cards", { recursive: true });
await cp("assets/companions", "dist/assets/companions", { recursive: true });
await cp("assets/courses", "dist/assets/courses", { recursive: true });
