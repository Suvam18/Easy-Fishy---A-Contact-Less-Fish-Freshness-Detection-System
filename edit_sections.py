with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

css_additions = """
        /* ===== PRICING SECTION ===== */
        .pricing-section {
            background: linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%);
            padding: 120px 5%;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        [data-theme="dark"] .pricing-section {
            background: linear-gradient(135deg, #0f172a 0%, #042f2e 100%);
        }
        .pricing-section::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
                linear-gradient(to right, rgba(16,185,129,0.07) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16,185,129,0.07) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none; z-index: 0;
        }
        .pricing-section > * { position: relative; z-index: 1; }
        .pricing-label {
            font-size: 13px; font-weight: 700; letter-spacing: 1.5px;
            text-transform: uppercase; color: #10b981; margin-bottom: 14px;
        }
        .pricing-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 42px; font-weight: 800; color: #0f172a; margin-bottom: 14px;
        }
        [data-theme="dark"] .pricing-title { color: #f1f5f9; }
        .pricing-subtitle {
            font-size: 16px; color: #64748b; margin-bottom: 60px;
        }
        [data-theme="dark"] .pricing-subtitle { color: #94a3b8; }
        .pricing-grid {
            display: grid; grid-template-columns: repeat(2, 1fr);
            gap: 30px; max-width: 900px; margin: 0 auto;
        }
        .pricing-card {
            background: #ffffff; border: 1px solid #e2e8f0;
            border-radius: 24px; padding: 40px 36px; text-align: left;
            position: relative;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .pricing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 60px rgba(0,0,0,0.1);
            border-color: #10b981;
        }
        [data-theme="dark"] .pricing-card {
            background: #1e293b; border-color: #334155;
        }
        [data-theme="dark"] .pricing-card:hover { border-color: #10b981; }
        .pricing-card.popular {
            border: 2px solid #10b981;
            box-shadow: 0 8px 30px rgba(16,185,129,0.15);
        }
        .popular-badge {
            position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
            background: #10b981; color: #fff; font-size: 11px; font-weight: 700;
            letter-spacing: 1px; text-transform: uppercase;
            padding: 5px 18px; border-radius: 50px;
        }
        .plan-name { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        [data-theme="dark"] .plan-name { color: #f1f5f9; }
        .plan-price { font-size: 52px; font-weight: 800; color: #0f172a; line-height: 1; margin-bottom: 6px; }
        [data-theme="dark"] .plan-price { color: #f1f5f9; }
        .plan-price span { font-size: 16px; font-weight: 400; color: #64748b; }
        .plan-desc { font-size: 14px; color: #64748b; margin-bottom: 28px; }
        .plan-features { list-style: none; padding: 0; margin: 0 0 32px; display: flex; flex-direction: column; gap: 12px; }
        .plan-features li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #374151; }
        [data-theme="dark"] .plan-features li { color: #cbd5e1; }
        .plan-features li .check { color: #10b981; font-size: 18px; }
        .plan-features li.disabled { color: #9ca3af; }
        .plan-features li.disabled .check { color: #d1d5db; }
        .plan-btn {
            display: block; width: 100%; padding: 14px; border-radius: 50px;
            font-size: 15px; font-weight: 700; text-align: center; cursor: pointer;
            border: 2px solid #10b981; color: #10b981; background: transparent;
            transition: all 0.3s ease; text-decoration: none;
        }
        .plan-btn:hover { background: #10b981; color: #fff; }
        .plan-btn.solid { background: #10b981; color: #fff; }
        .plan-btn.solid:hover { background: #059669; border-color: #059669; }
        @media (max-width: 700px) { .pricing-grid { grid-template-columns: 1fr; } }

        /* ===== FAQ SECTION ===== */
        .faq-section {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            padding: 120px 5%;
            position: relative; overflow: hidden;
        }
        [data-theme="dark"] .faq-section {
            background: linear-gradient(135deg, #0b1121 0%, #0f172a 100%);
        }
        .faq-section::before {
            content: ''; position: absolute; inset: 0;
            background-image: radial-gradient(circle, rgba(99,102,241,0.06) 2px, transparent 2px);
            background-size: 50px 50px; pointer-events: none; z-index: 0;
        }
        .faq-header { text-align: center; margin-bottom: 60px; position: relative; z-index: 1; }
        .faq-label {
            font-size: 13px; font-weight: 700; letter-spacing: 1.5px;
            text-transform: uppercase; color: #6366f1; margin-bottom: 14px;
        }
        .faq-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 42px; font-weight: 800; color: #0f172a; margin-bottom: 14px;
        }
        [data-theme="dark"] .faq-title { color: #f1f5f9; }
        .faq-subtitle { font-size: 16px; color: #64748b; }
        [data-theme="dark"] .faq-subtitle { color: #94a3b8; }
        .faq-grid {
            display: grid; grid-template-columns: repeat(2, 1fr);
            gap: 24px; max-width: 1100px; margin: 0 auto;
            position: relative; z-index: 1;
        }
        .faq-card {
            background: #ffffff; border: 1px solid #e2e8f0;
            border-radius: 20px; padding: 32px;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        }
        .faq-card:hover {
            border-color: #6366f1;
            box-shadow: 0 20px 40px rgba(99,102,241,0.1);
            transform: translateY(-5px);
        }
        [data-theme="dark"] .faq-card { background: #1e293b; border-color: #334155; }
        [data-theme="dark"] .faq-card:hover { border-color: #818cf8; }
        .faq-card.highlighted {
            border-color: #6366f1;
            box-shadow: 0 8px 30px rgba(99,102,241,0.12);
        }
        .faq-q { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        [data-theme="dark"] .faq-q { color: #f1f5f9; }
        .faq-a { font-size: 14px; color: #64748b; line-height: 1.6; margin: 0; }
        [data-theme="dark"] .faq-a { color: #cbd5e1; }
        @media (max-width: 700px) { .faq-grid { grid-template-columns: 1fr; } }

        /* ===== NUMBERS SECTION ===== */
        .numbers-section {
            background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
            padding: 120px 5%; text-align: center;
            position: relative; overflow: hidden;
        }
        [data-theme="dark"] .numbers-section {
            background: linear-gradient(135deg, #0f172a 0%, #042f2e 100%);
        }
        .numbers-section::before {
            content: ''; position: absolute; inset: 0;
            background-image:
                linear-gradient(to right, rgba(16,185,129,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16,185,129,0.06) 1px, transparent 1px);
            background-size: 44px 44px; pointer-events: none; z-index: 0;
        }
        .numbers-section > * { position: relative; z-index: 1; }
        .numbers-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 42px; font-weight: 800; color: #0f172a; margin-bottom: 14px;
        }
        [data-theme="dark"] .numbers-title { color: #f1f5f9; }
        .numbers-subtitle { font-size: 16px; color: #64748b; margin-bottom: 70px; max-width: 600px; margin-left: auto; margin-right: auto; }
        [data-theme="dark"] .numbers-subtitle { color: #94a3b8; }
        .numbers-grid {
            display: grid; grid-template-columns: repeat(3, 1fr);
            gap: 30px; max-width: 1000px; margin: 0 auto;
        }
        .number-item { padding: 20px; }
        .number-value {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 68px; font-weight: 800;
            color: #10b981; line-height: 1; margin-bottom: 12px;
            display: block;
        }
        .number-label {
            font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px;
        }
        [data-theme="dark"] .number-label { color: #f1f5f9; }
        .number-desc { font-size: 14px; color: #64748b; line-height: 1.5; }
        [data-theme="dark"] .number-desc { color: #94a3b8; }
        @media (max-width: 700px) { .numbers-grid { grid-template-columns: 1fr; } .number-value { font-size: 52px; } }
"""

