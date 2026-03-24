import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Increase padding for .why-section
old_why = r'\.why-section \{\s*background: linear-gradient\(135deg, #ffffff 0%, #fffbf0 100%\);\s*padding: 100px 5%;'
new_why = r'''.why-section {
            background: linear-gradient(135deg, #ffffff 0%, #fffbf0 100%);
            padding: 150px 5%; /* Increased from 100px */
            border-top: 1px solid rgba(0,0,0,0.03);'''
html = re.sub(old_why, new_why, html)

old_dark_why = r'\[data-theme="dark"\] \.why-section \{\s*background: linear-gradient\(135deg, #0a0e27 0%, #0f172a 100%\);'
new_dark_why = r'''[data-theme="dark"] .why-section {
            background: linear-gradient(135deg, #0a0e27 0%, #0f172a 100%);
            border-top: 1px solid rgba(255,255,255,0.03);'''
html = re.sub(old_dark_why, new_dark_why, html)

# Let's also add some bottom padding to hiw-section just in case
old_hiw = r'padding: 100px 20px;'
# actually hiw section was added as string:
#    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);
#    background-image: ...
#    background-size: 32px 32px;
#    (no padding specified in revert script because padding was outside the regex match)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Padding updated successfully.')
