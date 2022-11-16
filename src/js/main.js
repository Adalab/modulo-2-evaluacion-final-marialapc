/* eslint-disable quotes */

"use strict";

//variables
const listCharacters = document.querySelector(".js-characters-list");
let characters = [];

const searchBtn = document.querySelector(".js-search-btn");
const searchBar = document.querySelector(".js-search-bar");

let favourites = [];
const listFavCharacters = document.querySelector(".js-favourite-characters");

const resetBtn = document.querySelector(".js-reset-btn");
const logBtn = document.querySelector(".js-log-btn");


//functions

function renderCharacters(charactersList) {//paint the characters from the Api, paint them with the fav class or not
  let html = "";
  let favClass = "";

  for (const oneCharacter of charactersList) {
    const favouriteFound = favourites.findIndex(
      (favourite) => favourite.char_id === oneCharacter.char_id
    );
    if (favouriteFound === -1) {
      favClass = "";
    } else {
      favClass = "fav";
    }

    html += `<li class="item js-character ${favClass} " id="${oneCharacter.char_id}"> <article class="character">`;
    html += `<img class="character__image"src="${oneCharacter.img}">`;
    html += `<h2 class="character__name">${oneCharacter.name}</h2>`;
    html += `<p class="character__dead">${oneCharacter.status}</p>`;
    html += `<p class="character__category"> ${oneCharacter.category}</p>`;
    html += `</article> </li>`;
  }
  listCharacters.innerHTML = html;
  favouriteCharacters();
}

function renderFavCharacters(favourites) { //paint the favorite characters
  let html = "";
  for (const favouriteFound of favourites) {
    html += `<li class="item js-character" id="${favouriteFound.char_id}"> <article class="character">`;
    html += `<img class="character__image"src="${favouriteFound.img}">`;
    html += `<h2 class="character__name">${favouriteFound.name}</h2>`;
    html += `<p class="character__dead">${favouriteFound.status}</p>`;
    html += `</article> </li>`;
  }
  listFavCharacters.innerHTML = html;
}

function getData() {  // get data from the Api
  fetch("https://breakingbadapi.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      characters = data;
      renderCharacters(characters);
    });
  const savedFavourites = JSON.parse(
    localStorage.getItem("Favourite Characters")
  );
  console.log(savedFavourites);

  if (savedFavourites !== null) {
    favourites = savedFavourites;
    renderFavCharacters(favourites);
  }
}

getData();

function handleClickbtn(event) { //filter for searching a character
  event.preventDefault();
  const searchValue = searchBar.value.toLowerCase();

  const characterFilter = characters.filter((character) =>
    character.name.toLowerCase().includes(searchValue)
  );
  renderCharacters(characterFilter);
}

function handleClickfav(event) { // make the clicked character a favortite character and add it to the array, paint or delete from the section
  event.currentTarget.classList.toggle("fav");
  const selectedCharacter = parseInt(event.currentTarget.id);
  const foundCharacter = characters.find(function (character) {
    return character.char_id === selectedCharacter;
  });
  const favouriteFound = favourites.findIndex(
    (favourite) => favourite.char_id === selectedCharacter
  );

  if (favouriteFound === -1) {
    favourites.push(foundCharacter);
    renderFavCharacters(favourites);
    localStorage.setItem("Favourite Characters", JSON.stringify(favourites));
  } else {
    favourites.splice(favouriteFound, 1);
    renderFavCharacters(favourites);
    localStorage.setItem("Favourite Characters", JSON.stringify(favourites));
  }

  console.log(favourites);
}

function favouriteCharacters() { //click on a character
  const charactersLi = document.querySelectorAll(".js-character");
  for (const li of charactersLi) {
    li.addEventListener("click", handleClickfav);
  }
}

//Events

searchBtn.addEventListener("click", handleClickbtn); // click on search button

resetBtn.addEventListener("click", (ev) => {
  //click on reset button
  ev.preventDefault();
  listFavCharacters.innerHTML = "";
  localStorage.clear();
  favourites.length = 0;
  renderCharacters(characters);
});

logBtn.addEventListener("click",(evento) =>{
  event.preventDefault();
for ( const oneCharacter of characters){
  console.log(oneCharacter.name)
}

});
