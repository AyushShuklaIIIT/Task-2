const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task.text;
        span.classList.add('task-text');
        if (task.completed) {
            li.classList.add('completed');
        }
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
            task.completed = li.classList.contains('completed');
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            const confirmation = confirm('Are you sure you want to delete this task?');
            if (!confirmation) return;
            li.remove();
            savedTasks.splice(savedTasks.indexOf(task), 1);
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        });
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
});

const addTask = () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = { text: taskText, completed: false };
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));

    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;
    span.classList.add('task-text');
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        task.completed = li.classList.contains('completed');
        savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        const confirmation = confirm('Are you sure you want to delete this task?');
        if (!confirmation) return;
        li.remove();
        savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.splice(savedTasks.indexOf(task), 1);
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addTask();
});