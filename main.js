var taskTitleInput = document.querySelector(".task-title-input");
var draftTaskList = document.querySelector(".task-area");
var addTaskButton = document.querySelector(".add-task-btn");
var taskItemInput = document.querySelector(".task-item-input"
);
var taskItemsContainer = document.querySelector(".task-area");

addTaskButton.addEventListener('click', populateDraftTasks);
taskItemInput.addEventListener('keyup', validateItemInput);
taskItemsContainer.addEventListener('click', clearTaskItem);

function validateItemInput() {
  if (taskItemInput.value === "") {
    addTaskButton.disabled = true;
    } else {
    addTaskButton.disabled = false;
    }
  }

function populateDraftTasks() {
  draftTaskList.insertAdjacentHTML('afterbegin', `<div class = "draft-task-list">
    <img class = "draft-delete-btn" src="./assets/check-yo-self-icons/delete.svg" alt="">
    <p>${taskItemInput.value}</p>
  </div>`);
  taskItemInput.value = "";
  addTaskButton.disabled = true;
}

function clearTaskItem(event) {
  if(event.target.classList.contains('draft-delete-btn')) {
  event.target.closest('.draft-task-list').remove();
  }
}


//
