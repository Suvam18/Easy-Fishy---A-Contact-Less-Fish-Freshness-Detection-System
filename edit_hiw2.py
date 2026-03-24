import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Navbar text
html = html.replace('>Why Easy Fishy</a>', '>Why Easy Fishy ?</a>')

# 2. How it works Background Texture
old_hiw_bg = '''        .hiw-section {
            background-color: #ffffff;
            background-image: radial-gradient(circle at center, #cbd5e1 2px, transparent 2px);
            background-size: 40px 40px;
'''
new_hiw_bg = '''        .hiw-section {
            background-color: #ffffff;
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.06) 1px, transparent 1px);
            background-size: 32px 32px;
'''
html = html.replace(old_hiw_bg, new_hiw_bg)

# Dark mode hiw-background
old_dark_hiw_bg = '''        [data-theme="dark"] .hiw-section {
            background-color: #0b1121 !important;
            background-image: radial-gradient(circle at center, #1e293b 2px, transparent 2px) !important;
        }'''
new_dark_hiw_bg = '''        [data-theme="dark"] .hiw-section {
            background-color: #0b1121 !important;
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.04) 1px, transparent 1px) !important;
            background-size: 32px 32px !important;
        }'''
html = html.replace(old_dark_hiw_bg, new_dark_hiw_bg)

# 3. Update the Stepper CSS
old_stepper_css = '''        .hiw-stepper {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
            gap: 15px;
        }'''
new_stepper_css = '''        .hiw-stepper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            max-width: 1100px;
            margin: 0 auto 30px auto;
        }
        
        .stepper-col {
            display: flex;
            justify-content: center;
            position: relative;
        }'''
html = html.replace(old_stepper_css, new_stepper_css)

old_step_arrow_css = '''        .step-arrow {
            width: 120px;
            height: 40px;
            position: relative;
            margin-top: -30px; /* Curve goes up */
        }'''
new_step_arrow_css = '''        .step-arrow {
            position: absolute;
            top: 20px; /* Aligned nicely with 72px circle */
            left: 50%;
            width: 100%;
            height: 40px;
            padding-left: 50px; /* space away from the circle */
            padding-right: 10px;
            box-sizing: border-box;
            z-index: 1;
            margin-top: -30px; /* curve goes up */
        }'''
html = html.replace(old_step_arrow_css, new_step_arrow_css)

# 4. Update the Stepper HTML
old_stepper_html = '''            <!-- Desktop Visual Stepper -->
            <div class="hiw-stepper">
                <div class="step-circle">1</div>
                <div class="step-arrow">
                    <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                        <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <div class="step-circle">2</div>
                <div class="step-arrow">
                    <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                        <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                    </svg>
                </div>
                <div class="step-circle">3</div>
            </div>'''
# Need to make sure the match matches what's actually in index.html.
# In previous script I didn't add preserveAspectRatio="none".
# Let's replace whatever is there.
import re
stepper_pattern = re.compile(r'<!-- Desktop Visual Stepper -->\s*<div class="hiw-stepper">.*?</div>\s*</div>\s*</div>', re.DOTALL)
# Actually, the div nesting:
# <div class="hiw-stepper">
#   <div class="step-circle">1</div>
#   <div class="step-arrow">...</div>
#   <div class="step-circle">2</div>
#   <div class="step-arrow">...</div>
#   <div class="step-circle">3</div>
# </div>

new_stepper_html = '''            <!-- Desktop Visual Stepper -->
            <div class="hiw-stepper">
                <div class="stepper-col">
                    <div class="step-circle">1</div>
                    <div class="step-arrow">
                        <svg viewBox="0 0 100 30" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                            <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        </svg>
                    </div>
                </div>
                <div class="stepper-col">
                    <div class="step-circle">2</div>
                    <div class="step-arrow">
                        <svg viewBox="0 0 100 30" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20 Q 50 -10, 100 20" stroke-width="2" stroke-dasharray="6 4" fill="none"/>
                            <path d="M95 15 L100 20 L93 25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                        </svg>
                    </div>
                </div>
                <div class="stepper-col">
                    <div class="step-circle">3</div>
                </div>
            </div>'''

html = re.sub(r'<!-- Desktop Visual Stepper -->\s*<div class="hiw-stepper">.*?</div>\s*<!-- Content Grid -->', new_stepper_html + "\n\n            <!-- Content Grid -->", html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Changes applied')
