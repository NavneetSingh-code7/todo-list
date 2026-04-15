# Todo List Website

A simple, responsive todo list website built with HTML, CSS, and JavaScript.

## Features

- Add new todos with smooth animations
- Mark todos as completed (with strike-through and visual effects)
- Delete individual todos with fade-out animation
- **Delete All** button to clear all todos at once (with confirmation and animation)
- **Data persistence** - Todos are automatically saved to your browser's local storage
- **Smooth animations** - Page load, hover effects, and interactive transitions
- Responsive design
- Colorful, modern UI with gradients and animations

## How to Use

1. **Add Todo**: Type in the input field and click "Add" or press Enter (watch it bounce in!)
2. **Mark Complete**: Click on any todo item to toggle strike-through (completed status)
3. **Delete Todo**: Click the "Delete" button next to any todo (smooth fade-out)
4. **Delete All**: Click the red "Delete All" button to remove all todos (with confirmation)

## Animations Included

- **Page Load**: Header slides in, content fades up, background shifts colors
- **Add Todo**: New items bounce in with a fun animation
- **Delete Todo**: Items fade out smoothly before disappearing
- **Hover Effects**: Buttons and items scale and lift on hover
- **Complete Toggle**: Visual feedback when marking todos complete
- **Background**: Subtle color shifting gradient animation

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
- `styles.css` - CSS styling with colorful gradients and animations
- `script.js` - JavaScript functionality with local storage and animations

