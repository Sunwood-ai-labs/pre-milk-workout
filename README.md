# pre-milk-workout

This repository contains a Remotion project for creating pop-motion overlays for the "pre-milk-workout" video.

## Structure

- `remotion-app/`: Main Remotion application
- `renders/`: Render output directory (not tracked by Git)
- `video.mp4`: Source video placed at the repository root (not tracked by Git)

## Setup

Windows PowerShell:

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm install
```

After installing dependencies, place the source video at the repository root as `video.mp4`.

## Commands

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run preview
npm run render
npm run render:all
```

`prepare:assets` syncs the root `video.mp4` into `remotion-app/public/video.mp4` and generates `src/generated/video-metadata.jsx`.

## Notes

- `node_modules/`, `out/`, `public/`, and `src/generated/` are excluded by `remotion-app/.gitignore`.
- Large root-level MP4 files and everything under `renders/` are not included in the public repository.
