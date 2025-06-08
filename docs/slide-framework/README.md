# Slide Framework

Marpライクなスライドフレームワーク - Markdownベースのプレゼンテーション作成システム

## 🎯 概要

このフレームワークは、Markdownファイルから美しいプレゼンテーションを生成するシステムです。複数のテンプレートと高度な機能を提供し、簡単にプロフェッショナルなスライドを作成できます。

## ✨ 主な機能

### 📝 Markdownベースの編集
- シンプルなMarkdown記法でスライド作成
- `---`区切りで自動スライド分割
- YAMLフロントマターでメタデータ設定

### 🎨 豊富なテンプレート
- **8種類のテンプレート**: default, minimal, dark, corporate, academic, creative, technical, elegant, leaveanest
- **カスタムテンプレート**: リバネス専用テンプレート含む
- **動的切り替え**: 設定ファイルでテンプレート指定

### 🚀 高度な機能
- **全画面表示**: プレゼンテーション時の没入感
- **サムネイル表示**: スライド一覧とジャンプ機能
- **プログレスバー**: 進行状況の視覚的表示
- **キーボードナビゲーション**: 矢印キー・スペースキー対応
- **レスポンシブデザイン**: デスクトップ・モバイル対応

## 🎬 デモ

### Salesforceプレゼンテーション
リバネスグループのSalesforce導入11年の振り返りプレゼンテーション

**アクセス**: [Salesforce11年目に思っていること](./salesforce-presentation.html)

- 25スライドの包括的なプレゼンテーション
- リバネス専用テンプレート使用
- 全機能を活用したデモンストレーション

## 📁 ファイル構成

```
slide-framework/
├── index.html                    # メインフレームワーク
├── framework.js                  # コアエンジン
├── framework.css                 # フレームワークCSS
├── config.json                   # 設定ファイル
├── slides.md                     # サンプルスライド
├── USAGE_GUIDE.md               # 詳細使用ガイド
├── templates/                    # テンプレート集
│   ├── default/
│   ├── minimal/
│   ├── dark/
│   ├── corporate/
│   ├── academic/
│   ├── creative/
│   ├── technical/
│   ├── elegant/
│   └── leaveanest/              # リバネス専用
├── examples/                     # サンプル集
│   ├── demo.md
│   ├── business-presentation.md
│   └── academic-presentation.md
└── salesforce-presentation.html # Salesforceデモ
```

## 🚀 使用方法

### 基本的な使い方

1. **スライド作成**: `slides.md`にMarkdownでスライドを記述
2. **設定**: `config.json`でプレゼンテーション設定
3. **表示**: ローカルサーバーでHTMLファイルを開く

### サンプルコマンド

```bash
# ローカルサーバー起動
python3 -m http.server 8000

# ブラウザでアクセス
http://localhost:8000/index.html           # メインフレームワーク
http://localhost:8000/salesforce-presentation.html  # Salesforceデモ
```

### Markdownの書き方

```markdown
---
title: "プレゼンテーションタイトル"
author: "作成者名"
template: "corporate"
---

# タイトルスライド

プレゼンテーションの説明

---

# 2番目のスライド

## サブタイトル

- 箇条書き項目1
- 箇条書き項目2

**強調テキスト**と*斜体*

---

# 3番目のスライド

> 引用文のサンプル

`コードのサンプル`
```

## 🎨 テンプレート

### 利用可能なテンプレート

- **default**: 標準的なデザイン
- **minimal**: ミニマルなデザイン
- **dark**: ダークテーマ
- **corporate**: ビジネス向け
- **academic**: 学術発表向け
- **creative**: クリエイティブ向け
- **technical**: 技術発表向け
- **elegant**: エレガントなデザイン
- **leaveanest**: リバネス専用テンプレート

### カスタムテンプレート作成

`templates/`ディレクトリに新しいフォルダを作成し、`template.css`を配置することで独自テンプレートを作成できます。

## 📖 詳細ドキュメント

詳細な使用方法については [USAGE_GUIDE.md](./USAGE_GUIDE.md) をご覧ください。

## 🎯 特徴

### Marpとの比較

| 機能 | Marp | このフレームワーク |
|------|------|-------------------|
| Markdown対応 | ✅ | ✅ |
| テンプレート | 限定的 | 8種類+ |
| 全画面表示 | ✅ | ✅ |
| サムネイル | ❌ | ✅ |
| プログレスバー | ❌ | ✅ |
| カスタマイズ | 限定的 | 高度 |

### 利点

- **簡単編集**: Markdownで直感的
- **美しいデザイン**: プロフェッショナルなテンプレート
- **高機能**: 豊富なナビゲーション機能
- **カスタマイズ**: 柔軟な設定システム
- **レスポンシブ**: あらゆるデバイスに対応

## 🔧 技術仕様

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6+)
- **Markdownパーサー**: Marked.js
- **レスポンシブ**: CSS Grid, Flexbox
- **ブラウザ対応**: モダンブラウザ全般

## 📄 ライセンス

MIT License

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します。

---

**Created by**: 株式会社リバネスナレッジ  
**Version**: 1.0.0  
**Last Updated**: 2025年6月

