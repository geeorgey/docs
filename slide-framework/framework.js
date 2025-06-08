/**
 * Slide Framework - Rendering Engine
 * Marpライクなスライド表示フレームワーク
 */

class SlideFramework {
    constructor() {
        this.slides = [];
        this.currentSlideIndex = 0;
        this.config = {};
        this.template = null;
        
        this.init();
    }

    /**
     * フレームワークの初期化
     */
    async init() {
        try {
            console.log('Slide Framework initializing...');
            
            // 設定ファイルの読み込み
            await this.loadConfig();
            
            // スライドファイルの読み込み
            await this.loadSlides();
            
            // テンプレートの読み込み
            await this.loadTemplate();
            
            // UIの初期化
            this.initUI();
            
            // イベントリスナーの設定
            this.setupEventListeners();
            
            // 最初のスライドを表示
            this.showSlide(0);
            
            // ローディング画面を非表示
            this.hideLoading();
            
            console.log('Slide Framework initialized successfully');
        } catch (error) {
            console.error('Slide Framework initialization failed:', error);
            this.showError('スライドの読み込みに失敗しました。');
            throw error;
        }
    /**
     * 設定ファイルの読み込み
     */
    async loadConfig() {
        try {
            console.log('Loading config...');
            const response = await fetch('config.json');
            if (!response.ok) {
                throw new Error(`Config file not found: ${response.status}`);
            }
            this.config = await response.json();
            console.log('Config loaded:', this.config);
            
            // ページタイトルの設定
            document.title = this.config.presentation.title;
            document.getElementById('presentation-title').textContent = this.config.presentation.title;
            
        } catch (error) {
            console.error('設定ファイルの読み込みに失敗しました:', error);
            // デフォルト設定を使用
            this.config = {
                presentation: {
                    title: "スライドフレームワーク",
                    author: "Unknown",
                    date: new Date().toLocaleDateString('ja-JP')
                },
                template: {
                    name: "default"
                },
                settings: {
                    showSlideNumbers: true,
                    showProgress: true
                }
            };
            console.log('Using default config:', this.config);
        }
    }

    /**
     * スライドファイルの読み込み
     */
    async loadSlides() {
        try {
            console.log('Loading slides...');
            const response = await fetch('slides.md');
            if (!response.ok) {
                throw new Error(`Slides file not found: ${response.status}`);
            }
            const markdownContent = await response.text();
            console.log('Slides loaded, content length:', markdownContent.length);
            
            // Markdownをパース
            this.parseMarkdown(markdownContent);
            
        } catch (error) {
            console.error('スライドファイルの読み込みに失敗しました:', error);
            // デフォルトスライドを作成
            this.slides = [{
                id: 1,
                markdown: '# スライドフレームワーク\n\n## デフォルトスライド\n\nslides.mdファイルが見つかりません。',
                html: '<h1>スライドフレームワーク</h1><h2>デフォルトスライド</h2><p>slides.mdファイルが見つかりません。</p>',
                config: {}
            }];
            console.log('Using default slide');
        }
    }

    /**
     * Markdownのパース
     */
    parseMarkdown(content) {
        // フロントマターの抽出
        const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
        const frontMatterMatch = content.match(frontMatterRegex);
        
        let slideContent = content;
        if (frontMatterMatch) {
            // フロントマターがある場合は除去
            slideContent = content.replace(frontMatterRegex, '');
        }

        // スライドの分割（---で区切る）
        const slideTexts = slideContent.split(/\n---\n/).filter(slide => slide.trim());
        
        this.slides = slideTexts.map((slideText, index) => {
            return {
                id: index + 1,
                markdown: slideText.trim(),
                html: this.parseSlideMarkdown(slideText.trim()),
                config: this.parseSlideConfig(slideText.trim())
            };
        });

        console.log(`${this.slides.length}枚のスライドを読み込みました`);
    }

    /**
     * 拡張Markdownパーサー
     */
    parseSlideMarkdown(markdown) {
        // スライド固有設定の抽出
        const configRegex = /^<!--\s*slide-config:\s*([\s\S]*?)\s*-->/;
        let processedMarkdown = markdown.replace(configRegex, '');

        // カスタムクラス記法の処理 {.class-name}
        processedMarkdown = this.processCustomClasses(processedMarkdown);

        // 画像配置記法の処理 ![alt](src){.center .large}
        processedMarkdown = this.processImageOptions(processedMarkdown);

        // 2カラムレイアウト記法の処理 ::: columns
        processedMarkdown = this.processColumnLayout(processedMarkdown);

        // 注釈ボックス記法の処理 ::: note, ::: warning, etc.
        processedMarkdown = this.processNotationBoxes(processedMarkdown);

        // 数式記法の処理（簡易版）
        processedMarkdown = this.processMath(processedMarkdown);

        // 基本的なMarkdownをHTMLに変換
        let html = marked.parse(processedMarkdown);

        // コードハイライトの処理
        html = this.processCodeHighlight(html);

        return html;
    }

    /**
     * スライド固有設定の抽出
     */
    parseSlideConfig(markdown) {
        const configRegex = /^<!--\s*slide-config:\s*([\s\S]*?)\s*-->/;
        const configMatch = markdown.match(configRegex);
        
        if (configMatch) {
            try {
                return JSON.parse(configMatch[1]);
            } catch (error) {
                console.warn('スライド設定のパースに失敗しました:', error);
                return {};
            }
        }
        
        return {};
    }

    /**
     * カスタムクラス記法の処理
     */
    processCustomClasses(markdown) {
        // 見出しのカスタムクラス: # タイトル {.custom-class}
        markdown = markdown.replace(/(^#+\s+.+?)\s*\{\.([^}]+)\}/gm, (match, heading, classes) => {
            return `<div class="${classes}">${heading}</div>`;
        });

        // 段落のカスタムクラス: テキスト {.custom-class}
        markdown = markdown.replace(/^(.+?)\s*\{\.([^}]+)\}$/gm, (match, text, classes) => {
            if (!text.startsWith('#') && !text.startsWith('!')) {
                return `<div class="${classes}">${text}</div>`;
            }
            return match;
        });

        return markdown;
    }

