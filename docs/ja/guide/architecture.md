# 構成

## リポジトリ構造

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

## 主要なパーツ

### `scripts/prepare-assets.mjs`

元動画を Remotion で扱うために:

- repository ルートの `video.mp4` を探す
- `remotion-app/public/` に同期する
- `mediabunny` でメタデータを取る
- composition 用の `video-metadata.jsx` を生成する

### `src/Root.jsx`

全 composition に共通の長さ、解像度、`videoSrc` を渡して登録します。

### `scripts/render-single.mjs` と `scripts/render-all.mjs`

Remotion CLI を包み、単体 render と一括 render の命名規則をそろえています。

## なぜ docs に preview 画像を追跡するのか

MP4 の render 出力は Git 追跡に向きません。その代わり、`renders/thumbs/` から軽量な JPG を `docs/public/images/` にコピーし、公開 repo でも完成イメージが見えるようにしています。
