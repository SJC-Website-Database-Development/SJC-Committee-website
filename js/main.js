// =============================================
// IMAGE PATHS — change filenames here only
// =============================================
const IMAGES = {
    heroBg:       'images/hero-bg.png',
    pastor:       'images/pastor.png',
    deacon:       'images/deacon.png',
    announcement: 'images/announcement1.png',
};

// =============================================
// APPLY IMAGES
// =============================================
document.querySelector('.hero').style.backgroundImage = `url('${IMAGES.heroBg}')`;
document.getElementById('img-pastor').src       = IMAGES.pastor;
document.getElementById('img-deacon').src       = IMAGES.deacon;
document.getElementById('img-announcement').src = IMAGES.announcement;

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