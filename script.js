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
        sessionStorage.removeItem('justLoggedIn');
        showNotification('Welcome back!', 'success');
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarLinks = document.getElementById('navbarLinks');
    
    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navbarLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.textContent = navbarLinks.classList.contains('active') ? 'close' : 'menu';
        });
        
        // Close menu when clicking a link
        navbarLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').textContent = 'menu';
            });
        });
    }

    function showNotification(message, type = 'info') {
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

    // --- Counter Animation ---
    function animateCounters() {
        const counters = document.querySelectorAll('.counter-animated');
        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const duration = 2000;
                    const startTime = performance.now();

                    const updateCount = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = progress * (2 - progress);
                        const currentCount = easeProgress * target;

                        if (target % 1 === 0) {
                            counter.innerText = Math.floor(currentCount).toLocaleString() + suffix;
                        } else {
                            counter.innerText = currentCount.toFixed(1) + suffix;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            if (target % 1 === 0) {
                                counter.innerText = Math.floor(target).toLocaleString() + suffix;
                            } else {
                                counter.innerText = target.toFixed(1) + suffix;
                            }
                        }
                    };

                    requestAnimationFrame(updateCount);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounters();

    // --- DASHBOARD TABBED VIEWS LOGIC (Simulated Backend via JS) ---
    const featureCards = {
        'dash-freshness': {
            title: 'Instant Freshness Detection',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Instant Freshness Detection</h2>
                    <p class="tab-subtitle">Utilize AI Vision 3.0 to scan high-resolution optical features of your seafood to determine freshness down to the hour.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Scan Console</h3>
                        <input type="file" id="freshness-upload" style="display:none;" accept="image/*">
                        <label for="freshness-upload" class="upload-zone">
                            <i class="material-icons" style="font-size:48px; color:var(--accent-blue); margin-bottom:15px;">cloud_upload</i>
                            <h4 style="margin-bottom:10px; font-size:18px;">Click to Upload Fish Image</h4>
                            <p style="color:var(--dash-subtitle); font-size:14px;">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                        </label>
                    </div>
                    <div class="tab-panel" style="position:relative;">
                        <h3 style="margin-bottom:20px; font-size:22px;">Analysis Results</h3>
                        
                        <div id="freshness-empty" style="text-align:center; padding:60px 0; color:var(--dash-subtitle);">
                            <i class="material-icons" style="font-size:48px; opacity:0.3; margin-bottom:15px;">science</i>
                            <p>Upload an image to view detailed metrics.</p>
                        </div>

                        <div id="freshness-loading" style="display:none; text-align:center; padding:60px 0;">
                            <i class="material-icons" style="font-size:48px; color:var(--warning-color); animation:spin 2s linear infinite;">autorenew</i>
                            <p style="margin-top:20px; color:var(--warning-color); font-weight:600;">Processing neural tensors...</p>
                        </div>
                        
                        <div id="freshness-result" class="result-box">
                            <div style="display:flex; align-items:center; gap:15px; margin-bottom:25px; padding-bottom:15px; border-bottom:1px solid rgba(16,185,129,0.2);">
                                <div style="width:60px; height:60px; border-radius:15px; background:#10b981; display:flex; align-items:center; justify-content:center; color:white; font-size:28px; font-weight:800;">A</div>
                                <div>
                                    <h4 style="font-size:20px; color:#10b981;">Premium Export Grade</h4>
                                    <p style="color:var(--dash-subtitle); font-size:14px;">Extracted Score: 96.8% Freshness</p>
                                </div>
                            </div>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:14px;">
                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px;">
                                    <strong style="color:var(--text-main); display:block; margin-bottom:5px;">Estimated Catch Time</strong>
                                    <span style="color:var(--dash-subtitle);">~14 Hours Ago</span>
                                </div>
                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px;">
                                    <strong style="color:var(--text-main); display:block; margin-bottom:5px;">Est. Shelf Life</strong>
                                    <span style="color:var(--dash-subtitle);">6.5 Days @ 2°C</span>
                                </div>
                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px;">
                                    <strong style="color:var(--text-main); display:block; margin-bottom:5px;">Eye Clarity (T-Score)</strong>
                                    <span style="color:var(--dash-subtitle);">92% (Translucent)</span>
                                </div>
                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px;">
                                    <strong style="color:var(--text-main); display:block; margin-bottom:5px;">Gill Color Profile</strong>
                                    <span style="color:var(--dash-subtitle);">#c72a2a (Bright Red)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            action: () => {
                const upload = document.getElementById('freshness-upload');
                const empty = document.getElementById('freshness-empty');
                const loading = document.getElementById('freshness-loading');
                const result = document.getElementById('freshness-result');
                if(upload) upload.addEventListener('change', () => {
                    empty.style.display = 'none';
                    result.style.display = 'none';
                    loading.style.display = 'block';
                    setTimeout(() => {
                        loading.style.display = 'none';
                        result.style.display = 'block';
                    }, 1800);
                });
            }
        },
        'dash-species': {
            title: 'Species Recognition',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Species Database Scanner</h2>
                    <p class="tab-subtitle">Cross-reference 100,000+ global commercial species in milliseconds to verify your catch against market standards.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Scan Console</h3>
                        <input type="file" id="species-upload" style="display:none;" accept="image/*">
                        <label for="species-upload" class="upload-zone" style="display:block;">
                            <i class="material-icons" style="font-size:48px; color:var(--accent-blue); margin-bottom:15px;">set_meal</i>
                            <h4 style="margin-bottom:10px; font-size:18px;">Click to Upload Fish Image</h4>
                            <p style="color:var(--dash-subtitle); font-size:14px;">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                        </label>
                    </div>
                    <div class="tab-panel" style="position:relative;">
                        <h3 style="margin-bottom:20px; font-size:22px;">Analysis Results</h3>
                        
                        <div id="species-empty" style="text-align:center; padding:60px 0; color:var(--dash-subtitle);">
                            <i class="material-icons" style="font-size:48px; opacity:0.3; margin-bottom:15px;">manage_search</i>
                            <p>Upload an image to identify species probabilities.</p>
                        </div>

                        <div id="species-loading" style="display:none; text-align:center; padding:60px 0;">
                            <i class="material-icons" style="font-size:48px; color:#3b82f6; animation:spin 2s linear infinite;">autorenew</i>
                            <p style="margin-top:20px; color:#3b82f6; font-weight:600;">Querying global database...</p>
                        </div>
                        
                        <div id="species-result" class="result-box" style="background:rgba(59,130,246,0.05); border-color:rgba(59,130,246,0.2);">
                            <h4 style="font-size:20px; color:#3b82f6; margin-bottom:20px;">Primary Match Verified</h4>
                            <div style="margin-bottom:20px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <strong id="m-species-name" style="color:white; font-size:16px;">Atlantic Salmon</strong>
                                    <span id="m-species-score" style="color:#3b82f6; font-weight:bold;">98.2%</span>
                                </div>
                                <div style="width:100%; height:8px; background:rgba(255,255,255,0.1); border-radius:4px; overflow:hidden;">
                                    <div id="m-species-bar" style="width:98.2%; height:100%; background:#3b82f6;"></div>
                                </div>
                            </div>
                            <div style="margin-bottom:15px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <span style="color:var(--dash-subtitle); font-size:14px;">Pacific Salmon</span>
                                    <span style="color:var(--dash-subtitle); font-size:14px;">12.4%</span>
                                </div>
                                <div style="width:100%; height:4px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden;">
                                    <div style="width:12.4%; height:100%; background:var(--dash-subtitle);"></div>
                                </div>
                            </div>
                            <div>
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <span style="color:var(--dash-subtitle); font-size:14px;">Rainbow Trout</span>
                                    <span style="color:var(--dash-subtitle); font-size:14px;">4.1%</span>
                                </div>
                                <div style="width:100%; height:4px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden;">
                                    <div style="width:4.1%; height:100%; background:var(--dash-subtitle);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            action: () => {
                const upload = document.getElementById('species-upload');
                const empty = document.getElementById('species-empty');
                const loading = document.getElementById('species-loading');
                const result = document.getElementById('species-result');
                const sName = document.getElementById('m-species-name');
                const sScore = document.getElementById('m-species-score');
                const sBar = document.getElementById('m-species-bar');

                if(upload) upload.addEventListener('change', () => {
                    empty.style.display = 'none';
                    result.style.display = 'none';
                    loading.style.display = 'block';
                    setTimeout(() => {
                        loading.style.display = 'none';
                        const species = ['Atlantic Salmon', 'Yellowfin Tuna', 'Mackerel', 'Red Snapper', 'Cod'];
                        const randomSpecie = species[Math.floor(Math.random() * species.length)];
                        const score = (Math.random() * 5 + 94).toFixed(1);
                        if(sName) sName.textContent = randomSpecie;
                        if(sScore) sScore.textContent = score + '%';
                        if(sBar) sBar.style.width = score + '%';
                        result.style.display = 'block';
                    }, 1800);
                });
            }
        },
        'dash-reports': {
            title: 'Detailed Quality Reports',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Verified Export Documentation</h2>
                    <p class="tab-subtitle">Generate cryptographically secured PDF manifests detailing precise freshness metrics, timestamps, and metadata.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Report Parameters</h3>
                        <div style="margin-bottom:20px;">
                            <label style="display:block; margin-bottom:8px; color:var(--dash-subtitle);">Date Range</label>
                            <select style="width:100%; padding:15px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); color:white; border-radius:12px; font-family:'Inter'; outline:none;">
                                <option>Last 24 Hours</option>
                                <option>Last 7 Days</option>
                                <option>Current Month</option>
                            </select>
                        </div>
                        <div style="margin-bottom:30px;">
                            <label style="display:block; margin-bottom:8px; color:var(--dash-subtitle);">Include Data</label>
                            <label style="display:flex; align-items:center; gap:10px; margin-bottom:10px; cursor:pointer;"><input type="checkbox" checked> GPS Coordinates</label>
                            <label style="display:flex; align-items:center; gap:10px; margin-bottom:10px; cursor:pointer;"><input type="checkbox" checked> T-Score Metrics</label>
                            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;"><input type="checkbox" checked> Image Thumbnails</label>
                        </div>
                        <button id="gen-report-btn" class="btn-primary-yellow" style="width:100%; padding:18px;">Compile PDF Manifest</button>
                    </div>
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Recent Blockchain Commits</h3>
                        <div id="report-ledger" style="display:flex; flex-direction:column; gap:15px;">
                            <div style="background:rgba(16,185,129,0.05); border-left:3px solid #10b981; padding:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <strong style="display:block; color:white; margin-bottom:4px;">Manifest_20240210.pdf</strong>
                                    <span style="font-size:12px; color:var(--dash-subtitle);">Hash: 0x8F9...3B2</span>
                                </div>
                                <i class="material-icons" style="color:#10b981; cursor:pointer;">download</i>
                            </div>
                            <div style="background:rgba(255,255,255,0.02); border-left:3px solid rgba(255,255,255,0.2); padding:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                <div>
                                    <strong style="display:block; color:white; margin-bottom:4px;">Manifest_20240209.pdf</strong>
                                    <span style="font-size:12px; color:var(--dash-subtitle);">Hash: 0xA12...9C0</span>
                                </div>
                                <i class="material-icons" style="color:var(--dash-subtitle); cursor:pointer;">download</i>
                            </div>
                        </div>
                        <div id="report-loading" style="display:none; text-align:center; padding:40px 0;">
                            <i class="material-icons" style="font-size:48px; color:#facc15; animation:spin 2s linear infinite;">integration_instructions</i>
                            <p style="margin-top:20px; color:#facc15; font-weight:600;">Hashing data to ledger...</p>
                        </div>
                    </div>
                </div>
            `,
            action: () => {
                const btn = document.getElementById('gen-report-btn');
                const ledger = document.getElementById('report-ledger');
                const loading = document.getElementById('report-loading');
                if(btn) btn.addEventListener('click', () => {
                    const originalText = btn.textContent;
                    btn.textContent = 'Compiling...';
                    btn.style.opacity = '0.5';
                    btn.style.pointerEvents = 'none';
                    ledger.style.display = 'none';
                    loading.style.display = 'block';

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.opacity = '1';
                        btn.style.pointerEvents = 'auto';
                        loading.style.display = 'none';
                        
                        const newId = Math.floor(Math.random() * 900) + 100;
                        const newReport = `
                            <div style="background:rgba(16,185,129,0.05); border-left:3px solid #10b981; padding:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; animation:slideInUp 0.5s ease forwards;">
                                <div>
                                    <strong style="display:block; color:white; margin-bottom:4px;">Manifest_Recent_${newId}.pdf</strong>
                                    <span style="font-size:12px; color:var(--dash-subtitle);">Hash: 0xNEW...${newId}</span>
                                </div>
                                <i class="material-icons" style="color:#10b981; cursor:pointer;">download</i>
                            </div>
                        `;
                        ledger.insertAdjacentHTML('afterbegin', newReport);
                        ledger.style.display = 'flex';
                    }, 2000);
                });
            }
        },
        'dash-pricing': {
            title: 'Dynamic Market Pricing',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Live Algorithmic Valuation</h2>
                    <p class="tab-subtitle">Synchronize your caught species and detected freshness grades with localized market APIs to pinpoint maximum sale value.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Market Value Indices</h3>
                        <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:15px;">
                            <li style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(16,185,129,0.2);">
                                <div>
                                    <strong style="font-size:16px; color:white; display:block;">Atlantic Salmon</strong>
                                    <span style="font-size:13px; color:var(--dash-subtitle);">Grade A | Export</span>
                                </div>
                                <div style="text-align:right;">
                                    <strong style="font-size:20px; color:#10b981;">₹850 / kg</strong>
                                    <span style="font-size:12px; color:#10b981; display:flex; align-items:center; gap:4px; justify-content:flex-end;"><i class="material-icons" style="font-size:14px;">trending_up</i> +2.4%</span>
                                </div>
                            </li>
                            <li style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(16,185,129,0.2);">
                                <div>
                                    <strong style="font-size:16px; color:white; display:block;">Yellowfin Tuna</strong>
                                    <span style="font-size:13px; color:var(--dash-subtitle);">Grade A | Wholesale</span>
                                </div>
                                <div style="text-align:right;">
                                    <strong style="font-size:20px; color:#10b981;">₹1,250 / kg</strong>
                                    <span style="font-size:12px; color:#10b981; display:flex; align-items:center; gap:4px; justify-content:flex-end;"><i class="material-icons" style="font-size:14px;">trending_up</i> +1.1%</span>
                                </div>
                            </li>
                            <li style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(239,68,68,0.2);">
                                <div>
                                    <strong style="font-size:16px; color:white; display:block;">Mackerel</strong>
                                    <span style="font-size:13px; color:var(--dash-subtitle);">Grade B | Local</span>
                                </div>
                                <div style="text-align:right;">
                                    <strong style="font-size:20px; color:white;">₹320 / kg</strong>
                                    <span style="font-size:12px; color:#ef4444; display:flex; align-items:center; gap:4px; justify-content:flex-end;"><i class="material-icons" style="font-size:14px;">trending_down</i> -12.0%</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-panel" style="display:flex; flex-direction:column; justify-content:space-between;">
                        <h3 style="margin-bottom:20px; font-size:22px;">Demand Aggregation Widget</h3>
                        <div style="height:250px; background:rgba(0,0,0,0.2); border-radius:12px; border:1px solid rgba(255,255,255,0.05); display:flex; align-items:flex-end; padding:20px 10px; gap:6px; position:relative; overflow:hidden;">
                            <div style="flex:1; height:30%; background:linear-gradient(to top, rgba(99,102,241,0.5), transparent);"></div>
                            <div style="flex:1; height:45%; background:linear-gradient(to top, rgba(99,102,241,0.5), transparent);"></div>
                            <div style="flex:1; height:40%; background:linear-gradient(to top, rgba(99,102,241,0.5), transparent);"></div>
                            <div style="flex:1; height:60%; background:linear-gradient(to top, rgba(99,102,241,0.5), transparent);"></div>
                            <div style="flex:1; height:55%; background:linear-gradient(to top, rgba(99,102,241,0.5), transparent);"></div>
                            <div style="flex:1; height:80%; background:linear-gradient(to top, rgba(16,185,129,0.5), transparent);"></div>
                            <div style="flex:1; height:95%; background:linear-gradient(to top, rgba(16,185,129,0.5), transparent);"></div>
                            <div style="position:absolute; top:20px; right:20px; background:rgba(16,185,129,0.2); color:#10b981; padding:8px 15px; border-radius:20px; font-size:12px; font-weight:bold;">
                                Highest Confidence Sell Time: NOW
                            </div>
                        </div>
                        <button id="refresh-price-btn" class="btn-secondary-white" style="width:100%; margin-top:20px; background:transparent; border-color:rgba(255,255,255,0.1); color:white;">
                            <i class="material-icons" style="font-size:18px;">sync</i> Sync Live Market Data
                        </button>
                    </div>
                </div>
            `,
            action: () => {
                const btn = document.getElementById('refresh-price-btn');
                if(btn) btn.addEventListener('click', () => {
                    const icon = btn.querySelector('i');
                    if(icon) icon.style.animation = 'spin 1s linear infinite';
                    setTimeout(() => {
                        if(icon) icon.style.animation = 'none';
                    }, 1000);
                });
            }
        },
        'dash-analytics': {
            title: 'Cloud Analytics Dashboard',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Global Telemetry & Analytics</h2>
                    <p class="tab-subtitle">Visualize historical throughput, freshness deterioration curves, and geo-spatial node activity from a single pane of glass.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Scan Volume 7D</h3>
                        <div style="height:250px; display:flex; align-items:flex-end; justify-content:space-between; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.05); padding:20px; border-radius:12px; gap:10px;">
                            <div style="flex:1; background:#3b82f6; height:40%; border-radius:4px 4px 0 0; position:relative;" title="Mon"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dash-subtitle);">4k</span></div>
                            <div style="flex:1; background:#3b82f6; height:60%; border-radius:4px 4px 0 0; position:relative;" title="Tue"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dash-subtitle);">6k</span></div>
                            <div style="flex:1; background:#3b82f6; height:85%; border-radius:4px 4px 0 0; position:relative;" title="Wed"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:white; font-weight:bold;">8k</span></div>
                            <div style="flex:1; background:#10b981; height:100%; border-radius:4px 4px 0 0; position:relative;" title="Thu"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:#10b981; font-weight:bold;">9k</span></div>
                            <div style="flex:1; background:#3b82f6; height:75%; border-radius:4px 4px 0 0; position:relative;" title="Fri"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dash-subtitle);">7k</span></div>
                            <div style="flex:1; background:#f59e0b; height:35%; border-radius:4px 4px 0 0; position:relative;" title="Sat"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dash-subtitle);">3k</span></div>
                            <div style="flex:1; background:#ef4444; height:20%; border-radius:4px 4px 0 0; position:relative;" title="Sun"><span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dash-subtitle);">2k</span></div>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:10px; padding:0 10px; color:var(--dash-subtitle); font-size:12px; font-weight:600;">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                    <div class="tab-panel">
                        <h3 style="margin-bottom:20px; font-size:22px;">Key Performance Indicators</h3>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; height:calc(100% - 50px);">
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:25px; border-radius:12px; text-align:center; display:flex; flex-direction:column; justify-content:center;">
                                <div style="font-size:36px; font-weight:800; color:#10b981;">94%</div>
                                <div style="color:var(--dash-subtitle); font-size:14px; margin-top:5px;">Avg Freshness Index</div>
                            </div>
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:25px; border-radius:12px; text-align:center; display:flex; flex-direction:column; justify-content:center;">
                                <div style="font-size:36px; font-weight:800; color:white;">41k</div>
                                <div style="color:var(--dash-subtitle); font-size:14px; margin-top:5px;">Monthly Scans</div>
                            </div>
                            <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:25px; border-radius:12px; text-align:center; grid-column:span 2; display:flex; flex-direction:column; justify-content:center;">
                                <div style="font-size:28px; font-weight:800; color:#facc15;">2.1 Seconds</div>
                                <div style="color:var(--dash-subtitle); font-size:14px; margin-top:5px;">Median Processing Latency</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'dash-edge': {
            title: 'Offline Edge Deployment',
            content: `
                <div class="tab-header-area">
                    <h2 class="tab-title">Edge Node Configuration</h2>
                    <p class="tab-subtitle">Manage deep-sea deployments. Enable edge caching to locally store tensors when internet access drops below 1mbps.</p>
                </div>
                <div class="tab-grid-2col">
                    <div class="tab-panel" style="text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                        <div id="edge-pulse-ring" style="width:120px; height:120px; border-radius:50%; background:rgba(239,68,68,0.1); border:2px solid #ef4444; display:flex; align-items:center; justify-content:center; margin-bottom:30px; transition:all 0.4s;">
                            <i id="edge-icon" class="material-icons" style="font-size:56px; color:#ef4444; transition:all 0.4s;">wifi_off</i>
                        </div>
                        <h4 style="margin-bottom:10px; font-size:24px;">Status: <span id="edge-status-text" style="color:#ef4444; transition:all 0.4s;">Disconnected</span></h4>
                        <p id="edge-desc" style="color:var(--dash-subtitle); max-width:300px; margin-bottom:30px; font-size:14px; line-height:1.6;">Your local machine is completely severed from the cloud backend. Scans will fail.</p>
                    </div>
                    <div class="tab-panel">
                        <h3 style="margin-bottom:25px; font-size:22px;">Node Preferences</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:12px;">
                            <div>
                                <strong style="display:block; font-size:16px;">Local Tensor Execution</strong>
                                <span style="font-size:13px; color:var(--dash-subtitle);">Run ML logic on hardware.</span>
                            </div>
                            <i class="material-icons" style="color:#10b981;">toggle_on</i>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px; padding:15px; background:rgba(255,255,255,0.05); border-radius:12px;">
                            <div>
                                <strong style="display:block; font-size:16px;">Auto-Sync Protocol</strong>
                                <span style="font-size:13px; color:var(--dash-subtitle);">Upload cache when online.</span>
                            </div>
                            <i class="material-icons" style="color:#10b981;">toggle_on</i>
                        </div>
                        <button id="toggle-edge-btn" class="btn-primary-yellow" style="width:100%; border-radius:12px; font-size:18px; padding:20px; background:white; color:black; transition:all 0.3s; box-shadow:none;">
                            Initiate Offline Engine
                        </button>
                    </div>
                </div>
            `,
            action: () => {
                const btn = document.getElementById('toggle-edge-btn');
                const status = document.getElementById('edge-status-text');
                const pulse = document.getElementById('edge-pulse-ring');
                const icon = document.getElementById('edge-icon');
                const desc = document.getElementById('edge-desc');
                
                let isEdge = false;
                if(btn) btn.addEventListener('click', () => {
                    isEdge = !isEdge;
                    if(isEdge) {
                        btn.textContent = 'Terminate Edge Environment';
                        btn.style.background = 'rgba(239,68,68,0.1)';
                        btn.style.color = '#ef4444';
                        btn.style.border = '1px solid #ef4444';
                        
                        status.textContent = 'Active & Secure';
                        status.style.color = '#10b981';
                        
                        pulse.style.background = 'rgba(16,185,129,0.1)';
                        pulse.style.borderColor = '#10b981';
                        pulse.style.boxShadow = '0 0 30px rgba(16,185,129,0.3)';
                        
                        icon.textContent = 'router';
                        icon.style.color = '#10b981';
                        
                        desc.textContent = "Your local machine currently holds 0 cached scans. Ready for deep-sea operation.";
                    } else {
                        btn.textContent = 'Initiate Offline Engine';
                        btn.style.background = 'white';
                        btn.style.color = 'black';
                        btn.style.border = 'none';
                        
                        status.textContent = 'Disconnected';
                        status.style.color = '#ef4444';
                        
                        pulse.style.background = 'rgba(239,68,68,0.1)';
                        pulse.style.borderColor = '#ef4444';
                        pulse.style.boxShadow = 'none';
                        
                        icon.textContent = 'wifi_off';
                        icon.style.color = '#ef4444';
                        
                        desc.textContent = "Your local machine is completely severed from the cloud backend. Scans will fail.";
                    }
                });
            }
        }
    };

    const tabViewsContainer = document.getElementById('dash-feature-views');
    const tabContentArea = document.getElementById('tab-content-area');
    const backToDashBtn = document.getElementById('back-to-dash-btn');

    const dashHeader = document.querySelector('.dashboard-header');
    const dashGrid = document.querySelector('.dashboard-grid');
    const dashMetrics = document.querySelector('.dash-metrics-container');
    const dashLogos = document.querySelector('.dash-trusted-logos');

    const toggleDashboardElements = (show) => {
        const displayStyle = show ? 'block' : 'none';
        if (dashHeader) dashHeader.style.display = displayStyle;
        if (dashGrid) {
            dashGrid.style.display = show ? 'grid' : 'none';
        }
        if (dashMetrics) dashMetrics.style.display = displayStyle;
        if (dashLogos) dashLogos.style.display = displayStyle;
    };

    if (tabViewsContainer && tabContentArea) {
        Object.keys(featureCards).forEach(id => {
            const card = document.getElementById(id);
            if (card) {
                card.addEventListener('click', () => {
                    const feature = featureCards[id];
                    tabContentArea.innerHTML = feature.content;
                    if (feature.action) feature.action();
                    
                    toggleDashboardElements(false);
                    tabViewsContainer.style.display = 'block';
                    tabViewsContainer.scrollIntoView({ behavior: 'smooth' });
                });
            }
        });

        if (backToDashBtn) {
            backToDashBtn.addEventListener('click', () => {
                tabViewsContainer.style.display = 'none';
                toggleDashboardElements(true);
                document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
});
