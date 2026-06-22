// =============================================
// GALLERY PHOTOS — add filenames here
// =============================================
const GALLERY_IMAGES = [
    // 'images/closet-1.jpg',
    // 'images/closet-2.jpg',
    // Add more as you get photos
];

const track = document.getElementById('closet-gallery-track');
if (GALLERY_IMAGES.length > 0) {
    GALLERY_IMAGES.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "St. Joseph's Closet";
        img.className = 'closet-gallery-img';
        track.appendChild(img);
    });
} else {
    track.innerHTML = '<p style="color:var(--cream); text-align:center; padding: 2rem;">Photos coming soon.</p>';
}

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