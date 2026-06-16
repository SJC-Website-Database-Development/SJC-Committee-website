// =============================================
// IMAGE PATHS
// =============================================
const IMAGES = {
    pastor:   'images/pastor.png',
    deacon:   'images/deacon.png',
    nancy:    'images/nancy.png',
    carolena: 'images/carolena.png',
};

// =============================================
// APPLY IMAGES
// =============================================
document.getElementById('img-pastor').src   = IMAGES.pastor;
document.getElementById('img-deacon').src   = IMAGES.deacon;
document.getElementById('img-nancy').src    = IMAGES.nancy;
document.getElementById('img-carolena').src = IMAGES.carolena;

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

// =============================================
// SIDEBAR DROPDOWNS
// =============================================
document.querySelectorAll('.sidebar-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const parent = toggle.parentElement;
        parent.classList.toggle('open');
    });
});