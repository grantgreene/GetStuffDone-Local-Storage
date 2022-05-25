class UI {
  constructor() {
    this.taskList = document.querySelector(".task-list");
    this.count = 0;
    this.taskCounter = document.querySelector(".task-counter span");
    this.idInput = document.querySelector("#id-input");
    this.titleInput = document.querySelector("#title-input");
    this.notesInput = document.querySelector("#notes-input");
    this.dueInput = document.querySelector("#due-input");
    this.addBtn = document.querySelector(".add-btn");
    this.addTaskTitleText = document.querySelector(".new-task-pane h1");
    this.taskForm = document.querySelector(".new-task-pane form");
    this.filterInput = document.querySelector("#filter-input");
    this.sortInput = document.querySelector("#sort-input");
  }

  getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
  }

  displayTasks(sortBy) {
    const tasks = this.getTasks();
    if (tasks.length === 0) {
      document.querySelector(".no-tasks").style.display = "block";
    } else {
      document.querySelector(".no-tasks").style.display = "none";
    }
    let html = "";
    if (sortBy === "sort-title") {
      tasks.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();
        if (titleA > titleB) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    if (sortBy === "sort-due") {
      tasks.sort((a, b) => {
        const dueA = a.due;
        const dueB = b.due;
        if (dueA > dueB) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    tasks.forEach(task => {
      html += this.itemTemplate(task);
    });
    this.taskList.innerHTML = html;
    this.taskCounter.textContent = tasks.length;
  }

  itemTemplate(task) {
    return `<li data-id=${task.id}><div class="task-list__content"><span class="task-list__title">${task.title}</span><span class="task-list__due">Due Date:<span>${task.due}</span></span><span class="task-list__notes-title">Notes:</span><span class="task-list__notes">${task.notes}</span></div><div class="task-list__icons"><i class="fas fa-pencil"></i><i class="fas fa-remove"></i></div></li>`;
  }

  notification(msg, color) {
    const div = document.createElement("div");
    div.className = "notification";
    div.appendChild(document.createTextNode(msg));
    if (color === "blue") {
      div.style.backgroundColor = "#00ccff";
    } else {
      div.style.backgroundColor = "rgb(255, 168, 168)";
    }
    document.querySelector(".task-list-pane").insertBefore(div, document.querySelector(".task-list-pane h1"));
    setTimeout(this.clearNotification, 3000);
  }

  clearNotification() {
    document.querySelector(".notification").remove();
  }

  clearFormFields() {
    this.idInput.value = "";
    this.titleInput.value = "";
    this.notesInput.value = "";
    this.dueInput.value = "";
    this.filterInput.value = "";
    this.sortInput.selectedIndex = 0;
  }

  updateState() {
    if (document.querySelector(".cancel-btn")) {
      this.clearFormFields();
      this.addBtn.value = "Add Task";
      this.addBtn.className = "add-btn";
      this.addTaskTitleText.textContent = "Add Task";
      document.querySelector(".cancel-btn").remove();
    } else {
      this.addBtn.value = "Update Task";
      this.addBtn.className = "update-btn";
      this.addTaskTitleText.textContent = "Update Task";
      const btn = document.createElement("button");
      btn.className = "cancel-btn";
      btn.appendChild(document.createTextNode("Cancel Update"));
      this.taskForm.insertAdjacentElement("afterend", btn);
    }
  }
}

export const ui = new UI();
