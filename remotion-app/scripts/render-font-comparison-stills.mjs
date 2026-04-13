import {execFileSync} from "node:child_process";
import {mkdir, rm, writeFile} from "node:fs/promises";
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
  return `font-compare-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(
    now.getHours(),
  )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

const versionTag = process.argv[2] ?? makeVersionTag();
const frame = Number.parseInt(process.argv[3] ?? "90", 10);

if (Number.isNaN(frame) || frame < 0) {
  console.error("[render-font-comparison-stills] Frame must be a non-negative integer.");
  process.exit(1);
}

const imageDir = path.join(workspaceRoot, "docs", "public", "images", "font-comparison");
const tempDir = path.join(workspaceRoot, "renders", "font-comparison", versionTag, "props");
const markdownPath = path.join(workspaceRoot, "FONT_COMPARISON.md");
const manifestPath = path.join(imageDir, "manifest.json");

const candidates = [
  {
    fontKey: "pop-bold",
    fontWeight: 700,
    github: "System / existing fallback stack",
    notes: "Current baseline. Soft but not especially thick.",
    roundness: "Medium",
    slug: "00-current-system",
    title: "Current system",
  },
  {
    fontKey: "zen-black",
    fontWeight: 900,
    github: "https://github.com/googlefonts/zen-marugothic",
    notes: "Balanced and readable. Rounded, but still fairly tidy.",
    roundness: "High",
    slug: "01-zen-maru-black",
    title: "Zen Maru Gothic Black",
  },
  {
    fontKey: "hachi-pop",
    fontWeight: 400,
    github: "https://github.com/noriokanisawa/HachiMaruPop",
    notes: "Cute retro rounded style. Strong personality, a bit lighter than Mochiy.",
    roundness: "Very high",
    slug: "02-hachi-maru-pop",
    title: "Hachi Maru Pop",
  },
  {
    fontKey: "mochiy-pop",
    fontWeight: 400,
    github: "https://github.com/fontdasu/Mochiypop",
    notes: "The thickest and most marshmallow-like option. Strong POP feeling.",
    roundness: "Very high",
    slug: "03-mochiy-pop-one",
    title: "Mochiy Pop One",
  },
  {
    fontKey: "mochiy-pop-p",
    fontWeight: 400,
    github: "https://github.com/fontdasu/Mochiypop",
    notes: "Close to Mochiy Pop One, but a little neater and more poster-like.",
    roundness: "Very high",
    slug: "04-mochiy-pop-p-one",
    title: "Mochiy Pop P One",
  },
  {
    fontKey: "yusei-magic",
    fontWeight: 400,
    github: "https://github.com/tanukifont/YuseiMagic",
    notes: "Extremely bold marker style. Thick, but less rounded than the others.",
    roundness: "Medium",
    slug: "05-yusei-magic",
    title: "Yusei Magic",
  },
];

await mkdir(imageDir, {recursive: true});
await mkdir(tempDir, {recursive: true});

const outputs = [];

for (const candidate of candidates) {
  const propsPath = path.join(tempDir, `${candidate.slug}.json`);
  const outputPath = path.join(imageDir, `${candidate.slug}.jpg`);
  const props = {
    themeOverride: {
      title: {
        font: candidate.fontKey,
        fontWeight: candidate.fontWeight,
      },
    },
  };

  await writeFile(propsPath, JSON.stringify(props, null, 2) + "\n", "utf8");

  execFileSync(
    "node",
    [
      cliPath,
      "still",
      "./src/index.jsx",
      "PreMilkWorkoutBubbleParade",
      outputPath,
      `--frame=${frame}`,
      `--props=${propsPath}`,
    ],
    {
      cwd: appRoot,
      stdio: "inherit",
    },
  );

  outputs.push({
    ...candidate,
    frame,
    image: `docs/public/images/font-comparison/${candidate.slug}.jpg`,
    outputPath,
  });
}

const markdown = [
  "# Font Comparison",
  "",
  "Bubble Parade title-only stills for comparing thicker / rounder font options before full video renders.",
  "",
  `Source composition: \`PreMilkWorkoutBubbleParade\``,
  "",
  `Frame: \`${frame}\``,
  "",
  `Generated tag: \`${versionTag}\``,
  "",
  "| Font | Preview | Roundness | Notes | GitHub |",
  "| --- | --- | --- | --- | --- |",
  ...outputs.map((entry) => {
    const preview = `![${entry.title}](./${entry.image})`;
    const github = entry.github.startsWith("http") ? `[link](${entry.github})` : entry.github;
    return `| ${entry.title} | ${preview} | ${entry.roundness} | ${entry.notes} | ${github} |`;
  }),
  "",
].join("\n");

await writeFile(markdownPath, markdown, "utf8");
await writeFile(
  manifestPath,
  JSON.stringify(
    {
      frame,
      generatedAtLocal: new Date().toISOString(),
      outputs,
      versionTag,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

await rm(tempDir, {force: true, recursive: true});

console.log(`[render-font-comparison-stills] Done: ${markdownPath}`);
