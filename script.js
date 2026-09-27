/**
 * ATUL / DIGITAL WORKSHOP — INTERACTIVE ENGINE
 * Pure Vanilla JS (ES6+) — Zero Framework Overhead
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Year ---
    const yearSpan = document.getElementById('f-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Custom Contextual Cursor ---
    const cursor = document.getElementById('custom-cursor');
    const cursorLabel = document.getElementById('cursor-label');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('[data-cursor], a, button, .sat-node, .cap-card, .prob-tab, .arch-layer, .year-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const label = el.getAttribute('data-cursor') || 'EXPLORE';
                cursorLabel.textContent = label;
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

    // --- 3. Hero Core Node System (Interactive Visual) ---
    const satNodes = document.querySelectorAll('.sat-node');
    const nodeTooltip = document.getElementById('node-tooltip');
    const svgLines = {
        'LIQUID': document.getElementById('line-liquid'),
        'METAFIELDS': document.getElementById('line-metafields'),
        'VARIANTS': document.getElementById('line-variants'),
        'STOREFRONT': document.getElementById('line-storefront'),
        'CART': document.getElementById('line-cart'),
        'API': document.getElementById('line-api')
    };

    satNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const key = node.getAttribute('data-node');
            const info = node.getAttribute('data-info');
            if (nodeTooltip && info) nodeTooltip.textContent = info;

            // Highlight SVG link
            if (svgLines[key]) {
                svgLines[key].style.stroke = '#95bf47';
                svgLines[key].style.strokeWidth = '3';
                svgLines[key].style.strokeDasharray = 'none';
            }
        });

        node.addEventListener('mouseleave', () => {
            const key = node.getAttribute('data-node');
            if (nodeTooltip) nodeTooltip.textContent = 'Hover over architecture nodes to inspect engineering specialization';

            if (svgLines[key]) {
                svgLines[key].style.stroke = '';
                svgLines[key].style.strokeWidth = '';
                svgLines[key].style.strokeDasharray = '';
            }
        });
    });

    // --- 4. Problems I Solve ("THINGS I'VE FIXED") ---
    const problemData = {
        variants: {
            badge: "CATEGORY: VARIANT LOGIC",
            title: "Multi-Option Variant & Image Swatch Synchronization",
            problem: "High SKU products with 3+ option dimensions (Color, Size, Material) breaking swatch UI, showing out-of-stock options as selectable, or failing to swap gallery images on swatch click.",
            approach: "Built a centralized variant state listener in Vanilla JS. Analyzed Shopify's product.variants JSON object directly in Liquid and mapped valid option combinations dynamically to update pricing, image galleries, and add-to-cart button state in real time.",
            tech: ["Liquid json filter", "JS State Manager", "Section Rendering API"],
            steps: ["User Selection", "State Listener", "Variant Matrix Check", "Inventory & Price Update", "Cart Ready"]
        },
        cart: {
            badge: "CATEGORY: COMMERCE LOGIC",
            title: "AJAX Cart Drawer & Free-Shipping Thresholds",
            problem: "Standard theme redirecting buyers to full cart page on add-to-cart, slowing down impulse purchases, or third-party cart apps creating layout shifts and loading delays.",
            approach: "Engineered a zero-dependency AJAX slide-out cart using Shopify Cart API and Section Rendering API. Implemented real-time cart note saving, cross-sell item recommendations, and dynamic progress bar calculation.",
            tech: ["Shopify Cart API", "Section Rendering API", "Fetch API", "Drawer UX"],
            steps: ["Add to Cart Click", "AJAX Fetch", "Section Re-render", "Progress Calculation", "Drawer Open"]
        },
        speed: {
            badge: "CATEGORY: PERFORMANCE",
            title: "Liquid Optimization & Lighthouse Score Acceleration",
            problem: "Storefront experiencing slow initial server response times due to deeply nested all_products Liquid loops and un-lazy-loaded hero banner assets.",
            approach: "Refactored template logic to use Metafield direct references instead of nested product loops. Implemented responsive srcset image rendering and deferred non-essential JavaScript execution.",
            tech: ["Shopify Theme Inspector", "Liquid Refactoring", "Responsive srcset", "Resource Hints"],
            steps: ["Theme Profiling", "Loop Eliminating", "Image srcset Optimization", "Script Deferral", "90+ Score"]
        },
        metafields: {
            badge: "CATEGORY: DATA ARCHITECTURE",
            title: "Custom Specs & Metaobject Content Schemas",
            problem: "Merchants unable to manage complex product specs, size charts, or custom badges directly from Shopify Admin without modifying Liquid files.",
            approach: "Designed structured Metafield and Metaobject definitions in Shopify Admin. Integrated Liquid templates to dynamically map and render custom tabs, spec grids, and color swatches cleanly.",
            tech: ["Metafields API", "Metaobjects", "Liquid Object Mapping", "Admin UX"],
            steps: ["Schema Design", "Admin Definition", "Liquid Mapping", "Merchant Input", "Storefront Render"]
        },
        conflicts: {
            badge: "CATEGORY: THEME ENGINEERING",
            title: "Figma to Responsive Shopify Theme Conversion",
            problem: "Converting complex Figma designs into clean Liquid code without introducing broken CSS breakpoints, font flickers, or DOM layout bugs.",
            approach: "Built modular section schemas with configurable block settings (`{% schema %}`). Ensured 100% responsive CSS Grid/Flexbox layouts with zero external UI framework bloat.",
            tech: ["CSS Grid & Flexbox", "Liquid Schema Blocks", "Vanilla JS", "Accessibility"],
            steps: ["Figma Inspection", "Section Schema", "Liquid Templating", "Responsive QA", "Live Deploy"]
        }
    };

    const probTabs = document.querySelectorAll('.prob-tab');
    const probBadge = document.getElementById('prob-badge');
    const probTitle = document.getElementById('prob-title');
    const probProblemText = document.getElementById('prob-problem-text');
    const probApproachText = document.getElementById('prob-approach-text');
    const probTechTags = document.getElementById('prob-tech-tags');
    const probFlowDiagram = document.querySelector('.prob-flow-diagram');

    probTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            probTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.getAttribute('data-prob');
            const data = problemData[key];

            if (data) {
                if (probBadge) probBadge.textContent = data.badge;
                if (probTitle) probTitle.textContent = data.title;
                if (probProblemText) probProblemText.textContent = data.problem;
                if (probApproachText) probApproachText.textContent = data.approach;

                if (probTechTags) {
                    probTechTags.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
                }

                if (probFlowDiagram) {
                    probFlowDiagram.innerHTML = data.steps.map((step, idx) => {
                        const isLast = idx === data.steps.length - 1;
                        return `<div class="flow-step ${isLast ? 'highlight' : ''}"><span>${step}</span></div>` + 
                               (!isLast ? `<div class="flow-arrow">&rarr;</div>` : '');
                    }).join('');
                }
            }
        });
    });

    // --- 5. Shopify Architecture Visualizer ("SHOPIFY, BUT DEEPER.") ---
    const archData = {
        storefront: {
            badge: "INSPECTING: LAYER 01",
            title: "Storefront & Liquid Theme Architecture",
            desc: "Designing clean section schemas ({% schema %}), modular snippet includes, and decoupled JS components for Dawn and custom theme bases.",
            file: "section-product-main.liquid",
            code: `{% schema %}\n{\n  "name": "Custom Product Core",\n  "settings": [\n    { "type": "checkbox", "id": "enable_ajax_cart", "label": "Enable AJAX Drawer", "default": true }\n  ]\n}\n{% endschema %}`
        },
        liquid: {
            badge: "INSPECTING: LAYER 02",
            title: "Liquid Templates & Dynamic Blocks",
            desc: "Mastery of Liquid tags, filters, objects, loops, and conditional rendering to produce clean, maintainable theme code.",
            file: "snippet-variant-picker.liquid",
            code: `{% for variant in product.variants %}\n  <option value="{{ variant.id }}" {% if variant == product.selected_or_first_available_variant %}selected{% endif %}>\n    {{ variant.title }} - {{ variant.price | money }}\n  </option>\n{% endfor %}`
        },
        variants: {
            badge: "INSPECTING: LAYER 03",
            title: "Product & Multi-Dimensional Variant Logic",
            desc: "Handling high-SKU variant option matching, custom swatch images, dynamic inventory status badges, and asynchronous price updates.",
            file: "variant-manager.js",
            code: `class VariantManager {\n  onVariantChange(event) {\n    const currentVariant = this.getVariantFromOptions();\n    this.updatePrice(currentVariant);\n    this.updateGallery(currentVariant);\n  }\n}`
        },
        metafields: {
            badge: "INSPECTING: LAYER 04",
            title: "Metafields & Metaobjects Custom Schemas",
            desc: "Configuring structured metadata definitions in Shopify Admin to render rich product specs, size charts, and custom badges on storefronts.",
            file: "metafields-spec.liquid",
            code: `{% assign specs = product.metafields.custom.specifications.value %}\n{% if specs %}\n  <ul class="specs-grid">\n    {% for item in specs %}\n      <li><strong>{{ item.label }}:</strong> {{ item.value }}</li>\n    {% endfor %}\n  </ul>\n{% endif %}`
        },
        cart: {
            badge: "INSPECTING: LAYER 05",
            title: "Cart AJAX API, Upsells & Discount Rules",
            desc: "Building smooth AJAX cart drawers, dynamic threshold calculations for free shipping, and custom cart item properties.",
            file: "cart-drawer.js",
            code: `async function updateCart(line, quantity) {\n  const res = await fetch('/cart/change.js', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ line, quantity })\n  });\n  const cart = await res.json();\n  renderCartDrawer(cart);\n}`
        },
        api: {
            badge: "INSPECTING: LAYER 06",
            title: "Storefront GraphQL & Admin REST APIs",
            desc: "Integrating custom storefront apps and proxy endpoints with Shopify's GraphQL API for high-performance data querying.",
            file: "storefront-api.graphql",
            code: `query getProduct($handle: String!) {\n  product(handle: $handle) {\n    title\n    description\n    metafields(identifiers: [{namespace: "custom", key: "specifications"}]) {\n      value\n    }\n  }\n}`
        }
    };

    const archLayers = document.querySelectorAll('.arch-layer');
    const inspectorBadge = document.getElementById('inspector-badge');
    const inspectorTitle = document.getElementById('inspector-title');
    const inspectorDesc = document.getElementById('inspector-desc');
    const inspectorCode = document.getElementById('inspector-code-snippet');
    const codeFile = document.querySelector('.code-file');

    archLayers.forEach(layer => {
        layer.addEventListener('mouseenter', () => {
            archLayers.forEach(l => l.classList.remove('active'));
            layer.classList.add('active');

            const key = layer.getAttribute('data-layer');
            const data = archData[key];

            if (data) {
                if (inspectorBadge) inspectorBadge.textContent = data.badge;
                if (inspectorTitle) inspectorTitle.textContent = data.title;
                if (inspectorDesc) inspectorDesc.textContent = data.desc;
                if (inspectorCode) inspectorCode.textContent = data.code;
                if (codeFile) codeFile.textContent = data.file;
            }
        });
    });

    // --- 6. Experience Year Selector ---
    const expData = {
        '2025': {
            role: "Software Developer @ Webandcrafts",
            period: "Dec 2024 – Present",
            bullets: [
                "Engineered custom, high-converting Shopify theme components using Liquid, resolving complex variant logic for high-SKU catalogs.",
                "Developed modular, reusable Shopify theme sections and dynamic blocks for marketing campaigns and storefront promotions.",
                "Collaborated with design and QA teams to guarantee 100% responsiveness and accessibility across mobile and desktop devices."
            ]
        },
        '2024': {
            role: "Shopify Developer @ RDP Workstation",
            period: "May 2024 – Oct 2024",
            bullets: [
                "Converted high-fidelity Figma designs into pixel-perfect, responsive Shopify storefronts.",
                "Optimized theme assets, Liquid code execution, and script loading to maximize site performance.",
                "Configured shop Metafields and custom theme settings for streamlined client content management."
            ]
        }
    };

    const yearBtns = document.querySelectorAll('.year-btn');
    const yearDisplay = document.getElementById('year-content-display');

    yearBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            yearBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const yr = btn.getAttribute('data-year');
            const data = expData[yr];

            if (data && yearDisplay) {
                yearDisplay.innerHTML = `
                    <div class="exp-role-card">
                        <div class="exp-role-header">
                            <h3>${data.role}</h3>
                            <span class="exp-period">${data.period}</span>
                        </div>
                        <ul class="exp-bullets">
                            ${data.bullets.map(b => `<li>${b}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
        });
    });

    // --- 7. Interactive Terminal Modal & Commands ---
    const terminalModal = document.getElementById('terminal-modal');
    const openTermBtnHero = document.getElementById('open-terminal-hero-btn');
    const closeTermBtn = document.getElementById('close-terminal-btn');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    const termShortcuts = document.querySelectorAll('.t-tag');

    function openTerminal() {
        if (terminalModal) {
            terminalModal.classList.add('active');
            terminalModal.setAttribute('aria-hidden', 'false');
            if (termInput) termInput.focus();
        }
    }

    function closeTerminal() {
        if (terminalModal) {
            terminalModal.classList.remove('active');
            terminalModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (openTermBtnHero) openTermBtnHero.addEventListener('click', openTerminal);
    if (closeTermBtn) closeTermBtn.addEventListener('click', closeTerminal);

    if (terminalModal) {
        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) closeTerminal();
        });
    }

    const commandHandlers = {
        'help': () => 'Available commands: whoami, shopify, skills, projects, tools, experience, contact, sudo hire atul, clear',
        'whoami': () => 'Atul Mundakkal — Shopify Developer & Full-Stack Engineer based in Kochi, India.',
        'shopify': () => 'Core Specialization:\n- Liquid Templates & Theme Architecture\n- Complex Variant Logic & Swatches\n- Metafields & Metaobjects Schemas\n- Cart AJAX API & Upsells\n- Storefront & Admin APIs (GraphQL/REST)',
        'skills': () => 'Frontend: HTML5, CSS3, JavaScript (ES6+), AJAX\nBackend: React, Node.js, Prisma ORM, PostgreSQL\nShopify: Liquid, Storefront API, Admin API, Metafields',
        'projects': () => '1. Interactive Terminal Portfolio (htmlviewer.html)\n2. Custom Wishlist Application (Shopify Metafields)',
        'tools': () => 'Developer Tools: Shopify Liquid Snippets Helper (VS Code extension for theme auto-completion)',
        'experience': () => '- Software Developer @ Webandcrafts (Dec 2024 - Present)\n- Shopify Developer @ RDP Workstation (May 2024 - Oct 2024)',
        'contact': () => 'Email: atulmundakkal@outlook.com\nGitHub: https://github.com/Atul8007\nLinkedIn: https://linkedin.com/in/atul-mundakkal',
        'sudo hire atul': () => `Checking compatibility...\nShopify ................. ✓\nLiquid .................. ✓\nProblem solving ......... ✓\nDeveloper tools ......... ✓\n\nSTATUS: READY TO BUILD. Email: atulmundakkal@outlook.com`,
        'clear': () => 'CLEAR'
    };

    function runCommand(cmdText) {
        const cleanCmd = cmdText.trim().toLowerCase();
        if (!cleanCmd) return;

        if (cleanCmd === 'clear') {
            termOutput.innerHTML = '<div class="t-line">Terminal cleared. Type <span class="t-cmd">help</span> for commands.</div>';
            return;
        }

        // Print input line
        const userLine = document.createElement('div');
        userLine.className = 't-line';
        userLine.innerHTML = `<span class="t-prompt">atul@workshop ~ %</span> <span class="t-cmd">${cmdText}</span>`;
        termOutput.appendChild(userLine);

        // Print output
        const response = commandHandlers[cleanCmd] ? commandHandlers[cleanCmd]() : `Command not found: "${cleanCmd}". Type "help" for valid commands.`;
        
        const outLine = document.createElement('div');
        outLine.className = 't-line';
        outLine.style.whiteSpace = 'pre-wrap';
        outLine.style.color = '#94a3b8';
        outLine.textContent = response;
        termOutput.appendChild(outLine);

        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                runCommand(termInput.value);
                termInput.value = '';
            }
        });
    }

    termShortcuts.forEach(tag => {
        tag.addEventListener('click', () => {
            const cmd = tag.getAttribute('data-cmd');
            if (cmd) runCommand(cmd);
        });
    });

    // --- 8. Copy Email Button Helper ---
    const copyBtn = document.getElementById('copy-email-cta-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.getAttribute('data-email');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '✅ EMAIL COPIED!';
                    copyBtn.style.backgroundColor = 'rgba(149, 191, 71, 0.2)';

                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                        copyBtn.style.backgroundColor = '';
                    }, 2500);
                });
            }
        });
    }

    // --- 9. Mobile Navigation Drawer ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });
    }
});
