import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

css_additions = """
        /* Why Easy Fishy Section */
        .why-section {
            background: #f8fafc;
            padding: 100px 5%;
            overflow: hidden;
            position: relative;
        }
        
        [data-theme="dark"] .why-section {
            background: #0f172a;
        }
        
        .why-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 60px;
        }

        .why-text-content {
            flex: 1;
        }

        .why-subtitle {
            font-size: 13px;
            font-weight: 700;
            color: #6366f1;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }

        .why-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 42px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
            line-height: 1.2;
        }
        
        [data-theme="dark"] .why-title { color: #f1f5f9; }

        .why-desc {
            font-size: 16px;
            color: #475569;
            line-height: 1.6;
            margin-bottom: 40px;
        }
        
        [data-theme="dark"] .why-desc { color: #94a3b8; }

        .why-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .why-list li {
            display: flex;
            gap: 20px;
            background: #ffffff;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.02);
            transition: transform 0.3s ease;
        }

        .why-list li:hover {
            transform: translateX(10px);
        }
        
        [data-theme="dark"] .why-list li {
            background: rgba(30, 41, 59, 0.4);
            border: 1px solid rgba(255,255,255,0.05);
        }

        .why-icon {
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: rgba(99, 102, 241, 0.1);
            color: #6366f1;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        [data-theme="dark"] .why-icon { background: rgba(165, 180, 252, 0.1); color: #a5b4fc; }

        .why-item-text h4 {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 8px;
        }
        
        [data-theme="dark"] .why-item-text h4 { color: #f1f5f9; }

        .why-item-text p {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
            margin: 0;
        }
        
        [data-theme="dark"] .why-item-text p { color: #cbd5e1; }

        .why-image-content {
            flex: 1;
            position: relative;
        }

        .why-image-wrapper {
            border-radius: 24px;
            overflow: visible; /* to allow badge to float outside */
            position: relative;
        }

        .why-image-wrapper img {
            width: 100%;
            border-radius: 24px;
            height: auto;
            display: block;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .why-floating-badge {
            position: absolute;
            bottom: -20px;
            left: -20px;
            background: #ffffff;
            padding: 16px 24px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            color: #0f172a;
            z-index: 5;
            animation: floatY 4s ease-in-out infinite;
        }
        
        [data-theme="dark"] .why-floating-badge {
            background: #1e293b;
            color: #f1f5f9;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .why-section.in-view .slide-left,
        .why-section.in-view .slide-right {
            opacity: 1;
            transform: translate(0, 0);
        }
        
        @media (max-width: 900px) {
            .why-container { flex-direction: column; gap: 40px; }
            .why-image-content { width: 100%; margin-top: 20px; }
            .why-floating-badge { bottom: 20px; left: 20px; }
        }
"""

html_part = """
        <!-- Why Easy Fishy Section -->
        <section class="why-section" id="why-easy-fishy">
            <div class="why-container">
                <div class="why-text-content slide-left">
                    <div class="why-subtitle">THE EASY FISHY ADVANTAGE</div>
                    <h2 class="why-title">Why choose Easy Fishy?</h2>
                    <p class="why-desc">Traditional seafood inspection relies heavily on subjective human judgment, which is prone to error and inconsistencies. Easy Fishy replaces guesswork with verified, deterministic deep learning.</p>
                    
                    <ul class="why-list">
                        <li>
                            <div class="why-icon"><i class="material-icons">speed</i></div>
                            <div class="why-item-text">
                                <h4>Laser-Fast Assessment</h4>
                                <p>Cut inspection times down from minutes to mere seconds. Scan an entire crate in real time.</p>
                            </div>
                        </li>
                        <li>
                            <div class="why-icon"><i class="material-icons">health_and_safety</i></div>
                            <div class="why-item-text">
                                <h4>Eliminate Health Risks</h4>
                                <p>Our 98.5% accurate AI detects early signs of spoilage invisible to the naked eye, safeguarding your customers.</p>
                            </div>
                        </li>
                        <li>
                            <div class="why-icon"><i class="material-icons">trending_up</i></div>
                            <div class="why-item-text">
                                <h4>Maximize Market Value</h4>
                                <p>Generate digital freshness certificates to justify premium pricing and rapidly build buyer trust.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="why-image-content slide-right">
                    <div class="why-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800" alt="Fresh Seafood Market">
                        <div class="why-floating-badge">
                            <i class="material-icons" style="color:#facc15;">star</i>
                            <span>Trusted by 500+ Markets</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
"""

# Append CSS just before </style>
if '</style>' in html:
    html = html.replace('</style>', css_additions + '\n    </style>')

# Insert HTML right before the footer
if '<!-- Animated Footer -->' in html:
    html = html.replace('        <!-- Animated Footer -->', html_part + '\n        <!-- Animated Footer -->')

# Update intersection observer to also observe .why-section
observer_update = """
        const why = document.querySelector('.why-section');
        if (why) observer.observe(why);
"""
if 'const grid = document.querySelector' in html:
    html = html.replace("const grid = document.querySelector('.hiw-grid');\n        if (grid) observer.observe(grid);", 
                        "const grid = document.querySelector('.hiw-grid');\n        if (grid) observer.observe(grid);\n" + observer_update)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Added Why Easy Fishy section!')
