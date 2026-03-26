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
                                    <span style="color:var(--dash-subtitle);">6.5 Days @ 2Â°C</span>
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
                                    <strong style="font-size:20px; color:#10b981;">â‚¹850 / kg</strong>
                                    <span style="font-size:12px; color:#10b981; display:flex; align-items:center; gap:4px; justify-content:flex-end;"><i class="material-icons" style="font-size:14px;">trending_up</i> +2.4%</span>
                                </div>
                            </li>
                            <li style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(16,185,129,0.2);">
                                <div>
                                    <strong style="font-size:16px; color:white; display:block;">Yellowfin Tuna</strong>
                                    <span style="font-size:13px; color:var(--dash-subtitle);">Grade A | Wholesale</span>
                                </div>
                                <div style="text-align:right;">
                                    <strong style="font-size:20px; color:#10b981;">â‚¹1,250 / kg</strong>
                                    <span style="font-size:12px; color:#10b981; display:flex; align-items:center; gap:4px; justify-content:flex-end;"><i class="material-icons" style="font-size:14px;">trending_up</i> +1.1%</span>
                                </div>
                            </li>
                            <li style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(239,68,68,0.2);">
                                <div>
                                    <strong style="font-size:16px; color:white; display:block;">Mackerel</strong>
                                    <span style="font-size:13px; color:var(--dash-subtitle);">Grade B | Local</span>
                                </div>
                                <div style="text-align:right;">
                                    <strong style="font-size:20px; color:white;">â‚¹320 / kg</strong>
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
    // --- GEOTRACKING ACTIVATION (Simulated Backend) ---
    const gpsBtn = document.getElementById('activate-gps-btn');
    if (gpsBtn) {
        gpsBtn.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                gpsBtn.textContent = "Ã°Å¸â€ºÂ°Ã¯Â¸Â Syncing Satellites...";
                gpsBtn.style.opacity = "0.7";
                
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude.toFixed(4);
                    const lng = position.coords.longitude.toFixed(4);
                    
                    setTimeout(() => {
                        gpsBtn.innerHTML = `<i class="material-icons" style="font-size:18px; vertical-align:middle;">check_circle</i> Tracking Active [${lat}, ${lng}]`;
                        gpsBtn.style.background = "#10b981";
                        gpsBtn.style.color = "#fff";
                        gpsBtn.style.opacity = "1";
                        
                        showNotification(`Geolocation locked: ${lat}, ${lng}`, 'success');
                        
                        // Simulate backend data update
                        console.log(`[STORAGE] Geolocation enabled for user session. Entry: ${lat}, ${lng}`);
                        localStorage.setItem('easyFishyLocation', JSON.stringify({ lat, lng, active: true }));
                    }, 1500);
                }, (error) => {
                    gpsBtn.textContent = "Ã¢Å¡Â Ã¯Â¸Â Permission Denied";
                    gpsBtn.style.background = "#ef4444";
                    gpsBtn.style.color = "#fff";
                    showNotification("Location access required for this feature.", "error");
                });
            } else {
                showNotification("Geolocation is not supported by your browser.", "error");
            }
        });

        // Initialize state from localStorage if exists
        const savedLoc = JSON.parse(localStorage.getItem('easyFishyLocation'));
        if (savedLoc && savedLoc.active) {
            gpsBtn.innerHTML = `<i class="material-icons" style="font-size:18px; vertical-align:middle;">check_circle</i> Tracking Active [${savedLoc.lat}, ${savedLoc.lng}]`;
            gpsBtn.style.background = "#10b981";
            gpsBtn.style.color = "#fff";
        }
    }
    // --- ROADMAP CARDS INTERACTIVE BACKEND ---
    const modal = document.getElementById('roadmap-modal');
    const modalBox = document.getElementById('roadmap-modal-box');
    const modalContent = document.getElementById('roadmap-modal-content');
    const isDark = () => document.body.getAttribute('data-theme') === 'dark';

    function openRoadmapModal(html, accentColor = '#eab308', onReady = null) {
        if (!modal || !modalContent) return;
        const bg = isDark()
            ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(145deg, #fffdf0 0%, #fff 100%)';
        const textColor = isDark() ? '#f1f5f9' : '#1e293b';
        modalBox.style.background = bg;
        modalBox.style.color = textColor;
        modalBox.style.border = `1px solid ${accentColor}44`;
        modalBox.style.boxShadow = `0 30px 80px ${accentColor}22`;
        modalContent.innerHTML = html;
        modal.style.display = 'flex';
        if (onReady) setTimeout(onReady, 60);
    }

    const roadmapData = {
        'Smart Analytics Panel': {
            accent: '#eab308',
            render: () => {
                const uid = 'sap' + Date.now();
                window.__rfUid = uid;
                window[uid + '_speciesData'] = {
                    'All Species': [82,90,76,95,88,60,72],
                    'Salmon':      [91,95,88,97,94,72,85],
                    'Tuna':        [75,80,70,88,78,55,65],
                    'Mackerel':    [60,68,55,74,62,42,50],
                };
                window[uid + '_uid'] = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#eab30822;color:#eab308;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">[Chart] SMART ANALYTICS</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Freshness Trend - 7 Days</h2>
                    <p style="color:#fde68a;font-size:13px;margin:5px 0 0;">Live AI accuracy tracking</p>
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;align-items:center;">
                <select id="${uid}species" onchange="window['${uid}sapUpd']&&window['${uid}sapUpd'](this.value)" style="padding:9px 14px;border-radius:10px;border:1px solid #eab30855;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;flex:1;min-width:130px;">
                    <option>All Species</option><option>Salmon</option><option>Tuna</option><option>Mackerel</option>
                </select>
                <select style="padding:9px 14px;border-radius:10px;border:1px solid #eab30855;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option>Last 7 Days</option><option>Last 14 Days</option><option>This Month</option>
                </select>
            </div>
            <div id="${uid}chart" style="display:flex;align-items:flex-end;gap:6px;height:170px;background:rgba(234,179,8,0.05);border:1px solid rgba(234,179,8,0.15);border-radius:14px;padding:16px 12px 10px;"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:18px;">
                <div style="background:rgba(234,179,8,0.1);border-radius:12px;padding:15px;text-align:center;"><div id="${uid}avg" style="font-size:24px;font-weight:800;color:#eab308;">--%</div><div style="font-size:11px;opacity:.6;margin-top:3px;">Avg Accuracy</div></div>
                <div style="background:rgba(16,185,129,0.1);border-radius:12px;padding:15px;text-align:center;"><div id="${uid}scans" style="font-size:24px;font-weight:800;color:#10b981;">--</div><div style="font-size:11px;opacity:.6;margin-top:3px;">Weekly Scans</div></div>
                <div style="background:rgba(59,130,246,0.1);border-radius:12px;padding:15px;text-align:center;"><div id="${uid}ga" style="font-size:24px;font-weight:800;color:#3b82f6;">--%</div><div style="font-size:11px;opacity:.6;margin-top:3px;">Grade A Rate</div></div>
            </div>`;
            },
            action: (uid) => {
                const d = window[uid + '_speciesData'] || {'All Species':[82,90,76,95,88,60,72]};
                const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
                const renderChart = (species) => {
                    const v = d[species] || d['All Species'];
                    const chart = document.getElementById(uid+'chart');
                    if (chart) chart.innerHTML = days.map((day,i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;"><span style="font-size:11px;font-weight:700;color:#eab308">${v[i]}%</span><div style="width:100%;background:linear-gradient(to top,#eab308,#facc15);height:${Math.round(v[i]*1.6)}px;border-radius:5px 5px 0 0;"></div><span style="font-size:10px;opacity:.6">${day}</span></div>`).join('');
                    const avg = Math.round(v.reduce((a,b)=>a+b)/v.length);
                    const avgEl = document.getElementById(uid+'avg'); if(avgEl) avgEl.textContent=avg+'%';
                    const scEl = document.getElementById(uid+'scans'); if(scEl) scEl.textContent=Math.round(avg*28).toLocaleString();
                    const gaEl = document.getElementById(uid+'ga'); if(gaEl) gaEl.textContent=Math.round(avg*.78)+'%';
                };
                window[uid+'sapUpd'] = renderChart;
                renderChart('All Species');
            }

        },

        'Visual Insights (Charts)': {
            accent: '#3b82f6',
            render: () => {
                const uid = 'vic' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#3b82f622;color:#3b82f6;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">[Graph] VISUAL INSIGHTS</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Freshness Distribution</h2>
                    <p style="color:#93c5fd;font-size:13px;margin:5px 0 0;">Industry-level analytics</p>
                </div>
            </div>
            <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;align-items:center;">
                <label style="font-size:12px;opacity:.7;">ðŸ“… Period:</label>
                <select id="${uid}period" onchange="window['${uid}upd']&&window['${uid}upd']()" style="padding:9px 14px;border-radius:10px;border:1px solid #3b82f655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option>This Month</option><option>Last 3 Months</option><option>This Year</option>
                </select>
                <label style="font-size:12px;opacity:.7;">Ã°Å¸ÂÂª Market:</label>
                <select id="${uid}market" onchange="window['${uid}upd']&&window['${uid}upd']()" style="padding:9px 14px;border-radius:10px;border:1px solid #3b82f655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option>All Markets</option><option>Local Wholesale</option><option>Export</option><option>Retail Chain</option>
                </select>
            </div>
            <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap;">
                <div style="position:relative;width:150px;height:150px;flex-shrink:0;">
                    <svg id="${uid}pie" viewBox="0 0 36 36" style="width:150px;height:150px;transform:rotate(-90deg)"></svg>
                    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;"><span id="${uid}ctr" style="font-size:22px;font-weight:900;color:#3b82f6;">--</span><span style="font-size:10px;opacity:.5">Grade A</span></div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;gap:9px;" id="${uid}leg"></div>
            </div>
            <div id="${uid}ins" style="margin-top:16px;padding:14px;background:rgba(59,130,246,0.08);border-radius:12px;border:1px solid rgba(59,130,246,0.2);font-size:13px;"></div>`;
            },
            action: (uid) => {
                const data = {
                    'This Month':{'All Markets':[55,25,13,7],'Local Wholesale':[48,28,16,8],'Export':[70,20,8,2],'Retail Chain':[52,26,14,8]},
                    'Last 3 Months':{'All Markets':[50,27,15,8],'Local Wholesale':[44,30,17,9],'Export':[65,22,11,2],'Retail Chain':[49,28,16,7]},
                    'This Year':{'All Markets':[47,28,16,9],'Local Wholesale':[42,31,18,9],'Export':[61,23,13,3],'Retail Chain':[46,28,18,8]},
                };
                const labels = [['#10b981','Grade A - Premium'],['#eab308','Grade B - Good'],['#ef4444','Grade C - Marginal'],['#94a3b8','Rejected / Stale']];
                window[uid+'upd'] = () => {
                    const period = document.getElementById(uid+'period')?.value||'This Month';
                    const market = document.getElementById(uid+'market')?.value||'All Markets';
                    const vals = data[period]?.[market]||[55,25,13,7];
                    let offset=0;
                    const pie = document.getElementById(uid+'pie');
                    if(pie) pie.innerHTML = vals.map((v,i)=>{const o=-offset;offset+=v;return `<circle cx="18" cy="18" r="15.915" fill="none" stroke="${labels[i][0]}" stroke-width="3.2" stroke-dasharray="${v} ${100-v}" stroke-dashoffset="${o}"/>`;}).join('');
                    const ctr=document.getElementById(uid+'ctr'); if(ctr) ctr.textContent=vals[0]+'%';
                    const leg=document.getElementById(uid+'leg'); if(leg) leg.innerHTML=vals.map((v,i)=>`<div style="display:flex;align-items:center;gap:9px;"><div style="width:11px;height:11px;border-radius:50%;background:${labels[i][0]};flex-shrink:0;"></div><span style="flex:1;font-size:13px;">${labels[i][1]}</span><strong style="color:${labels[i][0]};">${v}%</strong></div>`).join('');
                    const ins=document.getElementById(uid+'ins'); if(ins) ins.innerHTML=`ðŸ’¡ <strong>${period} / ${market}</strong>: Grade A rate <strong style="color:#10b981">${vals[0]}%</strong>. ${vals[0]>55?'Excellent quality!':'Optimize cold chain to boost Grade A yield.'}`;
                };
                window[uid+'upd']();
            }
        },

        'AI Confidence Score': {
            accent: '#10b981',
            render: () => {
                const uid = 'aic' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#10b98122;color:#10b981;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">ðŸ§  AI CONFIDENCE</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Live Confidence Simulator</h2>
                    <p style="color:#6ee7b7;font-size:13px;margin:5px 0 0;">Change fish and conditions to see AI score</p>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">Ã°Å¸ÂÅ¸ Fish Species</label>
                    <select id="${uid}sp" onchange="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #10b98155;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Atlantic Salmon</option><option>Yellowfin Tuna</option><option>Mackerel</option><option>Red Snapper</option><option>Cod</option><option>Hilsa</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">Ã°Å¸Å’Â¡Ã¯Â¸Â Storage</label>
                    <select id="${uid}cond" onchange="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #10b98155;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Ice-Fresh (0-2Â°C)</option><option>Refrigerated (4-6Â°C)</option><option>Room Temp (>20Â°C)</option><option>Frozen (-18Â°C)</option>
                    </select>
                </div>
            </div>
            <div style="margin-bottom:16px;">
                <label style="font-size:12px;opacity:.7;display:block;margin-bottom:8px;">Ã¢ÂÂ³ Hours since catch: <span id="${uid}hval" style="color:#10b981;font-weight:700;">12h</span></label>
                <input type="range" id="${uid}hrs" min="1" max="96" value="12" oninput="document.getElementById('${uid}hval').textContent=this.value+'h';window['${uid}upd']&&window['${uid}upd']()" style="width:100%;accent-color:#10b981;">
            </div>
            <div id="${uid}res" style="text-align:center;padding:28px 18px;border-radius:16px;border:1px solid #33333355;margin-bottom:14px;transition:all 0.4s;"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;" id="${uid}met"></div>`;
            },
            action: (uid) => {
                const base = {'Atlantic Salmon':93,'Yellowfin Tuna':90,'Mackerel':84,'Red Snapper':91,'Cod':88,'Hilsa':85};
                const condMod = {'Ice-Fresh (0-2Â°C)':0,'Refrigerated (4-6Â°C)':-5,'Room Temp (>20Â°C)':-25,'Frozen (-18Â°C)':+3};
                window[uid+'upd'] = () => {
                    const sp=document.getElementById(uid+'sp')?.value||'Atlantic Salmon';
                    const cond=document.getElementById(uid+'cond')?.value||'Ice-Fresh (0-2Â°C)';
                    const hrs=parseInt(document.getElementById(uid+'hrs')?.value||12);
                    let score=Math.max(5,Math.min(99,(base[sp]||88)+(condMod[cond]||0)-Math.floor(hrs/8)*3));
                    const col=score>=85?'#10b981':score>=65?'#f59e0b':'#ef4444';
                    const lbl=score>=85?'âœ… Premium Fresh':score>=65?'Ã¢Å¡Â Ã¯Â¸Â Marginal - Sell Today':'Ã°Å¸â€Â´ High Risk - Do Not Sell';
                    const res=document.getElementById(uid+'res');
                    if(res){res.style.background=`${col}11`;res.style.borderColor=`${col}44`;res.innerHTML=`<div style="font-size:68px;font-weight:900;color:${col};line-height:1;">${score}%</div><div style="font-size:14px;font-weight:600;color:${col};margin-top:8px;">${lbl}</div><div style="font-size:12px;opacity:.6;margin-top:5px;">${sp} - ${cond} - ${hrs}h after catch</div>`;}
                    const met=document.getElementById(uid+'met');
                    if(met) met.innerHTML=[['Eye Clarity',Math.min(99,score+3),col],['Gill Color',Math.max(5,score-2),col],['Texture',Math.max(5,score-5),col]].map(([l,v,c])=>`<div style="background:${c}11;border:1px solid ${c}33;border-radius:11px;padding:13px;text-align:center;"><div style="font-size:19px;font-weight:800;color:${c}">${v}%</div><div style="font-size:10px;opacity:.6;margin-top:3px">${l}</div></div>`).join('');
                };
                window[uid+'upd']();
            }
        },

        'Scan History & Logs': {
            accent: '#8b5cf6',
            render: () => {
                const uid = 'shl' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#8b5cf622;color:#8b5cf6;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">[Log] SCAN HISTORY</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Audit Trail & Logs</h2>
                    <p style="color:#c4b5fd;font-size:13px;margin:5px 0 0;">Search, filter and export your scan history</p>
                </div>
            </div>
            <div style="display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap;">
                <input id="${uid}q" type="text" placeholder="Ã°Å¸â€Â Search fish or grade..." oninput="window['${uid}upd']&&window['${uid}upd']()" style="flex:1;min-width:140px;padding:9px 13px;border-radius:10px;border:1px solid #8b5cf655;background:transparent;color:inherit;font-family:'Inter';outline:none;">
                <select id="${uid}g" onchange="window['${uid}upd']&&window['${uid}upd']()" style="padding:9px 12px;border-radius:10px;border:1px solid #8b5cf655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option value="">All Grades</option><option value="A">Grade A</option><option value="B">Grade B</option><option value="C">Grade C</option>
                </select>
                <select id="${uid}d" style="padding:9px 12px;border-radius:10px;border:1px solid #8b5cf655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option>Today</option><option>Last 7 Days</option><option>This Month</option>
                </select>
            </div>
            <div id="${uid}list" style="display:flex;flex-direction:column;gap:7px;max-height:250px;overflow-y:auto;"></div>
            <div style="display:flex;gap:9px;margin-top:14px;">
                <button onclick="alert('CSV export: 5 records exported!')" style="flex:1;padding:11px;border-radius:10px;background:#8b5cf622;border:1px solid #8b5cf644;color:#8b5cf6;font-weight:700;cursor:pointer;font-size:13px;">â¬‡ CSV</button>
                <button onclick="alert('PDF compiled and ready for download!')" style="flex:1;padding:11px;border-radius:10px;background:#ef444422;border:1px solid #ef444444;color:#ef4444;font-weight:700;cursor:pointer;font-size:13px;">ðŸ“„ PDF</button>
            </div>`;
            },
            action: (uid) => {
                const allLogs = [
                    {t:'09:14',fish:'Atlantic Salmon',g:'A',s:97,col:'#10b981'},{t:'08:52',fish:'Yellowfin Tuna',g:'A',s:94,col:'#10b981'},
                    {t:'08:31',fish:'Mackerel',g:'B',s:71,col:'#f59e0b'},{t:'07:58',fish:'Red Snapper',g:'A',s:91,col:'#10b981'},
                    {t:'07:22',fish:'Cod',g:'C',s:48,col:'#ef4444'},{t:'06:45',fish:'Hilsa',g:'B',s:68,col:'#f59e0b'},
                    {t:'06:10',fish:'Pomfret',g:'A',s:95,col:'#10b981'},{t:'05:30',fish:'Mackerel',g:'C',s:40,col:'#ef4444'},
                ];
                window[uid+'upd'] = () => {
                    const q=(document.getElementById(uid+'q')?.value||'').toLowerCase();
                    const g=document.getElementById(uid+'g')?.value||'';
                    const filtered=allLogs.filter(l=>(!q||l.fish.toLowerCase().includes(q))&&(!g||l.g===g));
                    const list=document.getElementById(uid+'list');
                    if(!list) return;
                    list.innerHTML=!filtered.length?'<p style="text-align:center;opacity:.4;padding:24px 0;">No records match.</p>':filtered.map(l=>`<div style="display:flex;align-items:center;gap:11px;padding:11px 13px;background:${l.col}0d;border-left:3px solid ${l.col};border-radius:0 9px 9px 0;"><span style="font-size:11px;opacity:.5;min-width:48px;">${l.t} AM</span><span style="flex:1;font-weight:600;font-size:13px;">${l.fish}</span><span style="background:${l.col}22;color:${l.col};padding:2px 9px;border-radius:20px;font-size:11px;font-weight:700;">Grade ${l.g}</span><strong style="color:${l.col};min-width:35px;text-align:right;">${l.s}%</strong></div>`).join('');
                };
                window[uid+'upd']();
            }
        },

        'Smart Recommendations': {
            accent: '#f59e0b',
            render: () => {
                const uid = 'sr' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#f59e0b22;color:#f59e0b;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">Ã°Å¸â€â€ SMART RECOMMENDATIONS</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">AI Decision Engine</h2>
                    <p style="color:#fde68a;font-size:13px;margin:5px 0 0;">Enter freshness score â†’ get instant action plan + revenue</p>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">Ã°Å¸ÂÅ¸ Fish Type</label>
                    <select id="${uid}fish" onchange="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #f59e0b55;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Salmon</option><option>Tuna</option><option>Mackerel</option><option>Snapper</option><option>Cod</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">ðŸ“¦ Batch Size (kg)</label>
                    <input type="number" id="${uid}batch" value="50" min="1" max="5000" oninput="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #f59e0b55;background:transparent;color:inherit;font-family:'Inter';outline:none;box-sizing:border-box;">
                </div>
            </div>
            <div style="margin-bottom:16px;">
                <label style="font-size:12px;opacity:.7;display:block;margin-bottom:7px;">[Chart] Freshness Score: <span id="${uid}fval" style="color:#f59e0b;font-weight:700;">75%</span></label>
                <input type="range" id="${uid}fresh" min="5" max="99" value="75" oninput="document.getElementById('${uid}fval').textContent=this.value+'%';window['${uid}upd']&&window['${uid}upd']()" style="width:100%;accent-color:#f59e0b;">
            </div>
            <div id="${uid}res"></div>`;
            },
            action: (uid) => {
                const pricePerKg = {Salmon:850,Tuna:1250,Mackerel:320,Snapper:600,Cod:480};
                window[uid+'upd'] = () => {
                    const fish=document.getElementById(uid+'fish')?.value||'Salmon';
                    const batch=parseFloat(document.getElementById(uid+'batch')?.value||50);
                    const fresh=parseInt(document.getElementById(uid+'fresh')?.value||75);
                    const base=pricePerKg[fish]||600;
                    let icon,title,desc,action,col;
                    if(fresh>=85){col='#10b981';icon='âœ…';title='Safe for Consumption - Sell Now!';desc=`${fish} (${batch}kg) at ${fresh}% - Grade A quality.`;action=`ðŸ’° Max Revenue: <strong style="color:#10b981">â‚¹${(base*batch).toLocaleString()}</strong> at â‚¹${base}/kg`;}
                    else if(fresh>=60){col='#f59e0b';icon='Ã¢Å¡Â Ã¯Â¸Â';const disc=Math.round((85-fresh)*.8);const dp=Math.round(base*(1-disc/100));title=`Sell Today - Apply ${disc}% Discount`;desc=`${fish} (${batch}kg) at ${fresh}% - needs quick sale at reduced price.`;action=`ðŸ’° Discounted Revenue: <strong style="color:#f59e0b">â‚¹${(dp*batch).toLocaleString()}</strong> at â‚¹${dp}/kg. Sell within 6h.`;}
                    else{col='#ef4444';icon='Ã°Å¸â€Â´';title='HIGH RISK - Do NOT Sell';desc=`${fish} (${batch}kg) at ${fresh}% - below safety threshold.`;action=`Ã¢Å¡Â Ã¯Â¸Â Potential Loss: <strong style="color:#ef4444">â‚¹${(base*batch).toLocaleString()}</strong>. Isolate batch immediately.`;}
                    const res=document.getElementById(uid+'res');
                    if(res) res.innerHTML=`<div style="padding:18px;background:${col}0d;border:1px solid ${col}33;border-radius:13px;"><div style="font-size:26px;margin-bottom:10px;">${icon}</div><strong style="font-size:15px;color:${col};display:block;margin-bottom:7px;">${title}</strong><p style="font-size:13px;opacity:.7;margin:0 0 10px;">${desc}</p><div style="padding:10px 13px;background:${col}11;border-radius:9px;font-size:13px;">${action}</div></div>`;
                };
                window[uid+'upd']();
            }
        },

        'Multi-User Dashboard': {
            accent: '#6366f1',
            render: () => {
                const uid = 'mud' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#6366f122;color:#6366f1;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">[Team] MULTI-USER</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Team Role Management</h2>
                    <p style="color:#a5b4fc;font-size:13px;margin:5px 0 0;">Add, configure and manage team permissions</p>
                </div>
            </div>
            <div id="${uid}members" style="display:flex;flex-direction:column;gap:9px;margin-bottom:14px;"></div>
            <div style="padding:16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.2);border-radius:12px;margin-bottom:10px;">
                <div style="font-size:13px;font-weight:700;opacity:.8;margin-bottom:10px;">+ Invite New Member</div>
                <div style="display:grid;grid-template-columns:1fr 1fr auto;gap:9px;align-items:flex-end;">
                    <input id="${uid}name" type="text" placeholder="Full Name" style="padding:9px 12px;border-radius:9px;border:1px solid #6366f155;background:transparent;color:inherit;font-family:'Inter';outline:none;">
                    <select id="${uid}role" style="padding:9px 12px;border-radius:9px;border:1px solid #6366f155;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Vendor</option><option>Auditor</option><option>Inspector</option><option>Admin</option>
                    </select>
                    <button id="${uid}inv" style="padding:9px 18px;border-radius:9px;background:#6366f1;color:white;font-weight:700;border:none;cursor:pointer;font-family:'Inter';">Invite</button>
                </div>
            </div>`;
            },
            action: (uid) => {
                let members = [
                    {name:'Suvam (You)',role:'Admin',perms:'Full Access',av:'Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸â€™Â¼',col:'#6366f1'},
                    {name:'Rajan Kumar',role:'Vendor',perms:'Scan + View',av:'Ã°Å¸Â§â€˜Ã¢â‚¬ÂÃ°Å¸ÂÂ³',col:'#10b981'},
                    {name:'Priya S.',role:'Auditor',perms:'Read-Only Reports',av:'Ã°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€™Â»',col:'#f59e0b'},
                ];
                const pm={Admin:'Full Access',Vendor:'Scan + View',Auditor:'Read-Only Reports',Inspector:'Field Scan Only'};
                const cm={Admin:'#6366f1',Vendor:'#10b981',Auditor:'#f59e0b',Inspector:'#3b82f6'};
                const av={Admin:'Ã°Å¸Â§â€˜Ã¢â‚¬ÂÃ°Å¸â€™Â¼',Vendor:'Ã°Å¸â€˜Â¨Ã¢â‚¬ÂÃ°Å¸ÂÂ³',Auditor:'Ã°Å¸â€˜Â©Ã¢â‚¬ÂÃ°Å¸â€™Â¼',Inspector:'Ã°Å¸â€Â¬'};
                const render=()=>{const el=document.getElementById(uid+'members');if(!el)return;el.innerHTML=members.map((m,i)=>`<div style="display:flex;align-items:center;gap:11px;padding:11px 14px;background:${m.col}0d;border:1px solid ${m.col}22;border-radius:11px;"><div style="font-size:22px;">${m.av}</div><div style="flex:1;"><strong style="display:block;font-size:13px;">${m.name}</strong><span style="font-size:11px;opacity:.6;">${m.perms}</span></div><span style="background:${m.col}22;color:${m.col};padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">${m.role}</span>${i>0?`<button onclick="window['${uid}rm'](${i})" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:15px;padding:0 3px;">âœ•</button>`:''}</div>`).join('');};
                window[uid+'rm']=(i)=>{members.splice(i,1);render();};
                document.getElementById(uid+'inv')?.addEventListener('click',()=>{const name=document.getElementById(uid+'name')?.value?.trim();const role=document.getElementById(uid+'role')?.value||'Vendor';if(!name){return;}members.push({name,role,perms:pm[role],av:av[role]||'ðŸ‘¤',col:cm[role]||'#94a3b8'});document.getElementById(uid+'name').value='';render();});
                render();
            }
        },

        'Real-Time Detection Feed': {
            accent: '#ef4444',
            render: () => {
                const uid = 'rtd' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1504610926078-a1611febcad3?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#ef444422;color:#ef4444;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;display:flex;align-items:center;gap:5px;"><span style="width:6px;height:6px;border-radius:50%;background:#ef4444;display:inline-block;"></span>[Live] LIVE FEED</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Real-Time Detection Stream</h2>
                    <p style="color:#fca5a5;font-size:13px;margin:5px 0 0;">Auto-refreshing AI scan pipeline</p>
                </div>
            </div>
            <div style="display:flex;gap:9px;margin-bottom:14px;flex-wrap:wrap;align-items:center;">
                <label style="font-size:12px;opacity:.7;">ðŸš€ Speed:</label>
                <select id="${uid}spd" style="padding:8px 12px;border-radius:9px;border:1px solid #ef444455;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option value="3000">Slow (3s)</option><option value="1500" selected>Normal</option><option value="700">Fast</option>
                </select>
                <label style="font-size:12px;opacity:.7;">Ã°Å¸ÂÅ¸ Species:</label>
                <select id="${uid}spf" style="padding:8px 12px;border-radius:9px;border:1px solid #ef444455;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                    <option value="">All</option><option value="Salmon">Salmon</option><option value="Tuna">Tuna</option><option value="Mackerel">Mackerel</option>
                </select>
                <button id="${uid}tog" style="padding:8px 16px;border-radius:9px;background:#ef4444;color:white;font-weight:700;border:none;cursor:pointer;font-size:12px;">Ã¢ÂÂ¸ Pause</button>
                <span id="${uid}cnt" style="font-size:12px;opacity:.5;margin-left:auto;">0 detections</span>
            </div>
            <div id="${uid}feed" style="display:flex;flex-direction:column;gap:7px;max-height:240px;overflow-y:auto;"></div>`;
            },
            action: (uid) => {
                const allSp=['Atlantic Salmon','Yellowfin Tuna','Mackerel','Red Snapper','Pomfret','Cod','Hilsa','Rohu'];
                let running=true,count=0,interval;
                const addEntry=()=>{
                    const feed=document.getElementById(uid+'feed');
                    if(!feed||!document.getElementById('roadmap-modal')||document.getElementById('roadmap-modal').style.display==='none'){clearInterval(interval);return;}
                    const spf=document.getElementById(uid+'spf')?.value||'';
                    const pool=spf?allSp.filter(s=>s.includes(spf)):allSp;
                    const fish=pool[Math.floor(Math.random()*pool.length)];
                    const score=Math.floor(Math.random()*45+55);
                    const col=score>85?'#10b981':score>65?'#f59e0b':'#ef4444';
                    count++;const cEl=document.getElementById(uid+'cnt');if(cEl)cEl.textContent=count+' detections';
                    const time=new Date().toLocaleTimeString();
                    const div=document.createElement('div');
                    div.style.cssText=`display:flex;align-items:center;gap:11px;padding:10px 13px;background:${col}0d;border-left:3px solid ${col};border-radius:0 9px 9px 0;font-size:13px;`;
                    div.innerHTML=`<span style="width:7px;height:7px;border-radius:50%;background:${col};flex-shrink:0;"></span><span style="flex:1;font-weight:600">${fish}</span><span style="color:${col};font-weight:700;">${score}% Fresh</span><span style="opacity:.4;font-size:11px;min-width:70px;text-align:right;">${time}</span>`;
                    feed.insertBefore(div,feed.firstChild);if(feed.children.length>20)feed.removeChild(feed.lastChild);
                };
                const getSpd=()=>parseInt(document.getElementById(uid+'spd')?.value||1500);
                interval=setInterval(()=>{if(running)addEntry();},getSpd());
                document.getElementById(uid+'spd')?.addEventListener('change',()=>{clearInterval(interval);interval=setInterval(()=>{if(running)addEntry();},getSpd());});
                const tog=document.getElementById(uid+'tog');
                if(tog) tog.addEventListener('click',()=>{running=!running;tog.textContent=running?'Ã¢ÂÂ¸ Pause':'â–¶ Resume';tog.style.background=running?'#ef4444':'#10b981';});
                addEntry();
            }
        },

        'Export & Audits': {
            accent: '#14b8a6',
            render: () => {
                const uid = 'ea' + Date.now();
                window.__rfUid = uid;
                return `
            <div style="position:relative;border-radius:16px;overflow:hidden;margin-bottom:22px;height:150px;">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.35);">
                <div style="position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:center;">
                    <span style="background:#14b8a622;color:#14b8a6;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;width:fit-content;margin-bottom:8px;">[Export] EXPORT & AUDITS</span>
                    <h2 style="font-family:'Space Grotesk';font-size:24px;margin:0;color:#fff;">Compliance Report Builder</h2>
                    <p style="color:#99f6e4;font-size:13px;margin:5px 0 0;">Configure and generate compliance reports</p>
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">[Date] Date Range</label>
                    <select id="${uid}range" onchange="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #14b8a655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Last 24 Hours</option><option>Last 7 Days</option><option>This Month</option>
                    </select>
                </div>
                <div>
                    <label style="font-size:12px;opacity:.7;display:block;margin-bottom:5px;">[Target] Report Type</label>
                    <select id="${uid}type" onchange="window['${uid}upd']&&window['${uid}upd']()" style="width:100%;padding:9px 12px;border-radius:10px;border:1px solid #14b8a655;background:transparent;color:inherit;font-family:'Inter';cursor:pointer;">
                        <option>Full Quality Audit</option><option>Freshness Summary</option><option>Species Breakdown</option><option>Compliance Certificate</option>
                    </select>
                </div>
            </div>
            <div style="margin-bottom:16px;">
                <label style="font-size:12px;opacity:.7;display:block;margin-bottom:8px;">[Log] Include Sections:</label>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;">
                    ${['GPS Coordinates','AI Confidence Scores','Fish Thumbnails','Blockchain Hash','Pricing Data','Species Details'].map(f=>`<label style="display:flex;align-items:center;gap:7px;cursor:pointer;font-size:12px;"><input type="checkbox" checked style="accent-color:#14b8a6;"> ${f}</label>`).join('')}
                </div>
            </div>
            <div id="${uid}prev" style="margin-bottom:14px;"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">
                <button onclick="(()=>{const r=document.getElementById('${uid}range')?.value;const t=document.getElementById('${uid}type')?.value;alert('[Success] PDF Report generated!\\nType: '+t+'\\nRange: '+r+'\\nFile: EasyFishy_Report_'+Date.now()+'.pdf');})()" style="padding:12px;border-radius:10px;background:#ef444422;border:1px solid #ef444444;color:#ef4444;font-weight:700;cursor:pointer;font-size:13px;">[File] Download PDF</button>
                <button onclick="(()=>{const r=document.getElementById('${uid}range')?.value;alert('[Success] CSV Spreadsheet exported!\\nRange: '+r+'\\nFile: EasyFishy_Data_'+Date.now()+'.csv');})()" style="padding:12px;border-radius:10px;background:#10b98122;border:1px solid #10b98144;color:#10b981;font-weight:700;cursor:pointer;font-size:13px;">[Chart] Download CSV</button>
            </div>`;
            },
            action: (uid) => {
                const summaries={'Last 24 Hours':{scans:148,ga:62,gb:28,gc:10,rej:8},'Last 7 Days':{scans:1024,ga:58,gb:26,gc:11,rej:5},'This Month':{scans:4320,ga:55,gb:28,gc:12,rej:5}};
                window[uid+'upd']=()=>{
                    const range=document.getElementById(uid+'range')?.value||'Last 24 Hours';
                    const type=document.getElementById(uid+'type')?.value||'Full Quality Audit';
                    const d=summaries[range]||summaries['Last 24 Hours'];
                    const prev=document.getElementById(uid+'prev');
                    if(prev) prev.innerHTML=`<div style="padding:14px;background:rgba(20,184,166,0.08);border-radius:12px;border:1px solid rgba(20,184,166,0.25);"><div style="font-size:12px;font-weight:700;opacity:.7;margin-bottom:10px;">Ã°Å¸â€œÂ Preview: ${type} - ${range}</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:9px;">${[['Total Scans',d.scans,'#14b8a6'],['Grade A',d.ga+'%','#10b981'],['Grade B',d.gb+'%','#f59e0b'],['Rejected',d.rej+'%','#ef4444']].map(([l,v,c])=>`<div style="text-align:center;"><div style="font-size:17px;font-weight:800;color:${c}">${v}</div><div style="font-size:10px;opacity:.6;margin-top:2px">${l}</div></div>`).join('')}</div></div>`;
                };
                window[uid+'upd']();
                document.getElementById(uid+'range')?.addEventListener('change',()=>window[uid+'upd']&&window[uid+'upd']());
                document.getElementById(uid+'type')?.addEventListener('change',()=>window[uid+'upd']&&window[uid+'upd']());
            }
        }
    };


    // Wire up roadmap card clicks
    document.querySelectorAll('.roadmap-item').forEach(item => {
        const h4 = item.querySelector('h4');
        if (!h4) return;
        const key = h4.textContent.trim();
        if (!roadmapData[key]) return;
        item.style.cursor = 'pointer';
        item.title = 'Click to preview this feature';
        item.addEventListener('click', () => {
            const data = roadmapData[key];
            const html = data.render();
            // Pass action as onReady - uid is stored by render() in window.__rfUid
            openRoadmapModal(html, data.accent, () => {
                if (data.action && window.__rfUid) data.action(window.__rfUid);
            });
        });
    });


});


