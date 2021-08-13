const newTile = document.querySelector('#newTile');
const form = document.querySelector('#form');
const add = document.querySelector('#add');
const veil = document.querySelector('#veil');
const lastItem = document.querySelector('#addable');
const inputs = document.querySelectorAll('input');

const makeTilePossibleToDelete = () => {
  let deleteXs = document.querySelectorAll('.deleteX');
  deleteXs.forEach(X => {
    X.addEventListener('click', () => {
      X.parentElement.remove();
      const attr = X.getAttribute('id');
      function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
          return ele.id != value;
        });
      }
      const newList = arrayRemove(tilesList, attr);
      localStorage.setItem('TILES', JSON.stringify(newList));
      tilesList = newList;
    });
  });
};

const loadList = array => {
  array.forEach(item => {
    generateTile(item.number, item.name, item.link, item.id);
  });
};
const generateTile = (number, name, link, id) => {
  // creating tile element
  let tile__container = document.createElement('div');
  tile__container.classList.add('tile__container');

  let deleteX = document.createElement('div');
  deleteX.classList.add('deleteX');
  deleteX.setAttribute('id', id);
  let X = document.createElement('img');
  X.setAttribute('src', 'img/x.png');
  deleteX.appendChild(X);
  tile__container.appendChild(deleteX);

  let a = document.createElement('a');
  tile__container.appendChild(a);
  a.classList.add('tile');
  a.setAttribute('href', link);
  let tile__front = document.createElement('div');
  tile__front.classList.add('tile__front');
  a.appendChild(tile__front);

  let tile__back = document.createElement('div');
  tile__back.classList.add('tile__back');
  a.appendChild(tile__back);

  let front__icon = document.createElement('div');
  front__icon.classList.add('front__icon');
  tile__front.appendChild(front__icon);

  let image = document.createElement('img');
  image.setAttribute('src', `img/icon${number}.png`);
  front__icon.appendChild(image);

  let front__text = document.createElement('div');
  front__text.classList.add('front__text');
  front__text.innerHTML = name;
  tile__front.appendChild(front__text);

  lastItem.insertBefore(tile__container, lastItem.lastChild.previousSibling);
};
const AddNewTile = () => {
  form.style.display = 'none';
  veil.style.display = 'none';
  // values from form
  const name = document.querySelector('#name').value;
  const link = document.querySelector('#link').value;
  // choosing random number for icon
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const number = random(1, 7);
  generateTile(number, name, link, id);
  //add tile to tilesList -> local storage
  tilesList.push({
    number,
    name,
    link,
    id,
  });

  //add item to local storage
  localStorage.setItem('TILES', JSON.stringify(tilesList));
  localStorage.setItem('lastTileNumber', id);
  id++;
  //clearing inputs after tile added
  inputs.forEach(input => (input.value = ''));
  makeTilePossibleToDelete();
};
//get local storage and check is empty
let data = localStorage.getItem('TILES');
if (data) {
  tilesList = JSON.parse(data);
  // id = tilesList.length;
  id = localStorage.getItem('lastTileNumber');
  loadList(tilesList);
  makeTilePossibleToDelete();
} else if ((data = [])) {
  tilesList = [];
  id = 0;
  localStorage.setItem('lastTileNumber', '0');
}

//when form submitted
add.addEventListener('click', AddNewTile);

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
