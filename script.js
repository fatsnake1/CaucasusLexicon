/**
 * CAUCASUS LEXICON — ENGINE
 * Client-Side JavaScript for Scholarly Symbol Archive & Multilingual System
 * Vanilla JS, Clean Modular Design, Production-Ready
 */

// ==========================================================================
// 1. GLOBAL STATE & LOCALIZATION DATA
// ==========================================================================

let symbolsData = [];
let articlesData = [];

let currentLang = 'en';
let currentTheme = 'light';
let activeFilter = 'all';
let searchQuery = '';

let isArticleExtended = false;
let isDictionaryExtended = false;

// UI Localization Dictionary
const localization = {
  'en': {
    'nav-home': 'Home',
    'nav-article': 'Article',
    'nav-dictionary': 'Dictionary',
    'nav-contact': 'Contact',
    'hero-meta': 'SCHOLARLY INITIATIVE',
    'scroll-explore': 'SCROLL DOWN',
    'article-title': 'ARTICLES',
    'article-subtitle': 'Articles and entries on Caucasian semiotics, culture and research.',
    'dictionary-title': 'SYMBOL LEXICON',
    'dictionary-subtitle': 'A curated database of visual motifs present all throughout the Caucasus',
    'filter-by': 'FILTER:',
    'filter-all': 'All',
    'results-found': 'symbols indexed',
    'reset-filters': 'Reset filters',
    'contact-title': 'CONTACT & INQUIRY',
    'contact-subtitle': 'Collaborative avenues, academic submissions, and digital stewardship.',
    'scope-title': 'LICENSE',
    'scope-desc': 'This website is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License v3.0 as published by the Free Software Foundation. This website is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY. You can view the full license and the Source code below.',
    'steward-title': 'ABOUT',
    'steward-desc': 'The Caucasus Lexicon is a solo research project that began in 2026. At the moment it is solely ran by me, Mikheil Juruli. So much of the information about Caucasian heritage is kept in the dark, either because of language barriers or the sheer inaccesibility of older sources. With this free and open-source research project I hope to break barriers and give a central place to this esoteric knowledge. I hope to grow this project and for other researchers to join me in this massive undertaking.',
    'citation-lbl': 'STATUS:',
    'typography-lbl': 'TYPOGRAPHY:',
    'connect-title': 'INQUIRIES',
    'connect-desc': 'Any and all contributions or inquiries are welcome. Submissions, questions and all other contact is done through the following email:',
    'scroll-top': 'Back to top ↑',
    'notes-lbl': 'FOOTNOTES:',
    'refs-lbl': 'REFERENCES:',
    'original-relic': 'Original Relic',
    'btn-read': 'READ ENTRY',
    'btn-close': 'CLOSE ENTRY',
    'search-placeholder': 'Search by name, region, keyword...',
    'modal-origin-lbl': 'ORIGIN:',
    'no-results': 'No symbols match your inquiry.',
    'extend-article-lbl': 'EXTEND ARTICLE',
    'collapse-article-lbl': 'COLLAPSE ARTICLE',
    'extend-dictionary-lbl': 'EXTEND LEXICON',
    'collapse-dictionary-lbl': 'COLLAPSE LEXICON',
    'featured-article-badge': 'FEATURED ENTRY'
  },
  'ka': {
    'nav-home': 'მთავარი',
    'nav-article': 'სტატიები',
    'nav-dictionary': 'ლექსიკონი',
    'nav-contact': 'კონტაქტი',
    'hero-meta': 'სამეცნიერო ინიციატივა',
    'scroll-explore': 'ჩამოსქროლეთ',
    'article-title': 'სტატიები',
    'article-subtitle': 'სტატიები კავკასიური სემიოტიკის, კულტურისა და კვლევის შესახებ.',
    'dictionary-title': 'სიმბოლოების ლექსიკონი',
    'dictionary-subtitle': 'კავკასიური სიმბოლოების, მოტივებისა და ნიშნების არქივი',
    'filter-by': 'ფილტრი:',
    'filter-all': 'ყველა',
    'results-found': 'სიმბოლო ნაპოვნია',
    'reset-filters': 'ფილტრების გასუფთავება',
    'contact-title': 'კონტაქტი',
    'contact-subtitle': 'ინფორმაცია კოლაბორაციის, კავშირისა და ჩვენს შესახებ',
    'scope-title': 'ლიცენზია',
    'scope-desc': 'This website is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License v3.0 as published by the Free Software Foundation. This website is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY. You can view the full license and the Source code below.',
    'steward-title': 'არქივის შესახებ',
    'steward-desc': 'კავკასიური ლექსიკონი 2026 წელს შეიქმნა. პროექტის ავტორი მიხეილ ჟურულია. ინფორმაცია კავკასიური მემკვიდრეობის შესახებ საკმაოდ შეზღუდულია. ენის ბარიერი, მოძველებული წყაროები და, ზოგადად ამ სფეროს ფრაგმენტულობა ძალიან დიდ დაბრკოლებებს წარმოადგენს. ამ ღია პლატფორმის მიზანი საკმაოდ არსებული სამეცნიერო ინფორმაციის ცენტრალიზებაა. იმედია, სამომავლოდ ეს პროექტი გაიზრდება და სხვა მკვლევარები შემოგვიერთდებიან რათა არქივის სრულყოფილი სახე მიცეს.',
    'typography-lbl': 'ტიპოგრაფია:',
    'connect-title': 'კონტაქტი',
    'connect-desc': 'კოლაბორაციის სურვილის ან სხვა კითხვების შემთხვევაში მოცემულ მეილზე დაგვიკავშირდით.',
    'scroll-top': 'ზემოთ დაბრუნება ↑',
    'notes-lbl': 'შენიშვნები:',
    'refs-lbl': 'წყაროები:',
    'btn-read': 'სტატიის გახსნა',
    'btn-close': 'სტატიის დახურვა',
    'search-placeholder': 'მოძებნეთ სახელით, რეგიონით, საკვანძო სიტყვით...',
    'modal-origin-lbl': 'წარმოშობა:',
    'no-results': 'სიმბოლოები მოცემული პარამეტრებით ვერ მოიძებნა.',
    'extend-article-lbl': 'გახსნა',
    'collapse-article-lbl': 'დახურვა',
    'extend-dictionary-lbl': 'ლექსიკონის გაშლა',
    'collapse-dictionary-lbl': 'ლექსიკონის დაპატარავება',
    'featured-article-badge': 'რჩეული სტატია'
  },
  'de': {
    'nav-home': 'STARTSEITE',
    'nav-article': 'ARTIKEL',
    'nav-dictionary': 'LEXIKON',
    'nav-contact': 'KONTAKT',
    'hero-meta': 'WISSENSCHAFTLICHE INITIATIVE',
    'scroll-explore': 'VORSCROLLEN',
    'article-title': 'ARTIKEL',
    'article-subtitle': 'Artikel und Einträge zur kaukasischen Semiotik, Kultur und Forschung.',
    'dictionary-title': 'SYMBOLLEXIKON',
    'dictionary-subtitle': 'Eine kuratierte Datenbank visueller Motive, die im gesamten Kaukasus vorkommen',
    'filter-by': 'FILTER:',
    'filter-all': 'Alle',
    'results-found': 'Symbole indexiert',
    'reset-filters': 'Filter zurücksetzen',
    'contact-title': 'KONTAKT & ANFRAGE',
    'contact-subtitle': 'Kooperationsmöglichkeiten, wissenschaftliche Einreichungen und digitale Betreuung.',
    'scope-title': 'LIZENZ',
    'scope-desc': 'This website is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License v3.0 as published by the Free Software Foundation. This website is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY. You can view the full license and the Source code below.',
    'steward-title': 'ÜBER UNS',
    'steward-desc': 'Das Kaukasus-Lexikon ist ein Forschungsprojekt, das ich 2026 als Einzelprojekt ins Leben gerufen habe. Derzeit leite ich es allein, Mikheil Juruli. Viele Informationen über das kaukasische Erbe bleiben im Dunkeln, sei es aufgrund von Sprachbarrieren oder der Unzugänglichkeit älterer Quellen. Mit diesem freien und quelloffenen Forschungsprojekt möchte ich diese Barrieren überwinden und diesem besonderen Wissen einen zentralen Platz einräumen. Ich hoffe, das Projekt weiterzuentwickeln und andere Forscher für dieses umfangreiche Vorhaben zu gewinnen.',
    'citation-lbl': 'STATUS:',
    'typography-lbl': 'TYPOGRAFIE:',
    'connect-title': 'ANFRAGEN',
    'connect-desc': 'Jegliche Beiträge und Anfragen sind willkommen. Einsendungen, Fragen und jegliche sonstige Kontaktaufnahme erfolgen über die folgende E-Mail-Adresse:',
    'notes-lbl': 'FUSSNOTEN:',
    'refs-lbl': 'REFERENZEN:',
    'btn-read': 'ARTIKEL LESEN',
    'btn-close': 'ARTIKEL SCHLIESSEN',
    'search-placeholder': 'Suche nach Name, Region, Stichwort...',
    'modal-origin-lbl': 'HERKUNFT:',
    'no-results': 'Es wurden keine Symbole gefunden. Passen Sie Ihre Filterparameter an.',
    'extend-article-lbl': 'ARTIKEL ERWEITERN',
    'collapse-article-lbl': 'ARTIKEL EINKLAPPEN',
    'extend-dictionary-lbl': 'LEXIKON ERWEITERN',
    'collapse-dictionary-lbl': 'LEXIKON EINKLAPPEN',
    'featured-article-badge': 'AUSGEWÄHLTER ARTIKEL'
  }
};

