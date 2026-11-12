// --- 1. State Management ---
let tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
let taskIdCounter = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

// --- 2. Modal Logic ---
const modal = document.getElementById('taskModal');

function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.getElementById('taskName').focus();
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    // Clear inputs
    document.getElementById('taskName').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskProgress').value = 0;
    document.getElementById('taskStatus').value = 'todo';
}

// --- 3. Add New Task ---
function addNewTask() {
    const name = document.getElementById('taskName').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const progress = document.getElementById('taskProgress').value;
    const status = document.getElementById('taskStatus').value;

    if (name === '') {
        alert('Please enter a task name!');
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        name: name,
        desc: desc || "No description",
        progress: parseInt(progress),
        status: status,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    closeModal();
}

// --- 4. Render Tasks ---
function renderTasks() {
    // Clear columns
    document.getElementById('todo-column').innerHTML = '';
    document.getElementById('progress-column').innerHTML = '';
    document.getElementById('done-column').innerHTML = '';

    let counts = { todo: 0, progress: 0, done: 0 };

    tasks.forEach(task => {
        counts[task.status]++;
        
        // Determine progress bar color
        let barColor = 'bg-gray-800';
        if (task.status === 'progress') barColor = 'bg-indigo-600';
        if (task.status === 'done') barColor = 'bg-green-500';

        // Card HTML
        const cardHTML = `
            <div class="task-card bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md cursor-grab" 
                 draggable="true" ondragstart="drag(event)" data-id="${task.id}">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-semibold text-sm">${task.name}</h4>
                    <button onclick="deleteTask(${task.id})" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p class="text-xs text-gray-500 mb-4">${task.desc}</p>
                <div class="flex justify-between text-xs font-medium text-gray-700 mb-1">
                    <span>Progress</span><span>${task.progress}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <div class="${barColor} h-1.5 rounded-full" style="width: ${task.progress}%"></div>
                </div>
                <div class="flex justify-between items-center text-xs text-gray-400">
                    <span class="bg-gray-100 px-2 py-1 rounded">${task.date}</span>
                    <div class="flex gap-3"><i class="fa-regular fa-comment"></i> 0 <i class="fa-solid fa-link"></i> 0</div>
                </div>
            </div>
        `;

        document.getElementById(`${task.status}-column`).innerHTML += cardHTML;
    });

    // Update Counts
    document.getElementById('todo-count').textContent = counts.todo;
    document.getElementById('progress-count').textContent = counts.progress;
    document.getElementById('done-count').textContent = counts.done;
}

// --- 5. Drag and Drop Logic ---
function allowDrop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.add('drag-over');
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('data-id'));
}

function drop(ev) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('drag-over');
    
    const taskId = parseInt(ev.dataTransfer.getData("text"));
    const newStatus = ev.currentTarget.getAttribute('data-status');
    
    // Find task and update status
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex > -1) {
        tasks[taskIndex].status = newStatus;
        
        // Auto-update progress based on column
        if (newStatus === 'done') tasks[taskIndex].progress = 100;
        if (newStatus === 'progress' && tasks[taskIndex].progress === 0) tasks[taskIndex].progress = 50;
        if (newStatus === 'todo') tasks[taskIndex].progress = 0;

        saveTasks();
        renderTasks();
    }
}

// Drag over styling cleanup
document.querySelectorAll('[id$="-column"]').forEach(col => {
    col.addEventListener('dragleave', (e) => {
        e.currentTarget.classList.remove('drag-over');
    });
});

// --- 6. Delete Task ---
function deleteTask(id) {
    if(confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

// --- 7. Local Storage ---
function saveTasks() {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// --- 8. Initial Render ---
renderTasks();