# Workflow

## Composition registry

The project registers five compositions in `remotion-app/src/Root.jsx`.

| Composition ID | Theme file | Output slug |
| --- | --- | --- |
| `PreMilkWorkoutPopMotion` | `Variant01CharacterSheet.jsx` | `01-character-sheet` |
| `PreMilkWorkoutBottleLabel` | `Variant02MilkBottleLabel.jsx` | `02-milk-bottle-label` |
| `PreMilkWorkoutStickerAlbum` | `Variant03StickerAlbum.jsx` | `03-sticker-album` |
| `PreMilkWorkoutStorybookRibbon` | `Variant04StorybookRibbon.jsx` | `04-storybook-ribbon` |
| `PreMilkWorkoutToyCatalog` | `Variant05ToyCatalog.jsx` | `05-toy-catalog` |

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

## Output expectations

- `renders/` is intentionally ignored by Git
- `public/` and `src/generated/` are regenerated assets inside the app workspace
- the repository only tracks source code, docs, and selected preview images
