// --- 1. DOM Elements ---
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

// --- 2. State (Local Storage-ல் இருந்து டேட்டாவை எடுத்தல்) ---
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// --- 3. Render Tasks Function ---
function renderTasks() {
    taskList.innerHTML = ''; // Clear current list
    
    if (tasks.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${task.completed ? 'bg-gray-100 border-gray-200' : 'bg-white border-gray-300 shadow-sm'}`;
        
        li.innerHTML = `
            <div class="flex items-center gap-3 flex-1 overflow-hidden">
                <!-- Checkbox for Complete -->
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleComplete(${index})"
                    class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer">
                
                <!-- Task Text -->
                <span class="text-gray-800 truncate ${task.completed ? 'line-through text-gray-400' : ''}">${task.text}</span>
            </div>
            
            <!-- Delete Button -->
            <button onclick="deleteTask(${index})" class="text-red-400 hover:text-red-600 p-2 transition active:scale-90">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        
        taskList.appendChild(li);
    });
}

// --- 4. Add Task Function ---
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Add new task to the array
    tasks.push({ text: text, completed: false });
    
    // Clear input
    taskInput.value = '';
    
    // Save & Render
    saveTasks();
    renderTasks();
}

// --- 5. Toggle Complete Function ---
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// --- 6. Delete Task Function ---
function deleteTask(index) {
    // Optional: Add a confirmation before deleting
    // if (!confirm("Are you sure you want to delete this task?")) return;
    
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// --- 7. Save Tasks to Local Storage ---
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// --- 8. Handle Enter Key ---
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// --- 9. Initial Render ---
renderTasks();