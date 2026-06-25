// =============================================
// BULLETINS — load latest from repo
// =============================================
async function loadLatestBulletin() {
    const container = document.getElementById('bulletin-container');

    try {
        const res = await fetch('https://api.github.com/repos/SJC-Website-Database-Development/SJC-Committee-website/contents/bulletins');
        
        if (!res.ok) throw new Error('Could not load bulletins');
        
        const files = await res.json();
        
        const mdFiles = files
            .filter(f => f.name.endsWith('.md'))
            .sort((a, b) => b.name.localeCompare(a.name));

        if (mdFiles.length === 0) {
            container.innerHTML = '<p class="media-placeholder-text">No bulletins available yet. Check back soon.</p>';
            return;
        }

        const bulletinRes = await fetch(mdFiles[0].download_url);
        const text        = await bulletinRes.text();

        const titleMatch = text.match(/title:\s*(.+)/);
        const fileMatch  = text.match(/^file:\s*(.+)/m);
        const file2Match = text.match(/^file2:\s*(.+)/m);

        const title = titleMatch ? titleMatch[1].trim() : 'Latest Bulletin';
        const file1 = fileMatch  ? fileMatch[1].trim()  : null;
        const file2 = file2Match ? file2Match[1].trim() : null;

        const baseUrl = 'https://raw.githubusercontent.com/SJC-Website-Database-Development/SJC-Committee-website/main';

        let html = `<h3 class="bulletin-title">${title}</h3>`;

        if (file1) {
            const ext = file1.split('.').pop().toLowerCase();
            if (ext === 'pdf') {
                html += `<iframe src="${baseUrl}${file1}" class="bulletin-pdf" title="${title}"></iframe>`;
            } else {
                html += `<img src="${baseUrl}${file1}" class="bulletin-img" alt="${title} - Page 1">`;
            }
        }

        if (file2) {
            const ext = file2.split('.').pop().toLowerCase();
            if (ext === 'pdf') {
                html += `<iframe src="${baseUrl}${file2}" class="bulletin-pdf" title="${title} - Page 2"></iframe>`;
            } else {
                html += `<img src="${baseUrl}${file2}" class="bulletin-img" alt="${title} - Page 2">`;
            }
        }

        if (!file1 && !file2) {
            html += '<p>Bulletin file not available.</p>';
        }

        container.innerHTML = html;

    } catch (err) {
        container.innerHTML = '<p class="media-placeholder-text">Could not load bulletin. Please check back later.</p>';
    }
}

loadLatestBulletin();

// =============================================
// HAMBURGER + SIDEBAR
// =============================================
const hamburger      = document.getElementById('hamburger');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarClose   = document.getElementById('sidebar-close');

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

document.querySelectorAll('.sidebar-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
    });
});