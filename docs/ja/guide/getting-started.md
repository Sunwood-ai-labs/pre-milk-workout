# はじめに

## 必要なもの

- Windows PowerShell
- Node.js と npm
- `D:\Prj\pre-milk-workout\video.mp4` に置いた元動画

## 依存関係のインストール

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm install
```

## 動画 asset の準備

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
```

この処理で次を行います。

- ルートの `video.mp4` を `remotion-app/public/video.mp4` に同期
- 幅、高さ、長さ、FPS を取得
- `remotion-app/src/generated/video-metadata.jsx` を再生成

## preview を起動

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run preview
```

`src/Root.jsx` に登録された全 composition が Remotion Studio に並びます。
