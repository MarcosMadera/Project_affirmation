import { affirmations} from "../data/affirmationData.js";

console.log(affirmations);

function renderAffirmations(listAffirmations) {
    const affirmationssHTML = listAffirmations
      .map((affirmations) => `
        <div class="affirmations-container">
          <div class="affirmations-details">
            <div class="affirmations-title limit-text-to-2-lines">
              ${affirmations.title}
            </div>
            <div class="affirmations-category">
              ${affirmations.category.join(", ")}
            </div>
            <div class="affirmations-description">
              Rating: ${affirmations.description}
            </div>
            <div class="affirmations-emoji">
              ${affirmations.emoji}
            </div>
            <div class="affirmations-author">
              Rating: ${affirmations.author}
            </div>
          </div>
          <button class="add-to-favorites-button button-primary js-add-to-favorites" 
          data-affirmations-id="${affirmations.id}">
            Add to Favorites
          </button>
        </div>
      `)
      .join("");
  
    const affirmationssGrid = document.querySelector('.js-affirmations-grid');
    affirmationssGrid.innerHTML = affirmationssHTML;
}

function handleAddToFavorites(event) {
    if (!event.target.classList.contains('js-add-to-favorites')) return;
  
    const movieId = event.target.dataset.affirmationId;
    const favoritesCount = document.getElementById('js-favorites-count');
  
    const alreadyFavorite = favorites.some((fav) => fav.affirmationId === affirmationId);
    if (!alreadyFavorite) {
      favorites.push({ affirmationId });
      favoritesCount.textContent = favorites.length;
      alert('Affirmation added to favorites!');
    } else {
      alert('Affirmation is already in favorites.');
    }
  }

  function handleSearchAffirmations() {
    const searchInput = document.querySelector('.search-bar');
    const searchValue = searchInput.value.trim().toLowerCase();
  
    const filteredAffirmations = movies.filter((affirmation) =>
      affirmation.title.toLowerCase().includes(searchValue)
    );
  
    renderAffirmations(filteredAffirmations);
  }