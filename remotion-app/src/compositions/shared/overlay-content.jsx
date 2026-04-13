export const MOTION_TITLE = {
  main: "ミルク前の軽い運動",
  sub: "～Seedance 2.0 x Lovart コンテスト～",
};

export const BASE_CREDIT_SECTIONS = [
  {
    title: "動画",
    wide: false,
    items: [
      {label: "Lovart", value: "Seedance 2.0"},
      {label: "プロンプト", value: "15ショットプロンプト"},
    ],
  },
  {
    title: "キャラクターメイク",
    wide: false,
    items: [
      {label: "Lovart", value: "nano banana pro / 2"},
      {label: "プロンプト", value: "着ぐるみバブバブ プロンプト"},
    ],
  },
  {
    title: "リリックモーション",
    wide: true,
    items: [
      {label: "Codex", value: "GPT5.4 xHigh"},
      {label: "スキル", value: "midnight memory"},
    ],
  },
];

export const FONT_DISPLAY_POP =
  '"UD Digi Kyokasho N", "UD Digi Kyokasho NK", "UD Digi Kyokasho NP", "BIZ UDPGothic", "Yu Gothic UI", sans-serif';

export const FONT_DISPLAY_POP_BOLD =
  '"UD Digi Kyokasho N-B", "UD Digi Kyokasho NP-B", "UD Digi Kyokasho NK-B", "UD Digi Kyokasho N", "BIZ UDGothic Bold", "Yu Gothic UI", sans-serif';

export const FONT_UI =
  '"BIZ UDPGothic", "BIZ UDGothic", "Yu Gothic UI", "Meiryo", sans-serif';

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
