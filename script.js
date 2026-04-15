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
        updateStats();
    }

    function createTodoElement(text, completed, id) {
        const li = document.createElement('li');
        li.setAttribute('data-id', id);
        li.classList.add('bounceIn');
        if (completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" id="checkbox-${id}" ${completed ? 'checked' : ''}>
                <label for="checkbox-${id}">${text}</label>
            </div>
            <button class="delete-btn">Delete</button>
        `;

        // Handle checkbox change
        const checkbox = li.querySelector(`#checkbox-${id}`);
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.classList.add('completed');
            } else {
                li.classList.remove('completed');
            }
            saveTodos();
            updateStats();
        });

        // Delete todo when delete button is clicked
        li.querySelector('.delete-btn').addEventListener('click', function(e) {
            e.stopPropagation();
            li.classList.add('fade-out');
            setTimeout(() => {
                todoList.removeChild(li);
                saveTodos();
                updateStats();
            }, 300);
        });

        todoList.appendChild(li);
    }

    function deleteAllTodos() {
        if (confirm('Are you sure you want to delete all todos?')) {
            const todoItems = todoList.querySelectorAll('li');
            todoItems.forEach(item => {
                item.classList.add('fade-out');
            });
            setTimeout(() => {
                todoList.innerHTML = '';
                saveTodos(); // Save empty list
                updateStats();
            }, 300); // Wait for animation to complete
        }
    }

    function saveTodos() {
        const todos = [];
        const todoItems = todoList.querySelectorAll('li');

        todoItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const label = item.querySelector('label');
            const text = label.textContent;
            const completed = checkbox.checked;
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
        updateStats();
    }

    function updateStats() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const totalTasks = todos.length;
        const completedTasks = todos.filter(todo => todo.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        document.getElementById('pending-tasks').textContent = pendingTasks;
        document.getElementById('completion-rate').textContent = `${completionRate}%`;
    }

    // Navigation functionality
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Theme switching
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');

            // Remove active class from all theme buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Apply theme
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'colorful';
    applyTheme(savedTheme);
    document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');

    function applyTheme(theme) {
        const body = document.body;
        body.className = ''; // Reset classes
        body.classList.add(`theme-${theme}`);
    }

    // Export/Import functionality
    document.getElementById('export-btn').addEventListener('click', function() {
        const todos = localStorage.getItem('todos') || '[]';
        const dataStr = JSON.stringify(JSON.parse(todos), null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'todos_backup.json';
        link.click();
    });

    document.getElementById('import-btn').addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const importedTodos = JSON.parse(e.target.result);
                        if (confirm('This will replace all current todos. Continue?')) {
                            localStorage.setItem('todos', JSON.stringify(importedTodos));
                            todoList.innerHTML = '';
                            loadTodos();
                        }
                    } catch (error) {
                        alert('Invalid file format');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    });

    document.getElementById('clear-data-btn').addEventListener('click', function() {
        if (confirm('This will permanently delete all todos and settings. Continue?')) {
            localStorage.clear();
            todoList.innerHTML = '';
            updateStats();
            // Reset to default theme
            applyTheme('colorful');
            document.querySelector(`[data-theme="colorful"]`).classList.add('active');
        }
    });
});