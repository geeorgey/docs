/**
 * プレゼンテーションアーカイブ JavaScript
 * 作成: 2025年6月
 */

class PresentationArchive {
  constructor() {
    this.presentations = [];
    this.filteredPresentations = [];
    this.currentCategory = 'all';
    this.currentYear = 'all';
    this.searchQuery = '';
    
    this.init();
  }

  async init() {
    try {
      await this.loadData();
      this.setupEventListeners();
      this.renderPresentations();
      this.animateElements();
      this.animateCounters();
    } catch (error) {
      console.error('初期化エラー:', error);
    }
  }

  async loadData() {
    try {
      // 本来はJSONファイルから読み込むが、デモ用にハードコード
      this.presentations = [
        {
          id: "salesforce-11th-year-2025",
          title: "Salesforce11年目に思っていること",
          date: "2025-06-06",
          company: "株式会社リバネスナレッジ",
          categories: ["Salesforce", "リーダーシップ"],
          tags: ["Salesforce", "振り返り", "IT戦略", "組織変革"],
          thumbnail: "images/slides/salesforce-11years-thumbnail.png",
          url: "presentations/salesforce-11years.html",
          pdf: "#",
          description: "Salesforce導入から11年目を迎えて、これまでの取り組みと今後の展望について考察したプレゼンテーション。組織のDX推進における学びと課題を共有。",
          slides_count: 33
        }
      ];
      
      this.filteredPresentations = [...this.presentations];
    } catch (error) {
      console.error('データ読み込みエラー:', error);
    }
  }

  setupEventListeners() {
    // カテゴリタブ
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.setActiveCategory(e.target.dataset.category);
      });
    });

    // 検索入力
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterPresentations();
      });
    }

    // 年フィルター
    const yearFilter = document.getElementById('year-filter');
    if (yearFilter) {
      yearFilter.addEventListener('change', (e) => {
        this.currentYear = e.target.value;
        this.filterPresentations();
      });
    }

    // ハンバーガーメニュー
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('active');
      });
    }

    if (closeMenu && mobileMenu) {
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    }

    // スクロールアニメーション
    window.addEventListener('scroll', () => {
      this.handleScrollAnimation();
    });

    // ダークモード切り替え（将来の機能）
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      });
    }
  }

  setActiveCategory(category) {
    this.currentCategory = category;
    
    // タブのアクティブ状態を更新
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    this.filterPresentations();
  }

  filterPresentations() {
    this.filteredPresentations = this.presentations.filter(presentation => {
      // カテゴリフィルター
      const categoryMatch = this.currentCategory === 'all' || 
        presentation.categories.includes(this.currentCategory);
      
      // 年フィルター
      const yearMatch = this.currentYear === 'all' || 
        presentation.date.startsWith(this.currentYear);
      
      // 検索フィルター
      const searchMatch = this.searchQuery === '' ||
        presentation.title.toLowerCase().includes(this.searchQuery) ||
        presentation.description.toLowerCase().includes(this.searchQuery) ||
        presentation.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
      
      return categoryMatch && yearMatch && searchMatch;
    });
    
    this.renderPresentations();
  }

  renderPresentations() {
    const grid = document.querySelector('.presentations-grid');
    if (!grid) return;

    if (this.filteredPresentations.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          <h3>該当するプレゼンテーションが見つかりませんでした</h3>
          <p>検索条件を変更してお試しください。</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredPresentations.map(presentation => `
      <div class="presentation-card fade-in">
        <div class="card-image">
          <img src="${presentation.thumbnail}" alt="${presentation.title}" loading="lazy">
        </div>
        <div class="card-content">
          <h3 class="card-title">${presentation.title}</h3>
          <div class="card-meta">
            <span class="card-date">
              <i class="icon-calendar"></i>
              ${this.formatDate(presentation.date)}
            </span>
            <span class="card-company">
              <i class="icon-building"></i>
              ${presentation.company}
            </span>
          </div>
          <div class="card-tags">
            ${presentation.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
          </div>
          <p class="card-description">${presentation.description}</p>
          <div class="card-actions">
            <a href="${presentation.url}" class="btn btn-primary" target="_blank" rel="noopener">
              <i class="icon-eye"></i>
              閲覧
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // アニメーション再適用
    this.animateElements();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  animateElements() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.presentation-card, .stat-item').forEach(el => {
      observer.observe(el);
    });
  }

  animateCounters() {
    const counters = [
      { element: document.querySelector('.stat-number[data-count="3000"]'), target: 3000, suffix: '+' },
      { element: document.querySelector('.stat-number[data-count="11"]'), target: 11, suffix: '' },
      { element: document.querySelector('.stat-number[data-count="25"]'), target: 25, suffix: '+' },
      { element: document.querySelector('.stat-number[data-count="100"]'), target: 100, suffix: '+' }
    ];

    counters.forEach(counter => {
      if (!counter.element) return;
      
      let current = 0;
      const increment = counter.target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= counter.target) {
          current = counter.target;
          clearInterval(timer);
        }
        counter.element.textContent = Math.floor(current) + counter.suffix;
      }, 50);
    });
  }

  handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('fade-in');
      }
    });
  }

  // ユーティリティメソッド
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // パフォーマンス最適化
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// DOM読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
  new PresentationArchive();
});

// サービスワーカー登録（PWA対応）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