// Poetic Quote Translations
const quotes = {
  'en': 'An open-source free platform meant for the digital stewardship of Caucasian heritage',
  'ka': 'კავკასიური სიმბოლოების ღია არქივი',
  'de': 'Eine kostenlose Open-Source-Plattform zur digitalen Verwaltung des kaukasischen Kulturerbes'
};

// ==========================================================================
// 2. INITIALIZATION & DATA FETCHING
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve saved language or default to English
  currentLang = localStorage.getItem('caucasus-lang') || 'en';
  // Retrieve saved theme or default to light
  currentTheme = localStorage.getItem('caucasus-theme') || 'light';

  initTheme();
  setupEventListeners();
  loadData();
});

async function loadData() {
  try {
    // Parallel fetching of symbols and articles
    const [symbolsRes, articlesRes] = await Promise.all([
      fetch('/symbols.json'),
      fetch('/articles.json')
    ]);

    if (!symbolsRes.ok || !articlesRes.ok) {
      throw new Error('Failure in loading archive manifests.');
    }

    symbolsData = await symbolsRes.json();
    articlesData = await articlesRes.json();

    // Set initial localized views
    translatePage(currentLang);
    renderArticles();
    generateTagFilters();
    filterAndRenderSymbols();

    // Trigger IntersectionObserver for newly loaded elements
    observeScrollReveals();

  } catch (error) {
    console.error('Data loading error:', error);
    renderErrorStates();
  }
}

