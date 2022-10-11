const searchResultContainer = document.getElementById(
  "search-result-container"
);
const searchResultSection = document.getElementById("search-result");
const noResultSection = document.getElementById("no-result");
const topSection = document.getElementById("top");
let topBackgroundCounter = 1;
let MyWatchlist = [];

if (localStorage.getItem("MyWatchlist")) {
  MyWatchlist = JSON.parse(localStorage.getItem("MyWatchlist"));
}

// functions
// render watchlist
function renderWatchlist() {
  searchResultSection.innerHTML = "";
  if (MyWatchlist.length > 0) {
    noResultSection.style.display = "none";
    for (let movieData of MyWatchlist) {
      const movieDataIndex = MyWatchlist.indexOf(movieData);
      GenerateMovieCard(movieData, movieDataIndex);
    }
  } else {
    noResultSection.style.display = "flex";
  }
}

// generate movie cards
function GenerateMovieCard(data, dataIndex) {
  const mmc = document.createElement("div");
  mmc.className = "main-movie-container";

  const ic = document.createElement("div");
  ic.className = "image-container";

  const poster =
    data.Poster === "N/A" ? `${data.Title} image is not available` : data.Title;
  const i = document.createElement("img");
  i.src = data.Poster;
  i.alt = poster;
  const mdc = document.createElement("div");
  mdc.className = "meta-data-container";

  const title = document.createElement("p");
  title.innerHTML = `${data.Title}<span>⭐ ${data.imdbRating}</span>`;

  const movieInfo = document.createElement("div");
  const runtime = document.createElement("span");
  runtime.textContent = data.Runtime;

  const genre = document.createElement("span");
  genre.textContent = data.Genre;

  const removeFromWatchlist = document.createElement("span");
  removeFromWatchlist.className = "add-remove-watchlist";
  removeFromWatchlist.textContent = "➖ Remove";

  removeFromWatchlist.addEventListener("click", () => {
    MyWatchlist.splice(dataIndex, 1);
    localStorage.setItem("MyWatchlist", JSON.stringify(MyWatchlist));
    renderWatchlist();
  });

  const plot = document.createElement("p");
  plot.className = "plot";
  plot.textContent = data.Plot;

  ic.append(i);

  movieInfo.append(runtime);
  movieInfo.append(genre);
  movieInfo.append(removeFromWatchlist);

  mdc.append(title);
  mdc.append(movieInfo);
  mdc.append(plot);

  mmc.append(ic);
  mmc.append(mdc);

  searchResultSection.append(mmc);
}

// controls the top section background like a carousel
function changeTopSectionBackground() {
  if (topBackgroundCounter === 6) {
    topBackgroundCounter = 1;
  }

  topSection.style.backgroundImage = `url('./img/item${topBackgroundCounter}.jpeg')`;
  topBackgroundCounter++;
}

// rendering the page
renderWatchlist();

// run the function to change the background of top every 2 seconds
setInterval(() => {
  changeTopSectionBackground();
}, 2000);
