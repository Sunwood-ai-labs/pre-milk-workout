<div align="center">
  <img src="./docs/public/brand/pre-milk-workout-icon.svg" width="108" alt="pre-milk-workout icon" />
  <h1>pre-milk-workout</h1>
  <p><strong>Remotion pop-motion overlays for a stylized workout video project.</strong></p>
  <p>
    <a href="./README.md">English</a>
    |
    <a href="./README.ja.md">Japanese</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Remotion-4.0.441-0B84F3?style=flat-square" alt="Remotion 4.0.441" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square" alt="React 19" />
    <img src="https://img.shields.io/badge/GitHub_Pages-ready-1F6FEB?style=flat-square" alt="GitHub Pages ready" />
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-4D7C0F?style=flat-square" alt="MIT License" /></a>
  </p>
  <p>
    <a href="https://sunwood-ai-labs.github.io/pre-milk-workout/">Docs</a>
    |
    <a href="https://github.com/Sunwood-ai-labs/pre-milk-workout">Repository</a>
  </p>
  <img src="./docs/public/images/title-01.jpg" width="900" alt="Preview frame from the pre-milk-workout Remotion project" />
</div>

## ✨ Overview

`pre-milk-workout` packages a small Remotion workspace for building playful title and credit overlays on top of a source performance video. The project currently ships five visual variants, asset-prep scripts for syncing the source video into the app, and render scripts for both single-output and versioned batch rendering.

## 🚀 Quick Start

Windows PowerShell:

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm install
npm run preview
```

The workspace expects the source clip at `D:\Prj\pre-milk-workout\video.mp4`. That file is intentionally excluded from Git because of size.

## 🧭 Workflow

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
npm run render
npm run render:all
```

- `prepare:assets` links or copies the root `video.mp4` into `remotion-app/public/video.mp4`.
- The same step regenerates `remotion-app/src/generated/video-metadata.jsx`.
- `render` produces one render for the default composition.
- `render:all` writes versioned outputs under `renders/versions/<tag>/`.

## 🎬 Variants

| Composition ID | Style | Output slug |
| --- | --- | --- |
| `PreMilkWorkoutPopMotion` | Character sheet | `01-character-sheet` |
| `PreMilkWorkoutBottleLabel` | Milk bottle label | `02-milk-bottle-label` |
| `PreMilkWorkoutStickerAlbum` | Sticker album | `03-sticker-album` |
| `PreMilkWorkoutStorybookRibbon` | Storybook ribbon | `04-storybook-ribbon` |
| `PreMilkWorkoutToyCatalog` | Toy catalog | `05-toy-catalog` |

More previews and setup notes live in the published docs: [sunwood-ai-labs.github.io/pre-milk-workout](https://sunwood-ai-labs.github.io/pre-milk-workout/).

## 🧱 Repository Layout

- `remotion-app/`: the Remotion application, composition registry, and render scripts
- `docs/`: VitePress documentation site and tracked public assets
- `renders/`: ignored render outputs
- `video.mp4`: ignored local source video

## 🧪 Verification

The current polish pass verifies:

- docs build from `docs/` with VitePress
- README and docs links/routes against the current repository name
- tracked assets stay inside the repository while large generated MP4 files remain ignored

## 📚 Documentation

- English docs: [Docs home](https://sunwood-ai-labs.github.io/pre-milk-workout/)
- Japanese docs: [Japanese home](https://sunwood-ai-labs.github.io/pre-milk-workout/ja/)

## 📝 License

This repository is released under the [MIT License](./LICENSE).
