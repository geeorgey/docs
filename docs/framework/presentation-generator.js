#!/usr/bin/env node

/**
 * Presentation Generator
 * 
 * Markdownファイルからプレゼンテーションを生成するツール
 */

const fs = require('fs');
const path = require('path');

class PresentationGenerator {
    constructor() {
        this.frameworkPath = '/home/ubuntu/github-docs/docs/framework';
        this.templatesPath = path.join(this.frameworkPath, 'templates');
        this.presentationsPath = path.join(this.frameworkPath, 'presentations');
        this.outputPath = '/home/ubuntu/github-docs/docs/presentations';
    }
    
    /**
     * プレゼンテーションを生成
     */
    async generatePresentation(markdownFile, options = {}) {
        try {
            // Markdownファイルを読み込み
            const markdownContent = fs.readFileSync(markdownFile, 'utf8');
            
            // メタデータとスライドを解析
            const { metadata, slides } = this.parseMarkdown(markdownContent);
            
            // オプションでメタデータを上書き
            Object.assign(metadata, options);
            
            // プレゼンテーションIDを生成
            const presentationId = metadata.id || this.generateId(metadata.title);
            
            // プレゼンテーションディレクトリを作成
            const presentationDir = path.join(this.presentationsPath, presentationId);
            if (!fs.existsSync(presentationDir)) {
                fs.mkdirSync(presentationDir, { recursive: true });
            }
            
            // 設定ファイルを生成
            const config = this.generateConfig(metadata, slides, presentationId);
            fs.writeFileSync(
                path.join(presentationDir, 'config.json'),
                JSON.stringify(config, null, 2)
            );
            
            // Markdownファイルをコピー
            fs.writeFileSync(
                path.join(presentationDir, 'slides.md'),
                markdownContent
            );
            
            // HTMLファイルを生成
            const htmlContent = this.generateHTML(metadata, presentationId);
            const htmlFile = path.join(this.outputPath, `${presentationId}.html`);
            fs.writeFileSync(htmlFile, htmlContent);
            
            console.log(`✅ プレゼンテーション "${metadata.title}" を生成しました`);
            console.log(`📁 設定ファイル: ${path.join(presentationDir, 'config.json')}`);
            console.log(`📄 HTMLファイル: ${htmlFile}`);
            console.log(`🌐 URL: /docs/presentations/${presentationId}.html`);
            
            return {
                id: presentationId,
                title: metadata.title,
                configFile: path.join(presentationDir, 'config.json'),
                htmlFile: htmlFile,
                url: `/docs/presentations/${presentationId}.html`
            };
            
        } catch (error) {
            console.error('❌ プレゼンテーション生成エラー:', error.message);
            throw error;
        }
    }
    
    /**
     * Markdownの解析
     */
    parseMarkdown(content) {
        // YAMLフロントマターの検出
        const yamlMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        let metadata = {};
        let slides = [];
        
        if (yamlMatch) {
            // YAMLフロントマターを解析
            const yamlContent = yamlMatch[1];
            const markdownContent = yamlMatch[2];
            
            console.log('Parsing YAML metadata...');
            metadata = this.parseYAMLFrontMatter(yamlContent);
            console.log('Parsed metadata:', metadata);
            
            // スライドを解析
            const sections = markdownContent.split(/^---$/m);
            slides = this.parseSlides(sections);
        } else {
            // メタデータなしの場合
            console.log('No YAML metadata found');
            const sections = content.split(/^---$/m);
            slides = this.parseSlides(sections);
        }
        
        return { metadata, slides };
    }
    
