// Get references to DOM elements
const input = document.getElementById("newTask");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Load tasks from localStorage (or empty array if none exist)
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
render();

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when pressing Enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Add a new task to the list
function addTask() {
  if (!input.value.trim()) return; // Ignore empty input

  tasks.push({ text: input.value, done: false });
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

    // Create task item with toggle + delete
    li.innerHTML = `
            <span onclick="toggle(${i})">${t.text}</span>
            <span class="delete" onclick="removeTask(${i})">X</span>
        `;

    list.appendChild(li);
  });
}
