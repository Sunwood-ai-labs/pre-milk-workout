import {execFileSync} from "node:child_process";
import {mkdir, writeFile} from "node:fs/promises";
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
const slug = process.argv[3] ?? "pre-milk-workout-pop-motion";
const versionTag = process.argv[4] ?? makeVersionTag();
const renderDir = path.join(workspaceRoot, "renders", "versions", versionTag);
const filename = `${slug}__${versionTag}.mp4`;
const outputPath = path.join(renderDir, filename);

await mkdir(renderDir, {recursive: true});

execFileSync(
  "node",
  [
    cliPath,
    "render",
    "./src/index.jsx",
    compositionId,
    outputPath,
    "--timeout=240000",
    "--concurrency=2",
  ],
  {
    cwd: appRoot,
    stdio: "inherit",
  },
);

await writeFile(
  path.join(renderDir, `${slug}__${versionTag}.json`),
  JSON.stringify(
    {
      compositionId,
      filename,
      outputPath,
      versionTag,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

await writeFile(
  path.join(renderDir, "manifest.json"),
  JSON.stringify(
    {
      versionTag,
      renderedAtLocal: new Date().toISOString(),
      outputs: [
        {
          compositionId,
          filename,
          path: outputPath,
        },
      ],
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`[render-single] Done: ${outputPath}`);
