import sys

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

css_part = """    <style>
        /* Modern Services Section */
        .services-section {
            background: #f4fbf9;
            padding: 80px 20px;
            text-align: center;
            color: #1a202c;
            position: relative;
            z-index: 10;
        }

        [data-theme="dark"] .services-section {
            background: #0f172a;
            color: #f1f5f9;
        }

        .services-subtitle {
            font-size: 14px;
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 20px;
        }
        
        [data-theme="dark"] .services-subtitle { color: #94a3b8; }

        .services-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 42px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
        }
        
        [data-theme="dark"] .services-title { color: #f1f5f9; }

        .services-desc {
            font-size: 16px;
            color: #475569;
            max-width: 680px;
            margin: 0 auto 60px auto;
            line-height: 1.6;
        }
        
        [data-theme="dark"] .services-desc { color: #cbd5e1; }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .service-card {
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            text-align: left;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        [data-theme="dark"] .service-card {
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255,255,255,0.05);
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        [data-theme="dark"] .service-card:hover {
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .service-img-wrapper {
            width: 100%;
            height: 220px;
            overflow: hidden;
        }

        .service-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .service-card:hover img {
            transform: scale(1.05);
        }

        .service-content {
            padding: 30px 24px;
        }

        .service-content h3 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 20px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 12px;
        }
        
        [data-theme="dark"] .service-content h3 { color: #f1f5f9; }

        .service-content p {
            font-size: 15px;
            color: #4a5568;
            line-height: 1.6;
        }
        
        [data-theme="dark"] .service-content p { color: #94a3b8; }

        @media (max-width: 1024px) {
            .services-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 700px) {
            .services-grid {
                grid-template-columns: 1fr;
            }
            .services-title { font-size: 32px; }
        }
    </style>
"""

html_part = """        <!-- Modern Services Section -->
        <section class="services-section">
            <div class="services-subtitle">Why Easy Fishy?</div>
            <h2 class="services-title">Our Services</h2>
            <p class="services-desc">Easy Fishy offers a range of intelligent services to make managing your seafood quality simple, rapid, and verifiable:</p>

            <div class="services-grid">
                <!-- Card 1 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="fish_scanning_hd.png" alt="Freshness Detection">
                    </div>
                    <div class="service-content">
                        <h3>Instant Freshness Detection</h3>
                        <p>Analyze fish freshness in under 3 seconds using our verified deep learning AI scanner from any smart device.</p>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&q=80&w=600" alt="Species Recognition">
                    </div>
                    <div class="service-content">
                        <h3>Species Recognition</h3>
                        <p>Automatically identify over 50+ commercial fish species with 98.5% industry-leading accuracy on markets globally.</p>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="goldfish_4k.png" alt="Quality Reports">
                    </div>
                    <div class="service-content">
                        <h3>Detailed Quality Reports</h3>
                        <p>Generate downloadable, verifiable health and freshness certificates for your market stalls and customers.</p>
                    </div>
                </div>
                <!-- Card 4 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="underwater_4k.png" alt="Market Pricing">
                    </div>
                    <div class="service-content">
                        <h3>Dynamic Market Pricing</h3>
                        <p>Get AI-suggested selling prices in real-time based on the calculated freshness grade and current market trends.</p>
                    </div>
                </div>
                <!-- Card 5 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800" alt="Cloud Sync">
                    </div>
                    <div class="service-content">
                        <h3>Cloud Analytics Dashboard</h3>
                        <p>Collaborate with your supply chain by sharing real-time freshness scans, historic data, and supply alerts.</p>
                    </div>
                </div>
                <!-- Card 6 -->
                <div class="service-card">
                    <div class="service-img-wrapper">
                        <img src="underwater_hazy_hd.png" alt="Edge Deployment">
                    </div>
                    <div class="service-content">
                        <h3>Offline Edge Deployment</h3>
                        <p>Continue scanning without internet access using our lightweight, on-device mobile model designed for extreme conditions.</p>
                    </div>
                </div>
            </div>
        </section>
"""

# Insert CSS right before </head>
for i, line in enumerate(lines):
    if '</head>' in line:
        lines.insert(i, css_part)
        break

# Now replace lines 121-398 from original (so we need to find them)
# To be safe, let's find indices based on comments
start_idx = -1
end_idx = -1
for i, line in enumerate(lines):
    if '<!-- Main Content -->' in line:
        start_idx = i
    if '<!-- Animated Footer -->' in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    new_lines = lines[:start_idx] + [html_part] + lines[end_idx:]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print("Successfully replaced main content section and injected CSS.")
else:
    print(f"Could not find boundaries. start_idx: {start_idx}, end_idx: {end_idx}")

