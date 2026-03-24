with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# --- PRICING: Replace grid ::before with diagonal stripe texture ---
old_pricing_before = """        .pricing-section::before {
            content: '';
            position: absolute; inset: 0;
            background-image:
                linear-gradient(to right, rgba(16,185,129,0.07) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16,185,129,0.07) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none; z-index: 0;
        }"""
new_pricing_before = """        .pricing-section::before {
            content: '';
            position: absolute; inset: 0;
            /* Diagonal 45-degree stripes */
            background-image: repeating-linear-gradient(
                45deg,
                rgba(16, 185, 129, 0.06) 0px,
                rgba(16, 185, 129, 0.06) 1px,
                transparent 1px,
                transparent 20px
            );
            pointer-events: none; z-index: 0;
        }"""
html = html.replace(old_pricing_before, new_pricing_before)

# --- FAQ: Replace radial dots ::before with scattered circle rings ---
old_faq_before = """        .faq-section::before {
            content: ''; position: absolute; inset: 0;
            background-image: radial-gradient(circle, rgba(99,102,241,0.06) 2px, transparent 2px);
            background-size: 50px 50px; pointer-events: none; z-index: 0;
        }"""
new_faq_before = """        .faq-section::before {
            content: ''; position: absolute; inset: 0;
            /* Concentric ring / target circles */
            background-image: 
                radial-gradient(circle at 50% 50%, transparent 18px, rgba(99, 102, 241, 0.07) 18px, rgba(99, 102, 241, 0.07) 19px, transparent 19px),
                radial-gradient(circle at 50% 50%, transparent 36px, rgba(99, 102, 241, 0.04) 36px, rgba(99, 102, 241, 0.04) 37px, transparent 37px);
            background-size: 80px 80px;
            background-position: 0 0;
            pointer-events: none; z-index: 0;
        }"""
html = html.replace(old_faq_before, new_faq_before)

# --- NUMBERS: Replace grid ::before with radial wave / ripple pattern ---
old_numbers_before = """        .numbers-section::before {
            content: ''; position: absolute; inset: 0;
            background-image:
                linear-gradient(to right, rgba(16,185,129,0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(16,185,129,0.06) 1px, transparent 1px);
            background-size: 44px 44px; pointer-events: none; z-index: 0;
        }"""
new_numbers_before = """        .numbers-section::before {
            content: ''; position: absolute; inset: 0;
            /* Radial wave / ripple emanating from center */
            background-image:
                radial-gradient(ellipse at 50% 50%, transparent 60px, rgba(16,185,129,0.09) 60px, rgba(16,185,129,0.09) 61px, transparent 61px),
                radial-gradient(ellipse at 50% 50%, transparent 120px, rgba(16,185,129,0.07) 120px, rgba(16,185,129,0.07) 121px, transparent 121px),
                radial-gradient(ellipse at 50% 50%, transparent 180px, rgba(16,185,129,0.05) 180px, rgba(16,185,129,0.05) 181px, transparent 181px),
                radial-gradient(ellipse at 50% 50%, transparent 240px, rgba(16,185,129,0.03) 240px, rgba(16,185,129,0.03) 241px, transparent 241px);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            pointer-events: none; z-index: 0;
        }"""
html = html.replace(old_numbers_before, new_numbers_before)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Textures updated!')
