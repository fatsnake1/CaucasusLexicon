/**
 * GLOBAL CONSTANTS & VARIABLES
 */
let currentLang = 'en';
let symbolsData = [];

// DOM Elements - Cache references once on load
const grid = document.getElementById('symbols-grid');
const searchInput = document.getElementById('search-bar');
const filterBtns = document.querySelectorAll('.filter-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.querySelector('.close-modal');
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle'); // Single selector

// Modal elements
const modalTitleEl = document.getElementById('modal-title');
const modalDescEl = document.getElementById('modal-desc');
const modalCategoryEl = document.getElementById('modal-category');
const regionNameSpan = document.getElementById('region-name');
const modalMapImg = document.getElementById('modal-map');
const modalImgEl = document.getElementById('modal-img');
const pinsContainer = document.getElementById('pins-container');

/**
 * UI TRANSLATIONS
 */
const uiTranslations = {
    en: {
        "nav-home": "Home",
        "nav-dict": "Dictionary",
        "nav-contact": "Contact",
        "hero-title": "Lexicon of Caucasian Symbolism",
        "hero-desc": "This Website seeks to compile the ancient symbols of caucasus, their descriptions and origins, all in one accessible place.",
        "dict-title": "Symbol Dictionary",
        "search-placeholder": "Search symbols...",
        "cat-all": "All",
        "cat-celestial": "Celestial",
        "cat-nature": "Nature",
        "cat-geometric": "Geometric",
        "cat-animal": "Animalistic",
        "cat-christian": "Christian",
        "contact-title": "Get in Touch",
        "contact-desc": "Interested in Caucasian symbolism? Contact me for research collaborations or high-resolution assets.",
        "modal-label-rep": "Symbol Representation",
        "modal-label-region": "Region of Origin",
        "tag-Celestial": "Celestial",
        "tag-Nature": "Nature",
        "tag-Geometric": "Geometric",
        "tag-Animalistic": "Animalistic",
        "tag-Christian": "Christian"
    },
    ka: {
        "nav-home": "მთავარი",
        "nav-dict": "ლექსიკონი",
        "nav-contact": "კონტაქტი",
        "hero-title": "კავკასიური სიმბოლოების ლექსიკონი",
        "hero-desc": "ჩვენ მიზანი კავკასიური სიმბოლოებისა და მათი აღწერილობის ერთ მარტივად მისაწვდომ ადგილას მოქცევაა.",
        "dict-title": "სიმბოლოების ლექსიკონი",
        "search-placeholder": "ძებნა...",
        "cat-all": "ყველა",
        "cat-celestial": "ასტრალური",
        "cat-nature": "ფლორალური",
        "cat-geometric": "გეომეტრიული",
        "cat-animal": "ანიმალისტური",
        "cat-christian": "ქრისტიანული",
        "contact-title": "კონტაქტი",
        "contact-desc": "დაინტერესდით კავკასიური სიმბოლიზმით? კოლაბორაციის, კვლევისა თუ კითხვების შემთხვევაში მოცემულ მეილზე დამიკავშირდით.",
        "modal-label-rep": "სიმბოლოს გამოსახულება",
        "modal-label-region": "წარმოშვების რეგიონი",
        "tag-Celestial": "ასტრალური",
        "tag-Nature": "ფლორალური",
        "tag-Geometric": "გეომეტრიული",
        "tag-Animalistic": "ანიმალისტური",
        "tag-Christian": "ქრისტიანული"
    },
    de: {
        "nav-home": "Startseite",
        "nav-dict": "Wörterbuch",
        "nav-contact": "Kontakt",
        "hero-title": "Lexikon der kaukasischen Symbolik",
        "hero-desc": "Diese Website fasst die uralten Symbole des Kaukasus, ihre Beschreibungen und Herkunft zusammen.",
        "dict-title": "Symbol-Wörterbuch",
        "search-placeholder": "Symbole suchen...",
        "cat-all": "Alle",
        "cat-celestial": "Astrolisch",
        "cat-nature": "Floristisch",
        "cat-geometric": "Geometrisch",
        "cat-animal": "Animalistisch",
        "cat-christian": "Christlich",
        "contact-title": "Kontakt aufnehmen",
        "contact-desc": "Interesse an der kaukasischen Symbolik? Bitte kontaktieren Sie mich für Forschungsarbeiten.",
        "modal-label-rep": "Symbol-Darstellung",
        "modal-label-region": "Herkunftsregion",
        "tag-Celestial": "Astrolisch",
        "tag-Nature": "Floristisch",
        "tag-Geometric": "Geometrisch",
        "tag-Animalistic": "Animalistisch",
        "tag-Christian": "Christlich"
    }
};

/**
 * DATA FETCHING - LOCAL FILE FRIENDLY ALTERNATIVE INCLUDED
 */
async function loadSymbolData() {
    const jsonPath = 'data.json';
    
    try {
        const response = await fetch(jsonPath); 
        if (!response.ok) {
            throw new Error(`Failed to fetch symbols: ${response.statusText}`);
        }
        symbolsData = await response.json();
        
        console.log("Symbols loaded successfully.");
        
    } catch (error) {
        console.warn("Using fallback data for local testing");
        // Fixed: Added DE fields to ALL fallback objects
        symbolsData = [
            {
                "id": 1,
                "name": { "en": "Borjgali", "ka": "ბორჯღალა", "de": "Borjgali" },
                "category": ["Celestial", "Geometric"],
                "preview": { 
                    "en": "The astral symbol of the Sun, now transformed into a traditional Caucasian ornament", 
                    "ka": "მზის ასტრალური სიმბოლო, ტრადიციულ ქართულ-კავკასიურ ორნამენტად გარდასახული",
                    "de": "Das astrale Symbol der Sonne, nun zu einem traditionellen kaukasischen Ornament verwandelt"
                },
                "description": { 
                    "en": "The astral symbol of the Sun, now transformed to a traditional Caucasian ornament", 
                    "ka": "მზის ასტრალური სიმბოლო, ტრადიციულ ქართულ-კავკასიურ ორნამენტად გარდასახული",
                    "de": "Das astrale Symbol der Sonne, nun zu einem traditionellen kaukasischen Ornament verwandelt" 
                },
                "region": { "en": "Pan-Caucasian", "ka": "პანკავკასიური", "de": "Pan-Kaukasisch" },
                "image": "images/photo1.jpg",
                "map": "assets/CaucasusMap.svg", 
                "pinCoords": { x: 45, y: 35 } 
            },
            {
                "id": 2,
                "name": { "en": "Grapevine Motif", "ka": "ვაზის ორნამენტი", "de": "Weinrebenmotiv" },
                "category": ["Nature", "Christian"],
                "preview": { 
                    "en": "A sacred object of worship, rooted deep in the history of Georgia", 
                    "ka": "უძველესი ქართული, საკრალური თაყვანისცემის ობიექტი",
                    "de": "Ein heiliges Kultobjekt, tief verwurzelt in der Geschichte Georgiens."
                },
                "description": { 
                    "en": "The grapevine is deeply sacred in Georgia, the birthplace of wine. The stylized grapevine motif once belonging to the cult of the grapevine transphormed into a christan symbol, representing the blood of christ and the eucharist.", 
                    "ka": "ღვინის სამშობლოში ვაზის სიმბოლო დღემდე უძლიერესია. ოდესღაც ვაზის კულტის აღმნიშვნელი ნიშანი, ქრისტეს სისხლისა და ზიარების სიმბოლოდ იქცა.",
                    "de": "In Georgien, der Wiege des Weins, genießt die Weinrebe hohes Ansehen. Das stilisierte Rebenmotiv, einst Teil des Weinkults, wandelte sich zu einem christlichen Symbol, das das Blut Christi und die Eucharistie repräsentiert."
                },
                "region": { "en": "Kakheti", "ka": "კახეთი", "de": "Kachetien" },
                "image": "images/photo2.jpg",
                "map": "assets/CaucasusMap.svg",
                "pinCoords": { x: 40, y: 55 } 
            }
        ];
    }
}

/**
 * INITIALIZE - CORE FUNCTIONS
 */
function updateLanguageUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (uiTranslations[currentLang][key]) {
            el.textContent = uiTranslations[currentLang][key];
        }
    });
    
    searchInput.placeholder = uiTranslations[currentLang]['search-placeholder'];
    // Language selector value will be handled by user, not displayed text
}

