{
  let tasks = [];
  let hideDoneTask = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks, 
      { content: newTaskContent }
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex), 
      ...tasks.slice(taskIndex + 1)
    ];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((tasks) => ({
      ...tasks,
      done: true,
    }));
    render();
  };

  const hideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;

    render();
  };

  const focusOnSubmit = () => {
    const newTask = document.querySelector(".js-newTask")
    newTask.value = "";
    newTask.focus();
    
    render();
  }

  const removeButtonsEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const toggleDoneButtonsEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindEvents = () => {
    removeButtonsEvents();
    toggleDoneButtonsEvents();
  };

  const renderButtons = (taskListHTMLContent) => {
    let subtitleString = "";

    if (taskListHTMLContent !== "") {
      subtitleString += `
      <button class="section__button js-hideDoneTasks">${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
      <button class="section__button js-allTasksDone"${tasks.every (({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>`;
    } 
    else if (taskListHTMLContent === "") {
      subtitleString += ``;
    }

    document.querySelector(".js-buttons").innerHTML = subtitleString;
  };

  const renderTasks = () => {
    let taskListHTMLContent = "";

    for (const task of tasks) {
      taskListHTMLContent += `
      <li class="${task.done && hideDoneTask ? "list__item--hidden" : "list__item"}">
        <button class="list__button list__button--toggleDone js-done">
          ${task.done ? "✔" : ""}
        </button>
        <span class="${task.done ? "list__item--done" : ""}">
          ${task.content}
        </span>
        <button class="list__button list__button--remove js-remove">
          🗑
        </button>
      </li>`;
    }

    document.querySelector(".js-tasks").innerHTML = taskListHTMLContent;
    renderButtons(taskListHTMLContent);
  };

  const bindButtonsEvents = () => {
    if (tasks.length === 0) {
      return;
    }
    
    const allTasksDoneButton = document.querySelector(".js-allTasksDone")
    if (allTasksDoneButton) {
      allTasksDoneButton.addEventListener("click", () => {
        markAllTasksDone();
      })
    }
    const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks")
    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", () => {
        hideDoneTasks();
      })
    }
  };

  const render = () => {
    renderTasks();

    bindEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
    focusOnSubmit();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);

  };

  init();
}
