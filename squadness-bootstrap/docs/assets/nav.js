/**
 * Squadness DS — Docs Navigation
 * Injects sidebar + topbar chrome and handles active states, tabs, copy buttons.
 */

(function () {

  /* ── Detect base path (root vs subdir page) ───────────────────── */
  // Pages in docs/components/ or docs/foundations/ need '../'
  // Pages in docs/ root (index.html, getting-started.html, etc.) need './'
  var pathParts = window.location.pathname.split('/');
  var inSubdir  = pathParts.some(function(p) {
    return p === 'components' || p === 'foundations' || p === 'layouts';
  });
  var base = inSubdir ? '../' : './';

  /* ── Navigation tree ──────────────────────────────────────────── */
  const NAV = [
    {
      section: 'Getting Started',
      items: [
        { label: 'Introducción',     path: 'index.html' },
        { label: 'Cómo instalar',    path: 'getting-started.html' },
        { label: 'Integración PHP',  path: 'php-integration.html' },
      ]
    },
    {
      section: 'Foundations',
      items: [
        { label: 'Tokens',           path: 'foundations/tokens.html' },
        { label: 'Colores',          path: 'foundations/colors.html' },
        { label: 'Tipografía',       path: 'foundations/typography.html' },
        { label: 'Espaciado',        path: 'foundations/spacing.html' },
      ]
    },
    {
      section: 'Componentes',
      items: [
        { label: 'Button',           path: 'components/button.html' },
        { label: 'Icon Button',      path: 'components/icon-button.html' },
        { label: 'Badge',            path: 'components/badge.html' },
        { label: 'Checkbox',         path: 'components/checkbox.html' },
        { label: 'Radio Button',     path: 'components/radio-button.html' },
        { label: 'Switch',           path: 'components/switch.html' },
        { label: 'Input',            path: 'components/input.html' },
        { label: 'Textarea',         path: 'components/textarea.html' },
        { label: 'Select',           path: 'components/select.html' },
        { label: 'DatePicker',       path: 'components/datepicker.html' },
        { label: 'Card',             path: 'components/card.html' },
        { label: 'Table',            path: 'components/table.html' },
        { label: 'Pagination',       path: 'components/pagination.html' },
        { label: 'Modal',            path: 'components/modal.html' },
        { label: 'Toast',            path: 'components/toast.html' },
        { label: 'Tooltip',          path: 'components/tooltip.html' },
        { label: 'Popover',          path: 'components/popover.html' },
        { label: 'Navbar',           path: 'components/navbar.html' },
        { label: 'Sidebar',          path: 'components/sidebar.html' },
        { label: 'Spinner',          path: 'components/spinner.html' },
        { label: 'Drag & Drop',      path: 'components/drag-drop.html' },
      ]
    },
    {
      section: 'Layouts',
      items: [
        { label: 'List View',        path: 'layouts/list-view.html', newTab: true },
      ]
    }
  ];

  /* ── Resolve current page ─────────────────────────────────────── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  /* ── Topbar HTML ─────────────────────────────────────────────── */
  const topbarHTML = `
    <nav class="docs-topbar">
      <button class="docs-hamburger" id="docs-hamburger" aria-label="Menú">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>
      <a class="docs-topbar-brand" href="${base}index.html">
        <img src="${base}assets/logo/Logotipo Docs.png" alt="Squadness Docs" height="28" style="display:block;">
        <span class="docs-topbar-version">Bootstrap 5</span>
      </a>
      <div class="docs-topbar-links">
        <a class="docs-topbar-link" href="https://github.com" target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          GitHub
        </a>
      </div>
      <div class="docs-topbar-search">
        <svg class="docs-topbar-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.4"/>
          <path d="M10 10l2.5 2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <input type="search" id="docs-search" placeholder="Buscar componente..." autocomplete="off" />
      </div>
    </nav>
  `;

  /* ── Sidebar HTML ────────────────────────────────────────────── */
  function buildSidebar() {
    let html = '<aside class="docs-sidebar" id="docs-sidebar">';
    NAV.forEach(function(group) {
      html += '<div class="docs-nav-section">' + group.section + '</div>';
      group.items.forEach(function(item) {
        const file     = item.path.split('/').pop();
        const isActive = currentFile === file;
        const href     = base + item.path;
        const target = item.newTab ? ' target="_blank" rel="noopener"' : '';
        html += '<a class="docs-nav-link' + (isActive ? ' active' : '') + '" href="' + href + '"' + target + '>' + item.label + '</a>';
      });
    });
    html += '</aside>';
    html += '<div class="docs-sidebar-overlay" id="docs-overlay"></div>';
    return html;
  }

  /* ── Inject chrome ───────────────────────────────────────────── */
  document.body.insertAdjacentHTML('afterbegin', topbarHTML + buildSidebar());

  /* ── Hamburger toggle ────────────────────────────────────────── */
  const hamburger = document.getElementById('docs-hamburger');
  const sidebar   = document.getElementById('docs-sidebar');
  const overlay   = document.getElementById('docs-overlay');

  function toggleSidebar(open) {
    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger) hamburger.addEventListener('click', function() { toggleSidebar(!sidebar.classList.contains('open')); });
  if (overlay)   overlay.addEventListener('click',   function() { toggleSidebar(false); });

  /* ── Tab switching (Preview / Code) ──────────────────────────── */
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.docs-tab-btn');
    if (!btn) return;
    const box = btn.closest('.docs-preview-box');
    if (!box) return;
    const panel = btn.dataset.panel;
    box.querySelectorAll('.docs-tab-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    // Solo ocultar paneles de contenido, nunca los botones tab
    box.querySelectorAll('.docs-preview-content, .docs-code-content').forEach(function(el) {
      el.style.display = 'none';
    });
    const target = box.querySelector(
      '.docs-preview-content[data-panel="' + panel + '"], ' +
      '.docs-code-content[data-panel="' + panel + '"]'
    );
    if (target) target.style.display = target.classList.contains('docs-code-content') ? 'block' : 'flex';
  });

  /* ── Copy code button ────────────────────────────────────────── */
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.docs-code-copy');
    if (!btn) return;
    const wrapper = btn.closest('.docs-code-wrapper');
    if (!wrapper) return;
    // Use the original plain-text stored before line-number transformation
    const text = wrapper.dataset.code || '';
    navigator.clipboard.writeText(text).then(function() {
      const orig = btn.textContent;
      btn.textContent = '✓ Copiado';
      setTimeout(function() { btn.textContent = orig; }, 1800);
    });
  });

  /* ── Search filter ───────────────────────────────────────────── */
  const searchInput = document.getElementById('docs-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const q = this.value.toLowerCase().trim();
      sidebar.querySelectorAll('.docs-nav-link').forEach(function(link) {
        link.style.display = (!q || link.textContent.toLowerCase().includes(q)) ? '' : 'none';
      });
    });
  }

  /* ── TOC active state on scroll ──────────────────────────────── */
  const tocLinks = document.querySelectorAll('.docs-toc-link');
  if (tocLinks.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(function(link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    document.querySelectorAll('.docs-article [id]').forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ── Code block enhancement: header bar + line numbers ──────── */
  // Mirrors React's LightCodeBlock: traffic-light dots, copy button in header,
  // and a line-number table replacing the plain <pre> content.
  document.querySelectorAll('.docs-code-wrapper').forEach(function(wrapper) {
    var pre = wrapper.querySelector('pre');
    var copyBtn = wrapper.querySelector('.docs-code-copy');
    if (!pre) return;

    // 1. Snapshot plain text BEFORE DOM transformation so copy returns clean code
    // innerText on the <pre> gives us text without HTML tags
    var plainText = pre.innerText
      .replace(/^\n/, '')   // trim leading newline
      .replace(/\n$/, '');  // trim trailing newline
    wrapper.dataset.code = plainText;

    // 2. Build header bar: dots + copy button
    var header = document.createElement('div');
    header.className = 'docs-code-header';

    var dots = document.createElement('div');
    dots.className = 'docs-code-dots';
    dots.innerHTML =
      '<span class="dot-r"></span>' +
      '<span class="dot-a"></span>' +
      '<span class="dot-g"></span>';
    header.appendChild(dots);

    if (copyBtn) header.appendChild(copyBtn);  // move button into header

    wrapper.insertBefore(header, pre);

    // 3. Split innerHTML into lines and wrap in a line-number table
    var html = pre.innerHTML
      .replace(/^\n/, '')
      .replace(/\n$/, '');
    var lines = html.split('\n');

    var tableHTML = '<table class="code-table"><tbody>';
    lines.forEach(function(line, i) {
      tableHTML +=
        '<tr>' +
          '<td class="code-ln">' + (i + 1) + '</td>' +
          '<td class="code-line">' + (line === '' ? '​' : line) + '</td>' +
        '</tr>';
    });
    tableHTML += '</tbody></table>';

    pre.innerHTML = tableHTML;
  });

})();
