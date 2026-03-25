document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Management ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    if (themeIcon) updateThemeIcon(savedTheme, themeIcon);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme, themeIcon);
        });
    }

    function updateThemeIcon(theme, icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }

    // --- Carousel Functionality ---
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentSlide = 0;

    if (slides.length > 0) {
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

        setInterval(nextSlide, 4000);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
    }

    // --- Scrolling Text Animation ---
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
    if (scrollingTextTrack) {
        [...features, ...features].forEach((feature) => {
            const item = document.createElement('div');
            item.className = 'scrolling-text-item';
            item.innerHTML = `
                <i class="material-icons">${feature.icon}</i>
                <span>${feature.text}</span>
            `;
            scrollingTextTrack.appendChild(item);
        });
    }

    // --- Results and Mode Functionality ---
    window.showResults = function() {
        const results = document.getElementById('resultsSection');
        if (results) {
            results.style.display = 'block';
            document.getElementById('priceSection').style.display = 'block';
            document.getElementById('xaiSection').style.display = 'block';
            document.getElementById('historySection').style.display = 'block';
            
            if (document.querySelector('.mode-option.lab.active')) {
                document.getElementById('metricsSection').style.display = 'block';
            }
            results.scrollIntoView({ behavior: 'smooth' });
        }
    };

    window.setMode = function(mode) {
        document.querySelectorAll('.mode-option').forEach(el => {
            el.classList.remove('active');
        });
        const option = document.querySelector(`.mode-option.${mode}`);
        if (option) option.classList.add('active');
        
        const metrics = document.getElementById('metricsSection');
        if (metrics) {
            metrics.style.display = (mode === 'lab') ? 'block' : 'none';
        }
    };

    // --- Session Management ---
    const authContainer = document.getElementById('nav-auth-container');
    const savedUser = JSON.parse(localStorage.getItem('easyFishyUser'));

    if (authContainer && savedUser && savedUser.firstName) {
        // Apply logged-in state to body
        document.body.classList.add('is-logged-in');

        // Populate dashboard and profile info
        const navGreeting = document.getElementById('nav-user-greeting');
        if (navGreeting) navGreeting.textContent = `Hi, ${savedUser.firstName} !`;

        const profName = document.getElementById('prof-name');
        if (profName) profName.textContent = `${savedUser.firstName} ${savedUser.lastName || ''}`;

        const profEmail = document.getElementById('prof-email');
        if (profEmail) profEmail.textContent = savedUser.email;

        // Profile Dropdown Toggle
        const profileTrigger = document.getElementById('profileTrigger');
        const profileDropdown = document.getElementById('profileDropdown');
        if (profileTrigger && profileDropdown) {
            profileTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('active');
            });
            // Close on click outside
            document.addEventListener('click', () => {
                profileDropdown.classList.remove('active');
            });
            profileDropdown.addEventListener('click', (e) => e.stopPropagation());
        }

        // Dashboard Theme Toggle Sync
        const dashThemeToggle = document.getElementById('dashThemeToggle');
        if (dashThemeToggle) {
            dashThemeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme, themeIcon);
                // Also update the dash icon
                const dashIcon = dashThemeToggle.querySelector('i');
                if (dashIcon) updateThemeIcon(newTheme, dashIcon);
            });
            // Initial icon sync for dashboard
            const currentTheme = body.getAttribute('data-theme');
            const dashIcon = dashThemeToggle.querySelector('i');
            if (dashIcon) updateThemeIcon(currentTheme, dashIcon);
        }

        const logoutHandler = () => {
            localStorage.removeItem('easyFishyUser');
            document.body.classList.remove('is-logged-in');
            window.location.reload();
        };

        const dashLogoutBtn = document.getElementById('dashboard-logout-btn');
        const dashLogoutBtnNav = document.getElementById('dashboard-logout-btn-nav');
        
        if (dashLogoutBtn) dashLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutHandler();
        });
        if (dashLogoutBtnNav) dashLogoutBtnNav.addEventListener('click', (e) => {
            e.preventDefault();
            logoutHandler();
        });

        // Smooth Scroll for Dashboard Links
        const dashLinks = document.querySelectorAll('.dash-nav-link');
        dashLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offset = 100; // Account for fixed navbar
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });

                        // Trigger visual "auto-hover" highlight
                        targetElement.classList.add('auto-hover');
                        setTimeout(() => {
                            targetElement.classList.remove('auto-hover');
                        }, 2000); // Highlight for 2 seconds
                    }
                }
            });
        });
    }

        if (sessionStorage.getItem('justLoggedIn') === 'true') {
            showToast(`Welcome back, ${savedUser.firstName}!`);
            sessionStorage.removeItem('justLoggedIn');
        }

    function showToast(message) {
        // Create toast elements if they don't exist
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="material-icons toast-icon">check_circle</i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Use timeout to allow CSS transition
        setTimeout(() => container.classList.add('show'), 100);

        // Remove toast after 4 seconds
        setTimeout(() => {
            container.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 600);
        }, 4000);
    }
});
