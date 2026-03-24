import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

css_part = """
        /* How It Works Section */
        .hiw-section {
            background: #ffffff;
            padding: 100px 20px;
            text-align: center;
            color: #1a202c;
            position: relative;
            z-index: 10;
            border-top: 1px solid #f1f5f9;
        }

        [data-theme="dark"] .hiw-section {
            background: #0f172a;
            border-top: 1px solid #1e293b;
            color: #f1f5f9;
        }

        .hiw-subtitle {
            font-size: 13px;
            font-weight: 700;
            color: #10b981;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 16px;
        }

        .hiw-title {
            font-family: 'Inter', sans-serif;
            font-size: 42px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
        }
        
        [data-theme="dark"] .hiw-title { color: #f1f5f9; }

        .hiw-desc {
            font-size: 16px;
            color: #4a5568;
            max-width: 600px;
            margin: 0 auto 60px auto;
            line-height: 1.6;
        }
        
        [data-theme="dark"] .hiw-desc { color: #cbd5e1; }

        /* Stepper Visuals */
        .hiw-stepper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
            gap: 15px;
        }

        .step-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            box-shadow: 0 4px 15px rgba(0,0,0,0.02);
            position: relative;
            z-index: 2;
        }
        
        [data-theme="dark"] .step-circle {
            background: #1e293b;
            border-color: #334155;
            color: #f1f5f9;
        }

        .step-arrow {
            width: 120px;
            height: 40px;
            position: relative;
            margin-top: -30px; /* Curve goes up */
        }
        
        .step-arrow svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }

        .step-arrow path {
            stroke: #cbd5e1;
        }
        
        [data-theme="dark"] .step-arrow path {
            stroke: #475569;
        }

        /* 3-Column Content Layout */
        .hiw-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1100px;
            margin: 0 auto;
        }

        .hiw-card {
            padding: 40px 30px;
            border-radius: 20px;
            text-align: center;
        }
        
        .hiw-card.highlighted {
            background: #f4fbf9; /* Light green tint from screenshot */
        }
        
        [data-theme="dark"] .hiw-card.highlighted {
            background: rgba(16, 185, 129, 0.05); /* Dark theme matching */
        }

        .hiw-card h3 {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 16px;
        }
        
        [data-theme="dark"] .hiw-card h3 { color: #f1f5f9; }

        .hiw-card p {
            font-size: 15px;
            color: #4a5568;
            line-height: 1.6;
            margin: 0;
        }
        
        [data-theme="dark"] .hiw-card p { color: #94a3b8; }
        
        @media (max-width: 900px) {
            .hiw-grid { grid-template-columns: 1fr; gap: 20px; }
            .hiw-stepper { display: none; } /* Hide complicated stepper on small screen */
            .hiw-card { padding: 30px 20px; }
            .hiw-title { font-size: 32px; }
        }
"""

html_part = """
        <!-- How It Works Section -->
        <section class="hiw-section">
            <div class="hiw-subtitle">HERE'S HOW IT WORKS</div>
            <h2 class="hiw-title">How does Easy Fishy work?</h2>
            <p class="hiw-desc">Get started in just 3 simple steps &mdash; from capturing the fish image to instantly receiving a highly accurate freshness grade.</p>

            <!-- Desktop Visual Stepper -->
            <div class="hiw-stepper">
                <div class="step-circle">1</div>
                <div class="step-arrow">
                    <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                        <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <div class="step-circle">2</div>
                <div class="step-arrow">
                    <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                        <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <div class="step-circle">3</div>
            </div>

            <!-- Content Grid -->
            <div class="hiw-grid">
                <!-- Step 1 Info -->
                <div class="hiw-card">
                    <h3>Upload Fish Image</h3>
                    <p>Simply take a high-quality photo of the whole fish or upload an existing image directly into our secure platform.</p>
                </div>
                <!-- Step 2 Info (Highlight Box) -->
                <div class="hiw-card highlighted">
                    <h3>Analyze with AI</h3>
                    <p>Our deep learning models instantly analyze the fish features to compute a verified freshness and quality grade.</p>
                </div>
                <!-- Step 3 Info -->
                <div class="hiw-card">
                    <h3>View Quality Report</h3>
                    <p>Instantly receive your comprehensive freshness report, species identification, and a recommended market price.</p>
                </div>
            </div>
        </section>
"""

if '</style>' in content:
    content = content.replace('</style>', css_part + '\n    </style>')

parts = content.split('</section>\n')
if len(parts) >= 3:
    content = parts[0] + '</section>\n' + parts[1] + '</section>\n' + html_part + '</section>\n'.join(parts[2:])
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully injected How It Works section.")
else:
    print("Failed finding tags. Using fallback.")
    content = content.replace('<!-- Animated Footer -->', html_part + '\n\n        <!-- Animated Footer -->')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
