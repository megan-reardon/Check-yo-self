var taskItem = new Task(Date.now());
var toDoList = new ToDoList(Date.now());
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
makeTaskButton.addEventListener('click', makeTaskHandler);
taskTitleInput.addEventListener('keyup', validateTitleInput);

// Event handler for Make Task List button
function makeTaskHandler() {
  populateToDoCard();
  addToDoItems();
  clearTaskTitle();
  toDoList = new ToDoList(Date.now());
}

function validateItemInput() {
  if (taskItemInput.value === "") {
    addTaskButton.disabled = true;
    } else {
    addTaskButton.disabled = false;
    }
  }

  function validateTitleInput() {
    console.log(toDoList.tasks);
    if (taskTitleInput.value === "" || toDoList.tasks.length ===0) {
      console.log('yes');
      makeTaskButton.disabled = true;
      } else {
      console.log('no');
      makeTaskButton.disabled = false;
      }
    }

function populateDraftTasks() {
  draftTaskList.insertAdjacentHTML('afterbegin', `<div class = "draft-task-list">
    <img class = "draft-delete-btn" src="./assets/check-yo-self-icons/delete.svg" alt="">
    <p>${taskItemInput.value}</p>
  </div>`);
  taskItem = new Task(Date.now(), taskItemInput.value);
  toDoList.tasks.push(taskItem);
  taskItemInput.value = "";
  addTaskButton.disabled = true;
  console.log(taskItem);
  console.log(toDoList);
}

// Creates new to do card when make task is clicked
function populateToDoCard() {
  var taskTitle = taskTitleInput.value;
  toDoList.title = taskTitle;
  console.log(toDoList);
  taskToDoCard.insertAdjacentHTML('afterbegin', `<div class="saved-task-cards">
    <div class="saved-task-title">
      <p>${taskTitle}</p>
    </div>
    <div class="todo-card-wrapper">
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
  </div>`);
}

// Populates new to do card content when make task list is clicked
function addToDoItems() {
for(var i = 0; i < toDoList.tasks.length; i++) {
  var toDoContents = document.querySelector(".todo-card-wrapper");
  var newToDoCard = document.createElement("div");
  var checkBoxBtn = document.createElement("img");
  var taskItem = document.createElement("p");
  var taskInnerText = document.createTextNode(`${toDoList.tasks[i].task}`);
  newToDoCard.classList.add("task-list-content");
  checkBoxBtn.classList.add("check-box-img");
  checkBoxBtn.setAttribute("src", "./assets/check-yo-self-icons/checkbox.svg");
  newToDoCard.appendChild(checkBoxBtn);
  newToDoCard.appendChild(taskItem);
  taskItem.appendChild(taskInnerText);
  toDoContents.appendChild(newToDoCard);
  }
}

function clearTaskItem(event) {
  if(event.target.classList.contains('draft-delete-btn')) {
  event.target.closest('.draft-task-list').remove();
  }
}

function clearTaskTitle() {
  var draftTaskItem = document.querySelectorAll(".draft-task-list");
  for(var i = 0; i < draftTaskItem.length; i++) {
    draftTaskItem[i].remove();
  }
  taskTitleInput.value = '';
  makeTaskButton.disabled = true;
}

//
