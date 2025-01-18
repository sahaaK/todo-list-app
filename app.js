// Selectors
const toDoInput = document.querySelector('.darker-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', handleTodoActions);
document.addEventListener('DOMContentLoaded', loadTodos);

// Functions
function addToDo(event) {
    event.preventDefault();
    const task = toDoInput.value.trim();

    if (task === '') {
        alert('You must write something!');
        return;
    }

    createTodoElement(task);
    saveToLocalStorage(task);
    toDoInput.value = '';
}

function handleTodoActions(event) {
    const item = event.target;

    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }

    if (item.classList.contains('check-btn')) {
        item.parentElement.classList.toggle('completed');
    }
}

function createTodoElement(task) {
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('todo', 'darker-todo');

    const newToDo = document.createElement('li');
    newToDo.innerText = task;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', 'darker-button');
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', 'darker-button');
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
}

function saveToLocalStorage(task) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(createTodoElement);
}

function removeFromLocalStorage(todo) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const task = todo.querySelector('.todo-item').innerText;
    const updatedTodos = todos.filter(t => t !== task);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}
