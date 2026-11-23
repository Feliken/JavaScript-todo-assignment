
// Select HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");

// Array to store tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.name;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Complete checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;

    if (tasks.length === 0) {
        message.textContent = "No tasks available. Add a task!";
    } else {
        message.textContent = "";
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
}

// Add button event listener
addBtn.addEventListener("click", addTask);

// Clear all tasks
clearBtn.addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
});

// Display saved tasks when page loads
displayTasks();
