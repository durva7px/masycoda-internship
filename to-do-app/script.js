// -------------------------------
// Local Storage Keys
// -------------------------------
const STORAGE_KEY = "todoTasks";

// -------------------------------
// Variables
// -------------------------------
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let currentFilter = "all";
let searchText = "";

// -------------------------------
// DOM Elements
// -------------------------------
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll("[data-filter]");

// -------------------------------
// Save Tasks
// -------------------------------
const saveTasks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// -------------------------------
// Add Task
// -------------------------------
const addTask = () => {

    const title = taskInput.value.trim();

    if (!title) {
        alert("Task cannot be empty!");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
};

// -------------------------------
// Toggle Status
// -------------------------------
const toggleTask = (id) => {

    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
};

// -------------------------------
// Delete Task
// -------------------------------
const deleteTask = (id) => {

    const confirmDelete =
        confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
};

// -------------------------------
// Move Up
// -------------------------------
const moveUp = (index) => {

    if (index === 0) return;

    [tasks[index], tasks[index - 1]] =
        [tasks[index - 1], tasks[index]];

    saveTasks();
    renderTasks();
};

// -------------------------------
// Move Down
// -------------------------------
const moveDown = (index) => {

    if (index === tasks.length - 1) return;

    [tasks[index], tasks[index + 1]] =
        [tasks[index + 1], tasks[index]];

    saveTasks();
    renderTasks();
};

// -------------------------------
// Filter Tasks
// -------------------------------
const getFilteredTasks = () => {

    let filtered = [...tasks];

    // Search Filter
    filtered = filtered.filter(task =>
        task.title
            .toLowerCase()
            .includes(searchText.toLowerCase())
    );

    // Status Filters
    switch (currentFilter) {

        case "completed":
            filtered = filtered.filter(
                task => task.completed
            );
            break;

        case "pending":
            filtered = filtered.filter(
                task => !task.completed
            );
            break;

        case "today":

            const today =
                new Date().toDateString();

            filtered = filtered.filter(task =>
                new Date(task.createdAt)
                    .toDateString() === today
            );

            break;
    }

    return filtered;
};

// -------------------------------
// Async Simulation
// -------------------------------
const fetchTasks = async () => {

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(tasks);
        }, 200);
    });
};

// -------------------------------
// Render Tasks
// -------------------------------
const renderTasks = async () => {

    await fetchTasks();

    const filteredTasks = getFilteredTasks();

    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {

        const { id, title,
            completed,
            createdAt } = task;

        const li = document.createElement("li");

        li.className =
            completed ? "completed" : "";

        li.innerHTML = `
    <div class="task-row">

        <div class="task-details">
            <h3>${title}</h3>

            <p>
                Created:
                ${new Date(createdAt).toLocaleString()}
            </p>

            <p class="${
                completed
                    ? 'completed-status'
                    : 'pending-status'
            }">
                Status:
                ${completed ? 'Completed' : 'Pending'}
            </p>
        </div>

        <div class="actions">
            <button onclick="toggleTask(${id})">
                ${completed ? 'Pending' : 'Complete'}
            </button>

            <button onclick="deleteTask(${id})">
                Delete
            </button>

            <button onclick="moveUp(${index})">
                ⬆️
            </button>

            <button onclick="moveDown(${index})">
                ⬇️
            </button>
        </div>

    </div>
`;

//         li.innerHTML = `
//             <div>
//                 <span class="title">${title}</span>
//             </div>

//             <small style="color: gray; margin">
//                 Created:
//                 ${new Date(createdAt)
//                     .toLocaleString()}
//             </small>

//             <br>

//             <h3 style="color: ${
//     completed ? '#78c48f' : '#d4ddf0'
// }">
//                 Status:
//                 ${completed ?
//                     "Completed" :
//                     "Pending"}
//             </h3>

//             <div class="actions">
//                 <button onclick="toggleTask(${id})">
//                     ${completed ?
//                         "Pending" :
//                         "Complete"}
//                 </button>

//                 <button onclick="deleteTask(${id})">
//                     Delete
//                 </button>

//                 <button onclick="moveUp(${tasks.findIndex(
//                     t => t.id === id
//                 )})">
//                     ↑
//                 </button>

//                 <button onclick="moveDown(${tasks.findIndex(
//                     t => t.id === id
//                 )})">
//                     ↓
//                 </button>
//             </div>
//         `;

        taskList.appendChild(li);
    });
};

// -------------------------------
// Event Listeners
// -------------------------------
addBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    e => {
        if (e.key === "Enter") {
            addTask();
        }
    }
);

searchInput.addEventListener(
    "input",
    e => {

        searchText = e.target.value;

        renderTasks();
    }
);

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentFilter =
                button.dataset.filter;

            renderTasks();
        }
    );
});

// -------------------------------
// Initial Load
// -------------------------------
renderTasks();