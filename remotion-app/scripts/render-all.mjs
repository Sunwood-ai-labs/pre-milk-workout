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

const versionTag = process.argv[2] ?? makeVersionTag();
const renderDir = path.join(workspaceRoot, "renders", "versions", versionTag);

const variants = [
  {id: "PreMilkWorkoutPopMotion", slug: "01-character-sheet"},
  {id: "PreMilkWorkoutBottleLabel", slug: "02-milk-bottle-label"},
  {id: "PreMilkWorkoutStickerAlbum", slug: "03-sticker-album"},
  {id: "PreMilkWorkoutStorybookRibbon", slug: "04-storybook-ribbon"},
  {id: "PreMilkWorkoutToyCatalog", slug: "05-toy-catalog"},
  {id: "PreMilkWorkoutBubbleParade", slug: "06-bubble-parade"},
  {id: "PreMilkWorkoutCandyMarqueeConcept", slug: "07-candy-marquee-concept"},
];

await mkdir(renderDir, {recursive: true});

const manifest = {
  versionTag,
  renderedAtLocal: new Date().toISOString(),
  outputs: [],
};

for (const variant of variants) {
  const filename = `${variant.slug}__${versionTag}.mp4`;
  const outputPath = path.join(renderDir, filename);
  console.log(`[render-all] Rendering ${variant.id} -> ${outputPath}`);
  execFileSync(
    "node",
    [
      cliPath,
      "render",
      "./src/index.jsx",
      variant.id,
      outputPath,
      "--timeout=240000",
      "--concurrency=2",
    ],
    {
      cwd: appRoot,
      stdio: "inherit",
    },
  );

  manifest.outputs.push({
    compositionId: variant.id,
    filename,
    path: outputPath,
  });
}

await writeFile(
  path.join(renderDir, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  "utf8",
);

console.log(`[render-all] Done: ${renderDir}`);
