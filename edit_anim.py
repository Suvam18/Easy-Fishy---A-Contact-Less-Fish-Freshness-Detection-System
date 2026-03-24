import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Update backgrounds
html = html.replace(
    '        .services-section {\n            background: #f4fbf9;',
    '        .services-section {\n            background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);\n            overflow: hidden;'
)

html = html.replace(
    '        .hiw-section {\n            background: #ffffff;',
    '        .hiw-section {\n            background-color: #ffffff;\n            background-image: radial-gradient(circle at center, #cbd5e1 2px, transparent 2px);\n            background-size: 40px 40px;'
)

# Insert animation classes into the HIW cards
html = html.replace('<!-- Step 1 Info -->\n                <div class="hiw-card">', '<!-- Step 1 Info -->\n                <div class="hiw-card slide-left">')
html = html.replace('<!-- Step 2 Info (Highlight Box) -->\n                <div class="hiw-card highlighted">', '<!-- Step 2 Info (Highlight Box) -->\n                <div class="hiw-card highlighted slide-up">')
html = html.replace('<!-- Step 3 Info -->\n                <div class="hiw-card">', '<!-- Step 3 Info -->\n                <div class="hiw-card slide-right">')

css_additions = """
        /* Background Blobs for Services */
        .services-section::before {
            content: '';
            position: absolute;
            top: -50px; left: -100px;
            width: 400px; height: 400px;
            background: rgba(16, 185, 129, 0.15); /* Light green */
            border-radius: 50%;
            filter: blur(80px);
            z-index: 0;
            pointer-events: none;
        }
        .services-section::after {
            content: '';
            position: absolute;
            bottom: -50px; right: -100px;
            width: 500px; height: 500px;
            background: rgba(99, 102, 241, 0.15); /* Light blue */
            border-radius: 50%;
            filter: blur(100px);
            z-index: 0;
            pointer-events: none;
        }
        
        .services-section > * {
            position: relative;
            z-index: 2; /* keep content above blobs */
        }

        /* Animations for How it Works */
        .slide-left { opacity: 0; transform: translateX(-120px); transition: all 1s cubic-bezier(0.25, 1, 0.5, 1); }
        .slide-up { opacity: 0; transform: translateY(120px); transition: all 1s cubic-bezier(0.25, 1, 0.5, 1) 0.3s; }
        .slide-right { opacity: 0; transform: translateX(120px); transition: all 1s cubic-bezier(0.25, 1, 0.5, 1) 0.6s; }
        
        .hiw-grid.in-view .slide-left,
        .hiw-grid.in-view .slide-up,
        .hiw-grid.in-view .slide-right {
            opacity: 1;
            transform: translate(0, 0);
        }
        
        /* Dark Theme Backgrounds */
        [data-theme="dark"] .services-section {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
        }
        
        [data-theme="dark"] .hiw-section {
            background-color: #0b1121 !important;
            background-image: radial-gradient(circle at center, #1e293b 2px, transparent 2px) !important;
        }
        
        [data-theme="dark"] .services-section::before {
            background: rgba(16, 185, 129, 0.05);
        }
        [data-theme="dark"] .services-section::after {
            background: rgba(99, 102, 241, 0.05);
        }
"""
if '</style>' in html:
    html = html.replace('</style>', css_additions + '\n    </style>')

js_additions = """
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        
        const grid = document.querySelector('.hiw-grid');
        if (grid) observer.observe(grid);
    });
</script>
"""
if '</body>' in html:
    html = html.replace('</body>', js_additions + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Animated successfully!")
