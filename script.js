function toggleDropdown() {
    document.getElementById('dropdown').classList.toggle('open');
}

function selectOption(el) {
    // remove active from all
    document.querySelectorAll('.option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');

    // update label and hidden select
    const val = el.textContent.trim();
    document.getElementById('selected-label').textContent = val;
    document.getElementById('level').value = val;

    document.getElementById('dropdown').classList.remove('open');
}

// close when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.select-wrapper')) {
        document.getElementById('dropdown').classList.remove('open');
    }
});

function filterTasks(el) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    currentFilter = el.textContent.trim();
    renderTasks();
}

// ==========================================
// To-Do App Logic
// ==========================================

// State
let tasks = [];
let currentFilter = 'All';

// Icons for Dark/Light mode
const moonIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-moon h-5 w-5" aria-hidden="true">
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
</svg>`;

const sunIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-sun h-5 w-5" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
</svg>`;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Setup click on "+" button
    const plusBtn = document.querySelector('.ip > .plus');
    if (plusBtn) {
        plusBtn.style.cursor = 'pointer';
        plusBtn.addEventListener('click', handleAddTaskSubmit);
    }

    // Setup Enter key press in input
    const taskInput = document.getElementById('task-input');
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddTaskSubmit();
            }
        });
    }

    // Setup theme button click
    const themeBtn = document.querySelector('.theme');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Load initial tasks and theme preference
    loadState();
    renderTasks();
});

function loadState() {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (e) {
            tasks = [];
        }
    }

    // Load theme preference from localStorage
    const isDark = localStorage.getItem('theme') === 'dark';
    const themeBtn = document.querySelector('.theme');
    if (isDark) {
        document.body.classList.add('dark-mode');
        if (themeBtn) themeBtn.innerHTML = sunIcon;
    } else {
        document.body.classList.remove('dark-mode');
        if (themeBtn) themeBtn.innerHTML = moonIcon;
    }
}

function saveState() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTheme() {
    const themeBtn = document.querySelector('.theme');
    const isDark = document.body.classList.toggle('dark-mode');
    
    if (isDark) {
        localStorage.setItem('theme', 'dark');
        if (themeBtn) themeBtn.innerHTML = sunIcon;
    } else {
        localStorage.setItem('theme', 'light');
        if (themeBtn) themeBtn.innerHTML = moonIcon;
    }
}

function handleAddTaskSubmit() {
    const taskInput = document.getElementById('task-input');
    const levelSelect = document.getElementById('level');
    
    const text = taskInput.value.trim();
    if (!text) return;
    
    const priority = levelSelect.value || 'High';
    
    const newTask = {
        id: Date.now().toString(),
        text: text,
        priority: priority,
        completed: false
    };
    
    tasks.push(newTask);
    saveState();
    renderTasks();
    
    // Clear the text input
    taskInput.value = '';
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveState();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveState();
    renderTasks();
}

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const remainingCountEl = document.querySelector('.left p strong');
    
    // Filter tasks based on currentFilter
    let filteredTasks = tasks;
    if (currentFilter === 'Active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'Completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    // Update the remaining tasks counter
    const activeTasksCount = tasks.filter(t => !t.completed).length;
    if (remainingCountEl) {
        remainingCountEl.textContent = activeTasksCount;
    }
    
    // Clear list container
    todoList.innerHTML = '';
    
    if (filteredTasks.length === 0) {
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
        
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            
            const isChecked = task.completed ? 'checked' : '';
            const priorityLower = task.priority.toLowerCase();
            
            li.innerHTML = `
                <button class="checkbox-btn ${isChecked}" onclick="toggleTask('${task.id}')" aria-label="Toggle task completion"></button>
                <span class="todo-text ${isChecked ? 'completed' : ''}">${escapeHtml(task.text)}</span>
                <div class="todo-meta">
                    <span class="priority-badge ${priorityLower}">${task.priority}</span>
                    <button class="delete-btn" onclick="deleteTask('${task.id}')" aria-label="Delete task">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" x2="10" y1="11" y2="17"></line>
                            <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}