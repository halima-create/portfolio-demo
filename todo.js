// js/todo.js
(function () {
  const todoInput = document.getElementById("todoInput");
  const addBtn = document.getElementById("addTodoBtn");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const todoListEl = document.getElementById("todoList");
  const taskCountEl = document.getElementById("taskCount");

  if (!todoListEl) return;

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("fresherTasks")) || [];

  function saveTasks() {
    localStorage.setItem("fresherTasks", JSON.stringify(tasks));
    updateTaskCount();
  }

  function updateTaskCount() {
    if (taskCountEl) {
      taskCountEl.textContent = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;
    }
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderTodos() {
    todoListEl.innerHTML = "";

    if (tasks.length === 0) {
      const emptyMsg = document.createElement("li");
      emptyMsg.textContent = "✨ No tasks yet. Add one above!";
      emptyMsg.style.listStyle = "none";
      emptyMsg.style.padding = "1rem 1.5rem";
      emptyMsg.style.background = "var(--gray-100)";
      emptyMsg.style.borderRadius = "60px";
      emptyMsg.style.textAlign = "center";
      emptyMsg.style.color = "var(--gray-600)";
      todoListEl.appendChild(emptyMsg);
      return;
    }

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.innerHTML = `<span>${escapeHTML(task)}</span>
                            <button class="deleteTodo" data-index="${index}"><i class="fas fa-times"></i></button>`;
      todoListEl.appendChild(li);
    });

    document.querySelectorAll(".deleteTodo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = btn.getAttribute("data-index");
        if (idx !== null) {
          tasks.splice(idx, 1);
          saveTasks();
          renderTodos();
        }
      });
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const val = todoInput.value.trim();
      if (val === "") {
        alert("Please enter a task");
        return;
      }
      tasks.push(val);
      saveTasks();
      renderTodos();
      todoInput.value = "";
    });
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", () => {
      if (tasks.length > 0 && confirm("Clear all tasks?")) {
        tasks = [];
        saveTasks();
        renderTodos();
      }
    });
  }

  if (todoInput) {
    todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addBtn.click();
      }
    });
  }

  renderTodos();
  updateTaskCount();
})();
