const todos = document.querySelector('.todos');

const makeTilePossibleToDelete = () => {
  let deleteXs = document.querySelectorAll('.todoDelete');
  deleteXs.forEach(X => {
    X.addEventListener('click', () => {
      X.parentElement.remove();
      const attr = X.getAttribute('id');
      function arrayRemove(arr, value) {
        return arr.filter(function (ele) {
          return ele.id != value;
        });
      }
      const newList = arrayRemove(todosList, attr);
      localStorage.setItem('TODOS', JSON.stringify(newList));
      todosList = newList;
    });
  });
};

const loadList = array => {
  array.forEach(item => {
    addTodo(item.text, item.date, item.color, item.id);
  });
};

const addTodo = (text, date, color, id) => {
  const todoContainer = document.createElement('div');
  const todoDelete = document.createElement('div');
  const img = document.createElement('img');
  const todo = document.createElement('div');
  const todoFront = document.createElement('div');
  const todo__text = document.createElement('h1');
  const todo__date = document.createElement('h3');
  const todoBack = document.createElement('div');

  todoContainer.classList.add('todoContainer');
  todoDelete.classList.add('todoDelete');
  todo.classList.add('todo-item');
  todoFront.classList.add('todo-item__front');
  todo__text.classList.add('todo__text');
  todo__date.classList.add('todo__date');
  todoBack.classList.add('todo-item__back');

  todoContainer.appendChild(todoDelete);
  todoContainer.appendChild(todo);
  todo.appendChild(todoFront);
  todoFront.appendChild(todo__text);
  todoFront.appendChild(todo__date);
  todo.appendChild(todoBack);

  todoDelete.setAttribute('id', id);
  let X = document.createElement('img');
  X.setAttribute('src', 'img/x.png');
  todoDelete.appendChild(X);

  todo__text.innerHTML = text;
  todo__date.innerHTML = date;
  todoBack.style.background = color;

  todos.appendChild(todoContainer);
};

document.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const colorPicker = document.querySelector('.colorPicker');
    const datePicker = document.querySelector('.datePicker');
    const todoText = document.querySelector('.todoText');
    const text = todoText.value;
    const date = datePicker.value;
    const color = colorPicker.value;
    addTodo(text, date, color, id);
    //add todo to todosList -> local storage
    todosList.push({
      text,
      date,
      color,
      id,
    });
    //add item to local storage
    localStorage.setItem('TODOS', JSON.stringify(todosList));
    localStorage.setItem('lastTodoNumber', id);
    id++;

    todoText.value = '';
    colorPicker.value = '#6558ff';
    today = new Date();
    datePicker.value = today.getDate();
    makeTilePossibleToDelete();
  }
});

//get local storage and check is empty
let data = localStorage.getItem('TODOS');
if (data) {
  todosList = JSON.parse(data);
  id = todosList.length;
  loadList(todosList);
  makeTilePossibleToDelete();
} else if ((data = [])) {
  todosList = [];
  id = 0;
  localStorage.setItem('lastTodoNumber', '0');
}
