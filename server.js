const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [
    { id: 1, taskName: "Learn Express.js" },
    { id: 2, taskName: "Study API Testing" }
];

// Helper function to generate IDs
const generateId = () => tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

// ✅ POST /addTask - Add new task
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    
    if (!taskName) {
        return res.status(400).json({ error: "Task name is required!" });
    }

    const newTask = { id: generateId(), taskName };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// ✅ DELETE /task/:id - Delete task by ID
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    tasks = tasks.filter(task => task.id !== taskId);
    
    if (tasks.length === initialLength) {
        return res.status(404).json({ error: "Task not found!" });
    }
    
    res.json({ message: "Task deleted successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});