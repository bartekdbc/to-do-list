{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    document.querySelector(".js-newTask").value = "";
  };

  const render = () => {
    let htmlString = "";

    tasks.forEach((element) => {
      if (element.done) {
        htmlString += `
        <li class="list__item">
        <button class="list__button list__button--done js-done"> ✔ </button>
        <span class="list__taskText list__taskText--done">${element.content}</span>`;
      } else {
        htmlString += `
        <li class="list__item">
        <button class="list__button list__button--done js-done"></button>
        <span class="list__taskText">${element.content}</span>`;
      }
      htmlString += `
      <button class="list__button list__button--remove js-remove">🗑</button>
      </li>`;
    });

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);

    const addNewTask = document.querySelector(".js-addNewTaskButton");
    form.addEventListener("click", (event) => {
      document.querySelector(".js-newTask").focus();
      onFormSubmit(event);
    });
  };

  init();
}
