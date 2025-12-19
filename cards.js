const cardsa = [
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
];

const cardsContainer = document.querySelector("#cardsa");

cardsContainer.innerHTML = cardsa
  .map(
    (card) => `
    <div class="card">
      <div class="image">
        <img src="${card.img}" alt="${card.title}">
      </div>
      <div class="text">
        <h3>${card.title}</h3>
        <p>${card.price}</p>
      </div>
    </div>
  `
  )
  .join("");
