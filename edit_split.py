with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# --- HOW IT WORKS: Split dark/light with diagonal texture ---
old_hiw = """        /* How It Works Section */
        .hiw-section {
            background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);
            background-image: 
                linear-gradient(to right, rgba(15, 118, 110, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 118, 110, 0.08) 1px, transparent 1px);
            background-size: 32px 32px;
            padding: 120px 20px;
            text-align: center;
            color: #1a202c;
            position: relative;
            z-index: 10;
            border-top: 3px solid rgba(16, 185, 129, 0.15);
            border-bottom: 3px solid rgba(16, 185, 129, 0.15);
            margin-bottom: 0;
        }

        [data-theme="dark"] .hiw-section {
            background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%);
            border-top: 3px solid rgba(16, 185, 129, 0.08);
            border-bottom: 3px solid rgba(16, 185, 129, 0.08);
            color: #f1f5f9;
        }"""

new_hiw = """        /* How It Works Section */
        .hiw-section {
            /* Light right → dark left split */
            background: linear-gradient(110deg, #0f766e 0%, #134e4a 30%, #ccfbf1 65%, #f0fdfa 100%);
            padding: 120px 20px;
            text-align: center;
            color: #1a202c;
            position: relative;
            z-index: 10;
            overflow: hidden;
            border-top: 3px solid rgba(16, 185, 129, 0.15);
            border-bottom: 3px solid rgba(16, 185, 129, 0.15);
            margin-bottom: 0;
        }

        /* Diagonal texture overlay on HIW */
        .hiw-section::before {
            content: '';
            position: absolute; inset: 0;
            background-image: repeating-linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.04) 0px,
                rgba(255, 255, 255, 0.04) 1px,
                transparent 1px,
                transparent 18px
            );
            pointer-events: none; z-index: 0;
        }

        .hiw-section > * { position: relative; z-index: 1; }
        .hiw-section .hiw-subtitle,
        .hiw-section .hiw-title { color: #f0fdfa; }
        .hiw-section .hiw-desc { color: rgba(240,253,250,0.8); }

        [data-theme="dark"] .hiw-section {
            background: linear-gradient(110deg, #020d0c 0%, #042f2e 30%, #1e293b 65%, #0f172a 100%);
            border-top: 3px solid rgba(16, 185, 129, 0.08);
            border-bottom: 3px solid rgba(16, 185, 129, 0.08);
            color: #f1f5f9;
        }"""
html = html.replace(old_hiw, new_hiw)

# --- WHY SECTION: Dark around image side / Light on text side ---
old_why = """        /* Why Easy Fishy Section */
        .why-section {
            background: linear-gradient(135deg, #fffdf5 0%, #fffbeb 100%);
            padding: 150px 5%;
            overflow: hidden;
            position: relative;
        }
        
        /* Main yellow grid texture */
        .why-section::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.18) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.18) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
            z-index: 0;
        }
        
        /* Second layer - larger dots for depth */
        .why-section::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: radial-gradient(circle, rgba(234, 179, 8, 0.15) 2px, transparent 2px);
            background-size: 80px 80px;
            pointer-events: none;
            z-index: 0;
        }
        
        [data-theme="dark"] .why-section {
            background: linear-gradient(135deg, #1a1209 0%, #0f172a 100%);
            border-top: 1px solid rgba(255,255,255,0.03);
        }
        [data-theme="dark"] .why-section::before {
            background-image: 
                linear-gradient(to right, rgba(234, 179, 8, 0.09) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(234, 179, 8, 0.09) 1px, transparent 1px);
        }
        [data-theme="dark"] .why-section::after {
            background-image: radial-gradient(circle, rgba(234, 179, 8, 0.07) 2px, transparent 2px);
        }"""

new_why = """        /* Why Easy Fishy Section */
        .why-section {
            /* Left (text) = warm light, Right (image) = rich dark amber */
            background: linear-gradient(100deg, #fffdf5 0%, #fef9e7 45%, #78350f 75%, #451a03 100%);
            padding: 150px 5%;
            overflow: hidden;
            position: relative;
        }
        
        /* Diagonal texture on top */
        .why-section::before {
            content: '';
            position: absolute; inset: 0;
            background-image: repeating-linear-gradient(
                135deg,
                rgba(234, 179, 8, 0.08) 0px,
                rgba(234, 179, 8, 0.08) 1px,
                transparent 1px,
                transparent 22px
            );
            pointer-events: none; z-index: 0;
        }
        
        /* Glow blob behind image side */
        .why-section::after {
            content: '';
            position: absolute;
            top: -80px; right: -80px;
            width: 500px; height: 500px;
            background: radial-gradient(ellipse at center, rgba(234, 88, 12, 0.25) 0%, transparent 70%);
            pointer-events: none; z-index: 0;
            border-radius: 50%;
        }
        
        /* Text reads fine on light side */
        .why-title { color: #1a0a00 !important; }
        .why-desc { color: #4a3728 !important; }
        .why-subtitle { color: #b45309 !important; }
        
        [data-theme="dark"] .why-section {
            background: linear-gradient(100deg, #1a1209 0%, #0f172a 45%, #2d1b00 75%, #1a0a00 100%);
        }
        [data-theme="dark"] .why-section::after {
            background: radial-gradient(ellipse at center, rgba(234, 88, 12, 0.12) 0%, transparent 70%);
        }
        [data-theme="dark"] .why-title { color: #f1f5f9 !important; }
        [data-theme="dark"] .why-desc { color: #cbd5e1 !important; }
        [data-theme="dark"] .why-subtitle { color: #fbbf24 !important; }"""
html = html.replace(old_why, new_why)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Section textures updated to dark/light split!')
