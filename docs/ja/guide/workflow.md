# ワークフロー

## Composition 登録

このプロジェクトでは `remotion-app/src/Root.jsx` に 5 つの composition を登録しています。

| Composition ID | テーマファイル | 出力 slug |
| --- | --- | --- |
| `PreMilkWorkoutPopMotion` | `Variant01CharacterSheet.jsx` | `01-character-sheet` |
| `PreMilkWorkoutBottleLabel` | `Variant02MilkBottleLabel.jsx` | `02-milk-bottle-label` |
| `PreMilkWorkoutStickerAlbum` | `Variant03StickerAlbum.jsx` | `03-sticker-album` |
| `PreMilkWorkoutStorybookRibbon` | `Variant04StorybookRibbon.jsx` | `04-storybook-ribbon` |
| `PreMilkWorkoutToyCatalog` | `Variant05ToyCatalog.jsx` | `05-toy-catalog` |

## 単体 render

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run render
```

既定スクリプトは `PreMilkWorkoutPopMotion` を出力します。

## 一括 render

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run render:all
```

一括 render では:

- タイムスタンプ風の版タグを作る
- `renders/versions/<versionTag>/` に MP4 を出力する
- composition ID と出力パスを manifest に残す

## 出力の考え方

- `renders/` はルートで Git ignore
- `public/` と `src/generated/` は app 側で再生成される
- 公開 repo では docs 用の軽量 preview 画像だけを追跡する
