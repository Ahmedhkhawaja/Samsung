// samsung.js
// Contains:
// 1) Carousel controls + progress bar
// 2) Desktop mega-menu hover behavior (only on desktop)
// 3) Mobile sidebar drawer (simple)

// -----------------------------
// 1) CAROUSEL
// -----------------------------
const prevBtn = document.querySelector(".Previous");
const nextBtn = document.querySelector(".Next");

const track = document.querySelector("#cardsa");
const container = document.querySelector(".carousel-container");

const barFill = document.querySelector(".mybar");
const barTrack = document.querySelector(".bard");

let index = 0;

function stepSize() {
  const firstCard = track?.querySelector(".card");
  if (!firstCard) return 0;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.gap || styles.columnGap || 0);

  return cardWidth + gap;
}

function maxIndex() {
  const totalCards = track?.querySelectorAll(".card").length ?? 0;
  const containerWidth = container?.getBoundingClientRect().width ?? 0;
  const step = stepSize();
  if (step <= 0) return 0;

  const visibleCards = Math.floor(containerWidth / step);
  return Math.max(0, totalCards - visibleCards);
}

function updateProgressBar() {
  if (!barFill || !barTrack) return;

  const max = maxIndex();
  const trackWidth = barTrack.getBoundingClientRect().width;

  // if there is nothing to scroll, show full bar
  const progress = max === 0 ? 1 : index / max;

  barFill.style.width = `${progress * trackWidth}px`;
}

function renderCarousel() {
  if (!track) return;

  const step = stepSize();
  track.style.transform = `translateX(${-index * step}px)`;
  updateProgressBar();
}

nextBtn?.addEventListener("click", () => {
  index = Math.min(index + 1, maxIndex());
  renderCarousel();
});

prevBtn?.addEventListener("click", () => {
  index = Math.max(index - 1, 0);
  renderCarousel();
});

window.addEventListener("resize", renderCarousel);
renderCarousel();


// -----------------------------
// 2) DESKTOP MEGA MENU (hover)
// Only runs on desktop (hover exists)
// -----------------------------
const header = document.querySelector(".header");
const mega = document.getElementById("mega");
const triggers = document.querySelectorAll(".headers");
let closeTimer = null;

function isDesktop() {
  return window.matchMedia("(min-width: 769px)").matches;
}

function openMenu() {
  if (!header || !mega) return;
  if (closeTimer) clearTimeout(closeTimer);

  mega.classList.add("open");
  header.classList.add("mega-open");
}

function closeMenu() {
  if (!header || !mega) return;
  if (closeTimer) clearTimeout(closeTimer);

  closeTimer = setTimeout(() => {
    mega.classList.remove("open");
    header.classList.remove("mega-open");
  }, 200);
}

// Attach hover listeners only on desktop
function bindDesktopHover() {
  if (!isDesktop()) return;

  triggers.forEach((t) => {
    t.addEventListener("mouseenter", openMenu);
    t.addEventListener("mouseleave", closeMenu);
  });

  mega?.addEventListener("mouseenter", openMenu);
  mega?.addEventListener("mouseleave", closeMenu);
}

bindDesktopHover();

// If you resize between mobile/desktop, page refresh is simplest,
// but we can do a safe re-bind by reloading on breakpoint change:
window.addEventListener("resize", () => {
  // Close any open menu when switching modes
  if (!isDesktop()) {
    mega?.classList.remove("open");
    header?.classList.remove("mega-open");
  }
});


// -----------------------------
// 3) MOBILE SIDEBAR DRAWER
// Requires these IDs in HTML:
// #drawer, #menuBtn, #drawerClose, #drawerBackdrop
// -----------------------------
const drawer = document.getElementById("drawer");
const menuBtn = document.getElementById("menuBtn");
const drawerClose = document.getElementById("drawerClose");
const drawerBackdrop = document.getElementById("drawerBackdrop");

function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function openDrawer() {
  if (!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

menuBtn?.addEventListener("click", () => {
  if (!isMobile()) return;
  openDrawer();
});

drawerClose?.addEventListener("click", closeDrawer);
drawerBackdrop?.addEventListener("click", closeDrawer);

// Close drawer when clicking outside header/drawer area (optional)
document.addEventListener("click", (e) => {
  if (!isMobile()) return;
  if (!drawer || !drawer.classList.contains("open")) return;

  // If click is inside the drawer panel or the menu button, ignore
  const panel = drawer.querySelector(".drawer-panel");
  if (panel?.contains(e.target) || menuBtn?.contains(e.target)) return;

  closeDrawer();
});

// Escape closes either drawer or mega menu
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  closeDrawer();
  mega?.classList.remove("open");
  header?.classList.remove("mega-open");
});
