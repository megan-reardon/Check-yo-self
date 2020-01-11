var taskItem = new Task(Date.now());
var taskTitleInput = document.querySelector(".task-title-input");
var draftTaskList = document.querySelector(".task-area");
var addTaskButton = document.querySelector(".add-task-btn");
var taskItemInput = document.querySelector(".task-item-input"
);
var taskItemsContainer = document.querySelector(".task-area");
var taskToDoCard = document.querySelector(".task-cards-container");
var makeTaskButton = document.querySelector(".make-task-btn");


addTaskButton.addEventListener('click', populateDraftTasks);
taskItemInput.addEventListener('keyup', validateItemInput);
taskItemsContainer.addEventListener('click', clearTaskItem);
makeTaskButton.addEventListener('click', populateToDoCard);


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
  taskItem = new Task(Date.now(), taskItemInput.value);
  taskItemInput.value = "";
  addTaskButton.disabled = true;
  console.log(taskItem);
}

function populateToDoCard() {
  taskToDoCard.insertAdjacentHTML('afterbegin', `<div class="saved-task-cards">
    <div class="saved-task-title">
      <p>${taskTitleInput.value}</p>
    </div>
    <div class="task-list-content">
      <img src="./assets/check-yo-self-icons/checkbox.svg" alt="checkbox">
      <p>Task Item 1</p>
    </div>
    <div class="task-list-content">
      <img src="./assets/check-yo-self-icons/checkbox.svg" alt="checkbox">
      <p>Task Item 2</p>
    </div>
    <div class="task-list-btns">
      <div class="task-urgent-btn">
        <img src="./assets/check-yo-self-icons/urgent.svg" alt="Urgent Icon">
      <p>URGENT</p>
      </div>
      <div class="task-delete-btn">
        <img src="./assets/check-yo-self-icons/delete.svg" alt="">
      <p>DELETE</p>
      </div>
    </div>
  </div>`)
};

function clearTaskItem(event) {
  if(event.target.classList.contains('draft-delete-btn')) {
  event.target.closest('.draft-task-list').remove();
  }
}


//
