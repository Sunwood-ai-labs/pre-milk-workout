import {defineConfig} from "vitepress";

const repoUrl = "https://github.com/Sunwood-ai-labs/pre-milk-workout";
const pagesUrl = "https://sunwood-ai-labs.github.io/pre-milk-workout/";
const siteBase = "/pre-milk-workout/";
const iconHref = `${siteBase}brand/pre-milk-workout-icon.svg`;

const englishSidebar = [
  {
    text: "Guide",
    items: [
      {text: "Getting Started", link: "/guide/getting-started"},
      {text: "Workflow", link: "/guide/workflow"},
      {text: "Font Comparison", link: "/guide/font-comparison"},
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
      {text: "フォント比較", link: "/ja/guide/font-comparison"},
      {text: "構成", link: "/ja/guide/architecture"},
      {text: "トラブルシュート", link: "/ja/guide/troubleshooting"},
    ],
  },
];

export default defineConfig({
  title: "pre-milk-workout",
  description: "Remotion pop-motion overlays for a stylized workout video workflow.",
  base: siteBase,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", {rel: "icon", href: iconHref}],
    ["meta", {name: "theme-color", content: "#8fc4f1"}],
  ],
  themeConfig: {
    logo: "/brand/pre-milk-workout-icon.svg",
    search: {
      provider: "local",
      options: {
        locales: {
          ja: {
            translations: {
              button: {
                buttonText: "検索",
                buttonAriaLabel: "検索",
              },
              modal: {
                displayDetails: "詳細を表示",
                resetButtonTitle: "検索条件をリセット",
                backButtonTitle: "検索を閉じる",
                noResultsText: "該当する結果が見つかりません",
                footer: {
                  selectText: "選択",
                  selectKeyAriaLabel: "Enter",
                  navigateText: "移動",
                  navigateUpKeyAriaLabel: "上矢印",
                  navigateDownKeyAriaLabel: "下矢印",
                  closeText: "閉じる",
                  closeKeyAriaLabel: "Esc",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [{icon: "github", link: repoUrl}],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Sunwood-ai-labs",
    },
  },
  locales: {
    root: {
      label: "英語",
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
          {text: "英語", link: "/"},
          {text: "GitHub", link: repoUrl},
          {text: "サイト", link: pagesUrl},
        ],
        sidebar: japaneseSidebar,
        outlineTitle: "このページの内容",
        darkModeSwitchLabel: "表示テーマ",
        lightModeSwitchTitle: "ライトモードに切り替え",
        darkModeSwitchTitle: "ダークモードに切り替え",
        sidebarMenuLabel: "メニュー",
        returnToTopLabel: "先頭へ戻る",
        langMenuLabel: "言語を切り替え",
        lastUpdatedText: "最終更新",
        docFooter: {
          prev: "前のページ",
          next: "次のページ",
        },
        footer: {
          message: "MIT License のもとで公開しています。",
          copyright: "Copyright © 2026 Sunwood-ai-labs",
        },
      },
    },
  },
});
