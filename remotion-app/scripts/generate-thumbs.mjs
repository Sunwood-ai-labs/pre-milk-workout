import {execFileSync} from "node:child_process";
import {copyFile, mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(appRoot, "..");

const versionTag = process.argv[2];

if (!versionTag) {
  console.error("Usage: node ./scripts/generate-thumbs.mjs <versionTag>");
  process.exit(1);
}

const versionDir = path.join(workspaceRoot, "renders", "versions", versionTag);
const manifestPath = path.join(versionDir, "manifest.json");
const thumbsDir = path.join(versionDir, "thumbs");
const docsLatestDir = path.join(workspaceRoot, "docs", "public", "images", "latest");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

await mkdir(thumbsDir, {recursive: true});
await mkdir(docsLatestDir, {recursive: true});

const snapshots = [];

for (const output of manifest.outputs) {
  const slug = output.filename.split("__")[0];
  const inputPath = output.path;
  const titleName = `${slug}__title.jpg`;
  const creditName = `${slug}__credit.jpg`;
  const titlePath = path.join(thumbsDir, titleName);
  const creditPath = path.join(thumbsDir, creditName);

  execFileSync(
    "ffmpeg",
    ["-y", "-i", inputPath, "-ss", "00:00:03", "-frames:v", "1", "-update", "1", titlePath],
    {stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    ["-y", "-i", inputPath, "-ss", "00:00:51", "-frames:v", "1", "-update", "1", creditPath],
    {stdio: "inherit"},
  );

  const docTitlePath = path.join(docsLatestDir, titleName);
  const docCreditPath = path.join(docsLatestDir, creditName);
  await copyFile(titlePath, docTitlePath);
  await copyFile(creditPath, docCreditPath);

  snapshots.push({
    compositionId: output.compositionId,
    creditImage: creditPath,
    creditImagePublic: docCreditPath,
    slug,
    titleImage: titlePath,
    titleImagePublic: docTitlePath,
    video: inputPath,
  });
}

await writeFile(
  path.join(thumbsDir, "manifest.json"),
  JSON.stringify(
    {
      versionTag,
      generatedAtLocal: new Date().toISOString(),
      snapshots,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

await writeFile(
  path.join(docsLatestDir, "manifest.json"),
  JSON.stringify(
    {
      versionTag,
      generatedAtLocal: new Date().toISOString(),
      snapshots: snapshots.map((entry) => ({
        compositionId: entry.compositionId,
        creditImage: path.basename(entry.creditImagePublic),
        slug: entry.slug,
        titleImage: path.basename(entry.titleImagePublic),
      })),
    },
    null,
    2,
  ) + "\n",
  "utf8",
);

console.log(`[generate-thumbs] Done: ${thumbsDir}`);
