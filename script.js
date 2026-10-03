/**
 * ATUL MUNDAKKAL — SHOPIFY DEVELOPER & FULL-STACK ENGINEER
 * Complete Documentation Engine & Command Palette Search (Pure Vanilla ES6+)
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

    // --- 4. Command Palette Search Engine (⌘K / Ctrl+K) ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchDatabase = [
        { title: "Overview & Introduction", sub: "Atul Mundakkal — Shopify Developer & Full-Stack Engineer", tag: "DOCS", id: "overview" },
        { title: "What I Work On", sub: "Themes, Variants, Checkout, APIs, Liquid, Developer Tools", tag: "DOMAINS", id: "focus" },
        { title: "How I Solve Problems", sub: "Understand → Preserve → Improve → Replace sequence", tag: "APPROACH", id: "problem-solving" },
        { title: "figclaw", sub: "AI-powered design-to-development workflow bridge (Claude to Figma)", tag: "PROJECT", id: "figclaw" },
        { title: "Profile Switcher", sub: "Lightweight Shopify developer workflow tool for environment switching", tag: "PROJECT", id: "profile-switcher" },
        { title: "ShopifyThemeCheck", sub: "Shopify theme inspection and developer tooling", tag: "PROJECT", id: "theme-check" },
        { title: "Technical Playground", sub: "API limit monitor & variant state sync demo", tag: "LAB", id: "playground" },
        { title: "Capabilities Matrix", sub: "Ecosystem, Full-stack & Tooling proficiencies", tag: "MATRIX", id: "capabilities" },
        { title: "About How I Work", sub: "Human explanation of engineering philosophy", tag: "ABOUT", id: "about-how-i-work" },
        { title: "Experience Timeline", sub: "2024–Present developer timeline", tag: "TIMELINE", id: "experience" },
        { title: "Available for Shopify Work", sub: "Contact & email direct links", tag: "CONTACT", id: "contact" }
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
            <div class="search-item ${idx === 0 ? 'selected' : ''}" data-id="${item.id}" data-idx="${idx}">
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
                const targetId = el.getAttribute('data-id');
                closeSearch();
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
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
                    const targetId = activeItem.getAttribute('data-id');
                    closeSearch();
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // --- 5. ScrollSpy (Active Sidebar Link) ---
    const sectionIds = [
        'overview', 'focus', 'problem-solving',
        'figclaw', 'profile-switcher', 'theme-check',
        'playground', 'capabilities', 'about-how-i-work', 'experience', 'contact'
    ];

    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const navSidebarLinks = document.querySelectorAll('.sidebar-link');

    function updateActiveDocSection() {
        let currentSection = 'overview';
        const scrollPosition = window.scrollY + 120;

        for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPosition) {
                currentSection = id;
            }
        }

        if (breadcrumbCurrent) {
            const cleanTitle = currentSection.replace('-', ' ').toUpperCase();
            breadcrumbCurrent.textContent = cleanTitle === 'OVERVIEW' ? 'Overview' : cleanTitle;
        }

        navSidebarLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveDocSection, { passive: true });
    updateActiveDocSection();

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
        'philosophy': () => 'HOW I SOLVE PROBLEMS: Understand → Preserve → Improve → Replace.',
        'work': () => 'PUBLIC PROJECTS:\n1. figclaw (Claude + Figma API Bridge)\n2. Profile Switcher (Private Admin Developer Profile Utility)\n3. ShopifyThemeCheck (Shopify Theme & App Inspector Tool)',
        'shopify': () => 'WHAT I WORK ON:\n- Themes & Liquid 2.0\n- Multi-Option Variant Systems\n- Checkout & Metafield Sync\n- Storefront GraphQL & Admin REST APIs\n- Developer Tools & Utilities',
        'tools': () => 'DEVELOPER TOOLS:\n- Profile Switcher Admin Utility\n- ShopifyThemeCheck Inspector Tool\n- figclaw (Claude + Figma API bridge)',
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