    /**
     * 画像配置オプションの処理
     */
    processImageOptions(markdown) {
        // ![alt](src){.center .large} 形式の処理
        return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)\s*\{\.([^}]+)\}/g, (match, alt, src, classes) => {
            return `<div class="image-wrapper ${classes}"><img src="${src}" alt="${alt}" /></div>`;
        });
    }

    /**
     * 2カラムレイアウトの処理
     */
    processColumnLayout(markdown) {
        return markdown.replace(/::: columns\s*\n([\s\S]*?)\n:::/g, (match, content) => {
            const columns = content.split(/\n---\n/);
            if (columns.length === 2) {
                return `<div class="two-column">
                    <div class="column">${marked.parse(columns[0].trim())}</div>
                    <div class="column">${marked.parse(columns[1].trim())}</div>
                </div>`;
            }
            return content;
        });
    }

    /**
     * 注釈ボックスの処理
     */
    processNotationBoxes(markdown) {
        const boxTypes = ['note', 'warning', 'success', 'error', 'info'];
        
        boxTypes.forEach(type => {
            const regex = new RegExp(`::: ${type}\\s*\\n([\\s\\S]*?)\\n:::`, 'g');
            markdown = markdown.replace(regex, (match, content) => {
                return `<div class="${type}">${marked.parse(content.trim())}</div>`;
            });
        });

        return markdown;
    }

    /**
     * 数式記法の処理（簡易版）
     */
    processMath(markdown) {
        // インライン数式: $...$
        markdown = markdown.replace(/\$([^$]+)\$/g, '<span class="math-inline">$1</span>');
        
        // ブロック数式: $$...$$
        markdown = markdown.replace(/\$\$([^$]+)\$\$/g, '<div class="math-block">$1</div>');
        
        return markdown;
    }

    /**
     * コードハイライトの処理
     */
    processCodeHighlight(html) {
        // 言語指定のあるコードブロックにクラスを追加
        html = html.replace(/<pre><code class="language-(\w+)">/g, '<pre class="code-block language-$1"><code class="language-$1">');
        
        // 言語指定のないコードブロックにデフォルトクラスを追加
        html = html.replace(/<pre><code>/g, '<pre class="code-block"><code>');
        
        return html;
    }

    /**
     * テンプレートの読み込み
     */
    async loadTemplate() {
        try {
            const templateName = this.config.template.name || 'default';
            const templatePath = `templates/${templateName}/template.css`;
            
            // 既存のテンプレートCSSを削除
            const existingTemplate = document.querySelector('link[data-template]');
            if (existingTemplate) {
                existingTemplate.remove();
            }
            
            // テンプレートCSSの動的読み込み
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = templatePath;
            link.setAttribute('data-template', templateName);
            document.head.appendChild(link);
            
            console.log(`テンプレート '${templateName}' を読み込みました`);
            
        } catch (error) {
            console.error('テンプレートの読み込みに失敗しました:', error);
            // デフォルトテンプレートにフォールバック
        }
    }

    /**
     * UIの初期化
     */
    initUI() {
        // プレゼンテーション情報の設定
        const presentation = this.config.presentation;
        
        document.getElementById('presentation-main-title').textContent = presentation.title;
        document.getElementById('current-title').textContent = presentation.title;
        document.getElementById('presentation-date').innerHTML = `<i class="fas fa-calendar"></i> ${presentation.date}`;
        document.getElementById('presentation-author').innerHTML = `<i class="fas fa-user"></i> ${presentation.author}`;
        document.getElementById('presentation-duration').innerHTML = `<i class="fas fa-clock"></i> ${presentation.duration}`;
        document.getElementById('presentation-slide-count').innerHTML = `<i class="fas fa-file-powerpoint"></i> ${this.slides.length}スライド`;
        document.getElementById('presentation-description').textContent = this.config.metadata.description;
        
        // タグの設定
        const tagsContainer = document.getElementById('presentation-tags');
        this.config.metadata.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });

        // 総スライド数の設定
        document.getElementById('total-slides').textContent = this.slides.length;
        
        // 設定の適用
        this.applyGlobalSettings();
        
        // テンプレート切り替えボタンの追加
        this.addTemplateSelector();
    }

    /**
     * グローバル設定の適用
     */
    applyGlobalSettings() {
        const root = document.documentElement;
        
        // カスタムカラーの適用
        if (this.config.template.customColors) {
            const colors = this.config.template.customColors;
            root.style.setProperty('--primary-color', colors.primary);
            root.style.setProperty('--secondary-color', colors.secondary);
            root.style.setProperty('--accent-color', colors.accent);
            root.style.setProperty('--background-color', colors.background);
            root.style.setProperty('--text-color', colors.text);
        }

        // タイポグラフィ設定の適用
        if (this.config.typography) {
            const typography = this.config.typography;
            root.style.setProperty('--font-family', typography.fontFamily);
            root.style.setProperty('--base-font-size', typography.baseFontSize);
            root.style.setProperty('--line-height', typography.lineHeight);
            
            // 見出しサイズの設定
            if (typography.headingScale) {
                Object.entries(typography.headingScale).forEach(([tag, size]) => {
                    root.style.setProperty(`--${tag}-size`, size);
                });
            }
        }

        // レイアウト設定の適用
        if (this.config.layout) {
            const layout = this.config.layout;
            root.style.setProperty('--slide-padding', layout.padding);
            root.style.setProperty('--mobile-padding', layout.mobilePadding);
            root.style.setProperty('--max-width', layout.maxWidth);
            root.style.setProperty('--text-align', layout.textAlign);
            root.style.setProperty('--vertical-align', layout.verticalAlign);
        }

        // アニメーション設定の適用
        if (this.config.animations && this.config.settings.enableAnimations) {
            const animations = this.config.animations;
            if (animations.slideTransition) {
                root.style.setProperty('--transition-duration', `${animations.slideTransition.duration}ms`);
                root.style.setProperty('--transition-easing', animations.slideTransition.easing);
            }
        }

        // プログレスバーの表示/非表示
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.display = this.config.settings.showProgress ? 'block' : 'none';
        }

        // スライド番号の表示/非表示
        const slideCounter = document.querySelector('.slide-counter');
        if (slideCounter) {
            slideCounter.style.display = this.config.settings.showSlideNumbers ? 'flex' : 'none';
        }

        // サムネイルの生成
        this.generateThumbnails();
    }

    /**
     * テンプレート選択機能の追加
     */
    addTemplateSelector() {
        const templates = [
            { name: 'default', label: 'デフォルト' },
            { name: 'corporate', label: 'ビジネス' },
            { name: 'academic', label: '学術発表' },
            { name: 'creative', label: 'クリエイティブ' },
            { name: 'technical', label: '技術発表' },
            { name: 'elegant', label: 'エレガント' },
            { name: 'minimal', label: 'ミニマル' },
            { name: 'dark', label: 'ダーク' }
        ];

        // テンプレート選択ボタンを作成
        const templateSelector = document.createElement('div');
        templateSelector.className = 'template-selector';
        templateSelector.innerHTML = `
            <button id="template-btn" class="nav-btn template-btn" title="テンプレート変更">
                <i class="fas fa-palette"></i>
            </button>
            <div id="template-dropdown" class="template-dropdown">
                ${templates.map(template => `
                    <button class="template-option ${template.name === this.config.template.name ? 'active' : ''}" 
                            data-template="${template.name}">
                        ${template.label}
                    </button>
                `).join('')}
            </div>
        `;

        // ナビゲーションに追加
        const navigation = document.querySelector('.slide-navigation');
        navigation.appendChild(templateSelector);

        // イベントリスナーの設定
        document.getElementById('template-btn').addEventListener('click', () => {
            const dropdown = document.getElementById('template-dropdown');
            dropdown.classList.toggle('show');
        });

        // テンプレート選択イベント
        document.querySelectorAll('.template-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const templateName = e.target.dataset.template;
                this.changeTemplate(templateName);
                
                // ドロップダウンを閉じる
                document.getElementById('template-dropdown').classList.remove('show');
                
                // アクティブ状態を更新
                document.querySelectorAll('.template-option').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 外部クリックでドロップダウンを閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.template-selector')) {
                document.getElementById('template-dropdown').classList.remove('show');
            }
        });
    }

    /**
     * テンプレートの動的変更
     */
    async changeTemplate(templateName) {
        try {
            // 設定を更新
            this.config.template.name = templateName;
            
            // テンプレートを再読み込み
            await this.loadTemplate();
            
            console.log(`テンプレートを '${templateName}' に変更しました`);
            
        } catch (error) {
            console.error('テンプレートの変更に失敗しました:', error);
        }
    }

    /**
     * サムネイルの生成
     */
    generateThumbnails() {
        const thumbnailGrid = document.getElementById('thumbnail-grid');
        thumbnailGrid.innerHTML = '';

        this.slides.forEach((slide, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.slideIndex = index;
            
            // スライドタイトルの抽出（最初のh1またはh2）
            const titleMatch = slide.markdown.match(/^#+\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : `スライド ${index + 1}`;
            
            thumbnail.innerHTML = `
                <div class="thumbnail-number">${index + 1}</div>
                <div class="thumbnail-content">
                    <div class="thumbnail-title">${title}</div>
                </div>
            `;
            
            thumbnail.addEventListener('click', () => {
                this.showSlide(index);
            });
            
            thumbnailGrid.appendChild(thumbnail);
        });
    }

    /**
     * イベントリスナーの設定
     */
    setupEventListeners() {
        // ナビゲーションボタン
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('mobile-fullscreen').addEventListener('click', () => this.toggleFullscreen());

        // キーボードナビゲーション
        document.addEventListener('keydown', (e) => this.handleKeydown(e));

        // タッチナビゲーション
        this.setupTouchNavigation();

        // ウィンドウリサイズ
        window.addEventListener('resize', () => this.handleResize());

        // フルスクリーン状態変更
        document.addEventListener('fullscreenchange', () => this.handleFullscreenChange());
    }

    /**
     * キーボードナビゲーション
     */
    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.showSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.showSlide(this.slides.length - 1);
                break;
            case 'f':
            case 'F11':
                if (e.key === 'f' || (e.key === 'F11' && !e.ctrlKey)) {
                    e.preventDefault();
                    this.toggleFullscreen();
                }
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    this.exitFullscreen();
                }
                break;
        }
    }

    /**
     * タッチナビゲーションの設定
     */
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;

            // 水平方向のスワイプを検出
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }

            startX = 0;
            startY = 0;
        });
    }

    /**
     * スライドの表示
     */
    showSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        this.currentSlideIndex = index;
        const slide = this.slides[index];

        // スライドコンテンツの更新
        const slideElement = document.getElementById('current-slide');
        slideElement.innerHTML = `<div class="slide-content">${slide.html}</div>`;

        // スライド固有設定の適用
        this.applySlideConfig(slide.config);

        // スライドカウンターの更新
        document.getElementById('current-slide-num').textContent = index + 1;

        // プログレスバーの更新
        const progress = ((index + 1) / this.slides.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;

        // サムネイルのアクティブ状態更新
        this.updateThumbnailActive(index);

        // URLパラメータの更新
        this.updateURL(index + 1);

        // ナビゲーションボタンの状態更新
        this.updateNavigationButtons();
    }

    /**
     * スライド固有設定の適用
     */
    applySlideConfig(config) {
        const slideElement = document.getElementById('current-slide');
        
        // 背景色の設定
        if (config.backgroundColor) {
            slideElement.style.backgroundColor = config.backgroundColor;
        } else {
            slideElement.style.backgroundColor = '';
        }

        // 背景画像の設定
        if (config.backgroundImage) {
            slideElement.style.backgroundImage = `url(${config.backgroundImage})`;
            slideElement.style.backgroundSize = config.backgroundSize || 'cover';
            slideElement.style.backgroundPosition = config.backgroundPosition || 'center';
        } else {
            slideElement.style.backgroundImage = '';
        }

        // テキスト色の設定
        if (config.textColor) {
            slideElement.style.color = config.textColor;
        } else {
            slideElement.style.color = '';
        }

        // カスタムクラスの適用
        if (config.className) {
            slideElement.className = `slide active ${config.className}`;
        } else {
            slideElement.className = 'slide active';
        }

        // フォントサイズの調整
        if (config.fontSize) {
            slideElement.style.fontSize = config.fontSize;
        } else {
            slideElement.style.fontSize = '';
        }
    }

    /**
     * サムネイルのアクティブ状態更新
     */
    updateThumbnailActive(activeIndex) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === activeIndex);
        });
    }

    /**
     * ナビゲーションボタンの状態更新
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentSlideIndex === 0;
        nextBtn.disabled = this.currentSlideIndex === this.slides.length - 1;
    }

    /**
     * 次のスライド
     */
    nextSlide() {
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.showSlide(this.currentSlideIndex + 1);
        }
    }

    /**
     * 前のスライド
     */
    previousSlide() {
        if (this.currentSlideIndex > 0) {
            this.showSlide(this.currentSlideIndex - 1);
        }
    }

    /**
     * フルスクリーン切り替え
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.enterFullscreen();
        } else {
            this.exitFullscreen();
        }
    }

    /**
     * フルスクリーン開始
     */
    enterFullscreen() {
        const element = document.documentElement;
        
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            // フルスクリーンAPIが使えない場合（iPhone等）
            document.body.classList.add('pseudo-fullscreen');
        }
    }

    /**
     * フルスクリーン終了
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            document.body.classList.remove('pseudo-fullscreen');
        }
    }

    /**
     * フルスクリーン状態変更の処理
     */
    handleFullscreenChange() {
        const isFullscreen = !!document.fullscreenElement;
        document.body.classList.toggle('fullscreen-mode', isFullscreen);
        
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const icon = fullscreenBtn.querySelector('i');
        
        if (isFullscreen) {
            icon.className = 'fas fa-compress';
            fullscreenBtn.title = '全画面表示を終了';
        } else {
            icon.className = 'fas fa-expand';
            fullscreenBtn.title = '全画面表示';
        }
    }

    /**
     * ウィンドウリサイズの処理
     */
    handleResize() {
        // 必要に応じてレイアウトの調整
    }

    /**
     * URLパラメータの更新
     */
    updateURL(slideNumber) {
        const url = new URL(window.location);
        url.searchParams.set('slide', slideNumber);
        window.history.replaceState({}, '', url);
    }

    /**
     * 初期スライドインデックスの取得
     */
    getInitialSlideIndex() {
        const urlParams = new URLSearchParams(window.location.search);
        const slideParam = urlParams.get('slide');
        
        if (slideParam) {
            const slideNumber = parseInt(slideParam, 10);
            if (slideNumber >= 1 && slideNumber <= this.slides.length) {
                return slideNumber - 1;
            }
        }
        
        return 0;
    }

    /**
     * ローディング画面を非表示
     */
    hideLoading() {
        const loading = document.getElementById('loading');
        loading.style.display = 'none';
    }

    /**
     * エラー表示
     */
    showError(message) {
        const loading = document.getElementById('loading');
        loading.innerHTML = `
            <div class="loading-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${message}</p>
            </div>
        `;
    }
}

// フレームワークの初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing Slide Framework...');
    try {
        window.slideFramework = new SlideFramework();
    } catch (error) {
        console.error('Failed to initialize Slide Framework:', error);
    }
});

// 念のため、ページ読み込み完了後にも初期化を試行
window.addEventListener('load', () => {
    if (!window.slideFramework) {
        console.log('Window loaded, trying to initialize Slide Framework...');
        try {
            window.slideFramework = new SlideFramework();
        } catch (error) {
            console.error('Failed to initialize Slide Framework on window load:', error);
        }
    }
});

