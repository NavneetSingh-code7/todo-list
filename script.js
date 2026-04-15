document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage on page load
    loadTodos();

    // Add todo when button is clicked
    addBtn.addEventListener('click', addTodo);

    // Add todo when Enter key is pressed
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Delete all todos when delete all button is clicked
    deleteAllBtn.addEventListener('click', deleteAllTodos);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoId = Date.now().toString(); // Unique ID for each todo
        createTodoElement(todoText, false, todoId);

        todoInput.value = '';
        todoInput.focus();

        // Save todos to localStorage
        saveTodos();
    }

    function createTodoElement(text, completed, id) {
        const li = document.createElement('li');
        li.setAttribute('data-id', id);
        if (completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Toggle completed status when clicked
        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTodos(); // Save after toggling
        });

        // Delete todo when delete button is clicked
        li.querySelector('.delete-btn').addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the li click event
            todoList.removeChild(li);
            saveTodos(); // Save after deleting
        });

        todoList.appendChild(li);
    }

    function deleteAllTodos() {
        if (confirm('Are you sure you want to delete all todos?')) {
            todoList.innerHTML = '';
            saveTodos(); // Save empty list
        }
    }

    function saveTodos() {
        const todos = [];
        const todoItems = todoList.querySelectorAll('li');

        todoItems.forEach(item => {
            const text = item.querySelector('span').textContent;
            const completed = item.classList.contains('completed');
            const id = item.getAttribute('data-id');

            todos.push({
                text: text,
                completed: completed,
                id: id
            });
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        todos.forEach(todo => {
            createTodoElement(todo.text, todo.completed, todo.id);
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});