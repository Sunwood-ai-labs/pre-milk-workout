<div align="center">
  <img src="./docs/public/brand/pre-milk-workout-icon.svg" width="108" alt="pre-milk-workout icon" />
  <h1>pre-milk-workout</h1>
  <p><strong>Remotion でワークアウト動画向けのポップなタイトル演出とクレジット演出を組み立てる公開ワークスペースです。</strong></p>
  <p>
    <a href="./README.md">English</a>
    ·
    <a href="./README.ja.md">日本語</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Remotion-4.0.441-0B84F3?style=flat-square" alt="Remotion 4.0.441" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square" alt="React 19" />
    <img src="https://img.shields.io/badge/GitHub_Pages-ready-1F6FEB?style=flat-square" alt="GitHub Pages ready" />
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-4D7C0F?style=flat-square" alt="MIT License" /></a>
  </p>
  <p>
    <a href="https://sunwood-ai-labs.github.io/pre-milk-workout/">Docs</a>
    ·
    <a href="https://github.com/Sunwood-ai-labs/pre-milk-workout">Repository</a>
  </p>
  <img src="./docs/public/images/title-01.jpg" width="900" alt="pre-milk-workout preview frame" />
</div>

## ✨ 概要

`pre-milk-workout` は、元動画の上にポップモーションのタイトルやクレジットを重ねるための Remotion プロジェクトです。現在は 5 種類のビジュアルバリエーション、元動画同期用の asset 準備スクリプト、単体 render と一括 render の両方に対応したスクリプトを含んでいます。

## 🚀 クイックスタート

Windows PowerShell:

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm install
npm run preview
```

元動画は `D:\Prj\pre-milk-workout\video.mp4` に配置する前提です。このファイルはサイズが大きいため Git には含めていません。

## 🧭 ワークフロー

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
npm run render
npm run render:all
```

- `prepare:assets` はルートの `video.mp4` を `remotion-app/public/video.mp4` に同期します。
- 同じ処理で `remotion-app/src/generated/video-metadata.jsx` を再生成します。
- `render` は既定 composition の単体出力です。
- `render:all` は `renders/versions/<tag>/` に版管理つきで一括出力します。

## 🎬 バリエーション

| Composition ID | スタイル | 出力 slug |
| --- | --- | --- |
| `PreMilkWorkoutPopMotion` | Character sheet | `01-character-sheet` |
| `PreMilkWorkoutBottleLabel` | Milk bottle label | `02-milk-bottle-label` |
| `PreMilkWorkoutStickerAlbum` | Sticker album | `03-sticker-album` |
| `PreMilkWorkoutStorybookRibbon` | Storybook ribbon | `04-storybook-ribbon` |
| `PreMilkWorkoutToyCatalog` | Toy catalog | `05-toy-catalog` |

詳細なプレビューと手順は公開 docs にまとめています: [sunwood-ai-labs.github.io/pre-milk-workout](https://sunwood-ai-labs.github.io/pre-milk-workout/).

## 🧱 リポジトリ構成

- `remotion-app/`: Remotion アプリ本体、composition 登録、render スクリプト
- `docs/`: VitePress 製 docs と追跡対象の公開アセット
- `renders/`: Git 追跡外の render 出力
- `video.mp4`: Git 追跡外の元動画

## 🧪 検証

今回の整備では次を確認対象にしています。

- `docs/` からの VitePress build
- 現在の repo 名に対する README / docs のリンクと route
- 追跡対象アセットだけを repo に含め、大容量 MP4 は ignore のまま保つこと

## 📚 ドキュメント

- 英語 docs: [Docs home](https://sunwood-ai-labs.github.io/pre-milk-workout/)
- 日本語 docs: [Japanese home](https://sunwood-ai-labs.github.io/pre-milk-workout/ja/)

## 📝 ライセンス

このリポジトリは [MIT License](./LICENSE) で公開しています。
