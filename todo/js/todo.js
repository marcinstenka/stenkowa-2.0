const todos = document.querySelector('.todos');

document.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const colorPicker = document.querySelector('.colorPicker');
    const datePicker = document.querySelector('.datePicker');
    const todoText = document.querySelector('.todoText');
    const text = todoText.value;
    const date = datePicker.value;
    const color = colorPicker.value;
    //add todo to todosList -> local storage
    todosList.push({
      text,
      date,
      color,
    });
    //add item to local storage
    localStorage.setItem('TODOS', JSON.stringify(todosList));

    todoText.value = '';
    colorPicker.value = '#6558ff';
    today = new Date();
    datePicker.value = today.getDate();
    showTodos();
  }
});
const showTodos = () => {
  let getLocalStorage = localStorage.getItem('TODOS');
  getLocalStorage
    ? (todosList = JSON.parse(getLocalStorage))
    : (todosList = []);
  let newTodos = '';
  todosList.forEach((element, index) => {
    newTodos += `<div class="todoContainer"><div class="todoDelete" onclick="deleteTodo(${index})"><img src="img/x.png"></div><div class="todo-item"><div class="todo-item__front"><h1 class="todo__text">${element.text}</h1><h3 class="todo__date">${element.date}</h3></div><div class="todo-item__back" style="background: ${element.color}"></div></div></div>`;
  });
  todos.innerHTML = newTodos;
};
showTodos();

// each todo has onclick with index
function deleteTodo(index) {
  let getLocalStorage = localStorage.getItem('TODOS');
  todosList = JSON.parse(getLocalStorage);
  todosList.splice(index, 1);
  localStorage.setItem('TODOS', JSON.stringify(todosList));
  showTodos();
}
