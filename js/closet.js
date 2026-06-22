// =============================================
// GALLERY PHOTOS
// =============================================
const GALLERY_IMAGES = [
    'images/SJC_Closet_Photos/20250822_170435471_iOS.jpg',
    'images/SJC_Closet_Photos/20250822_170527241_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122327461_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122339124_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122346731_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122400729_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122406013_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122413700_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122421423_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122459800_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122510088_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122521525_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122529977_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122610340_iOS.jpg',
    'images/SJC_Closet_Photos/20260622_122617342_iOS.jpg',
];

const track = document.getElementById('closet-gallery-track');
if (GALLERY_IMAGES.length > 0) {
    const allImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES];
    allImages.forEach(src => {
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