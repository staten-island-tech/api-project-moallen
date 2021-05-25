import { DOMSelectors } from "./DOM";
import { stores } from "./stores";
let pageNumber = 0;
const query = async function (pageNumber) {
  const page = pageNumber;
  DOMSelectors.grid.innerHTML = "";
  try {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50&sortBy=Metacritic&pageSize=30&pageNumber=${page}`
    );

    const data = await response.json();
    data.forEach((games) => {
      let storesArr = [];
      const addStore = function () {
        stores.forEach((element) => {
          if (games.storeID.includes(element.id)) {
            storesArr.push(element.name);
            return storesArr;
          }
        });
      };
      addStore();

      DOMSelectors.grid.insertAdjacentHTML(
        "beforeend",
        `<div class="games-card">
      <div class="games-card-front">
        <img
          src="${games.thumb}"
          alt=""
          class="poster"
        />
      </div>
      <div class="games-card-back">
        <h3 class="games-card-header">${games.title}</h3>
        <div class="price-box">
          <p class="price">Get it now for:$ ${games.salePrice}</p>
          <p class="price">Original Price:$ ${games.normalPrice}</p>
         
        </div>

        <div class="score-box">
          <p class="criticsTitle">Critics Ratings: ${games.metacriticScore}</p>
         
        </div>

        <div class="savings-box">
          <p class="savings">${Math.round(games.savings)}% off</p>
         
        </div>

        <div class="games-genres">
            From ${storesArr}
          </div>

      </div>
    </div> `
      );
    });
  } catch (error) {
    console.log(error);
    alert("Oops, something bad happened");
  }
};
query();

const nextPage = function () {
  DOMSelectors.next.addEventListener("click", function next() {
    pageNumber++;
    query(pageNumber);
  });
};
const previousPage = function () {
  DOMSelectors.previous.addEventListener("click", function previousbtn() {
    pageNumber--;
    query(pageNumber);
  });
};
nextPage();
previousPage();
