/**
 * Minimal Template - プレゼンテーションテンプレート
 * 
 * ミニマルデザイン向けプレゼンテーション用のテンプレートレンダラー
 */

// テンプレートレンダラーを登録
if (!window.templateRenderers) {
    window.templateRenderers = {};
}

// ミニマルテンプレート用のレンダラー
window.templateRenderers.title = function(slide) {
    return `
        <div class="slide-container title minimal-title">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                ${presentationEngine.markdownToHTML(slide.content)}
            </div>
            <div class="slide-footer">
                <div class="author-info">
                    ${presentationEngine.metadata.author || ''}
                </div>
            </div>
        </div>
    `;
};

window.templateRenderers.content = function(slide) {
    const hasImage = slide.image;
    const layoutClass = slide.layout || 'center';
    
    let contentHTML = '';
    
    if (layoutClass === 'left-text-right-image' && hasImage) {
        contentHTML = `
            <div class="slide-content-wrapper">
                <div class="text-content">
                    ${presentationEngine.markdownToHTML(slide.content)}
                </div>
                <div class="image-content">
                    <img src="${slide.image}" alt="Slide Image" class="slide-image">
                </div>
            </div>
        `;
    } else if (layoutClass === 'right-text-left-image' && hasImage) {
        contentHTML = `
            <div class="slide-content-wrapper">
                <div class="image-content">
                    <img src="${slide.image}" alt="Slide Image" class="slide-image">
                </div>
                <div class="text-content">
                    ${presentationEngine.markdownToHTML(slide.content)}
                </div>
            </div>
        `;
    } else if (layoutClass === 'two-column') {
        const contentParts = slide.content.split('---');
        contentHTML = `
            <div class="slide-content-wrapper two-column">
                <div class="column-left">
                    ${presentationEngine.markdownToHTML(contentParts[0] || '')}
                </div>
                <div class="column-right">
                    ${presentationEngine.markdownToHTML(contentParts[1] || '')}
                    ${hasImage ? `<img src="${slide.image}" alt="Slide Image" class="slide-image">` : ''}
                </div>
            </div>
        `;
    } else {
        contentHTML = `
            <div class="slide-content-wrapper center">
                ${presentationEngine.markdownToHTML(slide.content)}
                ${hasImage ? `<img src="${slide.image}" alt="Slide Image" class="slide-image">` : ''}
            </div>
        `;
    }
    
    return `
        <div class="slide-container content minimal-content ${layoutClass}">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                ${contentHTML}
            </div>
        </div>
    `;
};

window.templateRenderers.section = function(slide) {
    return `
        <div class="slide-container section minimal-section">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                <div class="section-content">
                    ${presentationEngine.markdownToHTML(slide.content)}
                </div>
            </div>
        </div>
    `;
};

