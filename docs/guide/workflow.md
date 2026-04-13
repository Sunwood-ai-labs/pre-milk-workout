# Workflow

## Composition registry

The project registers seven compositions in `remotion-app/src/Root.jsx`.

| Composition ID | Theme file | Output slug |
| --- | --- | --- |
| `PreMilkWorkoutPopMotion` | `Variant01CharacterSheet.jsx` | `01-character-sheet` |
| `PreMilkWorkoutBottleLabel` | `Variant02MilkBottleLabel.jsx` | `02-milk-bottle-label` |
| `PreMilkWorkoutStickerAlbum` | `Variant03StickerAlbum.jsx` | `03-sticker-album` |
| `PreMilkWorkoutStorybookRibbon` | `Variant04StorybookRibbon.jsx` | `04-storybook-ribbon` |
| `PreMilkWorkoutToyCatalog` | `Variant05ToyCatalog.jsx` | `05-toy-catalog` |
| `PreMilkWorkoutBubbleParade` | `Variant06BubbleParade.jsx` | `06-bubble-parade` |
| `PreMilkWorkoutCandyMarqueeConcept` | `Variant07CandyMarqueeConcept.jsx` | `07-candy-marquee-concept` |

## Single render

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run render
```

The default script renders `PreMilkWorkoutPopMotion`.

## Batch render

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run render:all
```

Batch rendering:

- creates a timestamp-like version tag
- writes MP4 outputs under `renders/versions/<versionTag>/`
- emits a manifest file that records each composition ID and output path

## Thumbnail generation

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run generate:thumbs -- v20260413-134900-perchar-vivid
```

Thumbnail generation:

- reads the render manifest from `renders/versions/<versionTag>/manifest.json`
- writes title and credit JPGs under `renders/versions/<versionTag>/thumbs/`
- copies the same JPGs into `docs/public/images/latest/` for documentation
- emits `manifest.json` files for both the versioned thumbs folder and the docs-public folder

## Output expectations

- `renders/` is intentionally ignored by Git
- `public/` and `src/generated/` are regenerated assets inside the app workspace
- the repository only tracks source code, docs, and selected preview images
