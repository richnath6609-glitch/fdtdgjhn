// Ensure scripts run after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        initHeroSlider();
        initCurrencySwitcher();
        if (window.lucide) window.lucide.createIcons();
    } catch (err) {
        console.error('ARIMA 111 Init Error:', err);
    }
});

function initHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) return;

    const heroImages = ['./kente_gown_hero.png', './agbada_set_hero.png', './ankara_dashiki_hero.png'];
    const heroTitles = [
        'Authentic African Heritage,<br>Tailored for the Global Wardrobe.',
        'Prestige Wear for the<br>Modern Gentleman.',
        'Vibrant Patterns for<br>Everyday Elegance.'
    ];

    heroSlider.innerHTML = heroImages.map((img, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}">
            <img src="${img}" alt="Hero Image ${i}" class="hero-img">
            <div class="hero-content">
                <h2>${heroTitles[i]}</h2>
                <p>From the looms of Ghana to the streets of London and New York.</p>
                <div class="hero-ctas">
                    <a href="#shop" class="btn btn-primary">Shop All Collections</a>
                    <a href="custom-order.html" class="btn btn-secondary">Inquire for Custom Orders</a>
                </div>
            </div>
        </div>
    `).join('');

    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

function initCurrencySwitcher() {
    const currencySwitcher = document.getElementById('currency-switcher');
    if (!currencySwitcher) return;

    function updateCurrency(currency) {
        const symbols = { GHS: '₵', USD: '$', GBP: '£' };
        const rates = { GHS: 1, USD: 0.083, GBP: 0.065 };
        const sym = symbols[currency];
        const rate = rates[currency];

        const priceElements = document.querySelectorAll('.price-value, #product-price');
        priceElements.forEach(el => {
            if (el.id === 'product-price') return;

            const ghPrice = parseFloat(el.dataset.ghs);
            if (!isNaN(ghPrice)) {
                const converted = Math.round(ghPrice * rate).toLocaleString();
                el.textContent = `${sym}${converted}`;
            }
        });

        localStorage.setItem('arima-currency', currency);
    }

    currencySwitcher.addEventListener('change', (e) => {
        updateCurrency(e.target.value);
        if (typeof window.loadProduct === 'function') window.loadProduct();
    });

    const saved = localStorage.getItem('arima-currency');
    if (saved) {
        currencySwitcher.value = saved;
        updateCurrency(saved);
    }
}