window.templateRenderers.image = function(slide) {
    return `
        <div class="slide-container image minimal-image">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                <div class="full-image-container">
                    ${slide.image ? `<img src="${slide.image}" alt="Slide Image" class="full-slide-image">` : ''}
                    <div class="image-caption">
                        ${presentationEngine.markdownToHTML(slide.content)}
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.templateRenderers.quote = function(slide) {
    return `
        <div class="slide-container quote minimal-quote">
            <div class="slide-body">
                <div class="quote-content">
                    <blockquote>
                        ${presentationEngine.markdownToHTML(slide.content)}
                    </blockquote>
                    <cite>${slide.title}</cite>
                </div>
            </div>
        </div>
    `;
};

// ミニマルテンプレート用のスタイル
const minimalStyles = `
    /* ミニマルテンプレート専用スタイル */
    .minimal-title {
        background: white;
        color: #333;
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 1px solid #E0E0E0;
    }
    
    .minimal-title .slide-header h1 {
        font-size: 3rem;
        font-weight: 300;
        margin-bottom: 40px;
        color: #333;
        letter-spacing: -1px;
    }
    
    .minimal-title .slide-body {
        font-size: 1.3rem;
        line-height: 1.8;
        margin-bottom: 60px;
        color: #666;
        font-weight: 300;
    }
    
    .minimal-title .slide-footer {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1rem;
        color: #999;
        font-weight: 300;
    }
    
    .minimal-content {
        background: white;
        border: 1px solid #E0E0E0;
    }
    
    .minimal-content .slide-header {
        margin-bottom: 40px;
        border-bottom: 1px solid #E0E0E0;
        padding-bottom: 20px;
    }
    
    .minimal-content .slide-header h1 {
        font-size: 2.2rem;
        color: #333;
        font-weight: 400;
        margin: 0;
        letter-spacing: -0.5px;
    }
    
    .minimal-content .slide-content-wrapper {
        display: flex;
        height: 100%;
        align-items: center;
        gap: 40px;
    }
    
    .minimal-content .slide-content-wrapper.center {
        flex-direction: column;
        justify-content: center;
        text-align: left;
    }
    
    .minimal-content .slide-content-wrapper.two-column {
        flex-direction: row;
    }
    
    .minimal-content .text-content,
    .minimal-content .column-left,
    .minimal-content .column-right {
        flex: 1;
    }
    
    .minimal-content .image-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .minimal-content .slide-image {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .minimal-section {
        background: #F8F9FA;
        color: #333;
        text-align: center;
        justify-content: center;
        align-items: center;
        border: 1px solid #E0E0E0;
    }
    
    .minimal-section .slide-header h1 {
        font-size: 3.5rem;
        font-weight: 200;
        color: #333;
        margin-bottom: 30px;
        letter-spacing: -1px;
    }
    
    .minimal-section .section-content {
        font-size: 1.5rem;
        line-height: 1.8;
        color: #666;
        font-weight: 300;
    }
    
    .minimal-image {
        background: white;
        border: 1px solid #E0E0E0;
    }
    
    .minimal-image .slide-header {
        margin-bottom: 30px;
        text-align: center;
    }
    
    .minimal-image .slide-header h1 {
        font-size: 2rem;
        font-weight: 300;
        color: #333;
    }
    
    .minimal-image .full-image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: center;
    }
    
    .minimal-image .full-slide-image {
        max-width: 85%;
        max-height: 70%;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .minimal-image .image-caption {
        margin-top: 30px;
        font-size: 1rem;
        color: #666;
        text-align: center;
        max-width: 70%;
        font-weight: 300;
        line-height: 1.6;
    }
    
    .minimal-quote {
        background: white;
        color: #333;
        justify-content: center;
        align-items: center;
        text-align: center;
        border: 1px solid #E0E0E0;
    }
    
    .minimal-quote .quote-content {
        max-width: 75%;
    }
    
    .minimal-quote blockquote {
        font-size: 2rem;
        font-style: italic;
        line-height: 1.6;
        margin: 0 0 40px 0;
        color: #333;
        font-weight: 300;
        position: relative;
    }
    
    .minimal-quote blockquote::before,
    .minimal-quote blockquote::after {
        content: '"';
        font-size: 3rem;
        color: #CCC;
        position: absolute;
        font-style: normal;
    }
    
    .minimal-quote blockquote::before {
        left: -30px;
        top: -10px;
    }
    
    .minimal-quote blockquote::after {
        right: -30px;
        bottom: -20px;
    }
    
    .minimal-quote cite {
        font-size: 1.2rem;
        font-style: normal;
        color: #666;
        font-weight: 300;
    }
    
    /* ミニマルテンプレート用のテキスト */
    .minimal-content p {
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
        font-weight: 300;
        margin: 20px 0;
    }
    
    .minimal-content h2 {
        font-size: 1.8rem;
        color: #333;
        font-weight: 400;
        margin: 30px 0 20px 0;
        letter-spacing: -0.5px;
    }
    
    .minimal-content h3 {
        font-size: 1.4rem;
        color: #333;
        font-weight: 400;
        margin: 25px 0 15px 0;
    }
    
    /* ミニマルテンプレート用のリスト */
    .minimal-content ul {
        list-style: none;
        padding-left: 0;
    }
    
    .minimal-content li {
        position: relative;
        padding-left: 25px;
        margin: 12px 0;
        font-size: 1.2rem;
        line-height: 1.8;
        color: #333;
        font-weight: 300;
    }
    
    .minimal-content li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #999;
        font-weight: normal;
    }
    
    /* 強調 */
    .minimal-content strong {
        color: #333;
        font-weight: 500;
    }
    
    .minimal-content em {
        color: #666;
        font-style: italic;
    }
    
    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .minimal-title .slide-header h1 {
            font-size: 2.2rem;
        }
        
        .minimal-content .slide-header h1 {
            font-size: 1.8rem;
        }
        
        .minimal-content .slide-content-wrapper {
            flex-direction: column;
            gap: 20px;
        }
        
        .minimal-section .slide-header h1 {
            font-size: 2.5rem;
        }
        
        .minimal-quote blockquote {
            font-size: 1.5rem;
        }
        
        .minimal-content p,
        .minimal-content li {
            font-size: 1rem;
        }
        
        .minimal-content h2 {
            font-size: 1.5rem;
        }
        
        .minimal-content h3 {
            font-size: 1.2rem;
        }
    }
`;

// スタイルを追加
const styleElement = document.createElement('style');
styleElement.textContent = minimalStyles;
document.head.appendChild(styleElement);

