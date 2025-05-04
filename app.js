// Add new task
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    
    if (!taskName) return alert('Please enter a task!');

    try {
        const response = await fetch('http://localhost:3000/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName })
        });
        
        if (response.ok) {
            taskInput.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete task
async function deleteTask(id) {
    try {
        const response = await fetch(`http://localhost:3000/task/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Render tasks to the page
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.taskName}
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Load tasks when page opens
document.addEventListener('DOMContentLoaded', fetchTasks);