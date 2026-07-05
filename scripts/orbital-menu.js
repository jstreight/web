(function () {

    const script = document.currentScript;
    const mode = script?.dataset.mode || 'nav';
    const isSubpage = window.location.pathname.includes('/pages/');
    const root = isSubpage ? '..' : '.';
    const pages = isSubpage ? '.' : 'pages';

    const menuItems = [
        { label: 'HOME', href: `${root}/index.html`, orbit: 'orbit1', page: 'index.html' },
        { label: 'PROJECTS', href: `${pages}/projects.html`, orbit: 'orbit2', page: 'projects.html' },
        { label: 'BIO', href: `${pages}/background.html`, orbit: 'orbit3', page: 'background.html' },
        { label: 'EDUCATION', href: `${pages}/education.html`, orbit: 'orbit4', page: 'education.html' },
        { label: 'RESUME', href: `${root}/documents/Jesse%20Streight.pdf`, orbit: 'orbit5', external: true },
        { label: 'BLOG', href: 'https://jstreight.blogspot.com/', orbit: 'orbit6', external: true },
        { label: 'MAP', href: `${pages}/map.html`, orbit: 'orbit7', page: 'map.html' },
        { label: 'REAL ESTATE', href: 'https://www.realtor.ca/', orbit: 'orbit8', external: true }
    ];

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    function isActive(item) {
        if (item.page) {
            return currentPage === item.page;
        }
        return false;
    }

    function buildOrbitItems() {
        return menuItems.map(function (item) {
            const activeClass = isActive(item) ? ' active' : '';
            const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
            return (
                '<a class="orbit-item ' + item.orbit + activeClass + '"' +
                ' href="' + item.href + '"' + target + '>' +
                item.label +
                '</a>'
            );
        }).join('\n');
    }

    function buildNav() {
        return (
            '<button class="mobile-menu-toggle" aria-label="Toggle Navigation" aria-expanded="false">' +
            '☰' +
            '</button>' +
            '<nav class="orbital-nav" aria-label="Main navigation">' +
            '<div class="orbit-system">' +
            '<div class="orbit-ring"></div>' +
            '<div class="orbit-ring2"></div>' +
            '<div class="center-circle">' +
            '<img src="' + root + '/images/Jesse.png" alt="Jesse Streight">' +
            '<h1>JESSE</h1>' +
            '<p>GIS • WEB • DESIGN</p>' +
            '</div>' +
            buildOrbitItems() +
            '</div>' +
            '</nav>'
        );
    }

    function buildFooter() {
        return (
            '<footer class="footer-info">' +
            'PORT ALBERNI, BC • GIS & INTERACTIVE DESIGN' +
            '<br><br>' +
            '<a href="mailto:jessestreight43@gmail.com">JESSESTREIGHT43@GMAIL.COM</a>' +
            '<br><br>' +
            '<span class="footer-date"></span>' +
            '</footer>'
        );
    }

    function buildBackground() {
        return (
            '<video autoplay muted loop playsinline id="bg-video">' +
            '<source src="' + root + '/video.mp4" type="video/mp4">' +
            '</video>' +
            '<div class="overlay"></div>'
        );
    }

    function initMobileToggle() {
        const menuButton = document.querySelector('.mobile-menu-toggle');
        if (!menuButton) {
            return;
        }

        menuButton.addEventListener('click', function () {
            const isOpen = document.body.classList.toggle('menu-open');
            menuButton.textContent = isOpen ? '✕' : '☰';
            menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    function initFooterDate() {
        document.querySelectorAll('.footer-date').forEach(function (el) {
            el.textContent = new Date().toDateString();
        });
    }

    function mount() {
        const mountPoint = document.getElementById('orbital-menu');
        if (!mountPoint) {
            return;
        }

        let html = buildBackground();

        if (mode === 'home') {
            html += '<main class="orbital-interface">' + buildNav() + buildFooter() + '</main>';
        } else {
            html += buildNav();
        }

        mountPoint.innerHTML = html;
        initMobileToggle();
        initFooterDate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }

})();
