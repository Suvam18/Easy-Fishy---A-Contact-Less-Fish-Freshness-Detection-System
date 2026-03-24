import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Insert global video
video_html = """
    <!-- Global Animated 4K Ocean Background -->
    <div class="global-video-bg">
        <video autoplay muted loop playsinline poster="underwater_4k.png">
            <source src="https://player.vimeo.com/external/370331493.hd.mp4?s=7b94b059345c26f743c7b74950f5d47e8c69d80d&profile_id=175" type="video/mp4">
        </video>
        <div class="global-video-overlay"></div>
    </div>
"""
if 'class="global-video-bg"' not in html:
    html = html.replace('<body data-theme="dark" style="">', '<body data-theme="dark">\n' + video_html).replace('<body data-theme="dark">', '<body data-theme="dark">\n' + video_html)

video_css = """
        .global-video-bg {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            z-index: -20;
            overflow: hidden;
            pointer-events: none;
        }
        .global-video-bg video {
            width: 100%; height: 100%; object-fit: cover;
            filter: brightness(0.85);
        }
        .global-video-overlay {
            position: absolute; inset: 0;
            background: rgba(10, 14, 39, 0.5); /* dark mode tint */
            transition: background 0.3s ease;
        }
        [data-theme="light"] .global-video-overlay {
            background: rgba(255, 255, 255, 0.3); /* light mode tint */
        }
"""
if '</style>' in html:
    html = html.replace('</style>', video_css + '\n    </style>')

# 2. Hero section transparency
html = html.replace('background: linear-gradient(135deg, #fffcf0 0%, #ffffff 100%);', 'background: linear-gradient(135deg, rgba(255,252,240,0.65) 0%, rgba(255,255,255,0.75) 100%);\n            backdrop-filter: blur(20px);\n            -webkit-backdrop-filter: blur(20px);')
html = html.replace('background: linear-gradient(135deg, #0a0e27 0%, #0f172a 60%, #1a1f3a 100%);', 'background: linear-gradient(135deg, rgba(10,14,39,0.75) 0%, rgba(15,23,42,0.8) 60%, rgba(26,31,58,0.85) 100%);')

# 3. Services section transparency
html = html.replace('background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);', 'background: linear-gradient(135deg, rgba(240,253,250,0.65) 0%, rgba(224,242,254,0.75) 100%);\n            backdrop-filter: blur(20px);\n            -webkit-backdrop-filter: blur(20px);')
html = html.replace('background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;', 'background: linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(30,41,59,0.8) 100%) !important;')

# 4. HIW section transparency (combining gradient + image)
old_hiw = '''        .hiw-section {
            background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);
            background-image: 
                linear-gradient(to right, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;'''
new_hiw = '''        .hiw-section {
            background-image: 
                linear-gradient(to right, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
                linear-gradient(135deg, rgba(240,253,250,0.65) 0%, rgba(204,251,241,0.7) 50%, rgba(153,246,228,0.75) 100%);
            background-size: 32px 32px, 32px 32px, 100% 100%;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);'''
html = html.replace(old_hiw, new_hiw)

old_hiw_dark = '''        [data-theme="dark"] .hiw-section {
            background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%) !important;
            background-image: 
                linear-gradient(to right, rgba(94, 234, 212, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(94, 234, 212, 0.06) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
        }'''
new_hiw_dark = '''        [data-theme="dark"] .hiw-section {
            background-image: 
                linear-gradient(to right, rgba(94, 234, 212, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(94, 234, 212, 0.06) 1px, transparent 1px),
                linear-gradient(135deg, rgba(4,47,46,0.75) 0%, rgba(19,78,74,0.8) 50%, rgba(15,118,110,0.85) 100%) !important;
            background-size: 32px 32px, 32px 32px, 100% 100% !important;
        }'''
html = html.replace(old_hiw_dark, new_hiw_dark)

# 5. Why section transparency
html = html.replace('background: linear-gradient(135deg, #ffffff 0%, #fffbf0 100%);', 'background: linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,251,240,0.75) 100%);\n            backdrop-filter: blur(20px);\n            -webkit-backdrop-filter: blur(20px);')
html = html.replace('background: linear-gradient(135deg, #0a0e27 0%, #0f172a 100%);', 'background: linear-gradient(135deg, rgba(10,14,39,0.75) 0%, rgba(15,23,42,0.8) 100%);')

# Explicitly ensure the footer remains opaque
footer_css = """
        footer {
            background: #0f172a;
            position: relative;
            z-index: 10;
        }
        [data-theme="light"] footer {
            background: #f8fafc;
        }
"""
if '</style>' in html:
    html = html.replace('</style>', footer_css + '\n    </style>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Injected global video and enabled section glassmorphism.")