function renderErrorStates() {
  const errMsg = currentLang === 'ka'
    ? 'შეცდომა არქივის ფაილების ჩატვირთვისას.'
    : 'Failed to synchronize with the digital database archives.';

  document.getElementById('articles-container').innerHTML = `<div class="error-state font-mono">${errMsg}</div>`;
  document.getElementById('symbols-grid').innerHTML = `<div class="error-state font-mono">${errMsg}</div>`;
}

// ==========================================================================
// 3. THEME (LIGHT/DARK) CONTROLLER
// ==========================================================================

function initTheme() {
  // Check system preferences if no saved theme
  if (!localStorage.getItem('caucasus-theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', currentTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('caucasus-theme', currentTheme);
}

// ==========================================================================
// 4. MULTILINGUAL LOCALIZATION CONTROLLER
// ==========================================================================

function translatePage(lang) {
  currentLang = lang;
  localStorage.setItem('caucasus-lang', lang);

  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang);

  // 1. Static UI Text Translations
  const translatableElements = document.querySelectorAll('[data-key]');
  translatableElements.forEach(el => {
    const key = el.getAttribute('data-key');
    if (localization[lang] && localization[lang][key]) {
      el.textContent = localization[lang][key];
    }
  });

  // 2. Input Placeholders Translation
  const searchInput = document.getElementById('dictionary-search');
  if (searchInput && localization[lang]['search-placeholder']) {
    searchInput.placeholder = localization[lang]['search-placeholder'];
  }

  // 3. Update Poetic Hero Quote
  const quoteEl = document.getElementById('hero-quote-text');
  if (quoteEl && quotes[lang]) {
    quoteEl.textContent = quotes[lang];
  }

  // 4. Update Header brand and active menu item styling
  updateActiveLangButtons();

  // 5. Re-render dynamic components with translated values
  renderArticles();
  generateTagFilters();
  filterAndRenderSymbols();
}

function updateActiveLangButtons() {
  // Desktop
  document.querySelectorAll('#language-selector .lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
  // Mobile
  document.querySelectorAll('.mobile-lang-switcher .mobile-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });
}

// ==========================================================================
// 5. ARTICLES & MANUSCRIPTS RENDERING
// ==========================================================================

function renderArticles() {
  const container = document.getElementById('articles-container');
  if (!container) return;

  if (articlesData.length === 0) {
    container.innerHTML = `<div class="loading-state font-mono">${localization[currentLang]['no-results']}</div>`;
    const featuredContainer = document.getElementById('featured-article-container');
    if (featuredContainer) featuredContainer.style.display = 'none';
    return;
  }

  // Find the featured article
  const featuredArticle = articlesData.find(article => article.featured);
  const regularArticles = articlesData.filter(article => !article.featured);

  // Render Featured Article
  const featuredContainer = document.getElementById('featured-article-container');
  if (featuredContainer) {
    if (featuredArticle) {
      featuredContainer.style.display = 'block';
      const title = featuredArticle.title[currentLang] || featuredArticle.title['en'];
      const excerpt = featuredArticle.excerpt[currentLang] || featuredArticle.excerpt['en'];
      const content = featuredArticle.content[currentLang] || featuredArticle.content['en'];
      const author = featuredArticle.author[currentLang] || featuredArticle.author['en'];
      const footnotes = featuredArticle.footnotes ? (featuredArticle.footnotes[currentLang] || featuredArticle.footnotes['en']) : '';
      const readBtnLabel = localization[currentLang]['btn-read'];
      const badgeLabel = localization[currentLang]['featured-article-badge'] || 'FEATURED MANUSCRIPT';

      const formattedDate = new Date(featuredArticle.date).toLocaleDateString(currentLang === 'ka' ? 'ka-GE' : (currentLang === 'de' ? 'de-DE' : 'en-US'), {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      featuredContainer.innerHTML = `
        <div class="featured-badge-container font-mono scroll-fade" style="margin-bottom: 1.5rem;">
          <span class="featured-badge-bracket">[</span>
          <span class="featured-badge-text" data-key="featured-article-badge">${badgeLabel}</span>
          <span class="featured-badge-bracket">]</span>
        </div>
        <article class="featured-article-card scroll-fade" id="row-${featuredArticle.id}">
          <div class="featured-article-preview" onclick="toggleArticle('${featuredArticle.id}')" role="button" aria-expanded="false" aria-controls="expanded-${featuredArticle.id}">
            ${featuredArticle.image ? `
              <div class="featured-article-img-wrap">
                <img src="${featuredArticle.image}" alt="${title} visual background" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            ` : ''}
            <div class="featured-article-details">
              <div class="article-meta-block font-mono" style="margin-bottom: 0.5rem;">
                <span class="article-author">${author}</span>
                <span class="article-date">${formattedDate}</span>
              </div>
              <h3 class="featured-article-title">${title}</h3>
              <p class="featured-article-excerpt">${excerpt}</p>
              <button class="article-action-btn font-mono" style="margin-top: 1.5rem; justify-self: start; padding-left: 0;">
                <span class="btn-brackets">[</span>
                <span class="btn-lbl" id="btn-lbl-${featuredArticle.id}">${readBtnLabel}</span>
                <span class="btn-brackets">]</span>
              </button>
            </div>
          </div>

          <!-- Expanded Manuscript Area -->
          <div class="article-expanded-block" id="expanded-${featuredArticle.id}">
            <div class="article-expanded-inner" style="padding-top: 2.5rem;">
              <div class="article-full-manuscript font-serif">
                ${content}
              </div>

              ${footnotes ? `
                <div class="article-academic-notes">
                  <div class="article-note-section">
                    <span class="article-note-lbl font-mono">${localization[currentLang]['notes-lbl']}</span>
                    <p class="article-note-text font-serif">${footnotes}</p>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    } else {
      featuredContainer.style.display = 'none';
      featuredContainer.innerHTML = '';
    }
  }

  // Slice regular articles if article is not extended
  const displayArticles = isArticleExtended ? regularArticles : regularArticles.slice(0, 2);

  container.innerHTML = displayArticles.map(article => {
    const title = article.title[currentLang] || article.title['en'];
    const excerpt = article.excerpt[currentLang] || article.excerpt['en'];
    const content = article.content[currentLang] || article.content['en'];
    const author = article.author[currentLang] || article.author['en'];
    const footnotes = article.footnotes ? (article.footnotes[currentLang] || article.footnotes['en']) : '';
    const readBtnLabel = localization[currentLang]['btn-read'];

    // Format Date beautifully
    const formattedDate = new Date(article.date).toLocaleDateString(currentLang === 'ka' ? 'ka-GE' : (currentLang === 'de' ? 'de-DE' : 'en-US'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
      <article class="article-row-item scroll-fade" id="row-${article.id}">
        <!-- Preview Grid Block (Click triggers expansion) -->
        <div class="article-preview-block" onclick="toggleArticle('${article.id}')" role="button" aria-expanded="false" aria-controls="expanded-${article.id}">
          <div class="article-meta-block font-mono">
            <span class="article-author">${author}</span>
            <span class="article-date">${formattedDate}</span>
          </div>

          <div class="article-headline-block">
            <h3 class="article-title">${title}</h3>
            <p class="article-excerpt">${excerpt}</p>
          </div>

          <button class="article-action-btn font-mono" aria-label="Expand article text">
            <span class="btn-brackets">[</span>
            <span class="btn-lbl" id="btn-lbl-${article.id}">${readBtnLabel}</span>
            <span class="btn-brackets">]</span>
          </button>
        </div>

        <!-- Expanded Manuscript Area -->
        <div class="article-expanded-block" id="expanded-${article.id}">
          <div class="article-expanded-inner">
            ${article.image ? `
              <div class="article-illustration">
                <img src="${article.image}" alt="${title} visual background" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            ` : ''}

            <div class="article-full-manuscript font-serif">
              ${content}
            </div>

            ${footnotes ? `
              <div class="article-academic-notes">
                <div class="article-note-section">
                  <span class="article-note-lbl font-mono">${localization[currentLang]['notes-lbl']}</span>
                  <p class="article-note-text font-serif">${footnotes}</p>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Control visibility of Extend Article button
  const extendWrapper = document.getElementById('article-extend-wrapper');
  if (extendWrapper) {
    if (regularArticles.length > 1) {
      extendWrapper.style.display = 'flex';
      const extendBtn = document.getElementById('extend-articlebtn');
      if (extendBtn) {
        const labelKey = isArticleExtended ? 'collapse-article-lbl' : 'extend-article-lbl';
        extendBtn.querySelector('.btn-lbl').textContent = localization[currentLang][labelKey];
        extendBtn.querySelector('.btn-lbl').setAttribute('data-key', labelKey);
      }
    } else {
      extendWrapper.style.display = 'none';
    }
  }

  observeScrollReveals();
}

function toggleArticle(id) {
  const row = document.getElementById(`row-${id}`);
  const expandedBlock = document.getElementById(`expanded-${id}`);
  const previewBlock = row.querySelector('.article-preview-block') || row.querySelector('.featured-article-preview');
  const btnLabel = document.getElementById(`btn-lbl-${id}`);

  if (!expandedBlock) return;

  const isOpen = expandedBlock.classList.contains('open');

  // Close all other articles to preserve strict editorial rhythm
  document.querySelectorAll('.article-expanded-block').forEach(block => {
    if (block.id !== `expanded-${id}`) {
      block.classList.remove('open');
      const otherId = block.id.replace('expanded-', '');
      const otherBtnLabel = document.getElementById(`btn-lbl-${otherId}`);
      if (otherBtnLabel) {
        otherBtnLabel.textContent = localization[currentLang]['btn-read'];
      }
      const parentRow = block.closest('.article-row-item') || block.closest('.featured-article-card');
      if (parentRow) {
        const prev = parentRow.querySelector('.article-preview-block') || parentRow.querySelector('.featured-article-preview');
        if (prev) prev.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (isOpen) {
    expandedBlock.classList.remove('open');
    btnLabel.textContent = localization[currentLang]['btn-read'];
    if (previewBlock) previewBlock.setAttribute('aria-expanded', 'false');
  } else {
    expandedBlock.classList.add('open');
    btnLabel.textContent = localization[currentLang]['btn-close'];
    if (previewBlock) previewBlock.setAttribute('aria-expanded', 'true');

    // Smooth scroll to the expanded row header with an offset
    setTimeout(() => {
      const yOffset = -100;
      const y = row.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 300);
  }
}

// ==========================================================================
// 6. DICTIONARY & ARCHIVAL SYMBOLS GRID
// ==========================================================================

function generateTagFilters() {
  const filterListContainer = document.getElementById('tag-filters-list');
  if (!filterListContainer) return;

  // Gather unique tags from the raw symbols data
  const tagCounts = {};
  symbolsData.forEach(symbol => {
    if (symbol.tags) {
      symbol.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const activeAllClass = activeFilter === 'all' ? 'active' : '';
  const totalCount = symbolsData.length;

  let tagsHtml = `
    <button class="tag-pill ${activeAllClass}" data-filter="all">
      ${localization[currentLang]['filter-all']} <span class="tag-count">${totalCount}</span>
    </button>
  `;

  // Sort tags alphabetically
  const sortedTags = Object.keys(tagCounts).sort();

  sortedTags.forEach(tag => {
    const activeClass = activeFilter === tag ? 'active' : '';
    tagsHtml += `
      <button class="tag-pill ${activeClass}" data-filter="${tag}">
        #${tag} <span class="tag-count">${tagCounts[tag]}</span>
      </button>
    `;
  });

  filterListContainer.innerHTML = tagsHtml;

  // Re-attach click events to the dynamic tag buttons
  filterListContainer.querySelectorAll('.tag-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedFilter = e.currentTarget.getAttribute('data-filter');
      selectTagFilter(selectedFilter);
    });
  });
}

function selectTagFilter(filter) {
  activeFilter = filter;

  // Highlight active button in CSS
  document.querySelectorAll('#tag-filters-list .tag-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
  });

  // Toggle dynamic clear/reset filters indicators
  toggleResetFiltersBar();

  filterAndRenderSymbols();
}

function filterAndRenderSymbols() {
  const gridContainer = document.getElementById('symbols-grid');
  const activeCountEl = document.getElementById('active-count');
  const totalCountEl = document.getElementById('total-count');

  if (!gridContainer) return;

  totalCountEl.textContent = symbolsData.length;

  // Filter Logic
  const filtered = symbolsData.filter(symbol => {
    // 1. Tag Filtering
    const matchesTag = activeFilter === 'all' || (symbol.tags && symbol.tags.includes(activeFilter));

    // 2. Search Box Query (Matches name, origin, description, tags in active language)
    const nameStr = (symbol.name[currentLang] || symbol.name['en'] || '').toLowerCase();
    const originStr = (symbol.origin[currentLang] || symbol.origin['en'] || '').toLowerCase();
    const descStr = (symbol.shortDescription[currentLang] || symbol.shortDescription['en'] || '').toLowerCase();
    const tagStr = (symbol.tags || []).join(' ').toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = query === '' ||
      nameStr.includes(query) ||
      originStr.includes(query) ||
      descStr.includes(query) ||
      tagStr.includes(query);

    return matchesTag && matchesSearch;
  });

  // Update active count UI
  activeCountEl.textContent = filtered.length;

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="loading-state font-mono" style="grid-column: 1 / -1;">
        ${localization[currentLang]['no-results']}
      </div>
    `;
    const extendWrapper = document.getElementById('dictionary-extend-wrapper');
    if (extendWrapper) {
      extendWrapper.style.display = 'none';
    }
    return;
  }

  // Slice symbols if not extended (only show first row = 3 symbols)
  const displaySymbols = isDictionaryExtended ? filtered : filtered.slice(0, 3);

  // Render Grid Cards
    gridContainer.innerHTML = displaySymbols.map(symbol => {
      const name = symbol.name[currentLang] || symbol.name['en'];
      const origin = symbol.origin[currentLang] || symbol.origin['en'];
      const shortDesc = symbol.shortDescription[currentLang] || symbol.shortDescription['en'];
      const firstTag = symbol.tags && symbol.tags.length > 0 ? `#${symbol.tags[0]}` : '';

      // Check if the JSON has raw SVG code, otherwise fallback to an image URL
      let visualContent = '';
      if (symbol.svg) {
        visualContent = symbol.svg;
      } else if (symbol.thumbnail || symbol.image1 || symbol.image) {
        const imgSrc = symbol.thumbnail || symbol.image1 || symbol.image;
        visualContent = `<img src="${imgSrc}" alt="${name} visual" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />`;
      }

      return `
        <div class="symbol-card scroll-fade" id="card-${symbol.id}" onclick="openSymbolDetail('${symbol.id}')" role="button" tabindex="0">
          <!-- Visual/Thumbnail Area -->
          <div class="symbol-card-visual">
            ${visualContent}
          </div>

          <div class="symbol-card-body">
            <div class="card-meta-line font-mono">
              <span class="card-origin">${origin}</span>
              <span class="card-first-tag dimmed">${firstTag}</span>
            </div>
            <h4 class="card-title">${name}</h4>
            <p class="card-desc">${shortDesc}</p>
          </div>
        </div>
      `;
    }).join('');

  // Control visibility of Extend Dictionary button
  const extendWrapper = document.getElementById('dictionary-extend-wrapper');
  if (extendWrapper) {
    if (filtered.length > 3) {
      extendWrapper.style.display = 'flex';
      const extendBtn = document.getElementById('extend-dictionary-btn');
      if (extendBtn) {
        const labelKey = isDictionaryExtended ? 'collapse-dictionary-lbl' : 'extend-dictionary-lbl';
        extendBtn.querySelector('.btn-lbl').textContent = localization[currentLang][labelKey];
        extendBtn.querySelector('.btn-lbl').setAttribute('data-key', labelKey);
      }
    } else {
      extendWrapper.style.display = 'none';
    }
  }

  observeScrollReveals();
}

function toggleResetFiltersBar() {
  const resetBtn = document.getElementById('reset-filters');
  const clearSearchBtn = document.getElementById('search-clear-btn');

  const hasFiltersActive = activeFilter !== 'all' || searchQuery !== '';

  if (resetBtn) {
    resetBtn.style.display = hasFiltersActive ? 'inline-block' : 'none';
  }
  if (clearSearchBtn) {
    clearSearchBtn.style.display = searchQuery !== '' ? 'inline-block' : 'none';
  }
}

// ==========================================================================
// 7. DETAIL DRAWERS / OVERLAY MODAL SYSTEM
// ==========================================================================

function openSymbolDetail(id) {
  const symbol = symbolsData.find(s => s.id === id);
  if (!symbol) return;

  const modal = document.getElementById('detail-modal');

  // NEW: Updated Image IDs
  const modalImg1 = document.getElementById('modal-image-1');
  const modalImg2 = document.getElementById('modal-image-2');
  const modalMap = document.getElementById('modal-map');

  const modalTitle = document.getElementById('modal-title');
  const modalOrigin = document.getElementById('modal-origin');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-description');
  const modalFootnotes = document.getElementById('modal-footnotes');
  const modalReferences = document.getElementById('modal-references');
  const originLabel = document.getElementById('modal-origin-label');

  if (!modal) return;

  // 1. Render Localized Text Details
  modalTitle.textContent = symbol.name[currentLang] || symbol.name['en'];
  modalOrigin.textContent = symbol.origin[currentLang] || symbol.origin['en'];
  modalDesc.textContent = symbol.fullDescription[currentLang] || symbol.fullDescription['en'];

  if (originLabel) {
    originLabel.textContent = localization[currentLang]['modal-origin-lbl'];
  }

  // 2. Render Tags list inside Modal
  if (symbol.tags) {
    modalTags.innerHTML = symbol.tags.map(tag => `<span class="modal-tag">#${tag}</span>`).join('');
  } else {
    modalTags.innerHTML = '';
  }

  // 3. Render Footnotes & Refs
    const footnotesBlock = document.getElementById('modal-notes-block');
    const referencesBlock = document.getElementById('modal-refs-block');

    // Handle Footnotes
    const footnotesData = symbol.footnotes ? (symbol.footnotes[currentLang] || symbol.footnotes['en']) : null;
    if (footnotesData) {
      footnotesBlock.style.display = 'block';
      // If it's an array, join with newlines. If it's a string, use as-is.
      document.getElementById('modal-footnotes').textContent = Array.isArray(footnotesData)
        ? footnotesData.join('\n')
        : footnotesData;
    } else {
      footnotesBlock.style.display = 'none';
    }

    // Handle References
    const referencesData = symbol.references ? (symbol.references[currentLang] || symbol.references['en']) : null;
    if (referencesData) {
      referencesBlock.style.display = 'block';
      // If it's an array, join with newlines. If it's a string, use as-is.
      document.getElementById('modal-references').textContent = Array.isArray(referencesData)
        ? referencesData.join('\n')
        : referencesData;
    } else {
      referencesBlock.style.display = 'none';
    }

  // 4. Handle Visuals: Image 1, Image 2, and Map
  // NOTE: Ensure your symbols.json uses "image1", "image2", and "map" keys!

  // Image 1 (Assuming there is always at least one image)
  if (symbol.image1 || symbol.image) {
    modalImg1.src = symbol.image1 || symbol.image;
    modalImg1.alt = `${symbol.name['en']} Photo 1`;
  }

  // Image 2
  const tabImg2Btn = document.getElementById('tab-img2-btn');
  if (symbol.image2) {
    modalImg2.src = symbol.image2;
    modalImg2.alt = `${symbol.name['en']} Photo 2`;
    if (tabImg2Btn) tabImg2Btn.style.display = 'inline-block';
  } else {
    if (tabImg2Btn) tabImg2Btn.style.display = 'none';
  }

  // Map
  const tabMapBtn = document.getElementById('tab-map-btn');
  if (symbol.map) {
    modalMap.src = symbol.map;
    modalMap.alt = `${symbol.name['en']} Regional Origin Map`;
    if (tabMapBtn) tabMapBtn.style.display = 'inline-block';
  } else {
    if (tabMapBtn) tabMapBtn.style.display = 'none';
  }

  // Default to Photo 1 tab
  switchVisualModalTab('img1');

  // 5. Present Modal and Lock Page scrolling behind backdrop
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling

  // Listen for Esc key closure
  document.addEventListener('keydown', handleEscapeKeyClosure);
}

function switchVisualModalTab(tabId) {
  // Elements
  const btn1 = document.getElementById('tab-img1-btn');
  const btn2 = document.getElementById('tab-img2-btn');
  const btnMap = document.getElementById('tab-map-btn');

  const wrap1 = document.getElementById('modal-image-wrap-1');
  const wrap2 = document.getElementById('modal-image-wrap-2');
  const wrapMap = document.getElementById('modal-map-wrap');

  if (!btn1 || !wrap1) return;

  // Reset all
  [btn1, btn2, btnMap].forEach(btn => { if(btn) btn.classList.remove('active'); });
  [wrap1, wrap2, wrapMap].forEach(wrap => { if(wrap) wrap.style.display = 'none'; });

  // Activate chosen
  if (tabId === 'img1') {
    btn1.classList.add('active');
    wrap1.style.display = 'flex';
  } else if (tabId === 'img2') {
    if(btn2) btn2.classList.add('active');
    if(wrap2) wrap2.style.display = 'flex';
  } else if (tabId === 'map') {
    if(btnMap) btnMap.classList.add('active');
    if(wrapMap) wrapMap.style.display = 'flex';
  }
}

function closeSymbolDetail() {
  const modal = document.getElementById('detail-modal');
  if (!modal) return;

  modal.classList.remove('open');
  document.body.style.overflow = ''; // Release scroll

  document.removeEventListener('keydown', handleEscapeKeyClosure);
}

function handleEscapeKeyClosure(e) {
  if (e.key === 'Escape') {
    closeSymbolDetail();
  }
}

// ==========================================================================
// 8. INTERACTIVE EVENT ATTACHMENTS
// ==========================================================================

function setupEventListeners() {
  // Theme Toggle click
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Language buttons click events (Desktop & Mobile)
  document.querySelectorAll('#language-selector .lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      translatePage(selectedLang);
    });
  });

  document.querySelectorAll('.mobile-lang-switcher .mobile-lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      translatePage(selectedLang);
      closeMobileMenu();
    });
  });

  // Search input typing handler
  const searchInput = document.getElementById('dictionary-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      toggleResetFiltersBar();
      filterAndRenderSymbols();
    });
  }

  // Clear search button
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        toggleResetFiltersBar();
        filterAndRenderSymbols();
      }
    });
  }

  // Reset filters bar completely
  const resetBtn = document.getElementById('reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeFilter = 'all';
      searchQuery = '';
      if (searchInput) {
        searchInput.value = '';
      }
      generateTagFilters();
      toggleResetFiltersBar();
      filterAndRenderSymbols();
    });
  }

  // Modal Closures triggers
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSymbolDetail);
  }

  const closeBgTrigger = document.getElementById('modal-close-bg');
  if (closeBgTrigger) {
    closeBgTrigger.addEventListener('click', closeSymbolDetail);
  }

  // Modal visual switcher tabs
  const tabImg1Btn = document.getElementById('tab-img1-btn');
  const tabImg2Btn = document.getElementById('tab-img2-btn');
  const tabMapBtn = document.getElementById('tab-map-btn');

  if (tabImg1Btn) {
    tabImg1Btn.addEventListener('click', () => switchVisualModalTab('img1'));
  }
  if (tabImg2Btn) {
    tabImg2Btn.addEventListener('click', () => switchVisualModalTab('img2'));
  }
  if (tabMapBtn) {
    tabMapBtn.addEventListener('click', () => switchVisualModalTab('map'));
  }

  // Extend buttons listeners
  const extendArticleBtn = document.getElementById('extend-article-btn');
  if (extendArticleBtn) {
    extendArticleBtn.addEventListener('click', toggleArticleExtend);
  }

  const extendDictionaryBtn = document.getElementById('extend-dictionary-btn');
  if (extendDictionaryBtn) {
    extendDictionaryBtn.addEventListener('click', toggleDictionaryExtend);
  }

  // Mobile menu button toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Mobile navigation click links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Scroll Behavior: Hide header on scroll down, show on scroll up
  let lastScrollY = window.pageYOffset;
  const navBar = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY <= 0) {
      navBar.classList.remove('hide');
      return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 150) {
      // Scrolling down — hide navbar for high-immersion reading
      navBar.classList.add('hide');
    } else {
      // Scrolling up — show navbar instantly
      navBar.classList.remove('hide');
    }

    lastScrollY = currentScrollY;

    // Highlight active section link in desktop header
    highlightActiveSectionInHeader();
  }, { passive: true });
}

