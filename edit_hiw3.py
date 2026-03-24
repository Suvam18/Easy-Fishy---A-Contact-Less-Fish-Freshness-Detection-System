import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make background a light-dark combination
html = html.replace('background-color: #ffffff;', 'background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);')
html = html.replace('background-color: #0b1121 !important;', 'background: linear-gradient(135deg, #0b1121 0%, #1e293b 100%) !important;')

# Add animation to stepper columns
html = html.replace('<div class="stepper-col">\n                    <div class="step-circle">1</div>', '<div class="stepper-col anim-down delay-1">\n                    <div class="step-circle">1</div>')
html = html.replace('<div class="stepper-col">\n                    <div class="step-circle">2</div>', '<div class="stepper-col anim-down delay-2">\n                    <div class="step-circle">2</div>')
html = html.replace('<div class="stepper-col">\n                    <div class="step-circle">3</div>', '<div class="stepper-col anim-down delay-3">\n                    <div class="step-circle">3</div>')

# Ensure the CSS triggers the animations when hiw-stepper is in view
css_to_add = """
        .hiw-stepper.in-view .anim-down { animation: slideInDown 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .delay-3 { animation-delay: 0.6s !important; }
"""
if '</style>' in html:
    html = html.replace('</style>', css_to_add + '\n    </style>')

js_to_add = "const hiwStepper = document.querySelector('.hiw-stepper');\n        if (hiwStepper) observer.observe(hiwStepper);"
if "const grid = document.querySelector('.hiw-grid');" in html:
    html = html.replace("const grid = document.querySelector('.hiw-grid');", js_to_add + "\n        const grid = document.querySelector('.hiw-grid');")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated HIW steppers and background.")
