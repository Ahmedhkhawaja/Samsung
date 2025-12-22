const prevBtn = document.querySelector(".Previous");
const nextBtn = document.querySelector(".Next");

const track = document.querySelector("#cardsa");
const container = document.querySelector(".carousel-container");


const barFill = document.querySelector(".mybar");
const barTrack = document.querySelector(".bard");

function updateProgressBar() {
  const max = maxIndex();
  const trackWidth = barTrack.getBoundingClientRect().width;
  const progress = max === 0 ? 1 : index /max;
  barFill.style.width = `${progress * trackWidth}px`;
}








let index = 0;


function stepSize() {
  const firstCard = track.querySelector(".card");
  if (!firstCard) return 0;

  const cardWidth = firstCard.getBoundingClientRect().width;
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.gap || styles.columnGap || 0);

  return cardWidth + gap;
}

function maxIndex() {
  const totalCards = track.querySelectorAll(".card").length;
  const containerWidth = container.getBoundingClientRect().width;
  const step = stepSize();

  const visibleCards = Math.floor(containerWidth / step);
  return Math.max(0, totalCards - visibleCards);
}

function render() {
  const step = stepSize();
  track.style.transform = `translateX(${-index * step}px)`;
  updateProgressBar();
}

nextBtn.addEventListener("click", () => {
  index = Math.min(index + 1, maxIndex());
  render();
});

prevBtn.addEventListener("click", () => {
  index = Math.max(index - 1, 0);
  render();
});

window.addEventListener("resize", render);
render();









const header = document.querySelector(".header");
const mega = document.getElementById("mega");
const triggers = document.querySelectorAll(".headers");

let closeTimer = null;

function openMenu() {
  if (closeTimer) clearTimeout(closeTimer);
  mega.classList.add("open");
  header.classList.add("mega-open");
}

function closeMenu() {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    mega.classList.remove("open");
    header.classList.remove("mega-open");
  }, 200);
}

triggers.forEach ((t) => {
  t.addEventListener("mouseenter", openMenu);
  t.addEventListener("mouseleave", closeMenu);
});

mega.addEventListener("mouseenter", openMenu);
mega.addEventListener("mouseleave", closeMenu);
