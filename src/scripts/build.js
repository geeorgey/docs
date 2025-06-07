/**
 * プレゼンテーションアーカイブ ビルドスクリプト
 * 
 * 使用方法:
 * 1. Node.jsをインストール
 * 2. npm install fs-extra --save-dev を実行
 * 3. node src/scripts/build.js を実行
 */

const fs = require('fs-extra');
const path = require('path');

// パス設定
const srcDir = path.join(__dirname, '..', '..');
const docsDir = path.join(srcDir, 'docs');
const dataDir = path.join(srcDir, 'src', 'data');
const templatesDir = path.join(srcDir, 'src', 'templates');

// ビルド関数
async function build() {
  try {
    console.log('ビルド開始...');
    
    // データの読み込み
    console.log('データの読み込み中...');
    const presentationsData = await fs.readJson(path.join(dataDir, 'presentations.json'));
    
    // テンプレートの処理
    console.log('テンプレートの処理中...');
    // 注: 実際のプロジェクトではテンプレートエンジンを使用することを推奨
    
    // サムネイル画像のプレースホルダー作成
    console.log('サムネイル画像のプレースホルダー作成中...');
    const slidesDir = path.join(docsDir, 'images', 'slides');
    await fs.ensureDir(slidesDir);
    await fs.ensureDir(path.join(slidesDir, '2019'));
    await fs.ensureDir(path.join(slidesDir, '2020'));
    await fs.ensureDir(path.join(slidesDir, '2023'));
    await fs.ensureDir(path.join(slidesDir, '2025'));
    
    // プレースホルダー画像の作成（実際のプロジェクトでは実際の画像を使用）
    console.log('完了しました！');
    console.log('GitHub Pagesにデプロイするには、リポジトリの設定でdocsディレクトリを指定してください。');
  } catch (err) {
    console.error('ビルドエラー:', err);
  }
}

// ビルド実行
build();

