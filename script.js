// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.textContent = 'light_mode';
    } else {
        themeIcon.textContent = 'dark_mode';
    }
}

// Carousel functionality
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

// Auto-advance slides every 4 seconds
setInterval(nextSlide, 4000);

// Click on indicators to change slide
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => showSlide(i));
});

// Scrolling text animation
const features = [
    { icon: "star", text: "High Accuracy" },
    { icon: "speed", text: "Real-Time Detection" },
    { icon: "verified", text: "Verified Results" },
    { icon: "analytics", text: "AI-Powered" },
    { icon: "science", text: "Deep Learning" },
    { icon: "visibility", text: "Explainable AI" },
    { icon: "phone_android", text: "Mobile Ready" },
    { icon: "security", text: "Food Safety" },
    { icon: "store", text: "Market Ready" },
    { icon: "trending_up", text: "Cost Effective" }
];

const scrollingTextTrack = document.getElementById("scrollingText");

// Duplicate the features array to create a seamless scroll
[...features, ...features].forEach((feature, index) => {
    const item = document.createElement('div');
    item.className = 'scrolling-text-item';
    item.innerHTML = `
        <i class="material-icons">${feature.icon}</i>
        <span>${feature.text}</span>
    `;
    scrollingTextTrack.appendChild(item);
});

// Results and mode functionality
function showResults() {
    // Display the results sections
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('priceSection').style.display = 'block';
    document.getElementById('xaiSection').style.display = 'block';
    document.getElementById('historySection').style.display = 'block';
    
    // In lab mode, also show metrics
    if (document.querySelector('.mode-option.lab.active')) {
        document.getElementById('metricsSection').style.display = 'block';
    }
    
    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

function setMode(mode) {
    // Update mode toggle UI
    document.querySelectorAll('.mode-option').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelector(`.mode-option.${mode}`).classList.add('active');
    
    // Toggle lab-specific sections
    if (mode === 'lab') {
        document.getElementById('metricsSection').style.display = 'block';
    } else {
        document.getElementById('metricsSection').style.display = 'none';
    }
}