function renderSymbols(data) {
    if (!data || !grid) return;
    
    grid.innerHTML = '';
    
    data.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'symbol-card';
        
        // Determine which language names to use based on currentLang
        let nameValue;
        if (currentLang === 'en' && symbol.name.en) nameValue = symbol.name.en;
        else if (currentLang === 'ka' && symbol.name.ka) nameValue = symbol.name.ka;
        else if (currentLang === 'de' && symbol.name.de) nameValue = symbol.name.de;
        else nameValue = symbol.name.en || symbol.name.ka || symbol.name.de || '';

        const tagsHTML = symbol.category.map(cat => {
            const translatedTag = uiTranslations[currentLang][`tag-${cat}`] || cat;
            return `<span class="tag">${translatedTag}</span>`;
        }).join('');

        card.innerHTML = `
            <img class="card-img" src="${symbol.image}" alt="${nameValue}" loading="lazy">
            <div class="tag-container">${tagsHTML}</div>
            <h3>${nameValue}</h3>
            <p>${symbol.preview[currentLang]}</p>
        `;
        
        card.addEventListener('click', () => openModal(symbol));
        grid.appendChild(card);
        
        setTimeout(() => card.classList.add('visible'), index * 100);
    });
}

function openModal(symbol) {
    if (!symbol || !modalTitleEl) return;
    
    modalTitleEl.textContent = symbol.name[currentLang];
    modalDescEl.textContent = symbol.description[currentLang];
    
    if (modalCategoryEl) {
        modalCategoryEl.innerHTML = '';
        symbol.category.forEach(cat => {
            const translatedTag = uiTranslations[currentLang][`tag-${cat}`] || cat;
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = translatedTag;
            modalCategoryEl.appendChild(tagSpan);
        });
    }
    
    if (regionNameSpan) regionNameSpan.textContent = symbol.region[currentLang];

    if (symbol.image && symbol.map !== "#") {
        if(modalMapImg) modalMapImg.src = symbol.map; 
        if(modalImgEl) modalImgEl.src = symbol.image;
        if(modalMapImg) modalMapImg.style.display = 'block';
        if(modalImgEl) modalImgEl.style.display = 'block';
    } else {
        if(modalMapImg) modalMapImg.style.display = 'none';
        if(modalImgEl) modalImgEl.style.display = 'none';
    }

    if (symbol.pinCoords && symbol.region[currentLang] !== "N/A") {
        if(pinsContainer) pinsContainer.innerHTML = '';

        const pinHTML = `
            <div class="pin-marker-wrapper">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff0000" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
            </div>
        `;
        
        const wrapper = document.createElement('div');
        wrapper.innerHTML = pinHTML;
        wrapper.style.position = 'relative'; 
        wrapper.style.marginTop = '5px';
        
        if(pinsContainer) {
            pinsContainer.appendChild(wrapper.children[0]);

            const marker = wrapper.querySelector('.pin-marker-wrapper > svg');
            
            if(marker) {
                marker.style.left = `calc(${symbol.pinCoords.x}% - 6px)`; 
                marker.style.top = `calc(${symbol.pinCoords.y}% - 6px)`;
                marker.style.filter = "drop-shadow(0px 2px 4px rgba(0,0,0,0.8))";
            }
        }
    }
    
    if (modalOverlay) {
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    if(modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Search and Category Filter - Updated for all languages
function filterData() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    
    const filtered = symbolsData.filter(item => {
        // Get current language name
        let nameValue;
        if (currentLang === 'en' && item.name.en) nameValue = item.name.en.toLowerCase();
        else if (currentLang === 'ka' && item.name.ka) nameValue = item.name.ka.toLowerCase();
        else if (currentLang === 'de' && item.name.de) nameValue = item.name.de.toLowerCase();
        else nameValue = item.name.en || item.name.ka || '';
        
        const matchesSearch = nameValue.includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || item.category.includes(activeCategory);
        
        return matchesSearch && matchesCategory;
    });
    
    renderSymbols(filtered);
}

// View Toggle Logic
const viewToggleBtn = document.getElementById('view-toggle');
if(viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
        const currentViewClass = grid.classList.contains('list-view');
        
        grid.classList.toggle('list-view');
        
        viewToggleBtn.textContent = currentViewClass ? 'Grid View' : 'List View';
    });
}

// Language Toggle - Now uses change event for select element
langToggle.addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateLanguageUI();
    filterData(); 
});

searchInput.addEventListener('input', filterData);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterData();
    });
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    themeToggle.innerHTML = nextTheme === 'dark' ? '○' : '●';
});

closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => { 
    if(e.target === modalOverlay) closeModal();
});

function setupScrollListener() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', async () => {
    await loadSymbolData(); 
    updateLanguageUI();
    renderSymbols(symbolsData);
    setupScrollListener();
});
