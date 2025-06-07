# プレゼンテーションアーカイブ

吉田丈治（George Yoshida）のプレゼンテーションアーカイブサイトです。Salesforce、AI、データ分析、リーダーシップに関する3000枚を超えるスライドを検索・閲覧できます。

## 🌟 特徴

- **3000+のプレゼンテーション**: 2019年以来作成したスライドを網羅
- **高度な検索機能**: カテゴリ、年、キーワードによる絞り込み
- **レスポンシブデザイン**: デスクトップ、タブレット、モバイル対応
- **モダンなUI**: Salesforceブランドカラーを使用した洗練されたデザイン
- **高速表示**: 最適化されたパフォーマンス

## 🚀 デモ

[https://geeorgey.github.io/presentations-archive/](https://geeorgey.github.io/presentations-archive/)

## 📋 プロジェクト構造

```
presentations-archive/
├── docs/                          # GitHub Pages用ビルドディレクトリ
│   ├── index.html                 # トップページ
│   ├── css/
│   │   └── style.css             # スタイルシート
│   ├── js/
│   │   └── main.js               # JavaScript
│   ├── images/
│   │   ├── profile.png           # プロフィール画像
│   │   └── slides/               # スライドサムネイル
│   └── presentations/            # プレゼンテーション詳細ページ
├── src/                          # ソースファイル
│   ├── data/
│   │   └── presentations.json   # プレゼンテーションデータ
│   ├── templates/
│   │   ├── index.html           # トップページテンプレート
│   │   └── presentation.html    # プレゼンテーション詳細テンプレート
│   └── scripts/
│       └── build.js             # ビルドスクリプト
├── slides/                       # 元のスライドファイル（PDF等）
├── README.md
├── package.json                  # Node.js依存関係
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions自動デプロイ
```

## 🛠️ セットアップ

### 前提条件

- Node.js 14.0.0以上
- npm 6.0.0以上

### インストール

1. リポジトリをクローン
```bash
git clone https://github.com/geeorgey/presentations-archive.git
cd presentations-archive
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

ブラウザで `http://localhost:8080` にアクセスしてサイトを確認できます。

## 📝 使用方法

### プレゼンテーションの追加

1. `src/data/presentations.json` にプレゼンテーション情報を追加
2. サムネイル画像を `docs/images/slides/` に配置
3. PDFファイルを `slides/` に配置
4. ビルドスクリプトを実行

```bash
npm run build
```

### データ形式

```json
{
  "id": "unique-presentation-id",
  "title": "プレゼンテーションタイトル",
  "date": "2025-06-06",
  "company": "発表会社・組織",
  "categories": ["Salesforce", "AI"],
  "tags": ["キーワード1", "キーワード2"],
  "thumbnail": "images/slides/2025/thumbnail.jpg",
  "url": "https://example.com/presentation",
  "pdf": "slides/2025/presentation.pdf",
  "description": "プレゼンテーションの概要説明",
  "slides_count": 35
}
```

## 🚀 デプロイ

### GitHub Pagesでのデプロイ

1. GitHubリポジトリの設定ページに移動
2. "Pages" セクションで以下を設定:
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/docs"
3. 変更をコミット・プッシュ

### 自動デプロイ（GitHub Actions）

`.github/workflows/deploy.yml` を使用して自動デプロイを設定できます。

## 🎨 カスタマイズ

### カラーテーマの変更

`docs/css/style.css` の CSS変数を編集:

```css
:root {
  --primary: #1B5E9F;      /* プライマリカラー */
  --secondary: #00A1E0;    /* セカンダリカラー */
  --accent: #FF6B35;       /* アクセントカラー */
}
```

### レイアウトの調整

- デスクトップ: 3カラムグリッド
- タブレット: 2カラムグリッド
- モバイル: 1カラムグリッド

## 🔧 技術スタック

- **フロントエンド**: HTML5, CSS3, JavaScript (Vanilla)
- **フォント**: Noto Sans JP, Inter
- **アイコン**: Font Awesome 6
- **ビルドツール**: Node.js
- **デプロイ**: GitHub Pages

## 📊 パフォーマンス

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 コントリビューション

1. フォークを作成
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 👤 作成者

**吉田丈治 (George Yoshida)**

- 所属: 株式会社リバネス 取締役CIO / 株式会社リバネスナレッジ 代表取締役社長
- Twitter: [@geeorgey](https://twitter.com/geeorgey)
- LinkedIn: [George (吉田丈治) Yoshida](https://linkedin.com/in/george-yoshida)
- GitHub: [@geeorgey](https://github.com/geeorgey)

## 🙏 謝辞

- Salesforceコミュニティの皆様
- リバネスチームの皆様
- オープンソースコミュニティの皆様

---

⭐ このプロジェクトが役に立った場合は、スターをつけていただけると嬉しいです！

