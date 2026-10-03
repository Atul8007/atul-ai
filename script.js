/**
 * ATUL MUNDAKKAL — SHOPIFY FULL-STACK ENGINEER
 * Multi-Page Documentation Engine & Command Palette Search
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

    const savedTheme = localStorage.getItem('fde-doc-theme') || 'dark';
    setTheme(savedTheme);

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('fde-doc-theme', theme);
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.innerHTML = `<svg class="px-icon" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#f59e0b" d="M6 2h4v1H6V2zM4 4h2v1H4V4zm8 0h-2v1h2V4zM3 6h1v4H3V6zm10 0h-1v4h1V6zM4 10h2v1H4v-1zm8 0h-2v1h2v-1zM6 12h4v1H6v-1z"/></svg>`;
                themeText.textContent = 'DARK';
            } else {
                themeIcon.innerHTML = `<svg class="px-icon" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#f59e0b" d="M7 1h2v2H7V1zm-4 2h2v2H3V3zm10 0h-2v2h2V3zM1 7h2v2H1V7zm13 0h2v2h-2V7zM3 11h2v2H3v-2zm10 0h-2v2h2v-2zM7 13h2v2H7v-2zm-1-6h4v4H6V7z"/></svg>`;
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

    // --- 3. Sidebar Mobile Drawer Toggle ---
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const docSidebar = document.getElementById('doc-sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    if (sidebarToggleBtn && docSidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            const active = docSidebar.classList.toggle('active');
            sidebarToggleBtn.setAttribute('aria-expanded', active);
        });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                docSidebar.classList.remove('active');
                if (sidebarToggleBtn) sidebarToggleBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- 4. Multi-Page Active Link Highlighting ---
    const currentPath = window.location.pathname.toLowerCase();
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPath = href.toLowerCase();
        
        // Exact match or basename match
        if (
            (currentPath === '/' && (linkPath === '/index.html' || linkPath === '/')) ||
            (currentPath.endsWith(linkPath) && linkPath !== '/') ||
            (currentPath.includes('/projects/') && linkPath.includes(currentPath.split('/').pop()))
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- 5. Command Palette Search Engine (⌘K / Ctrl+K) Across Multi-Pages ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchDatabase = [
        { title: "Overview & Introduction", sub: "Atul Mundakkal — Shopify Full-Stack Engineer", tag: "DOCS", url: "/index.html" },
        { title: "What I Work On", sub: "Themes & Liquid, Variants, Cart & Checkout, Shopify APIs, Developer Tools", tag: "DOMAINS", url: "/what-i-work-on.html" },
        { title: "How I Solve Problems", sub: "01 Understand → 02 Preserve → 03 Improve → 04 Replace", tag: "APPROACH", url: "/how-i-solve-problems.html" },
        { title: "Selected Projects Directory", sub: "Overview of all 5 developer tools & platform integrations", tag: "PROJECTS", url: "/projects.html" },
        { title: "figclaw", sub: "Figma → Claude workflow bridge via Figma REST API", tag: "CASE STUDY", url: "/projects/figclaw.html" },
        { title: "Profile Switcher", sub: "VS Code extension for Shopify CLI account management", tag: "CASE STUDY", url: "/projects/profile-switcher.html" },
        { title: "Theme Inspector", sub: "Shopify storefront inspection Chrome extension (Manifest V3)", tag: "CASE STUDY", url: "/projects/theme-inspector.html" },
        { title: "wacspace", sub: "Shopify CLI → AI development bridge", tag: "CASE STUDY", url: "/projects/wacspace.html" },
        { title: "wishify", sub: "Shopify-native wishlist experiment using customer metafields", tag: "CASE STUDY", url: "/projects/wishify.html" },
        { title: "Technical Lab", sub: "API limit monitor & variant state sync demo", tag: "LAB", url: "/lab.html" },
        { title: "Capabilities", sub: "Shopify Ecosystem, Full-Stack & Systems Thinking", tag: "MATRIX", url: "/capabilities.html" },
        { title: "Experience Timeline", sub: "Webandcrafts, RDP Workstations, Ekatra Infotech", tag: "TIMELINE", url: "/experience.html" },
        { title: "About", sub: "Engineering philosophy & approach explanation", tag: "ABOUT", url: "/about.html" },
        { title: "Get in Touch", sub: "Contact & email direct links", tag: "CONTACT", url: "/contact.html" }
    ];

    let selectedSearchIndex = 0;

    function openSearch() {
        if (searchModal) {
            searchModal.classList.add('active');
            searchModal.setAttribute('aria-hidden', 'false');
            if (searchInput) {
                searchInput.value = '';
                searchInput.focus();
                renderSearchResults('');
            }
        }
    }

    function closeSearch() {
        if (searchModal) {
            searchModal.classList.remove('active');
            searchModal.setAttribute('aria-hidden', 'true');
        }
    }

    function renderSearchResults(query) {
        if (!searchResults) return;
        const q = query.toLowerCase().trim();
        const filtered = q ? searchDatabase.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.sub.toLowerCase().includes(q) || 
            item.tag.toLowerCase().includes(q)
        ) : searchDatabase;

        selectedSearchIndex = 0;

        if (filtered.length === 0) {
            searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No matching result found.</div>';
            return;
        }

        searchResults.innerHTML = filtered.map((item, idx) => `
            <div class="search-item ${idx === 0 ? 'selected' : ''}" data-url="${item.url}" data-idx="${idx}">
                <div class="s-item-left">
                    <span class="s-item-title">${item.title}</span>
                    <span class="s-item-sub">${item.sub}</span>
                </div>
                <span class="s-item-tag">${item.tag}</span>
            </div>
        `).join('');

        const itemEls = searchResults.querySelectorAll('.search-item');
        itemEls.forEach(el => {
            el.addEventListener('click', () => {
                const targetUrl = el.getAttribute('data-url');
                closeSearch();
                window.location.href = targetUrl;
            });
        });
    }

    if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openSearch);
    if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchModal && searchModal.classList.contains('active') ? closeSearch() : openSearch();
        } else if (e.key === 'Escape') {
            closeSearch();
            closeTerminal();
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            const items = searchResults.querySelectorAll('.search-item');
            if (items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[selectedSearchIndex]?.classList.remove('selected');
                selectedSearchIndex = (selectedSearchIndex + 1) % items.length;
                items[selectedSearchIndex]?.classList.add('selected');
                items[selectedSearchIndex]?.scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                items[selectedSearchIndex]?.classList.remove('selected');
                selectedSearchIndex = (selectedSearchIndex - 1 + items.length) % items.length;
                items[selectedSearchIndex]?.classList.add('selected');
                items[selectedSearchIndex]?.scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const activeItem = items[selectedSearchIndex];
                if (activeItem) {
                    const targetUrl = activeItem.getAttribute('data-url');
                    closeSearch();
                    window.location.href = targetUrl;
                }
            }
        });
    }

    // --- 6. Code Copy Buttons ---
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-code');
            const codeEl = document.getElementById(targetId);
            if (codeEl && navigator.clipboard) {
                navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
                    const originalText = btn.textContent;
                    btn.textContent = 'COPIED!';
                    btn.style.color = 'var(--accent-shopify)';
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.color = '';
                    }, 2000);
                });
            }
        });
    });

    // --- 7. Code ↔ UX State Synchronizer Playground ---
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

    // --- 8. Interactive ATUL Shell Terminal ---
    const termModal = document.getElementById('terminal-modal');
    const heroTermBtn = document.getElementById('hero-terminal-btn');
    const sidebarTermBtn = document.getElementById('sidebar-terminal-btn');
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

    if (heroTermBtn) heroTermBtn.addEventListener('click', openTerminal);
    if (sidebarTermBtn) sidebarTermBtn.addEventListener('click', openTerminal);
    if (closeTermBtn) closeTermBtn.addEventListener('click', closeTerminal);

    if (termModal) {
        termModal.addEventListener('click', (e) => {
            if (e.target === termModal) closeTerminal();
        });
    }

    const commandDict = {
        'help': () => 'Available commands: philosophy, work, tools, shopify, contact, sudo hire atul, clear',
        'philosophy': () => '01 Understand → 02 Preserve → 03 Improve → 04 Replace.',
        'work': () => 'SELECTED PROJECTS:\n1. figclaw (/projects/figclaw.html)\n2. Profile Switcher (/projects/profile-switcher.html)\n3. Theme Inspector (/projects/theme-inspector.html)\n4. wacspace (/projects/wacspace.html)\n5. wishify (/projects/wishify.html)',
        'shopify': () => 'WHAT I WORK ON:\n- Themes & Liquid (/what-i-work-on.html)\n- Variants & Product Systems\n- Cart & Checkout\n- Shopify APIs\n- Developer Tools',
        'tools': () => 'DEVELOPER TOOLS & PROJECTS:\n- figclaw (Node.js, Figma REST API)\n- Profile Switcher (VS Code Extension API)\n- Theme Inspector (Manifest V3 Chrome Extension)\n- wacspace (Node.js, Shopify CLI)\n- wishify (TypeScript, Customer Metafields)',
        'contact': () => 'Email: atulmundakkal@outlook.com\nGitHub: https://github.com/Atul8007\nLinkedIn: https://linkedin.com/in/atul-mundakkal',
        'sudo hire atul': () => `Checking system compatibility...\nShopify Engineering ....... ✓\nSystems Thinking ......... ✓\nDeveloper Tooling ......... ✓\nMinimal Infrastructure .... ✓ (₹0/month)\n\nSTATUS: AVAILABLE FOR SHOPIFY WORK.\nEmail: atulmundakkal@outlook.com`,
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

    // --- 9. Copy Email Helper ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<span>Copied Email!</span>';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalText;
                    }, 2500);
                });
            }
        });
    }
});
