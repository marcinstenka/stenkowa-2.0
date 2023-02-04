const newTile = document.querySelector('#newTile');
const form = document.querySelector('#form');
const add = document.querySelector('#add');
const veil = document.querySelector('#veil');
const lastItem = document.querySelector('#addable');
const inputs = document.querySelectorAll('input');

const AddNewTile = () => {
  form.style.display = 'none';
  veil.style.display = 'none';
  // values from form
  const name = document.querySelector('#name').value;
  const link = document.querySelector('#link').value;
  // choosing random number for icon
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const number = random(1, 4);
  //   generateTile(number, name, link);
  let getLocalStorage = localStorage.getItem('TILES');
  getLocalStorage
    ? (tilesList = JSON.parse(getLocalStorage))
    : (tilesList = []);
  tilesList.push({
    number,
    name,
    link,
  });
  localStorage.setItem('TILES', JSON.stringify(tilesList));
  //clearing inputs after tile added
  inputs.forEach(input => (input.value = ''));
  showTiles();
};

// main function which refresh tiles
const showTiles = () => {
  let getLocalStorage = localStorage.getItem('TILES');
  getLocalStorage
    ? (tilesList = JSON.parse(getLocalStorage))
    : (tilesList = []);
  let newTiles = '';
  tilesList.forEach((element, index) => {
    newTiles += `<div class="tile__container"><div class="deleteX" onclick = "deleteTile(${index})"><img src="img/x.png"></div><a class="tile" href="${element.link}"><div class="tile__front"><div class="front__icon"><img src="img/icon${element.number}.png"></div><div class="front__text">${element.name}</div></div><div class="tile__back"></div></a></div>`;
  });
  lastItem.innerHTML = newTiles;
};
showTiles();

// each tile has onclick with index
function deleteTile(index) {
  let getLocalStorage = localStorage.getItem('TILES');
  tilesList = JSON.parse(getLocalStorage);
  tilesList.splice(index, 1);
  localStorage.setItem('TILES', JSON.stringify(tilesList));
  showTiles();
}

//when form submitted
add.addEventListener('click', AddNewTile);
document.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    AddNewTile();
  }
});
// when clicked "add tile"
newTile.addEventListener('click', () => {
  form.style.display = 'flex';
  veil.style.display = 'block';
  document.getElementById('name').focus();
});

// when clicked outside of the form
veil.addEventListener('click', () => {
  form.style.display = 'none';
  veil.style.display = 'none';
});
