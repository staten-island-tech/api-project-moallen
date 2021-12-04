import { DOMSelectors } from "./DOM";
import { stores } from "./stores";
let pageNumber = 0;
const querySaving = async function (pageNumber) {
  const page = pageNumber;
  DOMSelectors.grid.innerHTML = "";
  try {
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=70&sortBy=Savings&pageSize=30&pageNumber=0${page}`
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
const savingsFunction = function () {
  DOMSelectors.sortSavings.addEventListener("click", querySaving);
};

const nextPageSaving = function () {
  DOMSelectors.nextSaving.addEventListener("click", function next() {
    pageNumber++;
    querySaving(pageNumber);
    if (pageNumber >= 0) {
      DOMSelectors.previousSaving.style.display = "inline-block";
      DOMSelectors.grid.style.display = "flex";
    }
  });
};
const previousPageSaving = function () {
  DOMSelectors.previousSaving.addEventListener("click", function previousbtn() {
    pageNumber--;
    querySaving(pageNumber);
    if (pageNumber < 0) {
      DOMSelectors.previousSaving.style.display = "none";
      DOMSelectors.grid.style.display = "none";
    }
  });
};
savingsFunction();
nextPageSaving();
previousPageSaving();
