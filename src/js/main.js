"use strict";

const listCharacters = document.querySelector(".js-characters-list");
let characters = [];


fetch("https://breakingbadapi.com/api/characters"
)
  .then((response) => response.json())
  .then((data) => {
    characters = data;
   });


