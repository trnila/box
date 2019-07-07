let todos = []
let list = document.querySelector('#todo-list');

function addTodo(val) {
  // create list item
  let item = document.createElement('li');
  item.innerText = val;

  // create delete element
  let del = document.createElement('span');
  del.className = 'delete';
  del.innerText = '-';
  item.appendChild(del);

  // append to the list
  list.appendChild(item);
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

document.querySelector('#add-todo button').addEventListener('click', (e) => {
  let val = document.querySelector('#add-todo input[type=text]').value;
  addTodo(val)

  todos.push({text: val, done: false});
  saveTodos();

  // prevent sending form to the server
  e.preventDefault()
  return false;
});

list.addEventListener('click', () => {
  function find_index(elem) {
    var elems = elem.parentNode.children;
    for(let i = 0; i < elems.length; i++) {
      if(elems[i] == elem) {
        return i
      }
    }
    return -1;
  }

  let item = event.target.parentElement;
  if(item.tagName != 'LI') {
    return;
  }

  let index = find_index(item);
  if(index >= 0) {
    item.remove();
    todos.splice(index, 1)
    saveTodos();
  }
});

try {
  todos = JSON.parse(localStorage.getItem('todos')) || []
  todos.forEach(item => addTodo(item.text));
} catch(err) {
  // just dont load todos
  console.log(err);
}
