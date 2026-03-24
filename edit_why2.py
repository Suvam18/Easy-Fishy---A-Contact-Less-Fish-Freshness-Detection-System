import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Background for Why Section
old_why_bg = '''        /* Why Easy Fishy Section */
        .why-section {
            background: #f8fafc;
            padding: 100px 5%;
            overflow: hidden;
            position: relative;
        }
        
        [data-theme="dark"] .why-section {
            background: #0f172a;
        }'''

new_why_bg = '''        /* Why Easy Fishy Section */
        .why-section {
            background: linear-gradient(135deg, #ffffff 0%, #fffbf0 100%);
            padding: 100px 5%;
            overflow: hidden;
            position: relative;
        }
        
        .why-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.1) 1px, transparent 1px);
            background-size: 32px 32px;
            pointer-events: none;
            z-index: 0;
            mask-image: radial-gradient(ellipse at 70% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%);
            -webkit-mask-image: radial-gradient(ellipse at 70% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%);
        }
        
        [data-theme="dark"] .why-section {
            background: linear-gradient(135deg, #0a0e27 0%, #0f172a 100%);
        }
        [data-theme="dark"] .why-section::before {
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.05) 1px, transparent 1px);
        }'''
html = html.replace(old_why_bg, new_why_bg)

# Make sure why-container is z-index 1
html = html.replace('''        .why-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 60px;
        }''', '''        .why-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            gap: 60px;
            position: relative;
            z-index: 1;
        }''')

# 2. Update list hovers
old_li_css = '''        .why-list li {
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
        }'''

new_li_css = '''        .why-list li {
            display: flex;
            gap: 20px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            border: 1px solid rgba(255,255,255,0.5);
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            position: relative;
        }

        .why-list li:hover {
            transform: scale(1.02) translateX(8px);
            box-shadow: 0 20px 40px rgba(250, 204, 21, 0.15);
            border-color: rgba(250, 204, 21, 0.4);
            background: #ffffff;
        }
        
        [data-theme="dark"] .why-list li {
            background: rgba(30, 41, 59, 0.5);
            border: 1px solid rgba(255,255,255,0.05);
        }
        
        [data-theme="dark"] .why-list li:hover {
            background: rgba(30, 41, 59, 0.9);
            box-shadow: 0 20px 40px rgba(250, 204, 21, 0.08);
            border-color: rgba(234, 179, 8, 0.3);
        }'''
html = html.replace(old_li_css, new_li_css)

# Update icon hover inside the list hover
html = html.replace(
    '        .why-icon {',
    '        .why-list li:hover .why-icon {\n            background: #facc15;\n            color: #ffffff;\n            transform: scale(1.1);\n        }\n\n        .why-icon {\n            transition: all 0.3s ease;'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated why section background and hovers.")
