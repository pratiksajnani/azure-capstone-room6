const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

class Task {
    constructor(description, priority) {
        this.description = description;
        this.priority = priority;
    }
}

class TodoApp {
    constructor() {
        this.tasks = [];
    }

    addTask(description, priority) {
        const task = new Task(description, priority);
        this.tasks.push(task);
    }

    getSortedTasks() {
        const urgentTasks = this.tasks.filter(task => task.priority === 'Urgent');
        const importantTasks = this.tasks.filter(task => task.priority === 'Important');
        const otherTasks = this.tasks.filter(task => task.priority === 'Others');

        return [...urgentTasks, ...importantTasks, ...otherTasks];
    }
}

const todoApp = new TodoApp();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/tasks', (req, res) => {
    const sortedTasks = todoApp.getSortedTasks();
    res.json(sortedTasks);
});

app.post('/tasks', (req, res) => {
    const { description, priority } = req.body;
    todoApp.addTask(description, priority);
    res.status(201).json({ message: 'Task added successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});