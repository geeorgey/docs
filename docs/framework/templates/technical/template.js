/**
 * Technical Template - プレゼンテーションテンプレート
 * 
 * 技術発表・勉強会向けプレゼンテーション用のテンプレートレンダラー
 */

// テンプレートレンダラーを登録
if (!window.templateRenderers) {
    window.templateRenderers = {};
}

// 技術テンプレート用のレンダラー
window.templateRenderers.title = function(slide) {
    return `
        <div class="slide-container title technical-title">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                ${presentationEngine.markdownToHTML(slide.content)}
            </div>
            <div class="slide-footer">
                <div class="author-info">
                    <i class="fas fa-user"></i> ${presentationEngine.metadata.author || ''}
                </div>
                <div class="event-info">
                    <i class="fas fa-calendar"></i> ${presentationEngine.metadata.date || ''}
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
        <div class="slide-container content technical-content ${layoutClass}">
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
        <div class="slide-container section technical-section">
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

window.templateRenderers.code = function(slide) {
    return `
        <div class="slide-container code technical-code">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                <div class="code-content">
                    <pre><code class="language-${slide.language || 'javascript'}">${slide.content}</code></pre>
                </div>
            </div>
        </div>
    `;
};

window.templateRenderers.demo = function(slide) {
    return `
        <div class="slide-container demo technical-demo">
            <div class="slide-header">
                <h1>${slide.title}</h1>
            </div>
            <div class="slide-body">
                <div class="demo-content">
                    ${presentationEngine.markdownToHTML(slide.content)}
                    ${slide.image ? `<img src="${slide.image}" alt="Demo Image" class="demo-image">` : ''}
                </div>
            </div>
        </div>
    `;
};

// 技術テンプレート用のスタイル
const technicalStyles = `
    /* 技術テンプレート専用スタイル */
    .technical-title {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        text-align: center;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .technical-title::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1.5" fill="rgba(255,255,255,0.1)"/></svg>');
        opacity: 0.3;
    }
    
    .technical-title .slide-header {
        position: relative;
        z-index: 1;
    }
    
    .technical-title .slide-header h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 30px;
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .technical-title .slide-body {
        font-size: 1.5rem;
        line-height: 1.6;
        margin-bottom: 40px;
        position: relative;
        z-index: 1;
    }
    
    .technical-title .slide-footer {
        position: absolute;
        bottom: 40px;
        left: 40px;
        right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.1rem;
        opacity: 0.9;
        z-index: 1;
    }
    
    .technical-title .slide-footer i {
        margin-right: 8px;
        color: #3498DB;
    }
    
    .technical-content .slide-header {
        margin-bottom: 30px;
        border-left: 5px solid #E74C3C;
        padding-left: 20px;
        background: linear-gradient(90deg, rgba(231, 76, 60, 0.1) 0%, transparent 100%);
        padding: 15px 20px;
        border-radius: 0 8px 8px 0;
    }
    
    .technical-content .slide-header h1 {
        font-size: 2.5rem;
        color: #2C3E50;
        font-weight: 600;
        margin: 0;
        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    }
    
    .technical-content .slide-content-wrapper {
        display: flex;
        height: 100%;
        align-items: center;
        gap: 40px;
    }
    
    .technical-content .slide-content-wrapper.center {
        flex-direction: column;
        justify-content: center;
        text-align: left;
    }
    
    .technical-content .slide-content-wrapper.two-column {
        flex-direction: row;
    }
    
    .technical-content .text-content,
    .technical-content .column-left,
    .technical-content .column-right {
        flex: 1;
    }
    
    .technical-content .image-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .technical-content .slide-image {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 2px solid #34495E;
    }
    
    .technical-section {
        background: linear-gradient(135deg, #E74C3C 0%, #C0392B 100%);
        color: white;
        text-align: center;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    
    .technical-section::before {
        content: '</>';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20rem;
        opacity: 0.1;
        font-family: 'Fira Code', monospace;
        z-index: 0;
    }
    
    .technical-section .slide-header {
        position: relative;
        z-index: 1;
    }
    
    .technical-section .slide-header h1 {
        font-size: 4rem;
        font-weight: 700;
        color: white;
        margin-bottom: 30px;
        font-family: 'Fira Code', monospace;
    }
    
    .technical-section .section-content {
        font-size: 1.8rem;
        line-height: 1.6;
        position: relative;
        z-index: 1;
    }
    
    .technical-code {
        background: #2C3E50;
        color: #ECF0F1;
    }
    
    .technical-code .slide-header {
        border-left: 5px solid #3498DB;
        background: linear-gradient(90deg, rgba(52, 152, 219, 0.2) 0%, transparent 100%);
    }
    
    .technical-code .slide-header h1 {
        color: white;
    }
    
    .technical-code .code-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .technical-code pre {
        background: #34495E;
        border-radius: 8px;
        padding: 30px;
        margin: 0;
        width: 100%;
        max-height: 80%;
        overflow: auto;
        border: 1px solid #4A6741;
    }
    
    .technical-code code {
        font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
        font-size: 1.2rem;
        line-height: 1.6;
        color: #ECF0F1;
    }
    
    .technical-demo .slide-header {
        border-left: 5px solid #27AE60;
        background: linear-gradient(90deg, rgba(39, 174, 96, 0.1) 0%, transparent 100%);
    }
    
    .technical-demo .demo-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: center;
        gap: 30px;
    }
    
    .technical-demo .demo-image {
        max-width: 90%;
        max-height: 60%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        border: 3px solid #27AE60;
    }
    
    /* 技術テンプレート用のリスト */
    .technical-content ul {
        list-style: none;
        padding-left: 0;
    }
    
    .technical-content li {
        position: relative;
        padding-left: 40px;
        margin: 15px 0;
        font-size: 1.3rem;
        line-height: 1.6;
        font-family: 'Fira Code', monospace;
    }
    
    .technical-content li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: #E74C3C;
        font-weight: bold;
        font-size: 1.5rem;
    }
    
    /* インラインコード */
    .technical-content code {
        background: #34495E;
        color: #ECF0F1;
        padding: 4px 8px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
    }
    
    /* 強調 */
    .technical-content strong {
        color: #E74C3C;
        font-weight: 700;
    }
    
    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .technical-title .slide-header h1 {
            font-size: 2.5rem;
        }
        
        .technical-content .slide-header h1 {
            font-size: 2rem;
        }
        
        .technical-content .slide-content-wrapper {
            flex-direction: column;
            gap: 20px;
        }
        
        .technical-section .slide-header h1 {
            font-size: 2.8rem;
        }
        
        .technical-section::before {
            font-size: 10rem;
        }
        
        .technical-code code {
            font-size: 1rem;
        }
        
        .technical-content li {
            font-size: 1.1rem;
        }
    }
`;

// スタイルを追加
const styleElement = document.createElement('style');
styleElement.textContent = technicalStyles;
document.head.appendChild(styleElement);

