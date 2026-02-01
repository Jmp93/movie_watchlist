const search = document.getElementById('search-form');
const resultsContainer = document.getElementById('movie-results-container');

search.addEventListener('submit', movieSearch);

document.addEventListener('click', e => {
  const targetBtn = e.target.closest('.add-btn');
  if (targetBtn) {
    handleAddBtn(targetBtn.dataset.id);
  }
});

async function getMovies(title) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=b7e8ec40&s=${title}`);
  const data = await res.json();

  if (data.Search) {
    const moviePromises = data.Search.map(async movie => {
      const detailRes = await fetch(
        `http://www.omdbapi.com/?apikey=b7e8ec40&i=${movie.imdbID}`,
      );
      return detailRes.json();
    });
    const detailedMovies = await Promise.all(moviePromises);
    renderMovies(detailedMovies);
  } else {
    renderMovies([]);
  }
}

function movieSearch(e) {
  e.preventDefault();
  const input = document.getElementById('search-bar').value;

  getMovies(input);
  e.target.reset();
}

function renderMovies(movies) {
  resultsContainer.innerHTML = '';

  if (movies && movies.length > 0) {
    const moviesHtml = movies
      .map(({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }) => {
        return `
    <div class="inner-content container">
        <img class="movie-poster" src="${Poster}" alt="movie poster" />
        <div class="inner-text">
          <div class="title-rating">
            <h2 class="title">${Title}</h2>
            <img src="./img/star.png" alt="Rating star" />
            <p class="rating">${imdbRating}</p>
          </div>
          <div class="movie-info">
            <p class="time">${Runtime}</p>
            <div class="genre">${Genre}</div>
            <button class="add-btn" data-id="${imdbID}">
              <img src="./img/add-btn.png" alt="" />Watchlist
            </button>
          </div>
          <p class="desc">
            ${Plot}
          </p>
        </div>
      </div>
    `;
      })
      .join('');
    resultsContainer.innerHTML = moviesHtml;
  } else {
    resultsContainer.innerHTML = `
        <div class="placeholder-content">
            <p>Unable to find what you are looking for. Please try another search.</p>
        </div>
    `;
  }
}
