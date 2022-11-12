/* eslint-disable quotes */

"use strict";

//variables
const listCharacters = document.querySelector(".js-characters-list");
let characters = [];
const searchBtn = document.querySelector(".js-search-btn");
const searchBar = document.querySelector (".js-search-bar");


//functions

function renderCharacters(charactersList) {
  let html = "";

  for (const oneCharacter of charactersList) {
    html += `<li class="item"><article class="character">`;
    html += `<img class="character__image"src="${oneCharacter.img}">`;
    html += `<h2 class="character__name">${oneCharacter.name}</h2>`;
    html += `<p class="character__dead">${oneCharacter.status}</p>`;
    html += `</article> </li>`;
  }
  listCharacters.innerHTML = html;
}

function getData() {
  fetch("https://breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      characters = data;
      renderCharacters(characters);
    });
}

getData();

function handleClick(event) {
  event.preventDefault();
  const searchValue = searchBar.value.toLowerCase();

  const characterFilter = characters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacters(characterFilter);
  console.log(renderCharacters(characterFilter));
}

//Events

searchBtn.addEventListener("click", handleClick);
