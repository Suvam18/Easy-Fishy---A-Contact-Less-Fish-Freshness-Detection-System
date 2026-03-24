with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update number span elements with data-target for counter animation
html = html.replace('<span class="number-value">10K+</span>', '<span class="number-value" data-target="10000" data-suffix="K+">0</span>')
html = html.replace('<span class="number-value">98.5%</span>', '<span class="number-value" data-target="98.5" data-suffix="%" data-decimal="1">0</span>')
html = html.replace('<span class="number-value">500+</span>', '<span class="number-value" data-target="500" data-suffix="+">0</span>')

# 2. Add counter animation JS before </body>
counter_js = """
<script>
    /* Count-up animation for Numbers section */
    function animateCountUp(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.hasAttribute('data-decimal');
        const decimals = parseInt(el.getAttribute('data-decimal') || '0');
        const duration = 2200; // ms
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            
            if (isDecimal) {
                el.textContent = current.toFixed(decimals) + suffix;
            } else {
                // For large numbers, show K suffix
                if (target >= 1000 && suffix.includes('K')) {
                    el.textContent = (current / 1000).toFixed(1).replace('.0', '') + suffix;
                } else {
                    el.textContent = Math.round(current) + suffix;
                }
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
    
    // Observe numbers section
    const numbersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.number-value[data-target]').forEach(el => {
                    animateCountUp(el);
                });
                numbersObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const numbersSection = document.querySelector('.numbers-section');
    if (numbersSection) numbersObserver.observe(numbersSection);
</script>
"""
if '</body>' in html:
    html = html.replace('</body>', counter_js + '\n</body>')

# 3. Ensure pricing and FAQ cards have initial hidden styles
css_patch = """
        /* Ensure anim-left/right start hidden before in-view */
        .pricing-grid .anim-left,
        .pricing-grid .anim-right,
        .faq-grid .anim-left,
        .faq-grid .anim-right {
            opacity: 0;
        }
        .pricing-grid.in-view .anim-left {
            animation: slideInLeft 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .pricing-grid.in-view .anim-right {
            animation: slideInRight 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
        }
        .faq-grid.in-view .anim-left {
            animation: slideInLeft 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .faq-grid.in-view .anim-right {
            animation: slideInRight 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
        }
        
        /* Numbers section anim */
        .numbers-grid .anim-left,
        .numbers-grid .anim-up,
        .numbers-grid .anim-right {
            opacity: 0;
        }
        .numbers-grid.in-view .anim-left {
            animation: slideInLeft 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .numbers-grid.in-view .anim-up {
            animation: slideInUp 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
        }
        .numbers-grid.in-view .anim-right {
            animation: slideInRight 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
        }
"""
if '</style>' in html:
    html = html.replace('</style>', css_patch + '\n    </style>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Animations applied!')
