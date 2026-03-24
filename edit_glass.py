import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Lower section opacities to let the background show more
# Hero
html = html.replace('rgba(255,252,240,0.65) 0%, rgba(255,255,255,0.75)', 'rgba(255,252,240,0.3) 0%, rgba(255,255,255,0.4)')
html = html.replace('rgba(10,14,39,0.75) 0%, rgba(15,23,42,0.8) 60%, rgba(26,31,58,0.85)', 'rgba(10,14,39,0.4) 0%, rgba(15,23,42,0.45) 60%, rgba(26,31,58,0.5)')

# Services
html = html.replace('rgba(240,253,250,0.65) 0%, rgba(224,242,254,0.75)', 'rgba(240,253,250,0.3) 0%, rgba(224,242,254,0.4)')
html = html.replace('rgba(15,23,42,0.75) 0%, rgba(30,41,59,0.8)', 'rgba(15,23,42,0.4) 0%, rgba(30,41,59,0.45)')

# HIW
html = html.replace('rgba(240,253,250,0.65) 0%, rgba(204,251,241,0.7) 50%, rgba(153,246,228,0.75)', 'rgba(240,253,250,0.3) 0%, rgba(204,251,241,0.35) 50%, rgba(153,246,228,0.4)')
html = html.replace('rgba(4,47,46,0.75) 0%, rgba(19,78,74,0.8) 50%, rgba(15,118,110,0.85)', 'rgba(4,47,46,0.4) 0%, rgba(19,78,74,0.45) 50%, rgba(15,118,110,0.5)')

# Why
html = html.replace('rgba(255,255,255,0.65) 0%, rgba(255,251,240,0.75)', 'rgba(255,255,255,0.3) 0%, rgba(255,251,240,0.4)')
html = html.replace('rgba(10,14,39,0.75) 0%, rgba(15,23,42,0.8)', 'rgba(10,14,39,0.4) 0%, rgba(15,23,42,0.45)')

# 2. Add visible blur directly to the animated video
html = html.replace(
    'filter: brightness(0.85);',
    'filter: brightness(0.75) blur(10px);\n            transform: scale(1.05); /* Scales video slightly to hide blur seams at edges */'
)

# Also ensure backdrop filters on sections are slightly reduced so it meshes better
html = html.replace('backdrop-filter: blur(20px);', 'backdrop-filter: blur(12px);')
html = html.replace('-webkit-backdrop-filter: blur(20px);', '-webkit-backdrop-filter: blur(12px);')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Made video visibly blurred and sections more transparent.')
