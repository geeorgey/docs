/**
 * プレゼンテーション詳細ページ JavaScript
 * Salesforce11年目に思っていること
 */

// グローバル変数
let currentSlide = 1;
const totalSlides = 13;

// DOM読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    setupKeyboardNavigation();
    updateSlideCounter();
    updateNavigationButtons();
});

/**
 * プレゼンテーションの初期化
 */
function initializePresentation() {
    // 最初のスライドを表示
    showSlide(1);
    
    // サムネイルの初期化
    updateThumbnails();
    
    // ナビゲーションボタンのイベントリスナー設定
    setupNavigationButtons();
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
    
    // UI更新
    updateSlideCounter();
    updateNavigationButtons();
    updateThumbnails();
    
    // スライド変更をアナウンス（アクセシビリティ）
    announceSlideChange(slideNumber);
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
 * 指定されたスライドに直接移動
 * @param {number} slideNumber - 移動先のスライド番号
 */
function goToSlide(slideNumber) {
    showSlide(slideNumber);
}

/**
 * スライドカウンターの更新
 */
function updateSlideCounter() {
    const currentSlideElement = document.querySelector('.current-slide');
    const totalSlidesElement = document.querySelector('.total-slides');
    
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlide;
    }
    
    if (totalSlidesElement) {
        totalSlidesElement.textContent = totalSlides;
    }
}

/**
 * ナビゲーションボタンの状態更新
 */
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentSlide === totalSlides;
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
    const currentThumbnail = document.querySelector(`.thumbnail:nth-child(${currentSlide})`);
    if (currentThumbnail) {
        currentThumbnail.classList.add('active');
    }
}

/**
 * ナビゲーションボタンのイベントリスナー設定
 */
function setupNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
}

/**
 * キーボードナビゲーションの設定
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // スペースキー
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
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
                // フルスクリーンモードの切り替え（将来の機能）
                break;
        }
    });
}

/**
 * スライド変更のアナウンス（アクセシビリティ）
 * @param {number} slideNumber - 現在のスライド番号
 */
function announceSlideChange(slideNumber) {
    const announcement = `スライド ${slideNumber} / ${totalSlides}`;
    
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

/**
 * フルスクリーンモードの切り替え（将来の機能）
 */
function toggleFullscreen() {
    const slideContainer = document.querySelector('.slide-container');
    
    if (!document.fullscreenElement) {
        slideContainer.requestFullscreen().catch(err => {
            console.log(`フルスクリーンモードに入れませんでした: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * スライドの自動再生（将来の機能）
 */
let autoplayInterval;
let isAutoplay = false;

function startAutoplay(interval = 5000) {
    if (isAutoplay) return;
    
    isAutoplay = true;
    autoplayInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            stopAutoplay();
        }
    }, interval);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isAutoplay = false;
}

function toggleAutoplay() {
    if (isAutoplay) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

/**
 * スライドの印刷（将来の機能）
 */
function printSlides() {
    window.print();
}

/**
 * スライドの共有（将来の機能）
 */
function shareSlide() {
    const url = `${window.location.href}#slide-${currentSlide}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Salesforce11年目に思っていること',
            text: `スライド ${currentSlide}: ${getSlideTitleByNumber(currentSlide)}`,
            url: url
        });
    } else {
        // フォールバック: URLをクリップボードにコピー
        navigator.clipboard.writeText(url).then(() => {
            alert('スライドのURLがクリップボードにコピーされました');
        });
    }
}

/**
 * スライド番号からタイトルを取得
 * @param {number} slideNumber - スライド番号
 * @returns {string} スライドタイトル
 */
function getSlideTitleByNumber(slideNumber) {
    const titles = [
        'タイトル',
        'アジェンダ',
        '導入背景',
        '初期取り組み',
        '機能拡張',
        'Dreamforce 2019',
        '組織変革',
        'AI推進',
        '成果',
        '学び',
        '課題',
        '展望',
        'まとめ'
    ];
    
    return titles[slideNumber - 1] || '';
}

/**
 * URLハッシュからスライド番号を取得して移動
 */
function handleHashChange() {
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    
    if (match) {
        const slideNumber = parseInt(match[1], 10);
        if (slideNumber >= 1 && slideNumber <= totalSlides) {
            goToSlide(slideNumber);
        }
    }
}

// ページ読み込み時とハッシュ変更時にスライド移動を処理
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

/**
 * タッチ操作対応（モバイル）
 */
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 左スワイプ - 次のスライド
            nextSlide();
        } else {
            // 右スワイプ - 前のスライド
            previousSlide();
        }
    }
}

// タッチイベントリスナーの設定
document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.slide-container');
    if (slideContainer) {
        slideContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
});

/**
 * パフォーマンス最適化
 */
function preloadSlides() {
    // 次のスライドと前のスライドを事前読み込み（将来の機能）
    const nextSlideNumber = currentSlide + 1;
    const prevSlideNumber = currentSlide - 1;
    
    // 実装は必要に応じて追加
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', function(event) {
    console.error('プレゼンテーションでエラーが発生しました:', event.error);
});

// デバッグ用（開発時のみ）
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.presentationDebug = {
        currentSlide: () => currentSlide,
        totalSlides: () => totalSlides,
        goToSlide: goToSlide,
        nextSlide: nextSlide,
        previousSlide: previousSlide
    };
}