// Mobile sidebar panel toggling
function toggleMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-overlay');

  const isOpen = menuBtn.classList.contains('open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    menuBtn.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('mobile-overlay');

  if (menuBtn && overlay) {
    menuBtn.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Active navigation links scroll highlight mapping
function highlightActiveSectionInHeader() {
  const sections = ['home', 'article', 'dictionary', 'contact'];
  const scrollPosition = window.pageYOffset + 120; // offset for nav bar

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll('#desktop-menu .nav-link-item').forEach(link => {
          const hrefAttr = link.getAttribute('href');
          link.classList.toggle('active', hrefAttr === `#${id}`);
        });
      }
    }
  });
}

// ==========================================================================
// 9. VIEWPORT ENTRANCE & ANIMATIONS (INTERSECTION OBSERVER)
// ==========================================================================

function observeScrollReveals() {
  const options = {
    root: null, // viewport
    threshold: 0.1, // trigger when 10% is visible
    rootMargin: '0px 0px -50px 0px' // slightly offsets bottom of viewport for delay
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        self.unobserve(entry.target); // trigger once per element session
      }
    });
  }, options);

  const animatedElements = document.querySelectorAll('.scroll-fade');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

function toggleArticleExtend() {
  isArticleExtended = !isArticleExtended;
  renderArticles();
}

function toggleDictionaryExtend() {
  isDictionaryExtended = !isDictionaryExtended;
  filterAndRenderSymbols();
}

// Expose handlers globally to support dynamic HTML templates when using ES Modules
window.toggleArticle = toggleArticle;
window.openSymbolDetail = openSymbolDetail;
window.closeSymbolDetail = closeSymbolDetail;
window.switchVisualModalTab = switchVisualModalTab;
window.toggleArticleExtend = toggleArticleExtend;
window.toggleDictionaryExtend = toggleDictionaryExtend;
