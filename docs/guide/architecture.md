# Architecture

## Repository layout

```text
pre-milk-workout/
├─ remotion-app/
│  ├─ scripts/
│  ├─ src/
│  │  ├─ compositions/
│  │  ├─ generated/
│  │  └─ Root.jsx
│  └─ package.json
├─ docs/
└─ renders/
```

## Key moving parts

### `scripts/prepare-assets.mjs`

Prepares the source video for Remotion by:

- locating `video.mp4` at the repository root
- syncing it into `remotion-app/public/`
- collecting metadata with `mediabunny`
- writing `video-metadata.jsx` for composition sizing and timing

### `src/Root.jsx`

Registers all compositions with shared duration, size, and `videoSrc` props.

### `scripts/render-single.mjs` and `scripts/render-all.mjs`

Wrap the Remotion CLI and enforce consistent output naming for one-off or batch renders.

## Why the docs track preview images

Rendered MP4 outputs are too large for normal Git tracking, but lightweight preview JPGs from `renders/thumbs/` are copied into `docs/public/images/` so the public repository still shows the current look and feel.
