const inpVal = document.querySelector("#searchInput");
const movieInfo = document.querySelector("#movieInfo");
const btn = document.querySelector(".btn");
const card = document.querySelector(".card");

btn.addEventListener("click", () => {
  const searchInput = inpVal.value.trim();
  const apiKey = "3b66d749";
  const apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + searchInput;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!inpVal.value) {
          card.classList.remove('filest')
          movieInfo.innerHTML =''
          alert("Enter to movie title");
      } else {
        if (data.Response === "True") {
            card.classList.add('filest')
            displayMovieInfo(data);
        } else {
            card.classList.remove('filest')
          movieInfo.innerHTML=`<h1>There is no film!</h1>`
        }
      }
    });
});

function displayMovieInfo(movie) {
  let janriHTML = "";
  let janri = movie.Genre.split(",");
  for (let i = 0; i < janri.length; i++) {
    janriHTML += `<div class="janr">${janri[i]}</div>`;
  }
  movieInfo.innerHTML = `
  <div class="card__description">
  <div class="card__img">
      <img src="${movie.Poster}" alt="....">
  </div>
  <div class="card__description_right">
      <h2>${movie.Title}</h2>
      <div class="rayting">
          <i class="fa-solid fa-star"></i>
          <p>${movie.Ratings[0].Value}</p>
      </div>
      <div class="year">
          <p>${movie.Rated}</p>
          <p>${movie.Year}</p>
          <p>${movie.Runtime}</p>
      </div>
      <div class="genres">
          ${janriHTML}
      </div>
  </div>
</div>
<div class="card__tittle">
  <h3>Plot:</h3>
  <p>${movie.Plot}</p>
  <h3>Cast:</h3>
  <p>${movie.Actors}</p>
</div>
    `;
}
