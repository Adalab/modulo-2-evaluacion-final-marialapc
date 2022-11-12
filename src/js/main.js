/* eslint-disable quotes */

"use strict";

//variables
const listCharacters = document.querySelector(".js-characters-list");
let characters = [];

const searchBtn = document.querySelector(".js-search-btn");
const searchBar = document.querySelector (".js-search-bar");

let favorites =[];



//functions

function renderCharacters(charactersList) {
  let html = "";

  for (const oneCharacter of charactersList) {
    html += `<li class="item js-character"> <article class="character">`;
    html += `<img class="character__image"src="${oneCharacter.img}">`;
    html += `<h2 class="character__name">${oneCharacter.name}</h2>`;
    html += `<p class="character__dead">${oneCharacter.status}</p>`;
    html += `</article> </li>`;
  }
  listCharacters.innerHTML = html;
  favoriteCharacters();
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
}

function favoriteCharacters(){
  const charactersLi = document.querySelectorAll('.js-character');
  for (const li of charactersLi){
    li.addEventListener('click', () => console.log('click li'));
  }
}
//Events

searchBtn.addEventListener("click", handleClick);
