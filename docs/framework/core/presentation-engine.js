/**
 * Presentation Framework - Core Engine
 * 
 * Markdownからプレゼンテーションを動的に生成するフレームワーク
 */

class PresentationEngine {
    constructor(config = {}) {
        this.config = {
            baseUrl: config.baseUrl || '/docs/framework',
            defaultTemplate: config.defaultTemplate || 'business',
            defaultTheme: config.defaultTheme || 'default',
            aspectRatio: config.aspectRatio || '11:9',
            ...config
        };
        
        this.currentSlideIndex = 0;
        this.slides = [];
        this.metadata = {};
        this.isFullscreen = false;
        
        this.init();
    }
    
    /**
     * フレームワークの初期化
     */
    async init() {
        // URLパラメータから設定を読み込み
        this.parseURLParams();
        
        // キーボードイベントリスナーを追加
        this.setupEventListeners();
        
        // プレゼンテーションデータを読み込み
        await this.loadPresentation();
    }
    
    /**
     * URLパラメータの解析
     */
    parseURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // スライド番号
        const slideParam = urlParams.get('slide');
        if (slideParam) {
            const slideIndex = parseInt(slideParam) - 1;
            if (slideIndex >= 0) {
                this.currentSlideIndex = slideIndex;
            }
        }
        
        // テンプレート
        const templateParam = urlParams.get('template');
        if (templateParam) {
            this.config.defaultTemplate = templateParam;
        }
        
