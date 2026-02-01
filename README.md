🎬 Movie Watchlist
A dynamic, data-driven web application that allows users to search the OMDb database and curate a personal watchlist of films. Built as part of the Scrimba 2025 Frontend Career Path.

🚀 Live Demo
(https://incredible-kringle-966558.netlify.app/)

✨ Features

- Live Search: Real-time fetching of movie data using the OMDb API.

- Detailed Information: Displays ratings, genre, runtime, and plot summaries for every result.

- Persistent Watchlist: Save your favorite movies to a personal list that persists even after closing the browser.

- Dynamic UI: Interactive button states (Add/Remove) and empty-state placeholders.

- Error Handling: Robust fallback logic for broken image links and missing API data.

🛠️ Tech Stack

- HTML5 & CSS3: Semantic structure and custom responsive styling.

- JavaScript (ES6+): \* Async/Await & Fetch API

- Promise.all for efficient multi-endpoint data fetching.

- LocalStorage for data persistence.

- Event Delegation for optimized DOM interaction.

- OMDb API: External data source for movie information.

🧠 What I Learned
During the development of this project, I tackled several key frontend challenges:

- Managing Asynchronous Flows: I learned how to handle sequential API calls—first fetching a list of IDs, then resolving multiple promises simultaneously to get full movie details.

- DOM Performance: Utilized event delegation to handle clicks on dynamically generated "Add" and "Remove" buttons.

- Data Reliability: Implemented onerror fallback handlers to ensure the UI remains professional even when external image hosts provide broken links.

- UX Design: Designed "Added!" feedback states to prevent duplicate entries and provide immediate user confirmation.
