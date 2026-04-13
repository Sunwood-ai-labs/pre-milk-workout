---
layout: home

hero:
  name: pre-milk-workout
  text: Japanese guide for the Remotion pop-motion workflow
  tagline: Six composition variants, asset prep, and Windows-friendly render steps for this project.
  image:
    src: /brand/pre-milk-workout-icon.svg
    alt: pre-milk-workout icon
  actions:
    - theme: brand
      text: Getting Started
      link: /ja/guide/getting-started
    - theme: alt
      text: Workflow
      link: /ja/guide/workflow
    - theme: alt
      text: English
      link: /

features:
  - title: Six visual variants
    details: Character sheet, milk bottle label, sticker album, storybook ribbon, toy catalog, and bubble parade are all available in one Remotion root.
  - title: Asset prep before preview
    details: The source video is synced into `public/` and composition metadata is regenerated before preview or render.
  - title: Versioned render output
    details: Stable folders under `renders/versions/` make visual iteration easy to compare.
---

## Preview Frames

<div class="preview-grid">
  <figure class="preview-card">
    <img src="/images/latest/01-character-sheet__title.jpg" alt="Character sheet title frame" />
    <figcaption>Variant 01: Character sheet</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/02-milk-bottle-label__title.jpg" alt="Milk bottle label title frame" />
    <figcaption>Variant 02: Milk bottle label</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/03-sticker-album__title.jpg" alt="Sticker album title frame" />
    <figcaption>Variant 03: Sticker album</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/04-storybook-ribbon__title.jpg" alt="Storybook ribbon title frame" />
    <figcaption>Variant 04: Storybook ribbon</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/05-toy-catalog__title.jpg" alt="Toy catalog title frame" />
    <figcaption>Variant 05: Toy catalog</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/06-bubble-parade__title.jpg" alt="Bubble parade title frame" />
    <figcaption>Variant 06: Bubble parade</figcaption>
  </figure>
</div>

## Credit Frames

<div class="preview-grid">
  <figure class="preview-card">
    <img src="/images/latest/01-character-sheet__credit.jpg" alt="Character sheet credit frame" />
    <figcaption>Variant 01 credit</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/02-milk-bottle-label__credit.jpg" alt="Milk bottle label credit frame" />
    <figcaption>Variant 02 credit</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/03-sticker-album__credit.jpg" alt="Sticker album credit frame" />
    <figcaption>Variant 03 credit</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/04-storybook-ribbon__credit.jpg" alt="Storybook ribbon credit frame" />
    <figcaption>Variant 04 credit</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/05-toy-catalog__credit.jpg" alt="Toy catalog credit frame" />
    <figcaption>Variant 05 credit</figcaption>
  </figure>
  <figure class="preview-card">
    <img src="/images/latest/06-bubble-parade__credit.jpg" alt="Bubble parade credit frame" />
    <figcaption>Variant 06 credit</figcaption>
  </figure>
</div>

<div class="hero-callout">
  The source video itself is not stored in the repository. Place <code>video.mp4</code> at the repository root before preview or render.
</div>

## Documentation Map

- [Getting Started](/ja/guide/getting-started): setup, required files, and first preview.
- [Workflow](/ja/guide/workflow): composition IDs, render commands, and output conventions.
- [Architecture](/ja/guide/architecture): how the Remotion root, scripts, and generated metadata fit together.
- [Troubleshooting](/ja/guide/troubleshooting): common setup and render issues.