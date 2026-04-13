# フォント比較

タイトルのみの比較画像を使って、フル動画を render しなくても丸みや太さの違う POP 系フォントを見比べられるようにしています。

- 比較元 composition: `PreMilkWorkoutBubbleParade`
- 比較フレーム: `90`
- 生成コマンド: `npm run render:font-compare -- font-compare-20260413 90`
- repository 上の記録: `FONT_COMPARISON.md`

## コンセプト比較

| バリアント | タイトルプレビュー | クレジットプレビュー | メモ |
| --- | --- | --- | --- |
| `PreMilkWorkoutBubbleParade` | <img src="/images/latest/06-bubble-parade__title.jpg" width="320" alt="バブルパレードのタイトルプレビュー" /> | <img src="/images/latest/06-bubble-parade__credit.jpg" width="320" alt="バブルパレードのクレジットプレビュー" /> | 現在の丸み強めな基準案です。 |
| `PreMilkWorkoutCandyMarqueeConcept` | <img src="/images/latest/07-candy-marquee-concept__title.jpg" width="320" alt="キャンディーマーキーコンセプトのタイトルプレビュー" /> | <img src="/images/latest/07-candy-marquee-concept__credit.jpg" width="320" alt="キャンディーマーキーコンセプトのクレジットプレビュー" /> | 看板感を強めた、より派手な別案です。 |

| フォント | プレビュー | 丸み | メモ | GitHub |
| --- | --- | --- | --- | --- |
| Current system | <img src="/images/font-comparison/00-current-system.jpg" width="320" alt="現行システムフォントの比較画像" /> | 中 | 現在の基準案です。やわらかい印象ですが、特別に太くはありません。 | 既存システム / fallback stack |
| Zen Maru Gothic Black | <img src="/images/font-comparison/01-zen-maru-black.jpg" width="320" alt="Zen Maru Gothic Black の比較画像" /> | 高 | きれいで読みやすい一方、POP 候補よりはマシュマロ感が弱めです。 | [link](https://github.com/googlefonts/zen-marugothic) |
| Hachi Maru Pop | <img src="/images/font-comparison/02-hachi-maru-pop.jpg" width="320" alt="Hachi Maru Pop の比較画像" /> | とても高い | レトロでかわいく、軽やかな丸みがあります。 | [link](https://github.com/noriokanisawa/HachiMaruPop) |
| Mochiy Pop One | <img src="/images/font-comparison/03-mochiy-pop-one.jpg" width="320" alt="Mochiy Pop One の比較画像" /> | とても高い | もっとも太く、もっとも丸い候補です。POP 感も最強です。 | [link](https://github.com/fontdasu/Mochiypop) |
| Mochiy Pop P One | <img src="/images/font-comparison/04-mochiy-pop-p-one.jpg" width="320" alt="Mochiy Pop P One の比較画像" /> | とても高い | Mochiy Pop One に近い印象で、少しだけ整ってシャープです。 | [link](https://github.com/fontdasu/Mochiypop) |
| Yusei Magic | <img src="/images/font-comparison/05-yusei-magic.jpg" width="320" alt="Yusei Magic の比較画像" /> | 中 | 太いマーカーペン風で、迫力はあるものの丸みは控えめです。 | [link](https://github.com/tanukifont/YuseiMagic) |

## 現時点の見立て

- 第一候補: `Mochiy Pop One`
- 第二候補: `Mochiy Pop P One`
- 第三候補: `Hachi Maru Pop`

## 未確認

- 明るい背景と暗い背景の両方で、複数フレームをまたいだ視認性
- タイトルフォント決定後の字幕パートとクレジットパート全体での読みやすさ
