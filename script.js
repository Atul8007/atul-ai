/**
 * ATUL.OS — SHOPIFY ENGINEERING WORKSPACE ENGINE
 * Pure Vanilla JavaScript (ES6+) — Zero Dependency Architecture
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Year ---
    const yearSpan = document.getElementById('f-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. Precision Contextual Cursor ---
    const cursor = document.getElementById('os-cursor');
    const cursorTag = document.getElementById('cursor-tag');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveEls = document.querySelectorAll('[data-cursor], a, button, .node-item, .work-row-summary, .d-btn, .sys-tab, .swatch, .size-btn');
        interactiveEls.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const tag = el.getAttribute('data-cursor') || 'OPEN';
                if (cursorTag) cursorTag.textContent = tag;
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }

    // --- 3. Central Node Visualizer Diagram ---
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

            // Highlight line
            const line = document.getElementById(`line-${key}`);
            if (line) {
                line.style.stroke = '#95bf47';
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

    // --- 4. Expandable WORK Index Rows ---
    const workRows = document.querySelectorAll('.work-row');
    workRows.forEach(row => {
        const summary = row.querySelector('.work-row-summary');
        if (summary) {
            summary.addEventListener('click', () => {
                const isOpen = row.classList.contains('open');
                workRows.forEach(r => r.classList.remove('open'));
                if (!isOpen) row.classList.add('open');
            });
        }
    });

    // --- 5. LAB DEBUG MODE ---
    const debugData = {
        variants: {
            failSteps: `<span>USER SELECTION</span> &rarr; <span>STATE CHANGE</span> &rarr; <span>ASYNC REQUEST</span> &rarr; <span class="err">STALE RESPONSE</span> &rarr; <span class="err">WRONG VARIANT</span>`,
            fixText: "Request identity tracking + State validation + Centralized option matrix listener"
        },
        cart: {
            failSteps: `<span>ADD TO CART</span> &rarr; <span>THEME REDIRECT</span> &rarr; <span class="err">LAYOUT SHIFT</span> &rarr; <span class="err">SLOW CHECKOUT</span>`,
            fixText: "Asynchronous Fetch API + Section Rendering API + Drawer cart state manager"
        },
        speed: {
            failSteps: `<span>PAGE LOAD</span> &rarr; <span>NESTED LIQUID LOOPS</span> &rarr; <span class="err">TTFB DELAY</span> &rarr; <span class="err">UN-OPTIMIZED IMAGES</span>`,
            fixText: "Metafield direct references + Cached liquid filters + Responsive srcset image loading"
        },
        metafields: {
            failSteps: `<span>ADMIN INPUT</span> &rarr; <span class="err">UNSTRUCTURED TEXT</span> &rarr; <span class="err">THEME CONFLICT</span> &rarr; <span>BROKEN TABS</span>`,
            fixText: "Strict Metafield/Metaobject definitions + Liquid object mapping + Merchant-proof admin schema"
        }
    };

    const dBtns = document.querySelectorAll('.d-btn');
    const dFailSteps = document.getElementById('d-failure-steps');
    const dFixContent = document.getElementById('d-fix-content');

    dBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const key = btn.getAttribute('data-debug');
            const data = debugData[key];

            if (data) {
                if (dFailSteps) dFailSteps.innerHTML = data.failSteps;
                if (dFixContent) dFixContent.textContent = data.fixText;
            }
        });
    });

    // --- 6. Signature Code <-> Storefront Interaction Demo ---
    const stateCode = document.getElementById('sig-state-code');
    const sfPrice = document.getElementById('sf-price');
    const sfAddBtn = document.getElementById('sf-add-btn');
    const colorSwatches = document.querySelectorAll('#sf-color-swatches .swatch');
    const sizeBtns = document.querySelectorAll('#sf-size-buttons .size-btn');

    let currentSelection = {
        color: 'Black',
        size: 'M'
    };

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

    function updateSignatureState() {
        const key = `${currentSelection.color}-${currentSelection.size}`;
        const data = variantMatrix[key] || { id: 0, price: 0, sku: 'N/A', avail: false };
        const priceFormatted = `$${(data.price / 100).toFixed(2)}`;

        // Update JSON Code Box
        if (stateCode) {
            stateCode.textContent = JSON.stringify({
                id: data.id,
                title: `${currentSelection.color} / ${currentSelection.size}`,
                option1: currentSelection.color,
                option2: currentSelection.size,
                price: data.price,
                available: data.avail,
                sku: data.sku
            }, null, 2);
        }

        // Update Storefront Price & Button State
        if (sfPrice) sfPrice.textContent = priceFormatted;
        if (sfAddBtn) {
            if (data.avail) {
                sfAddBtn.textContent = `[ ADD TO CART — ${priceFormatted} ]`;
                sfAddBtn.style.opacity = '1';
                sfAddBtn.disabled = false;
            } else {
                sfAddBtn.textContent = '[ SOLD OUT ]';
                sfAddBtn.style.opacity = '0.5';
                sfAddBtn.disabled = true;
            }
        }
    }

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            currentSelection.color = swatch.getAttribute('data-color');
            updateSignatureState();
        });
    });

    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSelection.size = btn.getAttribute('data-size');
            updateSignatureState();
        });
    });

    // --- 7. SYSTEM View Switcher ---
    const sysTabs = document.querySelectorAll('.sys-tab');
    const sysViews = document.querySelectorAll('.sys-view');

    sysTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            sysTabs.forEach(t => t.classList.remove('active'));
            sysViews.forEach(v => v.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-sys');

            if (targetId === 'stack') document.getElementById('view-stack')?.classList.add('active');
            if (targetId === 'about') document.getElementById('view-about')?.classList.add('active');
            if (targetId === 'experience') document.getElementById('view-experience')?.classList.add('active');
        });
    });

    // --- 8. Interactive Terminal Modal ---
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
        'help': () => 'Supported commands: whoami, about, skills, shopify, projects, tools, experience, contact, sudo hire atul, clear',
        'whoami': () => 'ATUL MUNDAKKAL — Shopify Developer & Full-Stack Engineer based in India.',
        'about': () => 'FOCUS: I build the parts of Shopify that don\'t come out of the box (Liquid, Variants, Metafields, APIs, Performance).',
        'shopify': () => 'CORE SPECIALIZATION:\n- Liquid Theme Architecture & Custom Sections\n- Variant State & Swatch Logic\n- Metafields & Metaobjects Schemas\n- Storefront GraphQL & Admin REST APIs\n- AJAX Drawer Carts & Zero-Dependency Code',
        'projects': () => '1. SHOPIFY WISHLIST ENGINE (Metafields + App Proxy)\n2. SHOPIFY DEVELOPER TOOLS (VS Code Snippet Extension)\n3. INTERACTIVE TERMINAL SHELL (htmlviewer.html)',
        'tools': () => 'SHOPIFY LIQUID SNIPPETS HELPER — VS Code extension for Liquid auto-completion and section schema generation.',
        'experience': () => '- SOFTWARE DEVELOPER @ WEBANDCRAFTS (Dec 2024 - Present)\n- SHOPIFY DEVELOPER @ RDP WORKSTATION (May 2024 - Oct 2024)',
        'contact': () => 'Email: atulmundakkal@outlook.com\nGitHub: https://github.com/Atul8007\nLinkedIn: https://linkedin.com/in/atul-mundakkal',
        'sudo hire atul': () => `Checking compatibility...\nShopify ................. ✓\nLiquid .................. ✓\nProblem solving ......... ✓\nDeveloper tools ......... ✓\n\nSTATUS: READY. Email: atulmundakkal@outlook.com`,
        'clear': () => 'CLEAR'
    };

    function executeTermCmd(cmd) {
        const clean = cmd.trim().toLowerCase();
        if (!clean) return;

        if (clean === 'clear') {
            termBody.innerHTML = '<div class="term-line">Terminal cleared. Type <span class="hl">help</span> for available commands.</div>';
            return;
        }

        const inputLine = document.createElement('div');
        inputLine.className = 'term-line';
        inputLine.innerHTML = `<span class="term-prompt">atul@portfolio ~ %</span> <span class="hl">${cmd}</span>`;
        termBody.appendChild(inputLine);

        const response = commandDict[clean] ? commandDict[clean]() : `Command not found: "${clean}". Type "help" for supported commands.`;
        
        const outputLine = document.createElement('div');
        outputLine.className = 'term-line';
        outputLine.style.whiteSpace = 'pre-wrap';
        outputLine.style.color = '#94a3b8';
        outputLine.textContent = response;
        termBody.appendChild(outputLine);

        termBody.scrollTop = termBody.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeTermCmd(termInput.value);
                termInput.value = '';
            }
        });
    }

    termBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) executeTermCmd(cmd);
        });
    });

    // --- 9. Copy Email Helper ---
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

    // --- 10. Mobile Navigation Toggle ---
    const navToggle = document.getElementById('os-mobile-toggle');
    const navMenu = document.getElementById('os-nav');
    const navLinks = document.querySelectorAll('.os-link');

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
