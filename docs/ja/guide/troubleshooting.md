# トラブルシュート

## `video.mp4` が見つからない

`npm run prepare:assets` が失敗する場合は、元動画が repository ルートにあるか確認してください。

```powershell
Get-Item D:\Prj\pre-milk-workout\video.mp4
```

## 生成メタデータが古い

asset 準備を再実行します。

```powershell
cd D:\Prj\pre-milk-workout\remotion-app
npm run prepare:assets
```

`src/generated/` 配下は意図的に Git 追跡外です。

## render 出力が commit されない

これは想定どおりです。

- `renders/` はルートで ignore
- `public/` と `out/` は `remotion-app/` 側で ignore
- 公開用には docs で使う軽量 preview 画像だけを追跡する

## asset 準備時の deprecation warning

現在の `prepare:assets` 実行では、file handle の GC close に関する Node warning が出ることがあります。直近の検証ではコマンド自体は成功しましたが、将来的にスクリプトを触る時は見直し候補です。
