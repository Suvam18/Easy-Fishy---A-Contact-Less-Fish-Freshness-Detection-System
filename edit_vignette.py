with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

css_additions = """
        /* ===== IMAGE VIGNETTE EFFECTS ===== */
        /* Darkness radiates from images and fades outward - not at section edges */

        /* Why Easy Fishy - image gets inner shadow + radial dark halo in bg */
        .why-image-wrapper {
            position: relative;
            border-radius: 24px;
        }
        .why-image-wrapper img {
            position: relative; z-index: 1;
            box-shadow:
                0 0 0 1px rgba(0,0,0,0.08),
                0 25px 60px rgba(0,0,0,0.32),   /* soft drop shadow */
                inset 0 0 80px rgba(0,0,0,0.45); /* inner vignette */
        }
        /* Dark halo backdrop behind the image that fades outward */
        .why-image-wrapper::before {
            content: '';
            position: absolute;
            /* Expand beyond image bounds */
            top: -30px; left: -30px; right: -30px; bottom: -30px;
            border-radius: 32px;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, transparent 75%);
            z-index: 0;
            pointer-events: none;
        }

        /* Our Services - dark halo around each card's image */
        .service-img-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 12px 12px 0 0;
        }
        .service-img-wrapper img {
            display: block; width: 100%; height: 200px; object-fit: cover;
            transition: transform 0.4s ease;
        }
        /* Inner vignette on service images */
        .service-img-wrapper::after {
            content: '';
            position: absolute; inset: 0;
            background: radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%);
            pointer-events: none;
            border-radius: 12px 12px 0 0;
        }

        /* Hero section right-side image cards */
        .grid-card {
            position: relative;
            overflow: hidden;
        }
        .grid-card::after {
            content: '';
            position: absolute; inset: 0;
            background: radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.45) 100%);
            pointer-events: none;
            border-radius: inherit;
        }

        /* Section-level gentle vignette: dark near center image, light at edges */
        .why-section .why-container {
            /* Subtle glow/shadow that signals image area is the focus */
            position: relative;
        }
        
        /* Ambient glow around image column for Why section */
        .why-image-content {
            position: relative;
        }
        .why-image-content::before {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 120%; height: 120%;
            background: radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            border-radius: 50%;
        }
"""

if '</style>' in html:
    html = html.replace('</style>', css_additions + '\n    </style>')

# Restore the Why section background to cleaner version (not the dark split that we did last)
# Keep a simple warm gradient that lets the vignette do the work
html = html.replace(
    "background: linear-gradient(100deg, #fffdf5 0%, #fef9e7 45%, #78350f 75%, #451a03 100%);",
    "background: linear-gradient(135deg, #fffdf5 0%, #fffbeb 100%);"
)
html = html.replace(
    "background: linear-gradient(100deg, #1a1209 0%, #0f172a 45%, #2d1b00 75%, #1a0a00 100%);",
    "background: linear-gradient(135deg, #1a1209 0%, #0f172a 100%);"
)

# And restore HIW to proper gentle split
html = html.replace(
    "background: linear-gradient(110deg, #0f766e 0%, #134e4a 30%, #ccfbf1 65%, #f0fdfa 100%);",
    "background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);"
)
html = html.replace(
    "background: linear-gradient(110deg, #020d0c 0%, #042f2e 30%, #1e293b 65%, #0f172a 100%);",
    "background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%);"
)
# Restore text colors
html = html.replace(
    ".hiw-section .hiw-subtitle,\n        .hiw-section .hiw-title { color: #f0fdfa; }\n        .hiw-section .hiw-desc { color: rgba(240,253,250,0.8); }",
    ""
)
html = html.replace(
    "        .why-title { color: #1a0a00 !important; }\n        .why-desc { color: #4a3728 !important; }\n        .why-subtitle { color: #b45309 !important; }",
    ""
)
html = html.replace(
    "        [data-theme=\"dark\"] .why-title { color: #f1f5f9 !important; }\n        [data-theme=\"dark\"] .why-desc { color: #cbd5e1 !important; }\n        [data-theme=\"dark\"] .why-subtitle { color: #fbbf24 !important; }",
    ""
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Vignette effects applied!')
