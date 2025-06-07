/**
 * プレゼンテーション詳細ページ JavaScript
 * Salesforce11年目に思っていること
 */

// グローバル変数
let currentSlide = 1;
const totalSlides = 31;
let isFullscreen = false;

// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupKeyboardNavigation();
    updateSlideCounter();
    updateNavigationButtons();
    setupTouchNavigation();
    
    // URLパラメータからスライド番号を取得
    const urlParams = new URLSearchParams(window.location.search);
    const slideParam = urlParams.get('slide');
    if (slideParam) {
        const slideNumber = parseInt(slideParam, 10);
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            showSlide(slideNumber);
        }
    }
});

/**
 * プレゼンテーションの初期化
 */
function initializePresentation() {
    // 最初のスライドを表示
    showSlide(1);
    
    // サムネイルの初期化
    generateThumbnails();
    updateThumbnails();
    
    // ナビゲーションボタンのイベントリスナー設定
    setupNavigationButtons();
    
    // フルスクリーンイベントリスナー設定
    setupFullscreenEvents();
}

/**
 * URLパラメータを更新
 * @param {number} slideNumber - 現在のスライド番号
 */
function updateURL(slideNumber) {
    const url = new URL(window.location);
    url.searchParams.set('slide', slideNumber);
    window.history.replaceState({}, '', url);
}

/**
 * 指定されたスライドを表示
 * @param {number} slideNumber - 表示するスライド番号
 */
function showSlide(slideNumber) {
    // 範囲チェック
    if (slideNumber < 1 || slideNumber > totalSlides) {
        return;
    }
    
    // 現在のスライドを非表示
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // 新しいスライドを表示
    const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (newSlideElement) {
        newSlideElement.classList.add('active');
    }
    
    // 現在のスライド番号を更新
    currentSlide = slideNumber;
    
    // URLパラメータを更新
    updateURL(slideNumber);
    
    // UI更新
    updateSlideCounter();
    updateNavigationButtons();
    updateThumbnails();
    
    // スライド変更をアナウンス（アクセシビリティ）
    announceSlideChange(slideNumber);
}

/**
 * スライド変更関数（ナビゲーションボタン用）
 * @param {number} direction - 移動方向（1: 次, -1: 前）
 */
function changeSlide(direction) {
    const newSlide = currentSlide + direction;
    if (newSlide >= 1 && newSlide <= totalSlides) {
        showSlide(newSlide);
    }
}

/**
 * 次のスライドに移動
 */
function nextSlide() {
    if (currentSlide < totalSlides) {
        showSlide(currentSlide + 1);
    }
}

/**
 * 前のスライドに移動
 */
function previousSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

/**
 * 指定されたスライドに移動
 * @param {number} slideNumber - 移動先のスライド番号
 */
function goToSlide(slideNumber) {
    showSlide(slideNumber);
}

/**
 * スライドカウンターの更新
 */
function updateSlideCounter() {
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }
    
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
    
    // 古いIDも確認（互換性のため）
    const slideCounter = document.getElementById('slideCounter');
    if (slideCounter) {
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }
}

/**
 * ナビゲーションボタンの状態更新
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
        prevBtn.style.opacity = currentSlide === 1 ? '0.5' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
        nextBtn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
    }
}

/**
 * サムネイルの生成
 */
function generateThumbnails() {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    if (!thumbnailGrid) return;
    
    thumbnailGrid.innerHTML = '';
    
    for (let i = 1; i <= totalSlides; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.setAttribute('data-slide', i);
        thumbnail.innerHTML = `
            <div class="thumbnail-content">
                <div class="thumbnail-number">${i}</div>
                <div class="thumbnail-title">${getSlideTitleByNumber(i)}</div>
            </div>
        `;
        
        thumbnail.addEventListener('click', () => goToSlide(i));
        thumbnailGrid.appendChild(thumbnail);
    }
}

/**
 * サムネイルの状態更新
 */
function updateThumbnails() {
    // 全てのサムネイルからactiveクラスを削除
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });
    
    // 現在のスライドのサムネイルにactiveクラスを追加
    const currentThumbnail = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (currentThumbnail) {
        currentThumbnail.classList.add('active');
    }
}

/**
 * ナビゲーションボタンのイベントリスナー設定
 */
function setupNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}

/**
 * キーボードナビゲーションの設定
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // フォーカスが入力フィールドにある場合はスキップ
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }
        
        console.log('Key pressed:', event.key, 'Code:', event.code, 'Ctrl:', event.ctrlKey);
        
        switch (event.key) {
            case 'ArrowRight':
            case ' ':
            case 'PageDown':
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                event.preventDefault();
                previousSlide();
                break;
            case 'Home':
                event.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                event.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'Escape':
                event.preventDefault();
                if (isFullscreen) {
                    exitFullscreen();
                }
                break;
            case 'f':
            case 'F':
                // 単独のFキーまたはCtrl+Fで全画面表示
                event.preventDefault();
                toggleFullscreen();
                break;
        }
    });
}

/**
 * フルスクリーンモードの切り替え
 */
function toggleFullscreen() {
    console.log('Toggle fullscreen called, current state:', isFullscreen);
    
    // モバイルデバイスの判定
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isFullscreen) {
        enterFullscreen(isMobile);
    } else {
        exitFullscreen(isMobile);
    }
}

/**
 * フルスクリーンモードに入る
 */
