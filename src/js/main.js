/* eslint-disable quotes */

"use strict";

//variables
const listCharacters = document.querySelector(".js-characters-list");
let characters = [];

const searchBtn = document.querySelector(".js-search-btn");
const searchBar = document.querySelector(".js-search-bar");

let favourites = [];
const listFavCharacters = document.querySelector(".js-favourite-characters");

//functions

function renderCharacters(charactersList) {
  let html = "";

  for (const oneCharacter of charactersList) {

    html += `<li class="item js-character" id="${oneCharacter.char_id}"> <article class="character">`;
    html += `<img class="character__image"src="${oneCharacter.img}">`;
    html += `<h2 class="character__name">${oneCharacter.name}</h2>`;
    html += `<p class="character__dead">${oneCharacter.status}</p>`;
    html += `</article> </li>`;
  }
  listCharacters.innerHTML = html;
  favouriteCharacters();
}

function renderFavCharacters(charactersFavList){
  let html = "";
  for (const character of charactersFavList) {

    html += `<li class="item js-character" id="${character.char_id}"> <article class="character">`;
    html += `<img class="character__image"src="${character.img}">`;
    html += `<h2 class="character__name">${character.name}</h2>`;
    html += `<p class="character__dead">${character.status}</p>`;
    html += `</article> </li>`;
  }
  listFavCharacters.innerHTML = html;
  favouriteCharacters();

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

function handleClickbtn(event) {
  event.preventDefault();
  const searchValue = searchBar.value.toLowerCase();

  const characterFilter = characters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacters(characterFilter);
}

function handleClickfav(event) {
  event.currentTarget.classList.toggle('fav');
  const selectedCharacter = parseInt(event.currentTarget.id);
  const foundCharacter = characters.find (
    function (character){ 
      return character.char_id === selectedCharacter;
    }
  );
  const favouriteFound = favourites.findIndex(
    (favourite) => favourite.char_id === selectedCharacter
  );

  if (favouriteFound === -1) {
    favourites.push(foundCharacter);
  } else {
    favourites.splice(favouriteFound, 1);
  }
  renderFavCharacters(characters);

  console.log(favourites);
}

function favouriteCharacters() {
  const charactersLi = document.querySelectorAll(".js-character");
  for (const li of charactersLi) {
    li.addEventListener("click", handleClickfav);
  }
}
//Events

searchBtn.addEventListener("click", handleClickbtn);
