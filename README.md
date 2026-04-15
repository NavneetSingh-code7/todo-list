# Todo List Website

A simple, responsive todo list website built with HTML, CSS, and JavaScript.

## Features

- Add new todos
- Mark todos as completed (with strike-through)
- Delete individual todos
- **Delete All** button to clear all todos at once
- **Data persistence** - Todos are automatically saved to your browser's local storage
- Responsive design
- Colorful, modern UI with gradients and animations

## How to Use

1. **Add Todo**: Type in the input field and click "Add" or press Enter
2. **Mark Complete**: Click on any todo item to toggle strike-through (completed status)
3. **Delete Todo**: Click the "Delete" button next to any todo
4. **Delete All**: Click the "Delete All" button to remove all todos (with confirmation)

## How to Run

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Data Storage

Your todos are automatically saved to your browser's local storage. This means:
- Your todos will persist between browser sessions
- Data is stored locally on your device (no server required)
- Clearing browser data will remove saved todos

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling with colorful gradients
- `script.js` - JavaScript functionality with local storage