function enterFullscreen(isMobile = false) {
    console.log('Entering fullscreen, mobile:', isMobile);
    
    // まずCSSクラスを追加
    document.body.classList.add('fullscreen-mode');
    isFullscreen = true;
    
    // モバイルの場合は疑似フルスクリーンを使用
    if (isMobile) {
        // iOSの場合、viewport meta tagを調整
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
        
        // スクロールを無効化
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        // 疑似フルスクリーンクラスを追加
        document.body.classList.add('pseudo-fullscreen');
        
        updateFullscreenButton();
        return;
    }
    
    // デスクトップの場合はフルスクリーンAPIを使用
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
        element.requestFullscreen().catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
            // フルスクリーンAPIが失敗した場合は疑似フルスクリーンを使用
            document.body.classList.add('pseudo-fullscreen');
        });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        console.warn('Fullscreen API not supported, using pseudo-fullscreen');
        document.body.classList.add('pseudo-fullscreen');
    }
    
    updateFullscreenButton();
}

/**
 * フルスクリーンモードを終了
 */
function exitFullscreen(isMobile = false) {
    console.log('Exiting fullscreen, mobile:', isMobile);
    
    // CSSクラスを削除
    document.body.classList.remove('fullscreen-mode');
    document.body.classList.remove('pseudo-fullscreen');
    isFullscreen = false;
    
    // モバイルの場合の処理
    if (isMobile) {
        // viewport meta tagを元に戻す
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
        }
        
        // スクロールを有効化
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        updateFullscreenButton();
        return;
    }
    
    // デスクトップの場合はフルスクリーンAPIで終了
    if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
        });
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    updateFullscreenButton();
}

/**
 * フルスクリーンボタンの表示更新
 */
function updateFullscreenButton() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        if (isFullscreen) {
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> 全画面終了';
        } else {
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> 全画面表示';
        }
    }
}

/**
 * フルスクリーンイベントの設定
 */
function setupFullscreenEvents() {
    const fullscreenEvents = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'msfullscreenchange'
    ];
    
    fullscreenEvents.forEach(event => {
        document.addEventListener(event, handleFullscreenChange);
    });
}

/**
 * フルスクリーン状態変更の処理
 */
function handleFullscreenChange() {
    const isCurrentlyFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || 
                                     document.mozFullScreenElement || document.msFullscreenElement);
    
    console.log('Fullscreen change detected:', isCurrentlyFullscreen);
    
    if (isCurrentlyFullscreen && !isFullscreen) {
        // フルスクリーンが開始された場合
        document.body.classList.add('fullscreen-mode');
        isFullscreen = true;
    } else if (!isCurrentlyFullscreen && isFullscreen) {
        // フルスクリーンが終了された場合
        document.body.classList.remove('fullscreen-mode');
        isFullscreen = false;
    }
    
    updateFullscreenButton();
}

/**
 * タッチナビゲーションの設定
 */
function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    const slideContainer = document.querySelector('.slide-container');
    
    if (!slideContainer) return;
    
    slideContainer.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    
    slideContainer.addEventListener('touchend', function(event) {
        if (!startX || !startY) return;
        
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // 水平方向のスワイプが垂直方向より大きい場合のみ処理
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > 50) { // 最小スワイプ距離
                if (diffX > 0) {
                    // 左にスワイプ（次のスライド）
                    nextSlide();
                } else {
                    // 右にスワイプ（前のスライド）
                    previousSlide();
                }
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

/**
 * スライド番号からタイトルを取得
 * @param {number} slideNumber - スライド番号
 * @returns {string} スライドタイトル
 */
function getSlideTitleByNumber(slideNumber) {
    const slideTitles = {
        1: "タイトル",
        2: "プロフィール",
        3: "アジェンダ",
        4: "導入背景",
        5: "初期取り組み（2014年）",
        6: "機能拡張期（2015-2017年）",
        7: "Dreamforce登壇（2019年）",
        8: "組織変革期（2020-2022年）",
        9: "AI推進期（2023-2025年）",
        10: "成果と実績",
        11: "学びと気づき",
        12: "現在の課題",
        13: "今後の展望",
        14: "まとめ",
        15: "質疑応答",
        16: "参考資料",
        17: "補足資料1",
        18: "補足資料2",
        19: "補足資料3",
        20: "補足資料4",
        21: "補足資料5",
        22: "年3度のバージョンアップの恩恵",
        23: "Lightning Experienceへの移行",
        24: "Salesforce Flowの活用",
        25: "データ統合とAPI活用",
        26: "セキュリティとガバナンス",
        27: "ユーザー教育と定着化",
        28: "ROI測定と効果検証",
        29: "今後のロードマップ",
        30: "組織文化の変革",
        31: "最終メッセージ"
    };
    
    return slideTitles[slideNumber] || `スライド ${slideNumber}`;
}

/**
 * スライド変更のアナウンス（アクセシビリティ）
 * @param {number} slideNumber - 現在のスライド番号
 */
function announceSlideChange(slideNumber) {
    const announcement = `スライド ${slideNumber} / ${totalSlides}: ${getSlideTitleByNumber(slideNumber)}`;
    
    // スクリーンリーダー用の要素を作成または更新
    let announcer = document.getElementById('slide-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'slide-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.overflow = 'hidden';
        document.body.appendChild(announcer);
    }
    
    announcer.textContent = announcement;
}

