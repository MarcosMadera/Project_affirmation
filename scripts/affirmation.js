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
              Category: ${affirmations.categories.join(", ")}
            </div>
            <div class="affirmations-description">
              Quote: ${affirmations.description}
            </div>
            <div class="affirmations-emoji">
              ${affirmations.emoji}
            </div>
            <div class="affirmations-author">
              Author: ${affirmations.author}
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
// music player code
// let isPlaying = false;
const audio = new Audio ("../sunrise.mp3");


// To play the audio
export function playAudio() {

audio.play();
console.log(audio, " should be playing")
}

// To pause the audio
function pauseAudio() {
  audio.pause();
}


// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
        event.target.innerHTML = "Add to favorites"
        favoritesCount.textContent = favorites.length
      alert('Affirmation is removed from favorites');
    }
  }
  //are we in search mode yet? they haven't clicked button yet
let isSearchMode = false;

  // Handle search functionality
export function handleSearchAffirmation(event) {

    const searchInput = document.querySelector('.search-bar');
    let searchValue = searchInput.value.trim().toLowerCase();
//the button says search
    if(!isSearchMode) { //search is false  //can be isSearchMode != true
        isSearchMode = true; //need to make it true so that it's not false
        event.target.innerHTML = "Clear Search" 
        const filteredAffirmations = affirmations.filter((affirmation) =>
        affirmation.title.toLowerCase().includes(searchValue)
        //got through each title and convert to lower case.
        //does the lowercase title contain the lowercase search value.
        //if yes, add to filteredAffirmations.
        );
    playAudio()
        renderAffirmations(filteredAffirmations);
  } else {  //the button says clear Search
    isSearchMode = false;
    searchInput.value = "";
    event.target.innerHTML = "Search";
    pauseAudio();
     renderAffirmations(affirmations);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("addAffirmationModal"); // Updated ID
  const closeButton = document.querySelector(".close");
  const form = document.getElementById("quoteForm");

  // Open modal function
  document.getElementById("openModalBtn").onclick = function() { // Use the correct button ID
    modal.style.display = "flex";
  };

  // Close modal when clicking "X"
  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

 
  // Close modal on form submit
  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload
      saveFormData(event);
      modal.style.display = "none"; // Close the modal
  });
function saveFormData(event) {

const form = event.target;
const userQuote = {
  id: affirmations.length + 1,
  title: form.title.value,
  description: form.quote.value,
  emoji: form.emoji.value,
  author: form.author.value,
  categories: [form.category.value]
}
affirmations.push(userQuote);
form.reset()
renderAffirmations(affirmations);
// console.log(affirmations);
// console.log(userQuote);
}
 });



