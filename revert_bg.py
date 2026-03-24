import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Strip out video HTML
html = re.sub(r'<!-- Global Animated 4K Ocean Background -->.*?</div>\s*</div>', '', html, flags=re.DOTALL)

# Strip out video CSS
html = re.sub(r'\.global-video-bg \{.*?\/\* light mode tint \*\/\n        \}', '', html, flags=re.DOTALL)
html = re.sub(r'\/\* Common glass properties \*\/.*?\}', '', html, flags=re.DOTALL)

# Remove all backdrop-filters
html = html.replace('backdrop-filter: blur(12px);', '')
html = html.replace('-webkit-backdrop-filter: blur(12px);', '')

# Replace RGBA colors back to Hex colors
html = html.replace('rgba(255,252,240,0.3) 0%, rgba(255,255,255,0.4)', '#fffcf0 0%, #ffffff')
html = html.replace('rgba(10,14,39,0.4) 0%, rgba(15,23,42,0.45) 60%, rgba(26,31,58,0.5)', '#0a0e27 0%, #0f172a 60%, #1a1f3a')
html = html.replace('rgba(240,253,250,0.3) 0%, rgba(224,242,254,0.4)', '#f0fdfa 0%, #e0f2fe')
html = html.replace('rgba(15,23,42,0.4) 0%, rgba(30,41,59,0.45)', '#0f172a 0%, #1e293b')
html = html.replace('rgba(255,255,255,0.3) 0%, rgba(255,251,240,0.4)', '#ffffff 0%, #fffbf0')
html = html.replace('rgba(10,14,39,0.4) 0%, rgba(15,23,42,0.45)', '#0a0e27 0%, #0f172a')

# Revert HIW combining tricks
html = html.replace(',\n                linear-gradient(135deg, rgba(240,253,250,0.3) 0%, rgba(204,251,241,0.35) 50%, rgba(153,246,228,0.4) 100%)', '')
html = html.replace(',\n                linear-gradient(135deg, rgba(4,47,46,0.4) 0%, rgba(19,78,74,0.45) 50%, rgba(15,118,110,0.5) 100%) !important', '')

html = html.replace('background-size: 32px 32px, 32px 32px, 100% 100%;', 'background-size: 32px 32px;')
html = html.replace('background-size: 32px 32px, 32px 32px, 100% 100% !important;', 'background-size: 32px 32px !important;')

# Restore background color to HIW 
old_hiw = r'\.hiw-section \{\s*background-image: \s*linear-gradient\(to right, rgba\(15, 118, 110, 0\.08\) 1px, transparent 1px\),\s*linear-gradient\(to bottom, rgba\(15, 118, 110, 0\.08\) 1px, transparent 1px\);\s*background-size: 32px 32px;\s*'

new_hiw = '''.hiw-section {
            background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);
            background-image: 
                linear-gradient(to right, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
            '''
html = re.sub(old_hiw, new_hiw, html)

old_hiw_dark = r'\[data-theme="dark"\] \.hiw-section \{\s*background-image: \s*linear-gradient\(to right, rgba\(94, 234, 212, 0\.06\) 1px, transparent 1px\),\s*linear-gradient\(to bottom, rgba\(94, 234, 212, 0\.06\) 1px, transparent 1px\);\s*background-size: 32px 32px !important;\s*\}'

new_hiw_dark = '''[data-theme="dark"] .hiw-section {
            background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%) !important;
            background-image: 
                linear-gradient(to right, rgba(94, 234, 212, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(94, 234, 212, 0.06) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
        }'''
html = re.sub(old_hiw_dark, new_hiw_dark, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Background reverted successfully!')
