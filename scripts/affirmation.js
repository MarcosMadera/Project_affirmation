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
 
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

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
    
        renderAffirmations(filteredAffirmations);
  } else {  //the button says clear Search
    isSearchMode = false;
    searchInput.value = "";
    event.target.innerHTML = "Search";
     renderAffirmations(affirmations);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close");
  const form = document.getElementById("quoteForm");

  // Open modal function (if you need a trigger)
  function openModal() {
      modal.style.display = "flex";
  }

  // Close modal when clicking "X"
  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Close modal when clicking outside modal content
  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  // Close modal on form submit
  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page reload
      updateOutput(); // Update the live preview
      modal.style.display = "none"; // Close the modal
  });

  function updateOutput() {
      const formData = new FormData(form);
      document.getElementById("output").innerHTML = `
          <h3>Live Preview</h3>
          <p><strong>Title:</strong> ${formData.get("title")}</p>
          <p><strong>Category:</strong> ${formData.get("category")}</p>
          <p><strong>Quote:</strong> ${formData.get("quote")}</p>
          <p><strong>Emoji:</strong> ${formData.get("emoji")}</p>
          <p><strong>Author:</strong> ${formData.get("author")}</p>
      `;
  }
});

// Fetch random quote
async function fetchQuote() {
  try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      document.getElementById("quote").value = data.content;
      document.getElementById("author").value = data.author;
      updateOutput();
  } catch (error) {
      console.error("Error fetching quote:", error);
  }
}

// Fetch random emoji
async function fetchEmoji() {
  try {
      const response = await fetch("https://emoji-api.com/emojis?access_key=YOUR_API_KEY");
      const data = await response.json();
      const randomEmoji = data[Math.floor(Math.random() * data.length)].character;
      document.getElementById("emoji").value = randomEmoji;
      updateOutput();
  } catch (error) {
      console.error("Error fetching emoji:", error);
  }
}
