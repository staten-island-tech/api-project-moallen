import { DOMSelectors } from "./DOM";
import { stores } from "./genre";

const query = async function () {
  try {
    const response = await fetch(
      "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50&sortBy=Metacritic"
    );
    const data = await response.json();
    data.forEach((games) => {
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