        // テーマ
        const themeParam = urlParams.get('theme');
        if (themeParam) {
            this.config.defaultTheme = themeParam;
        }
    }
    
    /**
     * イベントリスナーの設定
     */
    setupEventListeners() {
        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Escape':
                    if (this.isFullscreen) {
                        this.exitFullscreen();
                    }
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
            }
        });
        
        // ウィンドウリサイズ
        window.addEventListener('resize', () => {
            this.updateLayout();
        });
    }
    
    /**
     * プレゼンテーションデータの読み込み
     */
    async loadPresentation() {
        try {
            // プレゼンテーションIDをURLから取得
            const pathParts = window.location.pathname.split('/');
            const presentationId = pathParts[pathParts.length - 1].replace('.html', '');
            
            // 設定ファイルを読み込み
            const configResponse = await fetch(`${this.config.baseUrl}/presentations/${presentationId}/config.json`);
            if (configResponse.ok) {
                const config = await configResponse.json();
                this.metadata = config;
                
                // Markdownファイルを読み込み
                const markdownResponse = await fetch(`${this.config.baseUrl}/presentations/${presentationId}/slides.md`);
                if (markdownResponse.ok) {
                    const markdownContent = await markdownResponse.text();
                    this.slides = this.parseMarkdown(markdownContent);
                    
                    // プレゼンテーションを初期化
                    await this.initializePresentation();
                } else {
                    throw new Error('Markdownファイルが見つかりません');
                }
            } else {
                throw new Error('設定ファイルが見つかりません');
            }
        } catch (error) {
            console.error('プレゼンテーションの読み込みに失敗しました:', error);
            this.showError('プレゼンテーションの読み込みに失敗しました');
        }
    }
    
    /**
     * Markdownの解析
     */
    parseMarkdown(content) {
        const slides = [];
        const sections = content.split(/^---$/m);
        
        // メタデータ部分を処理
        if (sections[0].startsWith('---')) {
            const metadataSection = sections[1];
            const contentSections = sections.slice(2);
            
            // YAMLフロントマターを解析
            this.parseYAMLFrontMatter(metadataSection);
            
            // スライドを解析
            contentSections.forEach((section, index) => {
                if (section.trim()) {
                    const slide = this.parseSlideSection(section.trim(), index);
                    if (slide) {
                        slides.push(slide);
                    }
                }
            });
        } else {
            // メタデータなしの場合
            sections.forEach((section, index) => {
                if (section.trim()) {
                    const slide = this.parseSlideSection(section.trim(), index);
                    if (slide) {
                        slides.push(slide);
                    }
                }
            });
        }
        
        return slides;
    }
    
    /**
     * YAMLフロントマターの解析
     */
    parseYAMLFrontMatter(yamlContent) {
        const lines = yamlContent.split('\n');
        lines.forEach(line => {
            const match = line.match(/^(\w+):\s*"?([^"]+)"?$/);
            if (match) {
                const [, key, value] = match;
                this.metadata[key] = value.replace(/"/g, '');
            }
        });
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
     * プレゼンテーションの初期化
     */
    async initializePresentation() {
        // テンプレートとテーマを読み込み
        await this.loadTemplate();
        await this.loadTheme();
        
        // UIを構築
        this.buildUI();
        
        // 初期スライドを表示
        this.showSlide(this.currentSlideIndex);
        
        // メタデータを更新
        this.updateMetadata();
    }
    
    /**
     * テンプレートの読み込み
     */
    async loadTemplate() {
        const templateName = this.metadata.template || this.config.defaultTemplate;
        try {
            const response = await fetch(`${this.config.baseUrl}/templates/${templateName}/template.js`);
            if (response.ok) {
                const templateCode = await response.text();
                eval(templateCode); // テンプレートコードを実行
            }
        } catch (error) {
            console.warn('テンプレートの読み込みに失敗しました:', error);
        }
    }
    
    /**
     * テーマの読み込み
     */
    async loadTheme() {
        const themeName = this.metadata.theme || this.config.defaultTheme;
        try {
            const response = await fetch(`${this.config.baseUrl}/themes/${themeName}.css`);
            if (response.ok) {
                const cssContent = await response.text();
                const style = document.createElement('style');
                style.textContent = cssContent;
                document.head.appendChild(style);
            }
        } catch (error) {
            console.warn('テーマの読み込みに失敗しました:', error);
        }
    }
    
    /**
     * UIの構築
     */
    buildUI() {
        const body = document.body;
        body.innerHTML = `
            <div class="presentation-container" id="presentation-container">
                <div class="slide-viewer">
                    <div class="slide-frame" id="slide-frame">
                        <div class="slide-content" id="slide-content">
                            <!-- スライドコンテンツ -->
                        </div>
                    </div>
                    <div class="controls">
                        <button class="control-btn" id="prev-btn" onclick="presentationEngine.previousSlide()">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <div class="slide-counter">
                            <span id="current-slide">1</span> / <span id="total-slides">${this.slides.length}</span>
                        </div>
                        <button class="control-btn" id="next-btn" onclick="presentationEngine.nextSlide()">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                
                <div class="sidebar" id="sidebar">
                    <h3>スライド一覧</h3>
                    <ul class="slide-list" id="slide-list">
                        ${this.generateSlideList()}
                    </ul>
                </div>
            </div>
            
            <button class="fullscreen-btn" id="fullscreen-btn" onclick="presentationEngine.toggleFullscreen()">
                <i class="fas fa-expand"></i>
            </button>
        `;
    }
    
    /**
     * スライド一覧の生成
     */
    generateSlideList() {
        return this.slides.map((slide, index) => 
            `<li class="slide-item" onclick="presentationEngine.goToSlide(${index})">
                ${index + 1}. ${slide.title}
            </li>`
        ).join('');
    }
    
    /**
     * スライドの表示
     */
    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        this.currentSlideIndex = index;
        const slide = this.slides[index];
        
        // スライドコンテンツを生成
        const slideContent = this.renderSlide(slide);
        document.getElementById('slide-content').innerHTML = slideContent;
        
        // カウンターを更新
        document.getElementById('current-slide').textContent = index + 1;
        
        // サイドバーのアクティブ状態を更新
        this.updateSidebarActive(index);
        
        // ボタンの状態を更新
        this.updateControlButtons(index);
        
        // URLを更新
        this.updateURL(index + 1);
        
        // OGPメタタグを更新
        this.updateOGP(slide, index + 1);
    }
    
    /**
     * スライドのレンダリング
     */
    renderSlide(slide) {
        // テンプレートに基づいてスライドをレンダリング
        const templateRenderer = window.templateRenderers?.[slide.template] || this.defaultRenderer;
        return templateRenderer(slide);
    }
    
    /**
     * デフォルトレンダラー
     */
    defaultRenderer(slide) {
        return `
            <div class="slide-container ${slide.template} ${slide.layout}">
                <div class="slide-header">
                    <h1>${slide.title}</h1>
                </div>
                <div class="slide-body">
                    ${this.markdownToHTML(slide.content)}
                    ${slide.image ? `<img src="${slide.image}" alt="Slide Image" class="slide-image">` : ''}
                </div>
            </div>
        `;
    }
    
    /**
     * MarkdownをHTMLに変換
     */
    markdownToHTML(markdown) {
        // 簡単なMarkdown変換（実際の実装ではmarked.jsなどを使用）
        return markdown
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^\* (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '');
    }
    
    /**
     * サイドバーのアクティブ状態更新
     */
    updateSidebarActive(index) {
        document.querySelectorAll('.slide-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    /**
     * コントロールボタンの状態更新
     */
    updateControlButtons(index) {
        document.getElementById('prev-btn').disabled = index === 0;
        document.getElementById('next-btn').disabled = index === this.slides.length - 1;
    }
    
    /**
     * URLの更新
     */
    updateURL(slideNumber) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('slide', slideNumber);
        window.history.replaceState({}, '', newUrl);
    }
    
    /**
     * OGPメタタグの更新
     */
    updateOGP(slide, slideNumber) {
        const title = `${slide.title} - ${this.metadata.title || 'プレゼンテーション'}`;
        const description = `スライド ${slideNumber}: ${slide.title}`;
        
        document.title = title;
        this.updateMetaTag('description', description);
        this.updateMetaTag('og:title', title);
        this.updateMetaTag('og:description', description);
        this.updateMetaTag('twitter:title', title);
        this.updateMetaTag('twitter:description', description);
    }
    
    /**
     * メタタグの更新
     */
    updateMetaTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.setAttribute('property', property);
            } else {
                meta.setAttribute('name', property);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }
    
    /**
     * メタデータの更新
     */
    updateMetadata() {
        if (this.metadata.title) {
            document.title = this.metadata.title;
        }
        if (this.metadata.description) {
            this.updateMetaTag('description', this.metadata.description);
        }
    }
    
    /**
     * レイアウトの更新
     */
    updateLayout() {
        // レスポンシブ対応のレイアウト調整
        const container = document.getElementById('presentation-container');
        if (window.innerWidth <= 768) {
            container.classList.add('mobile');
        } else {
            container.classList.remove('mobile');
        }
    }
    
    /**
     * スライドナビゲーション
     */
    goToSlide(index) {
        this.showSlide(index);
    }
    
    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.showSlide(this.currentSlideIndex - 1);
        }
    }
    
    nextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.showSlide(this.currentSlideIndex + 1);
        }
    }
    
    /**
     * フルスクリーン機能
     */
    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    enterFullscreen() {
        this.isFullscreen = true;
        document.body.classList.add('fullscreen-mode');
        
        // フルスクリーンナビゲーションを追加
        const navigation = document.createElement('div');
        navigation.className = 'fullscreen-navigation';
        navigation.innerHTML = `
            <div class="nav-left" onclick="presentationEngine.previousSlide()"></div>
            <div class="nav-right" onclick="presentationEngine.nextSlide()"></div>
        `;
        document.body.appendChild(navigation);
        
        // 終了ボタンを追加
        const exitBtn = document.createElement('button');
        exitBtn.className = 'fullscreen-exit';
        exitBtn.innerHTML = '❌';
        exitBtn.onclick = () => this.exitFullscreen();
        document.body.appendChild(exitBtn);
    }
    
    exitFullscreen() {
        this.isFullscreen = false;
        document.body.classList.remove('fullscreen-mode');
        
        // フルスクリーン要素を削除
        const navigation = document.querySelector('.fullscreen-navigation');
        const exitBtn = document.querySelector('.fullscreen-exit');
        if (navigation) navigation.remove();
        if (exitBtn) exitBtn.remove();
    }
    
    /**
     * エラー表示
     */
    showError(message) {
        document.body.innerHTML = `
            <div class="error-container">
                <h1>エラー</h1>
                <p>${message}</p>
            </div>
        `;
    }
}

// グローバルインスタンス
let presentationEngine;

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
    presentationEngine = new PresentationEngine();
});

