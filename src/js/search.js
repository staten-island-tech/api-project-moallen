import { DOMSelectors } from "./DOM";
import { stores } from "./stores";

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    DOMSelectors.grid.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    console.log(searchParams);
    if (DOMSelectors.searchArea.value === "") {
      alert("Please Input Something To Get Your Desired Results");
      return;
    }
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?storeID=1&title=${searchParams}`
        );
        const data = await response.json();
        if (data.length === 0) {
          alert("Whoops, looks like we couldn't find anything!");
        }
        data.forEach((games) => {
          // let storesArr = [];
          // const addStore = function () {
          //   stores.forEach((element) => {
          //     if (games.storeID.includes(element.id)) {
          //       storesArr.push(element.name);
          //       return storesArr;
          //     }
          //   });
          // };
          // addStore();

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
                <p class="criticsTitle">Critics Ratings: ${
                  games.metacriticScore
                }</p>
               
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
        console.log(data.length);
      } catch (error) {
        console.log(error);
        alert("Oops, something bad happened");
      }
    };
    searchQuery();
  });
};
listen();
