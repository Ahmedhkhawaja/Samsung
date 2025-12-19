const cardsa = [
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
  { img: "/images/d1.avif", title: "Galaxy A07", price: "Rs 38,500" },
];

const cardsContainer = document.querySelector("#cardsa");

cardsa.forEach((card) => {
  cardsContainer.innerHTML += `
    <div class="card">
      <div class="image">
        <img src="${card.img}">
      </div>
      <div class="text">
        <h3>${card.title}</h3>
        <p>${card.price}</p>
      </div>
    </div>
  `;
});
