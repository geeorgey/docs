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
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');
    
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
        switch(event.key) {
            case 'ArrowRight':
            case ' ': // スペースキー
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
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    toggleFullscreen();
                }
                break;
        }
    });
}

/**
 * フルスクリーンモードの切り替え
 */
function toggleFullscreen() {
    const presentationContainer = document.querySelector('.presentation-container');
    
    if (!document.fullscreenElement) {
        enterFullscreen(presentationContainer);
    } else {
        exitFullscreen();
    }
}

/**
 * フルスクリーンモードに入る
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

/**
 * フルスクリーンモードを終了
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
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
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const presentationContainer = document.querySelector('.presentation-container');
    
    isFullscreen = !!document.fullscreenElement;
    
    if (fullscreenBtn) {
        const icon = fullscreenBtn.querySelector('i');
        if (isFullscreen) {
            icon.className = 'fas fa-compress';
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> 全画面終了';
            presentationContainer.classList.add('fullscreen-mode');
        } else {
            icon.className = 'fas fa-expand';
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> 全画面表示';
            presentationContainer.classList.remove('fullscreen-mode');
        }
    }
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

/**
 * スライド番号からタイトルを取得
 * @param {number} slideNumber - スライド番号
 * @returns {string} スライドタイトル
 */
function getSlideTitleByNumber(slideNumber) {
    const titles = [
        'タイトル',
        'プロフィール',
        'SaaS導入の進化',
        'リバネスグループ概要',
        '利用メリット・価値実感',
        '導入してよかった点',
        '定着した瞬間',
        '導入の背景 - 危機感1',
        '危機感2 - 営業会議',
        '危機感3 - 数字が合わない',
        'Salesforceとの出会い',
        '導入決定の理由',
        '懸念事項',
        '導入後の社内の反対',
        '社内定着・運用体制',
        '活動入力の徹底',
        'Slack Salesforce Connector',
        '使いこなせるか不安という話',
        '利用シーン・機能デモ',
        '課題・改善要望・将来展望',
        'Agentforceの課題',
        '今後の展望',
        '営業アプローチ',
        '営業電話について',
        '3つの壁を乗り越える',
        '中小企業への価値提案',
        '印象に残ったAE',
        '過去の自分への営業',
        '経営層が話を聞く会社',
        '情報収集方法',
        'Thank you'
    ];
    
    return titles[slideNumber - 1] || `スライド ${slideNumber}`;
}

/**
 * タッチ操作対応（モバイル）
 */
let touchStartX = 0;
let touchEndX = 0;

function setupTouchNavigation() {
    const slideContainer = document.querySelector('.slide-container');
    if (slideContainer) {
        slideContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        slideContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
}

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
 * スライドの共有
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
        }).catch(() => {
            // クリップボードAPIが使えない場合
            prompt('以下のURLをコピーしてください:', url);
        });
    }
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
        previousSlide: previousSlide,
        toggleFullscreen: toggleFullscreen
    };
}

