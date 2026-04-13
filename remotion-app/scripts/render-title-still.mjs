import {execFileSync} from "node:child_process";
import {copyFile, mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(appRoot, "..");
const cliPath = path.join(appRoot, "node_modules", "@remotion", "cli", "remotion-cli.js");

const pad = (value) => String(value).padStart(2, "0");
const makeVersionTag = () => {
  const now = new Date();
  return `v${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(
    now.getMinutes(),
  )}${pad(now.getSeconds())}`;
};

const compositionId = process.argv[2] ?? "PreMilkWorkoutPopMotion";
const slug = process.argv[3] ?? "01-character-sheet";
const versionTag = process.argv[4] ?? makeVersionTag();
const frame = Number.parseInt(process.argv[5] ?? "90", 10);

if (Number.isNaN(frame) || frame < 0) {
  console.error("[render-title-still] Frame must be a non-negative integer.");
  process.exit(1);
}

const renderDir = path.join(workspaceRoot, "renders", "versions", versionTag);
const thumbsDir = path.join(renderDir, "thumbs");
const docsLatestDir = path.join(workspaceRoot, "docs", "public", "images", "latest");
const filename = `${slug}__title.jpg`;
const outputPath = path.join(thumbsDir, filename);
const publicPath = path.join(docsLatestDir, filename);

await mkdir(thumbsDir, {recursive: true});
await mkdir(docsLatestDir, {recursive: true});

execFileSync(
  "node",
  [
    cliPath,
    "still",
    "./src/index.jsx",
    compositionId,
    outputPath,
    `--frame=${frame}`,
  ],
  {
    cwd: appRoot,
    stdio: "inherit",
  },
);

await copyFile(outputPath, publicPath);

await writeFile(
  path.join(renderDir, `${slug}__title.json`),
  JSON.stringify(
    {
      compositionId,
      filename,
      frame,
      outputPath,
      publicPath,
      versionTag,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`[render-title-still] Done: ${outputPath}`);
