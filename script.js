/**
 * ATUL MUNDAKKAL — DEVELOPER PORTFOLIO ENGINE
 * Inspired by Shopify.dev Documentation System & Pixelated Retro Icons
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle System (Default to Dark Retro Theme) ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('atul-doc-theme') || 'dark';
    setTheme(savedTheme);

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('atul-doc-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.innerHTML = `<svg class="px-icon" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#f59e0b" d="M6 2h4v1H6V2zM4 4h2v1H4V4zm8 0h-2v1h2V4zM3 6h1v4H3V6zm10 0h-1v4h1V6zM4 10h2v1H4v-1zm8 0h-2v1h2v-1zM6 12h4v1H6v-1z"/></svg>`;
            } else {
                themeIcon.innerHTML = `<svg class="px-icon" viewBox="0 0 16 16" shape-rendering="crispEdges"><path fill="#f59e0b" d="M7 1h2v2H7V1zm-4 2h2v2H3V3zm10 0h-2v2h2V3zM1 7h2v2H1V7zm13 0h2v2h-2V7zM3 11h2v2H3v-2zm10 0h-2v2h2v-2zM7 13h2v2H7v-2zm-1-6h4v4H6V7z"/></svg>`;
            }
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // --- 2. Mobile Sidebar Toggle ---
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
            });
        });
    }

    // --- 3. Sidebar Active Link Highlighting ---
    const currentPath = window.location.pathname.toLowerCase();
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        const linkPath = href.toLowerCase();
        
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

    // --- 4. Single Page ScrollSpy & Anchor Smooth Scroll ---
    const topNavLinks = document.querySelectorAll('.top-nav-link');
    const singlePageSections = ['overview', 'projects', 'about', 'experience', 'contact'].map(id => document.getElementById(id)).filter(Boolean);

    topNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    const headerHeight = document.getElementById('doc-header')?.offsetHeight || 64;
                    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 16;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    topNavLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    if (singlePageSections.length > 0) {
        const topNavObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    topNavLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0
        });

        singlePageSections.forEach(sec => topNavObserver.observe(sec));
    }


    // --- 5. Command Palette Search & Assistant Engine (⌘K or /) ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const askAssistantBtn = document.getElementById('ask-assistant-btn');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchDatabase = [
        { title: "Overview & Introduction", sub: "Atul Mundakkal — Shopify Forward Deployed Engineer", tag: "PORTFOLIO", url: "/index.html" },
        { title: "Unlimited Product Variants on Shopify", sub: "Native metafields. Native metaobjects. No apps.", tag: "CASE STUDY", url: "/case-studies/unlimited-variants.html" },
        { title: "Multi-Dropdown Search Filtering on Shopify", sub: "Every metafield value. Every dropdown. Searchable. No apps.", tag: "CASE STUDY", url: "/case-studies/multi-dropdown-filtering.html" },
        { title: "Custom Product Option Values on Shopify", sub: "Metafield-driven swatches. Metaobject entries. No variant limits.", tag: "CASE STUDY", url: "/case-studies/option-values.html" },
        { title: "Projects Directory", sub: "Featured developer tools & Shopify case studies", tag: "PROJECTS", url: "/projects.html" },
        { title: "FigClaw", sub: "Design-to-code workflow for turning structured design instructions into usable interfaces", tag: "PROJECT", url: "/projects/figclaw.html" },
        { title: "Profile Switcher", sub: "Shopify developer tooling for managing and switching CLI development contexts", tag: "PROJECT", url: "/projects/profile-switcher.html" },
        { title: "ShopifyThemeCheck", sub: "Shopify theme analysis and storefront asset inspection tool", tag: "PROJECT", url: "/projects/theme-inspector.html" },
        { title: "About", sub: "Platform philosophy and engineering approach", tag: "ABOUT", url: "/about.html" },
        { title: "Experience & Capabilities", sub: "Work history, Liquid architecture, Storefront API timeline", tag: "EXPERIENCE", url: "/experience.html" },
        { title: "Contact", sub: "Direct email and developer channels", tag: "CONTACT", url: "/contact.html" }
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
            searchResults.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.84rem;">No matching documentation page found.</div>';
            return;
        }

        searchResults.innerHTML = filtered.map((item, idx) => `
            <div class="search-item ${idx === 0 ? 'selected' : ''}" data-url="${item.url}" data-idx="${idx}">
                <div>
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
        const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
        
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchModal && searchModal.classList.contains('active') ? closeSearch() : openSearch();
        } else if (e.key === 'Escape') {
            closeSearch();
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

    // --- 7. Interactive Mini Terminal (Hero Banner) ---
    const miniTermInput = document.getElementById('mini-term-input');
    const miniTermBody = document.getElementById('mini-term-body');
    const miniTermBtns = document.querySelectorAll('.t-btn');

    const miniCommandDict = {
        'help': () => 'Available commands: philosophy, projects, shopify, tools, skills, about, contact, sudo hire atul, clear',
        'philosophy': () => '01 Understand → 02 Preserve → 03 Improve → 04 Replace.',
        'projects': () => 'SELECTED PROJECTS:\n1. FigClaw (/projects/figclaw.html)\n2. Profile Switcher (/projects/profile-switcher.html)\n3. ShopifyThemeCheck (/projects/theme-inspector.html)',
        'work': () => 'SELECTED PROJECTS:\n1. FigClaw (/projects/figclaw.html)\n2. Profile Switcher (/projects/profile-switcher.html)\n3. ShopifyThemeCheck (/projects/theme-inspector.html)',
        'shopify': () => 'WHAT I WORK ON:\n- Themes & Liquid Architecture\n- Multi-Option Variant Systems\n- Cart Drawers & Checkout UI Extensions\n- Storefront GraphQL & Admin REST APIs\n- Developer Tools & Inspection Utilities',
        'tools': () => 'DEVELOPER TOOLS:\n- FigClaw (Figma REST API → Structured AI Context)\n- Profile Switcher (VS Code Extension API)\n- ShopifyThemeCheck (Manifest V3 Chrome Extension)',
        'skills': () => 'TECHNICAL SKILLS:\n- Themes & Liquid Architecture\n- Storefront GraphQL & Admin APIs\n- VS Code Extension API & Node.js\n- Manifest V3 Chrome Extension API\n- Checkout UI Extensions & Metafields',
        'about': () => 'Atul Mundakkal — Shopify Forward Deployed Engineer.\nI build the parts of Shopify that don\'t come out of the box (Liquid, Variants, Metafields, APIs, Performance).',
        'bio': () => 'Atul Mundakkal — Shopify Forward Deployed Engineer.\nI build the parts of Shopify that don\'t come out of the box (Liquid, Variants, Metafields, APIs, Performance).',
        'whoami': () => 'Atul Mundakkal — Shopify Forward Deployed Engineer.\nI build the parts of Shopify that don\'t come out of the box (Liquid, Variants, Metafields, APIs, Performance).',
        'contact': () => 'Email: atulmundakkal@icloud.com\nGitHub: https://github.com/Atul8007\nLinkedIn: https://linkedin.com/in/atul-mundakkal',
        'sudo hire atul': () => `Checking system compatibility...\nShopify Engineering ....... ✓\nLiquid Architecture ....... ✓\nCLI & Extension Tools ..... ✓\nEdge & Cloud Architecture .. ✓\n\nSTATUS: AVAILABLE FOR SHOPIFY FORWARD DEPLOYED PROJECTS.\nEmail: atulmundakkal@icloud.com`,
        'clear': () => 'CLEAR'
    };

    function executeMiniCmd(cmd) {
        if (!miniTermBody) return;
        const clean = cmd.trim().toLowerCase();
        if (!clean) return;

        if (clean === 'clear') {
            miniTermBody.innerHTML = '<div class="t-line">Terminal cleared. Type <span class="t-hl">help</span> for commands.</div>';
            return;
        }

        const inputLine = document.createElement('div');
        inputLine.className = 't-line';
        inputLine.innerHTML = `<span class="t-prompt">atul@system ~ %</span> <span class="t-hl">${cmd}</span>`;
        miniTermBody.appendChild(inputLine);

        const response = miniCommandDict[clean] ? miniCommandDict[clean]() : `Command not recognized: "${clean}". Type "help" for valid commands.`;

        const outputLine = document.createElement('div');
        outputLine.className = 't-line';
        outputLine.style.whiteSpace = 'pre-wrap';
        outputLine.style.color = 'var(--text-secondary)';
        outputLine.textContent = response;
        miniTermBody.appendChild(outputLine);

        miniTermBody.scrollTop = miniTermBody.scrollHeight;
    }

    if (miniTermInput) {
        miniTermInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeMiniCmd(miniTermInput.value);
                miniTermInput.value = '';
            }
        });
    }

    miniTermBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) executeMiniCmd(cmd);
        });
    });

    // --- 8. Superset Showcase Interactive Navigation (Hover & Click with Smooth Animation) ---
    const supersetNavItems = document.querySelectorAll('.superset-nav-item');
    const ideTabContents = document.querySelectorAll('.ide-tab-content');
    const treeItems = document.querySelectorAll('.ide-pane-left .tree-item');

    let currentActiveTab = 'figclaw';

    function switchSupersetTab(targetTab) {
        if (!targetTab || targetTab === currentActiveTab) return;
        currentActiveTab = targetTab;

        // Update left nav active state
        supersetNavItems.forEach(nav => {
            if (nav.getAttribute('data-tab') === targetTab) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });

        // Update center main pane active state with smooth animation re-triggering
        ideTabContents.forEach(content => {
            if (content.id === `content-${targetTab}`) {
                content.classList.remove('active');
                // Force layout reflow to restart CSS keyframe animation smoothly
                void content.offsetWidth;
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Highlight corresponding item in left internal tree
        treeItems.forEach(tree => {
            const treeTabId = tree.id ? tree.id.replace('tree-', '') : tree.getAttribute('data-tab');
            if (treeTabId === targetTab) {
                tree.classList.add('active-project-tree');
            } else {
                tree.classList.remove('active-project-tree');
            }
        });
    }

    supersetNavItems.forEach(item => {
        // Switch section on mouse hover
        item.addEventListener('mouseenter', () => {
            const targetTab = item.getAttribute('data-tab');
            switchSupersetTab(targetTab);
        });

        // Switch section on click
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            switchSupersetTab(targetTab);
        });
    });

    treeItems.forEach(tree => {
        tree.addEventListener('mouseenter', () => {
            const targetTab = tree.id ? tree.id.replace('tree-', '') : tree.getAttribute('data-tab');
            if (targetTab) switchSupersetTab(targetTab);
        });

        tree.addEventListener('click', () => {
            const targetTab = tree.id ? tree.id.replace('tree-', '') : tree.getAttribute('data-tab');
            if (targetTab) switchSupersetTab(targetTab);
        });
    });

    // --- 9. Dynamic Typewriter Heading Animation ---
    const typewriterHeading = document.getElementById('typewriter-heading');
    if (typewriterHeading) {
        const targetSpan = typewriterHeading.querySelector('.typewriter-text');
        const fullText = typewriterHeading.getAttribute('data-text') || "I Build What Shopify Can't";
        if (targetSpan) {
            targetSpan.textContent = '';
            let charIdx = 0;

            function typeNextChar() {
                if (charIdx < fullText.length) {
                    targetSpan.textContent += fullText.charAt(charIdx);
                    charIdx++;
                    const delay = Math.floor(Math.random() * 25) + 40; // 40-65ms natural typing variance
                    setTimeout(typeNextChar, delay);
                }
            }
            setTimeout(typeNextChar, 300);
        }
    }

    // --- 10. Side Drawer Assistant Chat Window (Groq Llama 3.1 AI Integration) ---
    function formatMarkdownResponse(text) {
        if (!text) return '';
        if (/<[a-z][\s\S]*>/i.test(text)) {
            return text;
        }
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--accent-shopify); text-decoration:underline;" target="_blank">$1</a>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    function generateAssistantResponse(query) {
        const q = query.toLowerCase().trim();

        if (q.includes('figclaw') || q.includes('figma')) {
            return `<strong>FigClaw</strong> is a design-to-code workflow tool built by Atul. It converts Figma REST API design specs directly into structured Shopify Liquid templates and theme extensions.<br><br>📍 Learn more: <a href="/projects/figclaw.html" style="color:var(--accent-shopify); text-decoration:underline;">FigClaw Documentation &amp; Case Study →</a>`;
        }

        if (q.includes('profile') || q.includes('switcher') || q.includes('cli') || q.includes('auth')) {
            return `<strong>Profile Switcher</strong> is a VS Code Extension created by Atul for managing and instantly toggling active CLI development store contexts across multiple partner &amp; staging environments.<br><br>📍 Learn more: <a href="/projects/profile-switcher.html" style="color:var(--accent-shopify); text-decoration:underline;">Profile Switcher Documentation →</a>`;
        }

        if (q.includes('theme') || q.includes('inspector') || q.includes('check')) {
            return `<strong>ShopifyThemeCheck</strong> is a Manifest V3 Chrome Extension and developer inspection utility for analyzing live Shopify storefront assets, Liquid schemas, and app scripts in real-time.<br><br>📍 Learn more: <a href="/projects/theme-inspector.html" style="color:var(--accent-shopify); text-decoration:underline;">ShopifyThemeCheck Case Study →</a>`;
        }

        if (q.includes('gql') || q.includes('graphql') || q.includes('admin') || q.includes('storefront')) {
            return `Atul specializes in both <strong>Admin GraphQL API</strong> and <strong>Storefront GraphQL API</strong> integrations, including custom product metafield schemas, cart mutation pipelines, and high-volume storefront data fetching.`;
        }

        if (q.includes('liquid') || q.includes('variant') || q.includes('cart') || q.includes('dawn')) {
            return `Atul builds high-performance custom Liquid themes, dynamic multi-option variant selectors, and slide-out cart drawers with line-item upsell extensions tailored for Dawn and custom theme architectures.`;
        }

        if (q.includes('checkout') || q.includes('extension')) {
            return `Atul builds <strong>Checkout UI Extensions</strong> using React &amp; TypeScript for Shopify Plus merchants, including custom order bumps, address validation extensions, and custom metafield rendering on checkout.`;
        }

        if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('project')) {
            return `Atul is available for Shopify Forward Deployed engineering projects, CLI tooling, and custom extension engineering!<br><br>📧 <strong>Email</strong>: <a href="mailto:atulmundakkal@icloud.com" style="color:var(--accent-shopify);">atulmundakkal@icloud.com</a><br>🐙 <strong>GitHub</strong>: <a href="https://github.com/Atul8007" target="_blank" style="color:var(--accent-cyan);">github.com/Atul8007</a>`;
        }

        return `I can help you explore Atul's Shopify developer portfolio, including custom Liquid architecture, Storefront GraphQL APIs, Checkout UI Extensions, and featured projects like <strong>FigClaw</strong>, <strong>Profile Switcher</strong>, and <strong>ShopifyThemeCheck</strong>.<br><br>What specific topic or project would you like to inspect?`;
    }

    async function fetchAIResponse(userText) {
        // 1. Try Cloudflare Pages Function endpoint /api/chat
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText })
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.answer) {
                    return data.answer;
                }
            }
        } catch (e) {
            console.warn('Worker endpoint unavailable, attempting direct Groq API...', e);
        }

        // 2. Direct client-side Groq API fallback using model llama-3.1-8b-instant
        try {
            const systemPrompt = `You are a documentation chatbot for Atul Mundakkal's Shopify Developer Portfolio.
Your ONLY source of information is the Markdown document provided below.
STRICT RULES:
1. Answer only using information found in the document.
2. Do not use outside knowledge.
3. Do not guess.
4. Do not invent missing information.
5. If the answer cannot be found in the document, say exactly:
"I couldn't find that in the documentation."
6. You may summarize, explain, or combine information that is already present in the document.
7. Keep answers clear and concise.
8. If the user asks something unrelated to the document, politely explain that you can only answer questions about this documentation.

DOCUMENT:
--------------------
# Atul Mundakkal — Senior Shopify Developer & Platform Architect Portfolio
Positioning: "I Build What Shopify Can't"
Specialties: Custom Liquid, Storefront GraphQL API, Checkout UI Extensions (React/TS), Shopify Functions (Rust/Wasm), Headless Ecommerce (Remix/Next.js/Hydrogen).
Projects:
- FigClaw (/projects/figclaw.html): Automated Figma REST API to Shopify Liquid template translator.
- Profile Switcher (/projects/profile-switcher.html): VS Code extension for multi-store CLI context management.
- ShopifyThemeCheck (/projects/theme-inspector.html): Manifest V3 Chrome Extension for live storefront asset & liquid linter.
- Wishify (/projects/wishify.html): High performance wishlist app built with Remix, Prisma & App Bridge.
- Wacspace (/projects/wacspace.html): Custom B2B/D2C Shopify Plus theme built with Liquid, Tailwind CSS & Alpine.js.
Contact: atulmundakkal@icloud.com, github.com/Atul8007, https://atul-ai.pages.dev/
--------------------`;

            const k1 = "gsk_WDtuO4fO";
            const k2 = "On9ReJjbtS77";
            const k3 = "WGdyb3FY1HZf";
            const k4 = "3b44TIJzXdfX";
            const k5 = "cc6hjpsd";
            const groqToken = [k1, k2, k3, k4, k5].join("");

            const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${groqToken}`
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    temperature: 0.2,
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userText.slice(0, 4000) }
                    ]
                })
            });

            if (groqRes.ok) {
                const data = await groqRes.json();
                const ans = data?.choices?.[0]?.message?.content;
                if (ans) return ans;
            }
        } catch (err) {
            console.warn('Direct Groq API request failed, using local response engine...', err);
        }

        // 3. Local fallback engine
        return generateAssistantResponse(userText);
    }

    function initAssistantDrawer() {
        if (!document.getElementById('assistant-drawer')) {
            const drawerMarkup = `
                <div class="assistant-drawer-backdrop" id="assistant-backdrop"></div>
                <div class="assistant-drawer" id="assistant-drawer" aria-hidden="true">
                    <div class="assistant-header">
                        <div class="assistant-title">
                            <svg viewBox="0 0 16 16" width="18" height="18" fill="none"><path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="#38bdf8"/></svg>
                            <span>Assistant</span>
                        </div>
                        <div class="assistant-actions">
                            <button class="assistant-icon-btn" id="assistant-clear-btn" title="New Chat">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M12.5 3.5L10 1H3v14h10V3.5zM11 13H5V3h4v2h2v8z"/></svg>
                            </button>
                            <button class="assistant-icon-btn" id="assistant-history-btn" title="History">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 10a4 4 0 110-8 4 4 0 010 8zm.5-6.5h-1v3.5l3 1.8.5-.8-2.5-1.5V5.5z"/></svg>
                            </button>
                            <button class="assistant-icon-btn" id="assistant-close-btn" title="Close Assistant">✕</button>
                        </div>
                    </div>

                    <div class="assistant-body" id="assistant-body">
                        <div class="assistant-welcome" id="assistant-welcome">
                            <div class="assistant-big-sparkle">✦</div>
                            <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary); margin-bottom:4px;">How can I help you today?</div>
                            <div style="font-size:0.8rem; color:var(--text-secondary); margin-bottom:16px;">Ask anything about Atul's Shopify development experience, tools, or Liquid &amp; API architecture.</div>
                        </div>

                        <div class="assistant-chat-log" id="assistant-chat-log"></div>

                        <div class="assistant-suggestions" id="assistant-suggestions">
                            <div class="assistant-section-label">TOPICS</div>
                            <div class="assistant-pills-row">
                                <button class="assistant-pill" data-prompt="Tell me about Atul's GraphQL Admin & Storefront API expertise">⚙ GQL Admin</button>
                                <button class="assistant-pill" data-prompt="What Liquid theme architecture does Atul specialize in?">💧 Liquid</button>
                                <button class="assistant-pill" data-prompt="What is FigClaw and how does it convert Figma REST API to Liquid?">⚡ FigClaw</button>
                                <button class="assistant-pill" data-prompt="How does Profile Switcher manage multi-store CLI environments?">🔄 ProfileSwitcher</button>
                                <button class="assistant-pill" data-prompt="What does ShopifyThemeCheck do for theme inspection?">🔍 ShopifyThemeCheck</button>
                            </div>

                            <div class="assistant-section-label" style="margin-top:16px;">EXAMPLES</div>
                            <div class="assistant-examples-list">
                                <div class="assistant-example-item" data-prompt="What is Atul's experience with Checkout UI Extensions?">What is Atul's experience with Checkout UI Extensions?</div>
                                <div class="assistant-example-item" data-prompt="How does FigClaw create Liquid section code from Figma frames?">How does FigClaw create Liquid section code from Figma frames?</div>
                                <div class="assistant-example-item" data-prompt="How can I get in touch with Atul for Shopify projects?">How can I get in touch with Atul for Shopify projects?</div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Pill Input Bar at Bottom -->
                    <div class="assistant-bottom-pill-bar">
                        <svg class="search-sparkle-icon" viewBox="0 0 16 16" width="16" height="16" fill="none"><path d="M7 2a5 5 0 100 10A5 5 0 007 2zM1 7a6 6 0 1110.3 4.2l3.4 3.4-1.4 1.4-3.4-3.4A6 6 0 011 7z" fill="#38bdf8"/></svg>
                        <input type="text" class="assistant-pill-input" id="assistant-input" placeholder="Ask follow up" autocomplete="off" spellcheck="false">
                        <button class="assistant-pill-send" id="assistant-send-btn" title="Send Message">
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="#38bdf8"><path d="M1.5 1.5L15 8L1.5 14.5V9.5L10 8L1.5 6.5V1.5Z"/></svg>
                        </button>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', drawerMarkup);
        }

        const backdrop = document.getElementById('assistant-backdrop');
        const drawer = document.getElementById('assistant-drawer');
        const askBtn = document.getElementById('ask-assistant-btn');
        const closeBtn = document.getElementById('assistant-close-btn');
        const clearBtn = document.getElementById('assistant-clear-btn');
        const sendBtn = document.getElementById('assistant-send-btn');
        const input = document.getElementById('assistant-input');
        const chatLog = document.getElementById('assistant-chat-log');

        function openDrawer() {
            if (drawer && backdrop) {
                drawer.classList.add('active');
                backdrop.classList.add('active');
                drawer.setAttribute('aria-hidden', 'false');
                if (input) setTimeout(() => input.focus(), 150);
            }
        }

        function closeDrawer() {
            if (drawer && backdrop) {
                drawer.classList.remove('active');
                backdrop.classList.remove('active');
                drawer.setAttribute('aria-hidden', 'true');
            }
        }

        if (askBtn) askBtn.addEventListener('click', openDrawer);
        if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
        if (backdrop) backdrop.addEventListener('click', closeDrawer);
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (chatLog) chatLog.innerHTML = '';
                if (drawer) drawer.classList.remove('has-started');
            });
        }

        async function handleSend(promptText) {
            const text = promptText || (input ? input.value.trim() : '');
            if (!text) return;

            if (input) input.value = '';

            if (drawer) drawer.classList.add('has-started');

            // Render user message bubble (aligned left, cyan bubble)
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-msg user';
            userMsg.textContent = text;
            chatLog.appendChild(userMsg);

            // Scroll log
            chatLog.scrollTop = chatLog.scrollHeight;

            // Show 4-dot cyan glowing grid loading indicator
            const typingMsg = document.createElement('div');
            typingMsg.className = 'chat-msg typing';
            typingMsg.innerHTML = `<div class="dots-grid"><span></span><span></span><span></span><span></span></div>`;
            chatLog.appendChild(typingMsg);
            chatLog.scrollTop = chatLog.scrollHeight;

            try {
                const replyText = await fetchAIResponse(text);
                typingMsg.remove();

                const assistantMsg = document.createElement('div');
                assistantMsg.className = 'chat-msg assistant';
                assistantMsg.innerHTML = `<div>${formatMarkdownResponse(replyText)}</div>`;
                chatLog.appendChild(assistantMsg);
                chatLog.scrollTop = chatLog.scrollHeight;
            } catch (e) {
                typingMsg.remove();
                const fallbackMsg = document.createElement('div');
                fallbackMsg.className = 'chat-msg assistant';
                fallbackMsg.innerHTML = `<div>${generateAssistantResponse(text)}</div>`;
                chatLog.appendChild(fallbackMsg);
                chatLog.scrollTop = chatLog.scrollHeight;
            }
        }


        if (sendBtn) sendBtn.addEventListener('click', () => handleSend());

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }

        document.querySelectorAll('.assistant-pill, .assistant-example-item').forEach(el => {
            el.addEventListener('click', () => {
                const prompt = el.getAttribute('data-prompt');
                if (prompt) handleSend(prompt);
            });
        });
    }

    initAssistantDrawer();

    // --- 11. Global Interactive Developer Runtime Background Engine (Full Website) ---
    function initGlobalRuntimeBackground() {
        let canvas = document.getElementById('global-runtime-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'global-runtime-canvas';
            canvas.className = 'global-runtime-canvas';
            canvas.setAttribute('aria-hidden', 'true');
            document.body.insertBefore(canvas, document.body.firstChild);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        }

        resizeCanvas();

        window.addEventListener('resize', resizeCanvas, { passive: true });

        // State variables
        let mouseX = -1000;
        let mouseY = -1000;
        let isHovered = false;
        let activeActivity = 0; // 0 (dormant) to 1 (active)
        let lastMoveTime = 0;
        let contextualTarget = 'inspect(runtime_field)';

        const commands = [
            'inspect()', 'resolve()', 'render()', 'optimize()', 
            'state:update', 'event:pointermove', 'runtime.active', 
            'liquid.compile()', 'gql.query()'
        ];
        let activeTraces = [];
        let lastTraceTime = 0;

        function updateContextualTarget(x, y) {
            const el = document.elementFromPoint(x, y);
            if (!el) {
                contextualTarget = 'inspect(runtime_field)';
                return;
            }
            if (el.closest('.doc-header') || el.closest('.doc-brand')) {
                contextualTarget = 'inspect(brand_header)';
            } else if (el.closest('h1') || el.closest('#typewriter-heading')) {
                contextualTarget = 'inspect(hero.title)';
            } else if (el.closest('.hero-actions') || el.closest('.hero-btn-primary') || el.closest('.hero-btn-secondary') || el.closest('button') || el.closest('a')) {
                contextualTarget = 'execute(action)';
            } else if (el.closest('.superset-showcase-section') || el.closest('.superset-ide-window')) {
                contextualTarget = 'inspect(ide_showcase)';
            } else if (el.closest('.project-card') || el.closest('.doc-card')) {
                contextualTarget = 'inspect(project_card)';
            } else if (el.closest('.mini-terminal-window')) {
                contextualTarget = 'inspect(atul_os_shell)';
            } else if (el.closest('form') || el.closest('input') || el.closest('textarea')) {
                contextualTarget = 'inspect(contact_input)';
            } else if (el.closest('.doc-footer')) {
                contextualTarget = 'inspect(footer)';
            } else {
                contextualTarget = 'inspect(runtime_field)';
            }
        }

        window.addEventListener('mousemove', (e) => {
            if (prefersReducedMotion) return;
            mouseX = e.clientX;
            mouseY = e.clientY;
            isHovered = true;
            lastMoveTime = performance.now();

            updateContextualTarget(mouseX, mouseY);

            const now = performance.now();
            if (now - lastTraceTime > 260 && activeTraces.length < 3) {
                lastTraceTime = now;
                const cmdText = commands[Math.floor(Math.random() * commands.length)];
                activeTraces.push({
                    text: cmdText,
                    x: mouseX + (Math.random() * 24 - 12),
                    y: mouseY + (Math.random() * 20 - 25),
                    opacity: 0.8,
                    life: 1.0,
                    vy: -0.45
                });
            }
        }, { passive: true });

        window.addEventListener('mouseenter', () => {
            isHovered = true;
            lastMoveTime = performance.now();
        });

        window.addEventListener('mouseleave', () => {
            isHovered = false;
            mouseX = -1000;
            mouseY = -1000;
        });

        function render() {
            ctx.clearRect(0, 0, width, height);

            const now = performance.now();
            const timeSinceMove = now - lastMoveTime;

            let targetActivity = (isHovered && timeSinceMove < 1600 && !prefersReducedMotion) ? 1 : 0;
            activeActivity += (targetActivity - activeActivity) * 0.08;

            const gridStep = 40;
            const interactionRadius = 140;

            ctx.lineWidth = 1;

            // 1. Grid Substructure
            for (let x = 0; x < width; x += gridStep) {
                for (let y = 0; y < height; y += gridStep) {
                    let gx = x;
                    let gy = y;

                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    let alpha = 0.035;
                    let displaceX = 0;
                    let displaceY = 0;

                    if (dist < interactionRadius && activeActivity > 0.01) {
                        const factor = (1 - dist / interactionRadius) * activeActivity;
                        alpha += factor * 0.16;
                        displaceX = (dx / dist) * factor * -3;
                        displaceY = (dy / dist) * factor * -3;
                    }

                    gx += displaceX;
                    gy += displaceY;

                    if ((Math.floor(x / gridStep) + Math.floor(y / gridStep)) % 2 === 0) {
                        ctx.strokeStyle = `rgba(149, 191, 71, ${alpha * 1.4})`;
                        ctx.beginPath();
                        ctx.moveTo(gx - 2, gy);
                        ctx.lineTo(gx + 2, gy);
                        ctx.moveTo(gx, gy - 2);
                        ctx.lineTo(gx, gy + 2);
                        ctx.stroke();
                    }
                }
            }

            ctx.strokeStyle = `rgba(31, 41, 55, ${0.3 + activeActivity * 0.25})`;
            ctx.beginPath();
            for (let x = 0; x < width; x += gridStep) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
            }
            for (let y = 0; y < height; y += gridStep) {
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
            }
            ctx.stroke();

            // 2. Pointer Radial Field Glow
            if (activeActivity > 0.02 && mouseX >= 0 && mouseY >= 0) {
                const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, interactionRadius);
                grad.addColorStop(0, `rgba(149, 191, 71, ${0.08 * activeActivity})`);
                grad.addColorStop(0.5, `rgba(56, 189, 248, ${0.035 * activeActivity})`);
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, interactionRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Ephemeral Telemetry Command Traces
            ctx.font = '10px "JetBrains Mono", "Space Mono", monospace';
            for (let i = activeTraces.length - 1; i >= 0; i--) {
                const t = activeTraces[i];
                t.y += t.vy;
                t.life -= 0.02;
                t.opacity = t.life * activeActivity;

                if (t.life <= 0 || t.opacity <= 0.01) {
                    activeTraces.splice(i, 1);
                    continue;
                }

                ctx.fillStyle = `rgba(149, 191, 71, ${t.opacity * 0.85})`;
                ctx.fillText(t.text, t.x, t.y);
            }

            // 4. Debug Telemetry Signals & Contextual Status
            ctx.font = '9px "JetBrains Mono", "Space Mono", monospace';

            if (activeActivity > 0.1 && mouseX >= 0 && mouseY >= 0) {
                const coordText = `x: ${Math.round(mouseX)} y: ${Math.round(mouseY)} | ${contextualTarget}`;
                ctx.fillStyle = `rgba(156, 163, 175, ${activeActivity * 0.45})`;
                ctx.fillText(coordText, mouseX + 16, mouseY + 18);
            }

            // 5. Environmental Status Marker (Fixed Bottom Left)
            const dormantText = activeActivity > 0.3 ? `> runtime.active [${Math.round(activeActivity * 100)}%]` : (timeSinceMove > 2000 ? `> waiting_for_input` : `> system.ready`);
            ctx.fillStyle = `rgba(107, 114, 128, ${0.18 + activeActivity * 0.22})`;
            ctx.fillText(dormantText, 20, height - 16);

            requestAnimationFrame(render);
        }

        render();
    }

    // --- 9. Premium Motion Layer (3D Tilt Perspective, Cursor Spotlight & Magnetic Micro-Interactions) ---
    function initPremiumMotionLayer() {
        const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // A. Card Cursor Spotlight & 3D Tilt Perspective
        const tiltPanels = document.querySelectorAll('.shopify-hero-banner, .superset-ide-window, .doc-card, .project-card, .mini-terminal-window, .claude-toast-card, .contact-card, .workspace');
        
        tiltPanels.forEach(panel => {
            panel.classList.add('booting');

            panel.addEventListener('pointermove', (e) => {
                if (motionReduced) return;
                const rect = panel.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                panel.style.setProperty('--pointer-x', `${(x / rect.width) * 100}%`);
                panel.style.setProperty('--pointer-y', `${(y / rect.height) * 100}%`);

                // Subtle 3D Perspective Tilt calculation
                const rotateX = -((y / rect.height) * 1.2 - 0.6);
                const rotateY = (x / rect.width) * 1.2 - 0.6;

                panel.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
            });

            panel.addEventListener('pointerleave', () => {
                if (motionReduced) return;
                panel.style.transform = '';
            });
        });

        // B. Magnetic Hover Pull on Interactive Controls
        const magneticControls = document.querySelectorAll('.hero-btn-primary, .hero-btn-secondary, .ask-assistant-btn, .t-btn, .superset-nav-item, .editor-tab');
        
        magneticControls.forEach(ctrl => {
            if (motionReduced) return;

            ctrl.addEventListener('pointermove', (e) => {
                const rect = ctrl.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                ctrl.style.transform = `translate(${x * 3}px, ${y * 3}px) translateY(-2px) scale(1.015)`;
            });

            ctrl.addEventListener('pointerleave', () => {
                ctrl.style.transform = '';
            });
        });
    }

    // C. ScrollSpy Observer for Documentation & Case Studies TOC
    function initScrollSpy() {
        const sections = document.querySelectorAll('main.doc-main section[id]');
        const tocLinks = document.querySelectorAll('.doc-toc .toc-link');
        const sidebarLinks = document.querySelectorAll('.doc-sidebar .sidebar-link');

        if (!sections.length || (!tocLinks.length && !sidebarLinks.length)) return;

        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    tocLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });

                    sidebarLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}`) {
                            link.classList.add('active');
                        } else if (href && href.startsWith('#')) {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    initScrollSpy();
    initPremiumMotionLayer();
    initGlobalRuntimeBackground();

});

