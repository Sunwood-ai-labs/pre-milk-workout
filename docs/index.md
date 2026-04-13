---
layout: home

hero:
  name: pre-milk-workout
  text: Remotion pop-motion overlays for a stylized video workflow
  tagline: Five composition variants, automated asset prep, and Windows-friendly render scripts for remixing a source performance clip.
  image:
    src: /brand/pre-milk-workout-icon.svg
    alt: pre-milk-workout icon
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Workflow
      link: /guide/workflow
    - theme: alt
      text: 日本語
      link: /ja/

features:
  - title: Five visual variants
    details: Character sheet, milk bottle label, sticker album, storybook ribbon, and toy catalog layouts are all registered under one Remotion root.
  - title: Asset prep before preview
    details: A single preparation step syncs the source video into `public/` and regenerates composition metadata before Studio preview or render.
  - title: Versioned render output
    details: Batch rendering writes stable version folders under `renders/versions/` so visual iterations stay easy to compare.
---

## Preview frames

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
  The source video itself is not stored in the repository. Place it at the repository root as <code>video.mp4</code> before running preview or render commands.
</div>

## Documentation map

- [Getting Started](/guide/getting-started): setup, required files, and first preview.
- [Workflow](/guide/workflow): composition IDs, render commands, and output conventions.
- [Architecture](/guide/architecture): how the Remotion root, scripts, and generated metadata fit together.
- [Troubleshooting](/guide/troubleshooting): common setup and render issues.
