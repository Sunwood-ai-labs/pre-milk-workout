import {defineConfig} from "vitepress";

const repoUrl = "https://github.com/Sunwood-ai-labs/pre-milk-workout";
const pagesUrl = "https://sunwood-ai-labs.github.io/pre-milk-workout/";

const englishSidebar = [
  {
    text: "Guide",
    items: [
      {text: "Getting Started", link: "/guide/getting-started"},
      {text: "Workflow", link: "/guide/workflow"},
      {text: "Architecture", link: "/guide/architecture"},
      {text: "Troubleshooting", link: "/guide/troubleshooting"},
    ],
  },
];

const japaneseSidebar = [
  {
    text: "ガイド",
    items: [
      {text: "はじめに", link: "/ja/guide/getting-started"},
      {text: "ワークフロー", link: "/ja/guide/workflow"},
      {text: "構成", link: "/ja/guide/architecture"},
      {text: "トラブルシュート", link: "/ja/guide/troubleshooting"},
    ],
  },
];

export default defineConfig({
  title: "pre-milk-workout",
  description: "Remotion pop-motion overlays for a stylized workout video workflow.",
  base: "/pre-milk-workout/",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", {rel: "icon", href: "/brand/pre-milk-workout-icon.svg"}],
    ["meta", {name: "theme-color", content: "#8fc4f1"}],
  ],
  themeConfig: {
    logo: "/brand/pre-milk-workout-icon.svg",
    search: {
      provider: "local",
    },
    socialLinks: [{icon: "github", link: repoUrl}],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Sunwood-ai-labs",
    },
  },
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      themeConfig: {
        nav: [
          {text: "Guide", link: "/guide/getting-started"},
          {text: "Japanese", link: "/ja/"},
          {text: "GitHub", link: repoUrl},
          {text: "Site", link: pagesUrl},
        ],
        sidebar: englishSidebar,
        outlineTitle: "On this page",
        docFooter: {
          prev: "Previous page",
          next: "Next page",
        },
      },
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      link: "/ja/",
      themeConfig: {
        nav: [
          {text: "ガイド", link: "/ja/guide/getting-started"},
          {text: "English", link: "/"},
          {text: "GitHub", link: repoUrl},
          {text: "Site", link: pagesUrl},
        ],
        sidebar: japaneseSidebar,
        outlineTitle: "このページの内容",
        docFooter: {
          prev: "前のページ",
          next: "次のページ",
        },
      },
    },
  },
});
