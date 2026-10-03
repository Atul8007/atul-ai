/**
 * ATUL MUNDAKKAL — SHOPIFY FULL-STACK DEVELOPER (FDE)
 * Pure Vanilla JavaScript (ES6+) — Zero Framework Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Year ---
    const yearSpan = document.getElementById('f-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Dark / Light Theme Toggle System ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('fde-theme') || 'dark';
    setTheme(savedTheme);

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('fde-theme', theme);
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'DARK';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'LIGHT';
            }
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme') || 'dark';
            const next = current === 'dark' ? 'light' : 'dark';
            setTheme(next);
        });
    }

    // --- 3. Precision Contextual Cursor ---
    const cursor = document.getElementById('fde-cursor');
    const cursorTag = document.getElementById('cursor-tag');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveEls = document.querySelectorAll('[data-cursor], a, button, .branch-btn, .u-swatch, .u-size-btn, .case-card');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const tag = el.getAttribute('data-cursor') || 'INSPECT';
                if (cursorTag) cursorTag.textContent = tag;
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

    // --- 4. Interactive Decision Engine (Hero Visual) ---
    const branchData = {
        keep: {
            badge: "DECISION STRATEGY: KEEP NATIVE",
            title: "Preserve Working Platform Fundamentals",
            desc: "When native features (like Shopify Customer Metafields or theme sections) already solve 80% of the problem, do not introduce extra databases or paid apps. Preserve native capabilities to minimize ongoing maintenance cost.",
            output: "KEEP NATIVE PLATFORM"
        },
        extend: {
            badge: "DECISION STRATEGY: EXTEND CAPABILITIES",
            title: "Extend Native Features via Lightweight Code",
            desc: "When native features fall short of specific merchant needs, build targeted client-side state managers or App Proxies around platform capabilities rather than replacing the core system.",
            output: "EXTEND VIA LIGHTWEIGHT CODE"
        },
        replace: {
            badge: "DECISION STRATEGY: REPLACE BROKEN WORKFLOW",
            title: "Replace Fundamentally Unsuitable Workflows",
            desc: "When an existing approach creates severe technical debt or massive performance degradation (e.g. heavy third-party app scripts), replace that specific friction point with simple custom engineering.",
            output: "REPLACE SPECIFIC FRICTION POINT"
        }
    };

    const branchBtns = document.querySelectorAll('.branch-btn');
    const bBadge = document.getElementById('b-badge');
    const bTitle = document.getElementById('b-title');
    const bDesc = document.getElementById('b-desc');
    const diagramOutputNode = document.getElementById('diagram-output-node');

    branchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            branchBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.getAttribute('data-branch');
            const data = branchData[key];

            if (data) {
                if (bBadge) bBadge.textContent = data.badge;
                if (bTitle) bTitle.textContent = data.title;
                if (bDesc) bDesc.textContent = data.desc;
                if (diagramOutputNode) diagramOutputNode.textContent = data.output;
            }
        });
    });

    // --- 5. Central Node Visualizer Diagram ---
    const nodeItems = document.querySelectorAll('.node-item');
    const inspHeader = document.getElementById('insp-header');
    const inspDesc = document.getElementById('insp-desc');

    nodeItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            nodeItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            const key = item.getAttribute('data-node');
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');

            if (inspHeader) inspHeader.textContent = `NODE // ${title}`;
            if (inspDesc) inspDesc.textContent = desc;

            const line = document.getElementById(`line-${key}`);
            if (line) {
                line.style.stroke = 'var(--accent-shopify)';
                line.style.strokeWidth = '2.5';
                line.style.strokeDasharray = 'none';
            }
        });

        item.addEventListener('mouseleave', () => {
            const key = item.getAttribute('data-node');
            item.classList.remove('active');

            if (inspHeader) inspHeader.textContent = 'HOVER NODES TO INSPECT ENGINE';
            if (inspDesc) inspDesc.textContent = 'Click or hover any node to inspect engineering details.';

            const line = document.getElementById(`line-${key}`);
            if (line) {
                line.style.stroke = '';
                line.style.strokeWidth = '';
                line.style.strokeDasharray = '';
            }
        });
    });

    // --- 6. Code <-> Storefront Interaction Playground ---
    const syncJson = document.getElementById('sync-json');
    const uiPrice = document.getElementById('ui-price');
    const uAddBtn = document.getElementById('u-add-btn');
    const colorSwatches = document.querySelectorAll('#u-colors .u-swatch');
    const sizeBtns = document.querySelectorAll('#u-sizes .u-size-btn');

    let currentSelection = { color: 'Black', size: 'M' };

    const variantMatrix = {
        'Black-S': { id: 4829103, price: 4900, sku: 'ATUL-BLK-S', avail: true },
        'Black-M': { id: 4829104, price: 4900, sku: 'ATUL-BLK-M', avail: true },
        'Black-L': { id: 4829105, price: 4900, sku: 'ATUL-BLK-L', avail: false },
        'Olive-S': { id: 4829203, price: 5400, sku: 'ATUL-OLV-S', avail: true },
        'Olive-M': { id: 4829204, price: 5400, sku: 'ATUL-OLV-M', avail: true },
        'Olive-L': { id: 4829205, price: 5400, sku: 'ATUL-OLV-L', avail: true },
        'Cyan-S':  { id: 4829303, price: 5900, sku: 'ATUL-CYN-S', avail: false },
        'Cyan-M':  { id: 4829304, price: 5900, sku: 'ATUL-CYN-M', avail: true },
        'Cyan-L':  { id: 4829305, price: 5900, sku: 'ATUL-CYN-L', avail: true }
    };

    function updatePlaygroundState() {
        const key = `${currentSelection.color}-${currentSelection.size}`;
        const data = variantMatrix[key] || { id: 0, price: 0, sku: 'N/A', avail: false };
        const priceFormatted = `$${(data.price / 100).toFixed(2)}`;

        if (syncJson) {
            syncJson.textContent = JSON.stringify({
                id: data.id,
                title: `${currentSelection.color} / ${currentSelection.size}`,
                option1: currentSelection.color,
                option2: currentSelection.size,
                price: priceFormatted,
                available: data.avail,
                sku: data.sku
            }, null, 2);
        }

        if (uiPrice) uiPrice.textContent = priceFormatted;

        if (uAddBtn) {
            if (data.avail) {
                uAddBtn.textContent = `[ ADD TO CART — ${priceFormatted} ]`;
                uAddBtn.style.opacity = '1';
                uAddBtn.disabled = false;
            } else {
                uAddBtn.textContent = '[ SOLD OUT ]';
                uAddBtn.style.opacity = '0.5';
                uAddBtn.disabled = true;
            }
        }
    }

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            currentSelection.color = swatch.getAttribute('data-color');
            updatePlaygroundState();
        });
    });

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSelection.size = btn.getAttribute('data-size');
            updatePlaygroundState();
        });
    });

    // --- 7. Interactive Terminal Shell Modal ---
    const termModal = document.getElementById('terminal-modal');
    const openTermBtn = document.getElementById('open-terminal-btn');
    const closeTermBtn = document.getElementById('close-terminal-btn');
    const termInput = document.getElementById('term-input');
    const termBody = document.getElementById('term-body');
    const termBtns = document.querySelectorAll('.t-btn');

    function openTerminal() {
        if (termModal) {
            termModal.classList.add('active');
            termModal.setAttribute('aria-hidden', 'false');
            if (termInput) termInput.focus();
        }
    }

    function closeTerminal() {
        if (termModal) {
            termModal.classList.remove('active');
            termModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (openTermBtn) openTermBtn.addEventListener('click', openTerminal);
    if (closeTermBtn) closeTermBtn.addEventListener('click', closeTerminal);

    if (termModal) {
        termModal.addEventListener('click', (e) => {
            if (e.target === termModal) closeTerminal();
        });
    }

    const commandDict = {
        'help': () => 'Available commands: philosophy, work, tools, experiments, shopify, contact, sudo hire atul, clear',
        'philosophy': () => 'CORE PHILOSOPHY: Don\'t rebuild everything just because you can. Understand existing systems. Keep what works. Extend what can be improved. Replace what is broken. Build the simplest useful solution.',
        'work': () => 'VERIFIED PROJECTS:\n1. figclaw (Public AI+Figma integration)\n2. Limit_Tracker (Public Chrome API Usage Extension)\n3. Shopify-Profile-Switcher (Private Admin Developer Utility)\n4. ShopifyThemeCheck (Shopify Theme & App Inspector Tool)\n5. wacspace (Shopify + Claude Code Direct Bridge)\n6. wishify (Wishlist / E-Commerce Logic)\n7. wimb (Distance Metric Experiment)',
        'shopify': () => 'SHOPIFY CAPABILITIES:\n- Custom Theme Architecture (Liquid, Dawn Base)\n- Multi-Dimensional Variant Logic & Swatches\n- Customer & Product Metafields / Metaobjects\n- Storefront GraphQL & Admin REST APIs\n- AJAX Cart Drawer & Section Rendering API',
        'tools': () => 'DEVELOPER TOOLS:\n- Limit_Tracker Chrome Extension\n- Shopify-Profile-Switcher Admin Utility\n- ShopifyThemeCheck Extractor Tool\n- figclaw (Claude + Figma bridge)\n- wacspace (Shopify + Claude Code bridge)',
        'experiments': () => 'EXPERIMENTS:\n- wimb (Certainty under uncertainty metric engine)\n- Code <-> Storefront State Synchronizer Playground',
        'contact': () => 'Email: atulmundakkal@outlook.com\nGitHub: https://github.com/Atul8007\nLinkedIn: https://linkedin.com/in/atul-mundakkal',
        'sudo hire atul': () => `Checking system compatibility...\nSystems Thinking ......... ✓\nShopify Engineering ....... ✓\nDeveloper Tooling ......... ✓\nMinimal Infrastructure .... ✓ (₹0/month)\n\nSTATUS: READY TO COLLABORATE.\nEmail: atulmundakkal@outlook.com`,
        'clear': () => 'CLEAR'
    };

    function executeCmd(cmd) {
        const clean = cmd.trim().toLowerCase();
        if (!clean) return;

        if (clean === 'clear') {
            termBody.innerHTML = '<div class="t-line">Terminal cleared. Type <span class="t-hl">help</span> for commands.</div>';
            return;
        }

        const inputLine = document.createElement('div');
        inputLine.className = 't-line';
        inputLine.innerHTML = `<span class="t-prompt">atul@system ~ %</span> <span class="t-hl">${cmd}</span>`;
        termBody.appendChild(inputLine);

        const response = commandDict[clean] ? commandDict[clean]() : `Command not recognized: "${clean}". Type "help" for valid commands.`;

        const outputLine = document.createElement('div');
        outputLine.className = 't-line';
        outputLine.style.whiteSpace = 'pre-wrap';
        outputLine.style.color = 'var(--text-secondary)';
        outputLine.textContent = response;
        termBody.appendChild(outputLine);

        termBody.scrollTop = termBody.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCmd(termInput.value);
                termInput.value = '';
            }
        });
    }

    termBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) executeCmd(cmd);
        });
    });

    // --- 8. Copy Email Helper ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<span>[ EMAIL COPIED! ]</span>';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalText;
                    }, 2500);
                });
            }
        });
    }

    // --- 9. Mobile Menu Navigation Toggle ---
    const navToggle = document.getElementById('fde-mobile-toggle');
    const navMenu = document.getElementById('fde-nav');
    const navLinks = document.querySelectorAll('.fde-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const active = navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', active);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
