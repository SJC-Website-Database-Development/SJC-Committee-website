// =============================================
// IMAGE PATHS — change filenames here only
// =============================================
const IMAGES = {
    pastor:       'images/pastor.png',
    deacon:       'images/deacon.png',
};

// =============================================
// APPLY IMAGES
// =============================================
document.getElementById('img-pastor').src = IMAGES.pastor;
document.getElementById('img-deacon').src = IMAGES.deacon;

// =============================================
// HERO VIDEO - SLOW DOWN AND PAUSE AT END
// =============================================
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.playbackRate = 0.50;
    heroVideo.loop = false;

    heroVideo.addEventListener('ended', () => {
        setTimeout(() => {
            heroVideo.currentTime = 0;
            heroVideo.play();
        }, 1500);
    });
}

// =============================================
// ANNOUNCEMENTS — load latest from repo
// =============================================
async function loadAnnouncements() {
    const container = document.getElementById('announcements-container');

    try {
        const res = await fetch('https://api.github.com/repos/SJC-Website-Database-Development/SJC-Committee-website/contents/announcements');
        if (!res.ok) {
            container.innerHTML = '<p class="announcement-placeholder">No announcements at this time. Check back soon.</p>';
            return;
        }

        const files = await res.json();
        const mdFiles = files
            .filter(f => f.name.endsWith('.md'))
            .sort((a, b) => b.name.localeCompare(a.name));

        if (mdFiles.length === 0) {
            container.innerHTML = '<p class="announcement-placeholder">No announcements at this time. Check back soon.</p>';
            return;
        }

        const baseUrl = 'https://raw.githubusercontent.com/SJC-Website-Database-Development/SJC-Committee-website/main';

        const announcementPromises = mdFiles.map(async f => {
            const r    = await fetch(f.download_url);
            const text = await r.text();

            const titleMatch      = text.match(/title:\s*"?(.+?)"?\s*$/m);
            const attachmentMatch = text.match(/attachment:\s*(.+)/);
            const bodyMatch       = text.match(/---[\s\S]*?---\s*([\s\S]*)/);

            const title      = titleMatch      ? titleMatch[1].trim()      : 'Announcement';
            const attachment = attachmentMatch ? attachmentMatch[1].trim() : null;
            const body       = bodyMatch       ? bodyMatch[1].trim()       : '';

            let html = `<div class="announcement-card">`;
            html += `<h3 class="announcement-title">${title}</h3>`;

            if (attachment) {
                const ext = attachment.split('.').pop().toLowerCase();
                if (ext === 'pdf') {
                    html += `<iframe src="${baseUrl}${attachment}" class="announcement-pdf" title="${title}"></iframe>`;
                } else {
                    html += `<img src="${baseUrl}${attachment}" class="announcement-img" alt="${title}">`;
                }
            }

            if (body) {
                html += `<p class="announcement-body">${body}</p>`;
            }

            html += `</div>`;
            return html;
        });

        const cards = await Promise.all(announcementPromises);
        container.innerHTML = cards.join('');

    } catch (err) {
        container.innerHTML = '<p class="announcement-placeholder">Could not load announcements. Please check back later.</p>';
    }
}

// =============================================
// GALLERY CAROUSEL — load from CMS
// =============================================
async function loadGallery() {
    const gallerySection = document.getElementById('gallery');

    try {
        const res = await fetch('https://api.github.com/repos/SJC-Website-Database-Development/SJC-Committee-website/contents/gallery');
        if (!res.ok) {
            if (gallerySection) gallerySection.style.display = 'none';
            return;
        }

        const files = await res.json();
        const mdFiles = files
            .filter(f => f.name.endsWith('.md'))
            .sort((a, b) => a.name.localeCompare(b.name));

        if (mdFiles.length === 0) {
            if (gallerySection) gallerySection.style.display = 'none';
            return;
        }

        const baseUrl = 'https://raw.githubusercontent.com/SJC-Website-Database-Development/SJC-Committee-website/main';

        const galleryPromises = mdFiles.map(async f => {
            const r    = await fetch(f.download_url);
            const text = await r.text();

            const titleMatch = text.match(/title:\s*"?(.+?)"?\s*$/m);
            const imageMatch = text.match(/image:\s*(.+)/);

            if (!imageMatch) return null;

            return {
                caption: titleMatch ? titleMatch[1].trim() : '',
                src:     baseUrl + imageMatch[1].trim()
            };
        });

        const results  = await Promise.all(galleryPromises);
        const GALLERY  = results.filter(Boolean);

        if (GALLERY.length === 0) {
            if (gallerySection) gallerySection.style.display = 'none';
            return;
        }

        let currentIndex = 0;

        const galleryImg     = document.getElementById('gallery-img');
        const galleryCaption = document.getElementById('gallery-caption');
        const galleryPrev    = document.getElementById('gallery-prev');
        const galleryNext    = document.getElementById('gallery-next');
        const dotsContainer  = document.getElementById('gallery-dots');

        dotsContainer.innerHTML = '';
        GALLERY.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot';
            dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function goTo(index) {
            currentIndex = (index + GALLERY.length) % GALLERY.length;
            galleryImg.src             = GALLERY[currentIndex].src;
            galleryImg.alt             = GALLERY[currentIndex].caption;
            galleryCaption.textContent = GALLERY[currentIndex].caption;
            document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        galleryPrev.addEventListener('click', () => goTo(currentIndex - 1));
        galleryNext.addEventListener('click', () => goTo(currentIndex + 1));

        goTo(0);

    } catch (err) {
        if (gallerySection) gallerySection.style.display = 'none';
    }
}

// =============================================
// INIT
// =============================================
loadAnnouncements();
loadGallery();

// =============================================
// HAMBURGER + SIDEBAR
// =============================================
const hamburger       = document.getElementById('hamburger');
const sidebar         = document.getElementById('sidebar');
const sidebarOverlay  = document.getElementById('sidebar-overlay');
const sidebarClose    = document.getElementById('sidebar-close');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    hamburger.classList.add('active');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    hamburger.classList.remove('active');
}

hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// =============================================
// SIDEBAR DROPDOWNS
// =============================================
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
    });
});