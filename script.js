/**
 * ATUL MUNDAKKAL — DEVELOPER DOCUMENTATION ENGINE
 * Inspired by Shopify.dev Documentation System & Pixelated Retro Icons
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle System (Default to Dark Retro Theme) ---
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('atul-doc-theme') || 'dark';
    setTheme(savedTheme);

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('atul-doc-theme', theme);
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

    // --- 4. Right-Side TOC ScrollSpy Tracking ---
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = Array.from(tocLinks).map(link => {
        const id = link.getAttribute('href').substring(1);
        return document.getElementById(id);
    }).filter(Boolean);

    if (tocLinks.length > 0 && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    tocLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));
    }

    // --- 5. Command Palette Search Engine (⌘K) ---
    const searchModal = document.getElementById('search-modal');
    const searchTriggerBtn = document.getElementById('search-trigger-btn');
    const searchBackdrop = document.getElementById('search-backdrop');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const searchDatabase = [
        { title: "Overview", sub: "Atul Mundakkal — Shopify Full-Stack Developer", tag: "DOCS", url: "/index.html" },
        { title: "Projects Directory", sub: "Featured developer tools: FigClaw, Profile Switcher, ShopifyThemeCheck", tag: "PROJECTS", url: "/projects.html" },
        { title: "FigClaw", sub: "Design-to-code workflow for turning structured design instructions into usable interfaces", tag: "CASE STUDY", url: "/projects/figclaw.html" },
        { title: "Profile Switcher", sub: "Shopify developer tooling for managing and switching CLI development contexts", tag: "CASE STUDY", url: "/projects/profile-switcher.html" },
        { title: "ShopifyThemeCheck", sub: "Shopify theme analysis and storefront asset inspection tool", tag: "CASE STUDY", url: "/projects/theme-inspector.html" },
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

});
