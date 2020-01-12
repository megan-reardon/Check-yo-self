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
var clearAllButton = document.querySelector(".clear-all-btn");
var defaultText = document.querySelector(".default-area");

addTaskButton.addEventListener('click', populateDraftTasks);
taskItemInput.addEventListener('keyup', validateItemInput);
taskItemsContainer.addEventListener('click', clearTaskItem);
makeTaskButton.addEventListener('click', makeTaskHandler);
taskTitleInput.addEventListener('keyup', taskTitleHandler);
clearAllButton.addEventListener('click', clearDraftTaskList);


window.onload = function() {
  refreshPage();
}

// function promptTaskAdding() {
//   if(window.localStorage.length === 0) {
//     taskToDoCard.insertAdjacentHTML('afterbegin', `<div class = "default-area">
//       <p>No current task lists. Please enter a new task item to the left.</p>
//     </div>`)
//   }
// }



  function refreshPage() {
  for(var i = 0; i < window.localStorage.length; i++) {
    var savedToDo = localStorage.getItem(localStorage.key(i));
    var parsedToDo = JSON.parse(savedToDo);
    toDoList = parsedToDo;
    populateToDoCard();
    addToDoItems();
    toDoList = new ToDoList(Date.now());
    }
  }

// Event handler for Make Task List button
function makeTaskHandler() {
  toDoList.title = taskTitleInput.value;
  populateToDoCard();
  addToDoItems();
  toDoList.saveToStorage();
  clearDraftTaskList();
  toDoList = new ToDoList(Date.now());
}

function taskTitleHandler() {
  validateTitleInput();
  validateClearButton();
}

function validateClearButton() {
  if(taskTitleInput.value !== "") {
    clearAllButton.disabled = false;
  }
}

function validateItemInput() {
  if (taskItemInput.value === "") {
    addTaskButton.disabled = true;
    } else {
    addTaskButton.disabled = false;
    clearAllButton.disabled = false;
    }
  }

  function validateTitleInput() {
    if (taskTitleInput.value === "" || toDoList.tasks.length === 0) {
      makeTaskButton.disabled = true;
    } else {
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
  taskToDoCard.insertAdjacentHTML('afterbegin', `<div class="saved-task-cards">
    <div class="saved-task-title">
      <p>${toDoList.title}</p>
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
  defaultText.remove();
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
} else if(event.target.classList.contains('clear-all-btn')) {
  event.target.closest('.draft-task-list').remove();
}
  // clearAllButton.disabled = disabled;
  // addTaskButton.disabled = disabled;
}

function clearDraftTaskList() {
  var draftTaskItem = document.querySelectorAll(".draft-task-list");
  for(var i = 0; i < draftTaskItem.length; i++) {
    draftTaskItem[i].remove();
  }
  taskTitleInput.value = '';
  makeTaskButton.disabled = true;
  clearAllButton.disabled = true;
  toDoList = new ToDoList(Date.now());
}


//
