# Mini To-Do List (Kanban Board) 📋

A modern, responsive Task Management Application built with **HTML**, **Tailwind CSS**, and **Vanilla JavaScript**. This app allows users to organize their tasks using a Kanban board layout (To Do, In Progress, Done) with drag-and-drop functionality.

## 🚀 Features

*   **Kanban Board Layout:** Visualize tasks across three columns: To Do, In Progress, and Done.
*   **Create Tasks:** Add new tasks with a name, description, progress percentage, and status using a clean modal popup.
*   **Drag & Drop:** Easily move tasks between columns by dragging and dropping them.
*   **Auto Progress Update:** Moving a task to "Done" automatically sets its progress to 100%.
*   **Delete Tasks:** Remove unwanted tasks with a single click.
*   **Local Storage:** Your tasks are saved in the browser's Local Storage, so they persist even after refreshing the page.
*   **Modern UI:** Features a responsive design with a custom background image, glassmorphism effects, and smooth animations.

## 🛠️ Technologies Used

*   **HTML5:** For the structure of the application.
*   **Tailwind CSS (via CDN/NPM):** For rapid and responsive styling.
*   **JavaScript (ES6):** For DOM manipulation, drag-and-drop logic, and Local Storage integration.
*   **Font Awesome:** For beautiful icons.

## 📂 Project Structure

```text
Mini-To-Do-List/
│
├── index.html          # Main HTML structure
├── style.css           # Custom CSS animations and styles
├── script.js           # All JavaScript logic (CRUD, Drag & Drop)
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Project dependencies
└── img/                # Folder for background images or assets