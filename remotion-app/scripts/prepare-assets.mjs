import {
  copyFile,
  link,
  mkdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {ALL_FORMATS, FilePathSource, Input} from "mediabunny";

const TARGET_FPS = 30;
const FALLBACK_METADATA = {
  width: 1920,
  height: 1080,
  durationInSeconds: 58.167,
  durationInFrames: Math.ceil(58.167 * TARGET_FPS),
  fps: TARGET_FPS,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(appRoot, "..");
const publicDir = path.join(appRoot, "public");
const generatedDir = path.join(appRoot, "src", "generated");

const sourceVideoPath = path.join(repoRoot, "video.mp4");
const targetVideoName = "video.mp4";
const targetVideoPath = path.join(publicDir, targetVideoName);

const formatNumber = (value, precision = 6) => Number(value.toFixed(precision));

const writeModule = async (targetPath, exportName, payload) => {
  const source = `export const ${exportName} = ${JSON.stringify(payload, null, 2)};\n`;
  await writeFile(targetPath, source, "utf8");
};

const ensureSyncedVideo = async () => {
  await mkdir(publicDir, {recursive: true});

  let destinationMatchesSource = false;
  try {
    const [sourceStats, targetStats] = await Promise.all([
      stat(sourceVideoPath),
      stat(targetVideoPath),
    ]);
    destinationMatchesSource =
      sourceStats.size === targetStats.size &&
      targetStats.mtimeMs >= sourceStats.mtimeMs;
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }

  if (destinationMatchesSource) {
    return targetVideoName;
  }

  await rm(targetVideoPath, {force: true});

  try {
    await link(sourceVideoPath, targetVideoPath);
  } catch {
    await copyFile(sourceVideoPath, targetVideoPath);
  }

  return targetVideoName;
};

const loadVideoMetadata = async () => {
  try {
    const input = new Input({
      formats: ALL_FORMATS,
      source: new FilePathSource(sourceVideoPath),
    });
    const durationInSeconds = await input.computeDuration();
    const videoTrack = await input.getPrimaryVideoTrack();

    if (!videoTrack) {
      throw new Error("Primary video track not found.");
    }

    return {
      width: videoTrack.displayWidth,
      height: videoTrack.displayHeight,
      durationInSeconds: formatNumber(durationInSeconds),
      durationInFrames: Math.ceil(durationInSeconds * TARGET_FPS),
      fps: TARGET_FPS,
    };
  } catch (error) {
    console.warn("[prepare-assets] Falling back to known metadata:", error);
    return FALLBACK_METADATA;
  }
};

await mkdir(generatedDir, {recursive: true});

const [videoSrc, videoMetadata] = await Promise.all([
  ensureSyncedVideo(),
  loadVideoMetadata(),
]);

const totalDurationMs = videoMetadata.durationInSeconds * 1000;
const titleEndMs = Math.min(6200, Math.max(4400, totalDurationMs * 0.13));
const creditDurationMs = Math.min(12000, Math.max(9500, totalDurationMs * 0.2));
const creditStartMs = Math.max(titleEndMs + 2200, totalDurationMs - creditDurationMs);

await writeModule(path.join(generatedDir, "video-metadata.jsx"), "videoMetadata", {
  ...videoMetadata,
  videoSrc,
  titleEndMs: formatNumber(titleEndMs, 2),
  creditStartMs: formatNumber(creditStartMs, 2),
});

console.log(
  `[prepare-assets] Ready: ${videoMetadata.width}x${videoMetadata.height}, ${videoMetadata.durationInSeconds}s, title->${formatNumber(titleEndMs / 1000, 2)}s, credits@${formatNumber(creditStartMs / 1000, 2)}s.`,
);
