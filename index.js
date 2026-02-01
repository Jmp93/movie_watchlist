const search = document.getElementById('search-form');

search.addEventListener('submit', movieSearch);

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
    console.log(detailedMovies);
  }
}

function movieSearch(e) {
  e.preventDefault();
  const input = document.getElementById('search-bar').value;

  getMovies(input);
  e.target.reset();
}
