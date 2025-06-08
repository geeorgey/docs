# Slide Framework 使用ガイド

## 概要

Slide Frameworkは、Markdownベースでプレゼンテーションスライドを作成できる軽量で柔軟なフレームワークです。Marpにインスパイアされ、シンプルな記法で美しいスライドを作成できるよう設計されています。

## 特徴

### 主要機能
- **Markdownベース**: 直感的で学習コストの低い記法
- **豊富なテンプレート**: 8種類の用途別デザインテンプレート
- **拡張記法**: 画像配置、2カラムレイアウト、注釈ボックスなど
- **レスポンシブ対応**: デスクトップ・モバイル両対応
- **リアルタイムプレビュー**: ブラウザでの即座な確認
- **カスタマイズ可能**: 詳細な設定とスタイル調整

### サポートするテンプレート
1. **default** - 標準的なデザイン
2. **corporate** - ビジネス向けデザイン
3. **academic** - 学術発表向けデザイン
4. **creative** - クリエイティブ向けデザイン
5. **technical** - 技術発表向けデザイン
6. **elegant** - エレガント・高級感のあるデザイン
7. **minimal** - ミニマルデザイン
8. **dark** - ダークテーマ

## クイックスタート

### 1. ファイル構成の確認

```
slide-framework/
├── index.html          # メインビューア
├── framework.js        # レンダリングエンジン
├── framework.css       # 基本スタイル
├── config.json         # 設定ファイル
├── slides.md           # スライド本文（Markdown）
├── templates/          # デザインテンプレート
│   ├── default/
│   ├── corporate/
│   ├── academic/
│   ├── creative/
│   ├── technical/
│   ├── elegant/
│   ├── minimal/
│   └── dark/
└── examples/           # サンプルスライド
```

### 2. 基本的なスライドの作成

`slides.md`ファイルを編集してスライドを作成します：

```markdown
---
title: "プレゼンテーションタイトル"
date: "2025-06-08"
author: "発表者名"
---

# 最初のスライド

これは最初のスライドの内容です。

---

# 2番目のスライド

## サブタイトル

- 箇条書き項目1
- 箇条書き項目2
- 箇条書き項目3

---

# 3番目のスライド

段落テキストの例です。**太字**や*斜体*も使用できます。

> 引用文の例です。重要なポイントを強調する際に使用します。
```

### 3. 設定ファイルの編集

`config.json`でプレゼンテーションの設定を行います：

```json
{
  "presentation": {
    "title": "プレゼンテーションタイトル",
    "author": "発表者名",
    "date": "2025-06-08"
  },
  "template": {
    "name": "corporate"
  }
}
```

### 4. プレビューの確認

`index.html`をブラウザで開いてプレゼンテーションを確認します。

## 詳細な記法ガイド

### 基本的なMarkdown記法

#### 見出し
```markdown
# レベル1見出し（スライドタイトル）
## レベル2見出し
### レベル3見出し
#### レベル4見出し
```

#### テキスト装飾
```markdown
**太字テキスト**
*斜体テキスト*
`インラインコード`
~~取り消し線~~
```

#### リスト
```markdown
- 箇条書き項目1
- 箇条書き項目2
  - ネストした項目
  - ネストした項目

1. 番号付きリスト1
2. 番号付きリスト2
3. 番号付きリスト3
```

#### リンクと画像
```markdown
[リンクテキスト](https://example.com)
![画像の説明](path/to/image.jpg)
```

### 拡張記法

#### カスタムクラス指定
テキストや見出しにカスタムCSSクラスを適用できます：

```markdown
# タイトル {.text-center .text-large}
段落テキスト {.highlight}
```

#### 画像配置オプション
画像の配置とサイズを指定できます：

```markdown
![画像](image.jpg){.center .large}
![画像](image.jpg){.right .medium}
![画像](image.jpg){.left .small}
```

利用可能なクラス：
- **配置**: `center`, `left`, `right`
- **サイズ**: `small`, `medium`, `large`, `full`

#### 2カラムレイアウト
スライドを2つのカラムに分割できます：

```markdown
::: columns

左カラムの内容
- 項目1
- 項目2

---

右カラムの内容
- 項目A
- 項目B

:::
```

#### 注釈ボックス
重要な情報を目立たせる注釈ボックスを作成できます：

```markdown
::: note
これは注釈ボックスです。補足情報を記載する際に使用します。
:::

::: warning
これは警告ボックスです。注意事項を記載する際に使用します。
:::

::: success
これは成功ボックスです。良い結果や推奨事項を記載する際に使用します。
:::

::: error
これはエラーボックスです。問題点や避けるべき事項を記載する際に使用します。
:::
```

#### 数式表記
簡易的な数式表記をサポートしています：

```markdown
インライン数式: $E = mc^2$

ブロック数式:
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

#### コードブロック
プログラミングコードを表示できます：

```markdown
```javascript
function hello() {
    console.log("Hello, World!");
}
```

```python
def hello():
    print("Hello, World!")
```
```

### スライド固有設定

各スライドに個別の設定を適用できます：

```markdown
<!-- slide-config: {
    "backgroundColor": "#f0f9ff",
    "textColor": "#1e293b",
    "className": "special-slide",
    "fontSize": "1.2em"
} -->

# 特別なスライド

