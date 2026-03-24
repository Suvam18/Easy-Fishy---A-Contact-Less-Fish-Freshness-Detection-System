import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Make background a sea green light-dark combo
html = html.replace('background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);', 'background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);')
html = html.replace('background: linear-gradient(135deg, #0b1121 0%, #1e293b 100%) !important;', 'background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%) !important;')

# Update the yellow textures to sea green textures
html = html.replace('rgba(234, 179, 8, 0.06)', 'rgba(15, 118, 110, 0.08)')
html = html.replace('rgba(234, 179, 8, 0.04)', 'rgba(94, 234, 212, 0.06)')

# Add hover animation to step circles
old_step_css = '''        .step-circle {
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
        }'''

new_step_css = '''        .step-circle {
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
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            position: relative;
            z-index: 2;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            cursor: pointer;
        }
        
        .step-circle:hover {
            transform: scale(1.15) translateY(-5px);
            background: #14b8a6; /* Sea green highlight */
            color: #ffffff;
            border-color: #14b8a6;
            box-shadow: 0 15px 30px rgba(20, 184, 166, 0.4);
        }'''

html = html.replace(old_step_css, new_step_css)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Finished background and hover updates.")
