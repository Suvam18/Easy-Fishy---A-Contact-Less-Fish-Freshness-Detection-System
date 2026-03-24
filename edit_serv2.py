import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Texture background for services section
html = html.replace(
    '<section class="services-section">',
    '<section class="services-section">\n            <div class="services-texture"></div>'
)

# 2. Fix hover transform to top for service cards
html = html.replace(
    'transform: translateY(-5px);',
    'top: -5px;'
)
html = html.replace(
    'transition: transform 0.3s ease, box-shadow 0.3s ease;',
    'transition: top 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;\n            position: relative;\n            top: 0;'
)

# 3. Add animation classes to cards
cards = html.split('<div class="service-card">')
if len(cards) == 7:
    html = cards[0] + '<div class="service-card anim-left">' + cards[1] + \
           '<div class="service-card anim-down delay-1">' + cards[2] + \
           '<div class="service-card anim-right">' + cards[3] + \
           '<div class="service-card anim-left delay-2">' + cards[4] + \
           '<div class="service-card anim-up delay-2">' + cards[5] + \
           '<div class="service-card anim-right delay-2">' + cards[6]
else:
    print("WARNING: Not 6 cards found in services section.")

# 4. Inject CSS
css_additions = """
        .services-texture {
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(to right, rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
            z-index: 1;
            mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
            -webkit-mask-image: radial-gradient(ellipse at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
        }
        
        [data-theme="dark"] .services-texture {
            background-image: 
                linear-gradient(to right, rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
        }

        .anim-left { opacity: 0; }
        .anim-right { opacity: 0; }
        .anim-up { opacity: 0; }
        .anim-down { opacity: 0; }

        .services-grid.in-view .anim-left { animation: slideInLeft 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .services-grid.in-view .anim-right { animation: slideInRight 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .services-grid.in-view .anim-up { animation: slideInUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .services-grid.in-view .anim-down { animation: slideInDown 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        .delay-1 { animation-delay: 0.2s !important; }
        .delay-2 { animation-delay: 0.4s !important; }

        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-80px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(80px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInUp {
            from { opacity: 0; transform: translateY(80px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-80px); }
            to { opacity: 1; transform: translateY(0); }
        }
"""
if '</style>' in html:
    html = html.replace('</style>', css_additions + '\n    </style>')

# 5. Observe services grid
js_add = """
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) observer.observe(servicesGrid);
"""
html = html.replace("const grid = document.querySelector('.hiw-grid');", js_add + "\n        const grid = document.querySelector('.hiw-grid');")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated Our Services animations and textures!")
