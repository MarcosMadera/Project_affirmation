import { affirmations } from "../data/affirmationData.js";
export let favorites = [];
export function renderAffirmations(listAffirmations) {
  const affirmationsHTML = listAffirmations.map((affirmations) => `
        <div class="affirmations-container">
          <div class="affirmations-details">
            <div class="affirmations-title limit-text-to-2-lines">
              ${affirmations.title}
            </div>
            <div class="affirmations-category">
               ${affirmations.categories.join(", ")}
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
          data-affirmations-Id="${affirmations.id}">
            Add to Favorites
          </button>
        </div>
      `)
    .join("");

  const affirmationsGrid = document.querySelector('.js-affirmations-grid');
  affirmationsGrid.innerHTML = affirmationsHTML;
}
 // Handle adding movies to favorites
export function handleAddToFavorites(event) {
    if (!event.target.classList.contains('js-add-to-favorites')) return;

  
    const affirmationId = event.target.dataset.affirmationsId;
    console.log(event.target.innerHTML);
    
    const favoritesCount = document.getElementById('js-favorites-count');
  
    const alreadyFavorite = favorites.some((fav) => fav.affirmationId === affirmationId);
    if (!alreadyFavorite) {
      favorites.push({ affirmationId });
      favoritesCount.textContent = favorites.length;
      event.target.innerHTML = "Remove from favorites"
      //update the amount
      alert('Affirmation added to favorites!');
    } else {
        let newFavorites = favorites.filter((favorite) => favorite.affirmationId != affirmationId)
        favorites = newFavorites
        event.target.innerHTML = "add to favorites"
        favoritesCount.textContent = favorites.length
      alert('Affirmation is removed from favorites');
    }
  }

  // Handle search functionality
export function handleSearchAffirmation() {
    const searchInput = document.querySelector('.search-bar');
    const searchValue = searchInput.value.trim().toLowerCase();
  
    const filteredAffirmations = affirmations.filter((affirmation) =>
      affirmation.title.toLowerCase().includes(searchValue)
    //got through each title and convert to lower case.
    //does the lowercase title contain the lowercase search value.
    //if yes, add to filteredAffirmations.
    );
  
    renderAffirmations(filteredAffirmations);
  }