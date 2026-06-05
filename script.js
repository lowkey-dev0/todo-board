// Get references to DOM elements
const input = document.getElementById("newTask");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const categorySelect = document.getElementById("categorySelect");

// Color map for categories
const categoryColors = {
  General: "#0078ff",
  Work: "#ff9800",
  Home: "#4caf50",
  Shopping: "#e91e63",
};

// Load tasks from localStorage (or empty array if none exist)
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
render();

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when pressing Enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Add a new task with category
function addTask() {
  if (!input.value.trim()) return;

  tasks.push({
    text: input.value,
    done: false,
    category: categorySelect.value,
  });

  input.value = "";
  save();
  render();
}

// Toggle task completion state
function toggle(i) {
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

// Remove a task from the list
function removeTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

// Save tasks to localStorage
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render all tasks to the UI
function render() {
  list.innerHTML = ""; // Clear list

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = t.done ? "done" : "";

    // Create task item with toggle + delete buttons and category tag with color
    li.innerHTML = `
    <span onclick="toggle(${i})">${t.text}</span>
    <span class="tag" style="background:${categoryColors[t.category]}">
        ${t.category}
    </span>
    <span class="delete" onclick="removeTask(${i})">X</span>
  `;

    list.appendChild(li);
  });
}