html_part = """
        <!-- Pricing Section -->
        <section class="pricing-section" id="pricing">
            <div class="pricing-label">SIMPLE PRICING</div>
            <h2 class="pricing-title">Simple, Transparent Pricing</h2>
            <p class="pricing-subtitle">Choose the plan that best fits your freshness detection needs.</p>
            <div class="pricing-grid">
                <!-- Basic Plan -->
                <div class="pricing-card anim-left">
                    <div class="plan-name">Basic</div>
                    <div class="plan-price">Free<span>/forever</span></div>
                    <p class="plan-desc">Essential tools for independent fish vendors.</p>
                    <ul class="plan-features">
                        <li><i class="material-icons check">check_circle</i> 10 freshness scans/month</li>
                        <li><i class="material-icons check">check_circle</i> Basic species recognition</li>
                        <li><i class="material-icons check">check_circle</i> PDF quality reports</li>
                        <li class="disabled"><i class="material-icons check">radio_button_unchecked</i> Cloud analytics dashboard</li>
                        <li class="disabled"><i class="material-icons check">radio_button_unchecked</i> Priority AI processing</li>
                    </ul>
                    <a href="signin.html" class="plan-btn">Get Started</a>
                </div>
                <!-- Premium Plan -->
                <div class="pricing-card popular anim-right">
                    <div class="popular-badge">MOST POPULAR</div>
                    <div class="plan-name">Professional</div>
                    <div class="plan-price">₹499<span>/month</span></div>
                    <p class="plan-desc">Complete freshness management for your business.</p>
                    <ul class="plan-features">
                        <li><i class="material-icons check">check_circle</i> <strong>Everything in Basic, plus:</strong></li>
                        <li><i class="material-icons check">check_circle</i> Unlimited freshness scans</li>
                        <li><i class="material-icons check">check_circle</i> Advanced species recognition (50+ types)</li>
                        <li><i class="material-icons check">check_circle</i> Cloud analytics dashboard</li>
                        <li><i class="material-icons check">check_circle</i> Priority AI processing &amp; alerts</li>
                    </ul>
                    <a href="signin.html" class="plan-btn solid">Upgrade to Pro</a>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section" id="faq">
            <div class="faq-header">
                <div class="faq-label">GOT QUESTIONS?</div>
                <h2 class="faq-title">Frequently Asked Questions</h2>
                <p class="faq-subtitle">Common questions about using Easy Fishy for your seafood business.</p>
            </div>
            <div class="faq-grid">
                <div class="faq-card anim-left">
                    <div class="faq-q">How accurate is Easy Fishy's AI?</div>
                    <p class="faq-a">Our deep learning model achieves 98.5% accuracy on over 50 fish species, trained on a dataset of 100,000+ labeled images from professional seafood inspectors.</p>
                </div>
                <div class="faq-card highlighted anim-right">
                    <div class="faq-q">Can I use Easy Fishy offline?</div>
                    <p class="faq-a">Yes! Our lightweight on-device model allows up to 10 scans offline without internet. Results sync automatically when you reconnect.</p>
                </div>
                <div class="faq-card anim-left">
                    <div class="faq-q">How does the grading system work?</div>
                    <p class="faq-a">Easy Fishy assigns a Grade A–E based on eye clarity, gill color, skin texture & odor indicators, alongside an estimated remaining shelf-life in hours.</p>
                </div>
                <div class="faq-card anim-right">
                    <div class="faq-q">Is my scan data private?</div>
                    <p class="faq-a">Absolutely. Scan data is encrypted end-to-end. We never share your business data with third parties. You retain full ownership of all your scans.</p>
                </div>
            </div>
        </section>

        <!-- Numbers Tell Our Story Section -->
        <section class="numbers-section" id="numbers">
            <h2 class="numbers-title">Numbers tell our story</h2>
            <p class="numbers-subtitle">A snapshot of the markets we help stay safe, profitable, and confident every single day.</p>
            <div class="numbers-grid">
                <div class="number-item anim-left">
                    <span class="number-value">10K+</span>
                    <div class="number-label">Fish Scanned</div>
                    <p class="number-desc">Freshness verified and inspection results delivered in real time.</p>
                </div>
                <div class="number-item anim-up">
                    <span class="number-value">98.5%</span>
                    <div class="number-label">Model Accuracy</div>
                    <p class="number-desc">Industry-leading detection accuracy across 50+ species verified in testing.</p>
                </div>
                <div class="number-item anim-right">
                    <span class="number-value">500+</span>
                    <div class="number-label">Markets Served</div>
                    <p class="number-desc">Fish vendors and markets trusting Easy Fishy for quality assurance.</p>
                </div>
            </div>
        </section>
"""

