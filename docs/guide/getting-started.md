# Getting Started

## Requirements

- Windows PowerShell
- Node.js and npm
- A local source video placed at `D:\Prj\pre-milk-workout\video.mp4`

## Install dependencies

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm install
```

## Prepare the video asset

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
```

That step:

- syncs the root `video.mp4` into `remotion-app/public/video.mp4`
- computes width, height, duration, and FPS metadata
- writes the generated values to `remotion-app/src/generated/video-metadata.jsx`

## Launch a preview

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run preview
```

Remotion Studio will open with all registered compositions from `src/Root.jsx`.
