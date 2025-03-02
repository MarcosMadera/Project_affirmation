import { affirmations } from "../data/affirmationData.js";
import { renderAffirmations, handleAddToFavorites, handleSearchAffirmation } from "./scripts/affirmation.js";

renderAffirmations(affirmations);
setupEventListeners();

function setupEventListeners() {
    //set to handle favorites functionality
const affirmationsGrid = document.querySelector('.js-affirmations-grid');
affirmationsGrid.addEventListener('click', handleAddToFavorites);

 // Set search functionality
 const searchButton = document.querySelector('.search-btn');
 searchButton.addEventListener('click', handleSearchAffirmation);
}

// let audio = document.getElementById("audioPlayer");

// // To play the audio
// audio.play();

// // To pause the audio
// audio.pause();