if '</style>' in html:
    html = html.replace('</style>', css_additions + '\n    </style>')

if '<!-- Animated Footer -->' in html:
    html = html.replace('        <!-- Animated Footer -->', html_part + '\n        <!-- Animated Footer -->')

# Wire up intersection observer for new sections
js_add = """
        const pricingGrid = document.querySelector('.pricing-grid');
        if (pricingGrid) observer.observe(pricingGrid);
        const faqGrid = document.querySelector('.faq-grid');
        if (faqGrid) observer.observe(faqGrid);
        const numbersGrid = document.querySelector('.numbers-grid');
        if (numbersGrid) observer.observe(numbersGrid);
"""
# Also update in-view triggers for new grids
html = html.replace(
    "const grid = document.querySelector('.hiw-grid');",
    js_add + "\n        const grid = document.querySelector('.hiw-grid');"
)
html = html.replace(
    "entry.target.classList.add('in-view');",
    "entry.target.classList.add('in-view');"
)

# Add in-view triggers for the new grids
html = html.replace(
    ".hiw-grid.in-view .slide-left,\n        .hiw-grid.in-view .slide-up,\n        .hiw-grid.in-view .slide-right {",
    """.hiw-grid.in-view .slide-left,
        .hiw-grid.in-view .slide-up,
        .hiw-grid.in-view .slide-right,
        .pricing-grid.in-view .anim-left,
        .pricing-grid.in-view .anim-right,
        .faq-grid.in-view .anim-left,
        .faq-grid.in-view .anim-right,
        .numbers-grid.in-view .anim-left,
        .numbers-grid.in-view .anim-up,
        .numbers-grid.in-view .anim-right {"""
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Injected Pricing, FAQ, and Numbers sections!')
