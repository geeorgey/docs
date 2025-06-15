/**
 * Business Template - プレゼンテーションテンプレート
 * 
 * ビジネス向けプレゼンテーション用のテンプレートレンダラー
 */

// テンプレートレンダラーを登録
if (!window.templateRenderers) {
    window.templateRenderers = {};
}

// ビジネステンプレート用のレンダラー
window.templateRenderers.title = function(slide) {
    return `
        <div class="slide-container title business-title">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                ${presentationEngine.markdownToHTML(slide.content)}
            </div>
            <div class="slide-footer">
                <div class="company-info">
                    ${presentationEngine.metadata.author || ''}
                </div>
                <div class="date-info">
                    ${presentationEngine.metadata.date || ''}
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
        <div class="slide-container content business-content ${layoutClass}">
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
        <div class="slide-container section business-section">
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
        <div class="slide-container image business-image">
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
        <div class="slide-container quote business-quote">
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

// ビジネステンプレート用のスタイル
const businessStyles = `
    /* ビジネステンプレート専用スタイル */
    .business-title {
        background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
        color: white;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    
    .business-title .slide-header h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 30px;
        color: white;
    }
    
    .business-title .slide-body {
        font-size: 1.5rem;
        line-height: 1.6;
        margin-bottom: 40px;
    }
    
    .business-title .slide-footer {
        position: absolute;
        bottom: 40px;
        left: 40px;
        right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;
        opacity: 0.9;
    }
    
    .business-content .slide-header {
        margin-bottom: 30px;
        border-bottom: 3px solid #3498DB;
        padding-bottom: 15px;
    }
    
    .business-content .slide-header h1 {
        font-size: 2.5rem;
        color: #2C3E50;
        font-weight: 600;
        margin: 0;
    }
    
    .business-content .slide-content-wrapper {
        display: flex;
        height: 100%;
        align-items: center;
        gap: 40px;
    }
    
    .business-content .slide-content-wrapper.center {
        flex-direction: column;
        justify-content: center;
        text-align: left;
    }
    
    .business-content .slide-content-wrapper.two-column {
        flex-direction: row;
    }
    
    .business-content .text-content,
    .business-content .column-left,
    .business-content .column-right {
        flex: 1;
    }
    
    .business-content .image-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .business-content .slide-image {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .business-section {
        background: linear-gradient(135deg, #3498DB 0%, #2980B9 100%);
        color: white;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    
    .business-section .slide-header h1 {
        font-size: 4rem;
        font-weight: 700;
        color: white;
        margin-bottom: 30px;
    }
    
    .business-section .section-content {
        font-size: 1.8rem;
        line-height: 1.6;
    }
    
    .business-image .slide-header {
        margin-bottom: 20px;
    }
    
    .business-image .full-image-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: center;
    }
    
    .business-image .full-slide-image {
        max-width: 90%;
        max-height: 70%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
    
    .business-image .image-caption {
        margin-top: 20px;
        font-size: 1.1rem;
        color: #666;
        text-align: center;
        max-width: 80%;
    }
    
    .business-quote {
        background: linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%);
        color: white;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    
    .business-quote .quote-content {
        max-width: 80%;
    }
    
    .business-quote blockquote {
        font-size: 2.5rem;
        font-style: italic;
        line-height: 1.4;
        margin: 0 0 30px 0;
        position: relative;
    }
    
    .business-quote blockquote::before {
        content: '"';
        font-size: 4rem;
        position: absolute;
        left: -40px;
        top: -10px;
        opacity: 0.5;
    }
    
    .business-quote cite {
        font-size: 1.5rem;
        font-style: normal;
        opacity: 0.9;
    }
    
    /* ビジネステンプレート用のリスト */
    .business-content ul {
        list-style: none;
        padding-left: 0;
    }
    
    .business-content li {
        position: relative;
        padding-left: 30px;
        margin: 15px 0;
        font-size: 1.3rem;
        line-height: 1.6;
    }
    
    .business-content li::before {
        content: '▶';
        position: absolute;
        left: 0;
        color: #3498DB;
        font-weight: bold;
    }
    
    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .business-title .slide-header h1 {
            font-size: 2.5rem;
        }
        
        .business-content .slide-header h1 {
            font-size: 2rem;
        }
        
        .business-content .slide-content-wrapper {
            flex-direction: column;
            gap: 20px;
        }
        
        .business-section .slide-header h1 {
            font-size: 2.8rem;
        }
        
        .business-quote blockquote {
            font-size: 1.8rem;
        }
        
        .business-content li {
            font-size: 1.1rem;
        }
    }
`;

// スタイルを追加
const styleElement = document.createElement('style');
styleElement.textContent = businessStyles;
document.head.appendChild(styleElement);

