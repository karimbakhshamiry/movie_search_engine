// variables
const submitBtn = document.getElementById("submit");
const searchQueryInput = document.getElementById("search-query");
const searchResultContainer = document.getElementById(
  "search-result-container"
);
const noSearchSection = document.getElementById("no-search");
const searchResultSection = document.getElementById("search-result");
const noResultSection = document.getElementById("no-result");
const topSection = document.getElementById("top");
let topBackgroundCounter = 1;
let MyWatchlist = [];

if (localStorage.getItem("MyWatchlist")) {
  MyWatchlist = JSON.parse(localStorage.getItem("MyWatchlist"));
}

// all functions

// generate new movie cards
function GenerateMovieCard(data) {
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
  title.className = "title";
  title.innerHTML = `${data.Title}<span>⭐ ${data.imdbRating}</span>`;

  const movieInfo = document.createElement("div");
  const runtime = document.createElement("span");
  runtime.textContent = data.Runtime;

  const genre = document.createElement("span");
  genre.textContent = data.Genre;

  const addToWatchlist = document.createElement("span");
  addToWatchlist.className = "add-remove-watchlist";
  addToWatchlist.textContent = "➕ Watchlist";

  addToWatchlist.addEventListener("click", () => {
    MyWatchlist.push({
      Poster: data.Poster,
      Title: data.Title,
      imdbRating: data.imdbRating,
      Runtime: data.Runtime,
      Genre: data.Genre,
      Plot: data.Plot,
    });
    localStorage.setItem("MyWatchlist", JSON.stringify(MyWatchlist));
  });

  const plot = document.createElement("p");
  plot.className = "plot";
  plot.textContent = data.Plot;

  ic.append(i);

  movieInfo.append(runtime);
  movieInfo.append(genre);
  movieInfo.append(addToWatchlist);

  mdc.append(title);
  mdc.append(movieInfo);
  mdc.append(plot);

  mmc.append(ic);
  mmc.append(mdc);

  document.getElementById("search-result").append(mmc);
}

// search for queries and send data over to the generate movie cards
function searchAndRenderMovies(title) {
  fetch(`https://www.omdbapi.com/?apikey=59f796d9&s=${title}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        noSearchSection.style.display = "none";
        noResultSection.style.display = "none";
        searchResultSection.style.display = "flex";
        searchResultSection.innerHTML = "";

        // console.log(data)
        let moviesList = data;
        for (let movie of moviesList.Search) {
          fetch(`https://www.omdbapi.com/?apikey=59f796d9&i=${movie.imdbID}`, {
            method: "GET",
          })
            .then((respose) => respose.json())
            .then((data) => {
              GenerateMovieCard(data);
              // console.log(data)
            });
        }
      } else if (data.Response === "False") {
        searchResultSection.style.display = "none";
        noSearchSection.style.display = "none";
        noResultSection.style.display = "flex";
      }
    });
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
noResultSection.style.display = "none";

// adding event listener to the search button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (searchQueryInput.value.length > 0) {
    searchAndRenderMovies(searchQueryInput.value);
    searchQueryInput.value = "";
  } else {
    noSearchSection.style.display = "flex";
    noResultSection.style.display = "none";
    searchResultSection.style.display = "none";
  }
});

// run the function to change the background of top every 2 seconds
setInterval(() => {
  changeTopSectionBackground();
}, 2000);
