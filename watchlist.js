const resultsContainer = document.getElementById('movie-results-container');

function init() {
  const mySavedMovies = JSON.parse(localStorage.getItem('watchlist')) || [];

  if (mySavedMovies.length > 0) {
    renderMovies(mySavedMovies);
  } else {
    resultsContainer.innerHTML = `
        <div class="placeholder-content">
            <p>Looks like there's nothing here, go and add something.</p>
        </div>
    `;
  }
}

document.addEventListener('click', e => {
  const targetBtn = e.target.closest('.remove-btn');
  if (targetBtn) {
    handleRemoveBtn(targetBtn.dataset.id);
  }
});

function handleRemoveBtn(removeId) {
  // 1. Get the latest list from storage
  const currentWatchList = JSON.parse(localStorage.getItem('watchlist')) || [];

  // 2. Filter out the movie with the ID we clicked
  // "Keep every movie whose ID is NOT equal to the removeId"
  const updatedWatchList = currentWatchList.filter(
    movie => movie.imdbID !== removeId,
  );

  // 3. Save that new list back to localStorage
  localStorage.setItem('watchlist', JSON.stringify(updatedWatchList));

  // 4. Refresh the page view
  renderMovies(updatedWatchList);

  // 5. If the list is now empty, show your placeholder
  if (updatedWatchList.length === 0) {
    init(); // This will trigger your "nothing here" message
  }
}

function renderMovies(movies) {
  const fallbackImg = './img/placeholder.png'; // Added fallback path

  const moviesHtml = movies
    .map(({ Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID }) => {
      // Logic to handle missing posters in the saved list
      const posterSrc = Poster === 'N/A' || !Poster ? fallbackImg : Poster;

      return `
      <div class="inner-content container">
          <img class="movie-poster" src="${posterSrc}" 
               alt="${Title} poster" 
               onerror="this.src='${fallbackImg}'; this.onerror=null;">
          <div class="inner-text">
            <div class="title-rating">
              <h2 class="title">${Title}</h2>
              <img src="./img/star.png" alt="Rating star" />
              <p class="rating">${imdbRating}</p>
            </div>
            <div class="movie-info">
              <p class="time">${Runtime}</p>
              <div class="genre">${Genre}</div>
              <button class="remove-btn" data-id="${imdbID}">
                <img src="./img/remove-btn.png" alt="" />Remove
              </button>
            </div>
            <p class="desc">${Plot}</p>
          </div>
      </div>
    `;
    })
    .join('');

  resultsContainer.innerHTML = moviesHtml;
}

init();
