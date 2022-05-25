import { ui } from "./ui.js";

const titleInput = document.querySelector("#title-input");
const notesInput = document.querySelector("#notes-input");
const dueInput = document.querySelector("#due-input");
const idInput = document.querySelector("#id-input");
const newTaskPane = document.querySelector(".new-task-pane");
const taskSubmitBtn = document.querySelector("input[type=submit]");
const taskForm = document.querySelector(".new-task-pane form");
const taskList = document.querySelector(".task-list");
const filterInput = document.querySelector("#filter-input");
const sortInput = document.querySelector("#sort-input");

document.addEventListener("DOMContentLoaded", ui.displayTasks());
taskSubmitBtn.addEventListener("click", taskSubmit);
newTaskPane.addEventListener("click", cancelUpdate);
taskList.addEventListener("click", editTask);
taskList.addEventListener("click", deleteTask);
filterInput.addEventListener("keyup", filterTasks);
sortInput.addEventListener("change", sortTasks);

function taskSubmit(e) {
  let id;
  if (idInput.value === "") {
    id = Math.floor(Math.random() * 1000000);
  } else {
    id = idInput.value;
  }
  const task = {
    id,
    title: titleInput.value,
    notes: notesInput.value,
    due: dueInput.value
  };
  if (titleInput.value === "" || notesInput.value === "" || dueInput.value === "") {
    ui.notification("Please enter all fields", "red");
  } else {
    if (e.target.classList.contains("add-btn")) {
      if (idInput.value === "") {
        const tasks = ui.getTasks();
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        ui.notification("Task Added", "blue");
        ui.displayTasks();
        ui.clearFormFields();
      }
    } else if (e.target.classList.contains("update-btn")) {
      if (idInput.value !== "") {
        const editTaskId = idInput.value;
        const tasks = ui.getTasks();
        tasks.forEach(task => {
          if (task.id == editTaskId) {
            task.title = titleInput.value;
            task.notes = notesInput.value;
            task.due = dueInput.value;
          }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        ui.clearFormFields;
        ui.notification("Task Updated", "blue");
        ui.updateState();
        ui.displayTasks();
      }
    }
  }
}

function editTask(e) {
  e.preventDefault();
  if (e.target.classList.contains("fa-pencil")) {
    idInput.value = e.target.parentElement.parentElement.dataset.id;
    titleInput.value = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
    notesInput.value = e.target.parentElement.previousElementSibling.lastElementChild.textContent;
    dueInput.value = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling.lastElementChild.textContent;
    ui.updateState();
  }
}

function cancelUpdate(e) {
  e.preventDefault();
  if (e.target.classList.contains("cancel-btn")) {
    ui.updateState();
  }
}

function deleteTask(e) {
  e.preventDefault();
  if (e.target.classList.contains("fa-remove")) {
    const id = e.target.parentElement.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.firstElementChild.textContent;
    if (confirm(`Are you sure you want to delete ${title}?`)) {
      const tasks = ui.getTasks();
      tasks.forEach((task, index) => {
        if (task.id == id) {
          tasks.splice(index, 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      ui.notification("Task Deleted", "red");
      ui.displayTasks();
    }
  }
}

function filterTasks() {
  const filterText = filterInput.value.toUpperCase();
  const tasks = document.querySelectorAll("li");
  const tasktitles = Array.from(document.querySelectorAll(".task-list__title")).map(task => task.textContent);
  for (let i = 0; i < tasks.length; i++) {
    if (tasktitles[i].toUpperCase().indexOf(filterText) > -1) {
      tasks[i].style.display = "block";
    } else {
      tasks[i].style.display = "none";
    }
  }
}

function sortTasks() {
  if (sortInput.value === "sort-title") {
    ui.displayTasks("sort-title");
  } else if (sortInput.value === "sort-due") {
    ui.displayTasks("sort-due");
  }
}
