---
title: "Slide Framework デモンストレーション"
date: "2025-06-08"
author: "Slide Framework"
duration: "10分"
tags: ["デモ", "機能紹介", "サンプル"]
description: "Slide Frameworkの主要機能を紹介するデモンストレーションスライド"
---

# Slide Framework

## Markdownベースのプレゼンテーションフレームワーク

**シンプル・柔軟・美しい**

---

# 主要機能

## 8つのテンプレート

- **Default** - 標準的なデザイン
- **Corporate** - ビジネス向け
- **Academic** - 学術発表向け
- **Creative** - クリエイティブ向け
- **Technical** - 技術発表向け
- **Elegant** - エレガント
- **Minimal** - ミニマル
- **Dark** - ダークテーマ

---

# 基本的な記法

## Markdownの力

**太字**、*斜体*、`コード`など、馴染みのある記法をそのまま使用できます。

> 引用文も美しく表示されます。重要なポイントを強調する際に効果的です。

### リスト表示
- 箇条書きも
- きれいに
- 表示されます

---

# 拡張機能 {.text-center}

## カスタムクラス指定

テキストにカスタムクラスを適用できます {.highlight}

### 利用可能なクラス
- `.text-center` - 中央揃え
- `.text-large` - 大きな文字
- `.highlight` - ハイライト
- `.text-primary` - プライマリカラー

---

# 画像配置オプション

## 柔軟な画像レイアウト

![サンプル画像](https://via.placeholder.com/400x300/3b82f6/ffffff?text=Center+Large){.center .large}

画像の配置とサイズを簡単に指定できます。

---

# 2カラムレイアウト

::: columns

## 左カラム

- 項目1
- 項目2
- 項目3

複数の情報を並べて表示したい場合に便利です。

---

## 右カラム

- 項目A
- 項目B
- 項目C

比較や対比を表現する際に効果的です。

:::

---

# 注釈ボックス

## 情報の種類別表示

::: note
これは注釈ボックスです。補足情報や参考情報を記載する際に使用します。
:::

::: warning
これは警告ボックスです。注意事項や重要な警告を記載する際に使用します。
:::

::: success
これは成功ボックスです。良い結果や推奨事項を記載する際に使用します。
:::

---

# コードハイライト

## プログラミングコードの表示

```javascript
function createSlide(content) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = content;
    return slide;
}
```

```python
def create_slide(content):
    slide = f'<div class="slide">{content}</div>'
    return slide
```

---

# 数式表記

## 簡易数式サポート

インライン数式: $E = mc^2$

ブロック数式:
$$
\sum_{i=1}^{n} x_i = \frac{x_1 + x_2 + \cdots + x_n}{n}
$$

学術発表や技術プレゼンテーションに便利です。

---

<!-- slide-config: {
    "backgroundColor": "#1e293b",
    "textColor": "#e2e8f0",
    "className": "dark-slide"
} -->

# スライド固有設定

## 個別カスタマイズ

このスライドには個別の設定が適用されています：

- 背景色: ダークブルー
- 文字色: ライトグレー
- カスタムクラス: dark-slide

各スライドに異なる設定を適用できます。

---

# 操作方法

## キーボードショートカット

| キー | 動作 |
|------|------|
| ← → | スライド移動 |
| Space | 次のスライド |
| F | 全画面表示 |
| Escape | 全画面終了 |

## その他の操作
- **マウス**: ナビゲーションボタンをクリック
- **タッチ**: スワイプでスライド移動
- **URL**: `?slide=5`で直接アクセス

---

# 設定の柔軟性

## config.jsonで詳細設定

```json
{
  "template": {
    "name": "corporate",
    "customColors": {
      "primary": "#1e40af",
      "accent": "#f59e0b"
    }
  },
  "typography": {
    "baseFontSize": "1rem",
    "headingScale": {
      "h1": "3.5rem",
      "h2": "3rem"
    }
  }
}
```

---

# レスポンシブ対応

## あらゆるデバイスで美しく

- **デスクトップ**: 大画面での発表に最適
- **タブレット**: 中間サイズでも読みやすく
- **スマートフォン**: モバイルでの確認も快適

フォントサイズや余白が自動調整されます。

---

# テンプレート比較

## 用途に応じた選択

| テンプレート | 用途 | 特徴 |
|-------------|------|------|
| Corporate | ビジネス | プロフェッショナル |
| Academic | 学術発表 | 清潔で読みやすい |
| Creative | クリエイティブ | 鮮やかで動的 |
| Technical | 技術発表 | コード重視 |

---

# 今後の展開

## 計画中の機能

::: note
**エクスポート機能**
PDF出力、画像出力機能を開発中です。
:::

::: success
**プラグインシステム**
カスタム機能を追加できるプラグインシステムを検討中です。
:::

::: warning
**パフォーマンス最適化**
大量のスライドでも快適に動作するよう最適化を進めています。
:::

---

# まとめ

## Slide Frameworkの価値

### ✅ シンプル
Markdownの直感的な記法

### ✅ 柔軟
豊富なカスタマイズオプション

### ✅ 美しい
プロフェッショナルなデザイン

### ✅ 効率的
素早いプレゼンテーション作成

---

# ありがとうございました

## 質問・フィードバックをお待ちしています

**Slide Framework**で、あなたの素晴らしいプレゼンテーションを作成してください。

### 次のステップ
1. `slides.md`を編集してスライドを作成
2. `config.json`で設定をカスタマイズ
3. ブラウザでプレビューを確認
4. プレゼンテーションを実行

**Happy Presenting! 🎉**

