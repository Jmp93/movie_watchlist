const search = document.getElementById('search-form');
const resultsContainer = document.getElementById('movie-results-container');
let currentSearchMovies = [];

function saveToWatchList(movie) {
  const currentWatchList = JSON.parse(localStorage.getItem('watchlist')) || [];

  const isDuplicate = currentWatchList.some(
    item => item.imdbID === movie.imdbID,
  );

  if (!isDuplicate) {
    currentWatchList.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(currentWatchList));
  }
}

search.addEventListener('submit', movieSearch);

document.addEventListener('click', e => {
  const targetBtn = e.target.closest('.add-btn');
  if (targetBtn) {
    handleAddBtn(targetBtn.dataset.id, targetBtn);
  }
});

function handleAddBtn(addId, btnElement) {
  const targetAddObj = currentSearchMovies.find(movie => {
    return movie.imdbID === addId;
  });

  if (targetAddObj) {
    saveToWatchList(targetAddObj);
    btnElement.innerHTML = `<p class="added">Added!</p>`;
    btnElement.disabled = true;
  }
}

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
    currentSearchMovies = detailedMovies;
    renderMovies(detailedMovies);
  } else {
    currentSearchMovies = [];
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
  const fallbackImg = './img/placeholder.png';

  if (movies && movies.length > 0) {
    const moviesHtml = movies
      .map(({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }) => {
        const posterSrc = Poster === 'N/A' ? fallbackImg : Poster;
        return `
    <div class="inner-content container">
        <img class="movie-poster" src="${posterSrc}" alt="movie poster" onerror="this.src='./img/placeholder.png'; this.onerror=null;">
        <div class="inner-text">
          <div class="title-rating">
            <h2 class="title">${Title}</h2>
            <img src="./img/star.png" alt="Rating star" />
            <p class="rating">${imdbRating}</p>
          </div>
          <div class="movie-info">
            <p class="time">${Runtime}</p>
            <div class="genre">${Genre}</div>
            <button class="add-btn" id="add-btn" data-id="${imdbID}">
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
