/**
 * ATUL MUNDAKKAL — SHOPIFY DEVELOPER & FULL-STACK ENGINEER
 * Documentation Engine & Command Palette Search (Pure Vanilla ES6+)
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

    // --- 3. Precision Contextual Cursor ---
    const cursor = document.getElementById('fde-cursor');
    const cursorTag = document.getElementById('cursor-tag');

    if (cursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveEls = document.querySelectorAll('a, button, .branch-btn, .u-swatch, .u-size-btn, .doc-case-study, .search-item, .focus-pill-card');
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

    // --- 4. Sidebar Mobile Drawer Toggle ---
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

    // --- 5. Command Palette Search Engine (⌘K / Ctrl+K) ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchDatabase = [
        { title: "Overview & Introduction", sub: "Atul Mundakkal — Shopify Developer", tag: "HERO", id: "overview" },
        { title: "What I Work On", sub: "Themes, Variants, Checkout, APIs, Liquid, Tools", tag: "DOMAINS", id: "focus" },
        { title: "How I Solve Problems", sub: "Understand → Preserve → Improve → Replace", tag: "APPROACH", id: "problem-solving" },
        { title: "figclaw", sub: "Claude to Figma direct API bridge", tag: "PROJECT", id: "figclaw" },
        { title: "Limit_Tracker", sub: "Public Chrome extension for API rate limits", tag: "EXTENSION", id: "limit-tracker" },
        { title: "Shopify-Profile-Switcher", sub: "Private Admin developer profile utility", tag: "UTILITY", id: "profile-switcher" },
        { title: "ShopifyThemeCheck", sub: "Shopify theme, app script & asset inspector", tag: "INSPECTOR", id: "theme-check" },
        { title: "wacspace", sub: "Direct Shopify CLI to Claude Code bridge", tag: "BRIDGE", id: "wacspace" },
        { title: "wishify", sub: "Wishlist logic with Customer Metafields", tag: "APPLICATION", id: "wishify" },
        { title: "wimb", sub: "Distance metric experiment for state certainty", tag: "EXPERIMENT", id: "wimb" },
        { title: "Tools I've Built", sub: "Extensions, inspectors, and utilities", tag: "TOOLS", id: "tools-built" },
        { title: "About How I Work", sub: "Short human explanation of systems approach", tag: "ABOUT", id: "about-how-i-work" },
        { title: "Experience Timeline", sub: "2024–Present Shopify developer journey", tag: "TIMELINE", id: "experience" },
        { title: "Available for Shopify Work", sub: "Contact & email links", tag: "CONTACT", id: "contact" }
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

    // --- 6. ScrollSpy (TOC & Sidebar Active State) ---
    const sectionIds = [
        'overview', 'focus', 'problem-solving', 'selected-work',
        'figclaw', 'limit-tracker', 'profile-switcher', 'theme-check',
        'wacspace', 'wishify', 'wimb', 'tools-built',
        'about-how-i-work', 'experience', 'contact'
    ];

    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    const tocLinks = document.querySelectorAll('.toc-link');
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

        // Update Breadcrumb
        if (breadcrumbCurrent) {
            const cleanTitle = currentSection.replace('-', ' ').toUpperCase();
            breadcrumbCurrent.textContent = cleanTitle === 'OVERVIEW' ? 'Overview' : cleanTitle;
        }

        // Update TOC Links
        tocLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Sidebar Links
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

    // --- 7. Interactive System Decision Engine ---
    const branchData = {
        keep: {
            badge: "STRATEGY: PRESERVE NATIVE",
            title: "Preserve Working Platform Fundamentals",
            desc: "When existing native features (like Shopify Customer Metafields or theme sections) already solve 80% of the problem, do not introduce extra databases or paid apps. Preserve native capabilities to minimize ongoing maintenance cost.",
            output: "PRESERVE NATIVE PLATFORM"
        },
        extend: {
            badge: "STRATEGY: IMPROVE VIA CODE",
            title: "Extend Native Capabilities via Lightweight APIs",
            desc: "When native features fall short of specific merchant needs, build targeted client-side state managers or App Proxies around platform capabilities rather than replacing the core system.",
            output: "IMPROVE VIA LIGHTWEIGHT CODE"
        },
        replace: {
            badge: "STRATEGY: REPLACE BROKEN FRICTION",
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
        'help': () => 'Available commands: philosophy, work, tools, experiments, shopify, contact, sudo hire atul, clear',
        'philosophy': () => 'HOW I SOLVE PROBLEMS: Understand → Preserve → Improve → Replace.',
        'work': () => 'SELECTED WORK:\n1. figclaw (Claude + Figma API Bridge)\n2. Limit_Tracker (Public Chrome API Usage Extension)\n3. Shopify-Profile-Switcher (Private Admin Developer Utility)\n4. ShopifyThemeCheck (Shopify Theme & App Inspector Tool)\n5. wacspace (Shopify + Claude Code Direct Bridge)\n6. wishify (Wishlist / E-Commerce Logic)\n7. wimb (Distance Metric Experiment)',
        'shopify': () => 'WHAT I WORK ON:\n- Themes & Liquid 2.0\n- Multi-Dimensional Variant Logic\n- Checkout & Metafield Sync\n- Storefront GraphQL & Admin REST APIs\n- Developer Tools & Utilities',
        'tools': () => 'TOOLS I\'VE BUILT:\n- Limit_Tracker Chrome Extension\n- ShopifyThemeCheck Extractor Tool\n- Shopify-Profile-Switcher Admin Utility\n- figclaw (Claude + Figma bridge)\n- wacspace (Shopify + Claude Code bridge)',
        'experiments': () => 'EXPERIMENTS:\n- wimb (Certainty under uncertainty metric engine)',
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
