"use strict";

const listCharacters = document.querySelector(".js-characters-list");
let characters = [];


fetch("https://breakingbadapi.com/api/characters"
)
  .then((response) => response.json())
  .then((data) => {
    characters = data;
    console.log(characters);

    let html = "";
    
    for ( const oneCharacter of characters) {
    
        html += `<li class="item"><article class="character">`;
        html += `<img class="character__image"src="${oneCharacter.img}">`;
        html += `<h2 class="character__name">${oneCharacter.name}</h2>`;
        html += `<p class="character__dead">${oneCharacter.status}</p>`;
        html += `</article> </li>`;
    }
    listCharacters.innerHTML = html;

   });


