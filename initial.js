import { affirmations } from "./data/affirmationData.js";




const favoritesCount = document.getElementById('js-favorites-count');
const favorites = [];

document.querySelectorAll('.js-add-to-favorites')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const movieId = button.dataset.affirmations.id;

      const alreadyFavorite = favorites.some((fav) => fav.affirmationId === affirmationId);
      if (!alreadyFavorite) {
        favorites.push({affirmationId});
        alert('Affirmation added to favorites!');
      } else {
        alert('Affirmation is already in favorites.');
      }
    });
  });

  renderMovies(movies);
setupEventListeners();

function setupEventListeners() {
  // Add favorites button event delegation
  const affirmationssGrid = document.querySelector('.js-affirmations-grid');
  affirmationsGrid.addEventListener('click', handleAddToFavorites);

  // Set search functionality
  const searchButton = document.querySelector('.search-icon');
  searchButton.addEventListener('click', handleSearchAffirmation);
}

renderAffirmations(affirmations);