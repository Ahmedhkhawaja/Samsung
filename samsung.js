const PrevBtn = document.querySelector(".Previous");
const NextBtn = document.querySelector(".Next");
let slideCount = 1;
NextBtn.addEventListener("click", NextSlide);
PrevBtn.addEventListener("click", PrevSlide);

function NextSlide() {
  if (slideCount < 3) {
    slideCount++;
  }
}

function PrevSlide() {
  if (slideCount > 1) {
    slideCount--;
  }
}