このスライドには個別の設定が適用されます。
```

## 設定ファイル詳細

### 基本設定

```json
{
  "presentation": {
    "title": "プレゼンテーションタイトル",
    "author": "発表者名",
    "date": "2025-06-08",
    "company": "会社名",
    "duration": "30分"
  }
}
```

### テンプレート設定

```json
{
  "template": {
    "name": "corporate",
    "theme": "blue",
    "aspectRatio": "16:9",
    "customColors": {
      "primary": "#1e40af",
      "secondary": "#64748b",
      "accent": "#f59e0b",
      "background": "#ffffff",
      "text": "#1e293b"
    }
  }
}
```

### 表示設定

```json
{
  "settings": {
    "autoHeight": true,
    "showSlideNumbers": true,
    "showProgress": true,
    "enableFullscreen": true,
    "enableKeyboardNavigation": true,
    "enableTouchNavigation": true,
    "enableAnimations": true,
    "animationDuration": 300,
    "transitionType": "slide"
  }
}
```

### タイポグラフィ設定

```json
{
  "typography": {
    "fontFamily": "system-ui, -apple-system, sans-serif",
    "baseFontSize": "1rem",
    "lineHeight": 1.6,
    "headingScale": {
      "h1": "3.5rem",
      "h2": "3rem",
      "h3": "2.5rem",
      "h4": "2rem",
      "h5": "1.8rem",
      "h6": "1.6rem"
    },
    "mobileScale": 0.8
  }
}
```

### レイアウト設定

```json
{
  "layout": {
    "padding": "3rem",
    "mobilePadding": "1.5rem",
    "maxWidth": "100%",
    "textAlign": "left",
    "verticalAlign": "top"
  }
}
```

## 操作方法

### キーボードショートカット

- **矢印キー（左/右）**: 前/次のスライドに移動
- **スペースキー**: 次のスライドに移動
- **PageUp/PageDown**: 前/次のスライドに移動
- **Home**: 最初のスライドに移動
- **End**: 最後のスライドに移動
- **F**: 全画面表示の切り替え
- **Escape**: 全画面表示の終了

### マウス・タッチ操作

- **クリック**: ナビゲーションボタンでスライド移動
- **スワイプ**: モバイルデバイスでのスライド移動
- **サムネイルクリック**: 特定のスライドに直接移動

### URL直接アクセス

特定のスライドに直接アクセスできます：

```
index.html?slide=5  # 5番目のスライドを表示
```

## カスタマイズガイド

### 新しいテンプレートの作成

1. `templates/`ディレクトリに新しいフォルダを作成
2. `template.css`ファイルを作成
3. CSS変数とスタイルを定義

```css
/**
 * Custom Template
 */

:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}

.slide {
    background: var(--primary-color);
    color: white;
}
```

### カスタムCSSクラスの追加

`framework.css`にカスタムクラスを追加：

```css
.custom-highlight {
    background: yellow;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
}

.custom-large-text {
    font-size: 2em;
    font-weight: bold;
}
```

### JavaScript機能の拡張

`framework.js`を編集して新しい機能を追加できます。例えば、カスタムアニメーションやインタラクティブ要素など。

## トラブルシューティング

### よくある問題

#### スライドが表示されない
- `slides.md`ファイルの存在を確認
- Markdownの記法が正しいかチェック
- ブラウザのコンソールでエラーを確認

#### テンプレートが適用されない
- `config.json`のテンプレート名が正しいかチェック
- テンプレートファイルが存在するか確認
- ブラウザのキャッシュをクリア

#### 画像が表示されない
- 画像ファイルのパスが正しいかチェック
- 画像ファイルが存在するか確認
- 相対パスを使用しているか確認

#### モバイルで正しく表示されない
- レスポンシブ設定を確認
- モバイル用のフォントサイズ設定をチェック
- ビューポート設定を確認

### デバッグ方法

1. ブラウザの開発者ツールを開く
2. コンソールタブでエラーメッセージを確認
3. ネットワークタブでファイルの読み込み状況を確認
4. エレメントタブでCSSの適用状況を確認

## ベストプラクティス

### スライド作成のコツ

1. **1スライド1メッセージ**: 各スライドには1つの主要なメッセージのみ
2. **適切な文字サイズ**: 後ろの席からも読める大きさに
3. **画像の活用**: テキストだけでなく視覚的要素も重要
4. **一貫性の保持**: 同じテンプレートとスタイルを使用
5. **シンプルな構成**: 複雑すぎる内容は避ける

### パフォーマンス最適化

1. **画像の最適化**: 適切なサイズと形式を使用
2. **スライド数の管理**: 必要以上に多くしない
3. **アニメーションの適度な使用**: 過度なアニメーションは避ける

### アクセシビリティ

1. **適切なコントラスト**: 文字と背景の色のコントラストを確保
2. **代替テキスト**: 画像には適切なalt属性を設定
3. **キーボード操作**: マウスなしでも操作可能に
4. **読み上げ対応**: スクリーンリーダーでも理解できる構造に

## 高度な使用方法

### 複数のプレゼンテーションの管理

複数のプレゼンテーションを管理する場合：

1. プロジェクトごとにディレクトリを分ける
2. 共通のテンプレートは共有する
3. 設定ファイルでプロジェクト固有の設定を管理

### 外部ツールとの連携

#### Git管理
```bash
git init
git add .
git commit -m "Initial presentation"
```

#### 自動デプロイ
GitHub Pagesやその他のホスティングサービスと連携して自動デプロイを設定できます。

### エクスポート機能

将来的に実装予定の機能：
- PDF出力
- 画像出力
- 印刷最適化

## まとめ

Slide Frameworkは、シンプルでありながら強力なプレゼンテーション作成ツールです。Markdownの直感的な記法と豊富なカスタマイズオプションにより、様々な用途のプレゼンテーションを効率的に作成できます。

このガイドを参考に、あなたの素晴らしいプレゼンテーションを作成してください。質問や改善提案がございましたら、お気軽にお知らせください。