    /**
     * YAMLフロントマターの解析
     */
    parseYAMLFrontMatter(yamlContent) {
        const metadata = {};
        const lines = yamlContent.split('\n');
        
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const match = line.match(/^(\w+):\s*"?([^"]*)"?$/);
                if (match) {
                    const [, key, value] = match;
                    metadata[key] = value.replace(/^"|"$/g, '');
                }
            }
        });
        
        return metadata;
    }
    
    /**
     * スライドの解析
     */
    parseSlides(sections) {
        const slides = [];
        
        sections.forEach((section, index) => {
            if (section.trim()) {
                const slide = this.parseSlideSection(section.trim(), index);
                if (slide) {
                    slides.push(slide);
                }
            }
        });
        
        return slides;
    }
    
    /**
     * スライドセクションの解析
     */
    parseSlideSection(content, index) {
        const lines = content.split('\n');
        const slide = {
            id: `slide-${index + 1}`,
            title: '',
            content: '',
            template: 'content',
            layout: 'center',
            image: null,
            notes: ''
        };
        
        let contentLines = [];
        let inNotes = false;
        
        lines.forEach(line => {
            // HTMLコメントからメタデータを抽出
            const templateMatch = line.match(/<!--\s*template:\s*(\w+)\s*-->/);
            if (templateMatch) {
                slide.template = templateMatch[1];
                return;
            }
            
            const layoutMatch = line.match(/<!--\s*layout:\s*([^-]+)\s*-->/);
            if (layoutMatch) {
                slide.layout = layoutMatch[1].trim();
                return;
            }
            
            const imageMatch = line.match(/<!--\s*image:\s*([^-]+)\s*-->/);
            if (imageMatch) {
                slide.image = imageMatch[1].trim();
                return;
            }
            
            // タイトルを抽出（最初のh1）
            if (line.startsWith('# ') && !slide.title) {
                slide.title = line.substring(2).trim();
                return;
            }
            
            // ノートセクション
            if (line.startsWith('<!-- notes')) {
                inNotes = true;
                return;
            }
            if (line.includes('-->') && inNotes) {
                inNotes = false;
                return;
            }
            if (inNotes) {
                slide.notes += line + '\n';
                return;
            }
            
            // 通常のコンテンツ
            contentLines.push(line);
        });
        
        slide.content = contentLines.join('\n').trim();
        return slide;
    }
    
    /**
     * 設定ファイルの生成
     */
    generateConfig(metadata, slides, presentationId) {
        return {
            id: presentationId,
            title: metadata.title || 'プレゼンテーション',
            template: metadata.template || 'business',
            theme: metadata.theme || 'default',
            author: metadata.author || '',
            date: metadata.date || new Date().toISOString().split('T')[0],
            description: metadata.description || '',
            aspectRatio: metadata.aspectRatio || '11:9',
            ogp: {
                image: metadata.ogImage || `/docs/images/ogp/${presentationId}-default.png`,
                type: 'website'
            },
            navigation: {
                showSidebar: metadata.showSidebar !== 'false',
                showControls: metadata.showControls !== 'false',
                enableKeyboard: metadata.enableKeyboard !== 'false',
                enableFullscreen: metadata.enableFullscreen !== 'false'
            },
            slides: slides.map((slide, index) => ({
                id: slide.id,
                title: slide.title,
                template: slide.template,
                layout: slide.layout,
                image: slide.image,
                notes: slide.notes
            }))
        };
    }
    
    /**
     * HTMLファイルの生成
     */
    generateHTML(metadata, presentationId) {
        const template = fs.readFileSync(
            path.join(this.frameworkPath, 'presentation-template.html'),
            'utf8'
        );
        
        // テンプレート変数を置換
        return template
            .replace(/{{title}}/g, metadata.title || 'プレゼンテーション')
            .replace(/{{description}}/g, metadata.description || '')
            .replace(/{{ogImage}}/g, metadata.ogImage || `/docs/images/ogp/${presentationId}-default.png`)
            .replace(/{{url}}/g, `https://geeorgey.github.io/docs/presentations/${presentationId}.html`)
            .replace(/{{theme}}/g, metadata.theme || 'default')
            .replace(/{{#customCSS}}.*{{\/customCSS}}/gs, metadata.customCSS ? `<link href="${metadata.customCSS}" rel="stylesheet">` : '')
            .replace(/{{#customJS}}.*{{\/customJS}}/gs, metadata.customJS ? `<script src="${metadata.customJS}"></script>` : '');
    }
    
    /**
     * プレゼンテーションIDの生成
     */
    generateId(title) {
        if (!title) {
            return 'presentation-' + Date.now();
        }
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .substring(0, 50);
    }
    
    /**
     * 利用可能なテンプレート一覧を取得
     */
    getAvailableTemplates() {
        const templatesDir = this.templatesPath;
        if (!fs.existsSync(templatesDir)) {
            return [];
        }
        
        return fs.readdirSync(templatesDir)
            .filter(item => fs.statSync(path.join(templatesDir, item)).isDirectory())
            .map(template => ({
                name: template,
                path: path.join(templatesDir, template)
            }));
    }
    
    /**
     * 利用可能なテーマ一覧を取得
     */
    getAvailableThemes() {
        const themesDir = path.join(this.frameworkPath, 'themes');
        if (!fs.existsSync(themesDir)) {
            return [];
        }
        
        return fs.readdirSync(themesDir)
            .filter(file => file.endsWith('.css'))
            .map(file => file.replace('.css', ''));
    }
}

// コマンドライン実行時の処理
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
使用方法:
  node presentation-generator.js <markdownファイル> [オプション]

オプション:
  --id <id>              プレゼンテーションID
  --title <title>        タイトル
  --template <template>  テンプレート (business, technical, minimal)
  --theme <theme>        テーマ (default)
  --author <author>      作成者
  --description <desc>   説明

例:
  node presentation-generator.js slides.md --template technical --author "John Doe"
        `);
        process.exit(1);
    }
    
    const markdownFile = args[0];
    const options = {};
    
    // オプションを解析
    for (let i = 1; i < args.length; i += 2) {
        const key = args[i].replace('--', '');
        const value = args[i + 1];
        if (value) {
            options[key] = value;
        }
    }
    
    const generator = new PresentationGenerator();
    
    generator.generatePresentation(markdownFile, options)
        .then(result => {
            console.log('\n🎉 プレゼンテーション生成完了!');
        })
        .catch(error => {
            console.error('\n💥 エラーが発生しました:', error.message);
            process.exit(1);
        });
}

module.exports = PresentationGenerator;

