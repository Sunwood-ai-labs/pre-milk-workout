---
layout: home

hero:
  name: pre-milk-workout
  text: Remotion で組むポップモーション演出ワークフロー
  tagline: 5 種類の composition、asset 準備の自動化、Windows 前提の render スクリプトをまとめた公開 docs です。
  image:
    src: /brand/pre-milk-workout-icon.svg
    alt: pre-milk-workout icon
  actions:
    - theme: brand
      text: はじめに
      link: /ja/guide/getting-started
    - theme: alt
      text: ワークフロー
      link: /ja/guide/workflow
    - theme: alt
      text: English
      link: /

features:
  - title: 5 つのビジュアル差分
    details: Character sheet、milk bottle label、sticker album、storybook ribbon、toy catalog の 5 系統を 1 つの Remotion root に登録しています。
  - title: preview 前の asset 準備
    details: 元動画を `public/` に同期し、composition 用のメタデータを再生成してから preview / render に入れます。
  - title: 版管理つき render 出力
    details: 一括 render は `renders/versions/` に版タグつきで出力されるので、比較や整理がしやすい構成です。
---

## プレビュー

<div class="preview-grid">
  <figure class="preview-card">
    <img src="/images/title-01.jpg" alt="Character sheet title frame" />
    <figcaption>Variant 01: Character sheet</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/title-02.jpg" alt="Milk bottle label title frame" />
    <figcaption>Variant 02: Milk bottle label</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/title-03.jpg" alt="Sticker album title frame" />
    <figcaption>Variant 03: Sticker album</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/title-04.jpg" alt="Storybook ribbon title frame" />
    <figcaption>Variant 04: Storybook ribbon</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/title-05.jpg" alt="Toy catalog title frame" />
    <figcaption>Variant 05: Toy catalog</figcaption>
  </figure>
</div>

<div class="hero-callout">
  元動画そのものは repository には含めていません。preview や render の前に repository ルートへ <code>video.mp4</code> を置いてください。
</div>

## ドキュメント案内

- [はじめに](/ja/guide/getting-started): セットアップ、必要ファイル、最初の preview。
- [ワークフロー](/ja/guide/workflow): composition ID、render コマンド、出力ルール。
- [構成](/ja/guide/architecture): Remotion root、スクリプト、生成メタデータの関係。
- [トラブルシュート](/ja/guide/troubleshooting): よくある詰まりどころ。
