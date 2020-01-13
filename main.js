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
var rightDiv = document.querySelector(".task-cards-container");

addTaskButton.addEventListener('click', populateDraftTasks);
taskItemInput.addEventListener('keyup', validateItemInput);
taskItemsContainer.addEventListener('click', clearTaskItem);
makeTaskButton.addEventListener('click', makeTaskHandler);
taskTitleInput.addEventListener('keyup', taskTitleHandler);
clearAllButton.addEventListener('click', clearDraftTaskList);
rightDiv.addEventListener('click', rightDivHandler);


window.onload = function() {
  refreshPage();
}

function rightDivHandler() {
  toDoList.updateTask(event);
  completeTask(event);
  // enableDeleteButton(event);
}

  function refreshPage() {
  for(var i = 0; i < window.localStorage.length; i++) {
    var savedToDo = localStorage.getItem(localStorage.key(i));
    var parsedToDo = JSON.parse(savedToDo);
    toDoList = parsedToDo;
    populateToDoCard();
    addToDoItems();
    console.log(toDoList);
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
  taskToDoCard.insertAdjacentHTML('afterbegin', `<div class="saved-task-cards ${toDoList.id}">
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
  newToDoCard.classList.add(`${toDoList.tasks[i].id}`);
  if(toDoList.tasks[i].complete === true) {
    checkBoxBtn.classList.add("check-box-img");
    checkBoxBtn.setAttribute("src", "./assets/check-yo-self-icons/checkbox-active.svg");
    } else {
  checkBoxBtn.classList.add("empty-checkbox-img");
  checkBoxBtn.setAttribute("src", "./assets/check-yo-self-icons/checkbox.svg");
  }
  newToDoCard.appendChild(checkBoxBtn);
  newToDoCard.appendChild(taskItem);
  taskItem.appendChild(taskInnerText);
  toDoContents.appendChild(newToDoCard);
  }
}

// Function to add check mark visual when task is completed
function completeTask(event) {
  if(event.target.classList.contains('empty-checkbox-img')) {
    var taskContentParent = event.target.parentNode;
    event.target.closest('.empty-checkbox-img').classList.add('hidden');
    var activeCheckBoxBtn = document.createElement("img");
    activeCheckBoxBtn.classList.add("check-box-img");
    activeCheckBoxBtn.setAttribute("src", "./assets/check-yo-self-icons/checkbox-active.svg");
    taskContentParent.prepend(activeCheckBoxBtn);
      }
    }

function clearTaskItem(event) {
  if(event.target.classList.contains('draft-delete-btn')) {
  event.target.closest('.draft-task-list').remove();
  } else if(event.target.classList.contains('clear-all-btn')) {
  event.target.closest('.draft-task-list').remove();
  }
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

// Function to enable delete button if all boxes are checked
// function enableDeleteButton() {
//   // if(event.target.classList.contains('empty-checkbox-img'))
//   for(var i = 0; i < window.localStorage.length; i++) {
//     var toDoId = window.localStorage.key(i);
//     if(event.target.parentNode.parentNode.parentNode.classList.contains(toDoId)) {
//     var savedToDo = window.localStorage.getItem(toDoId);
//     var parsedToDo = JSON.parse(savedToDo);
//     toDoList = parsedToDo;
//     console.log(toDoList);
//     }
//   }
//   for (var j = 0; j < toDoList.tasks.length; j++) {
//     console.log(toDoList.tasks[j].complete);
//     if(toDoList.tasks[j].includes(true)) {
//       console.log('hi')
//     }
//     // var allFalse = toDoList.tasks[j].every(function(toDoList.tasks[j].complete === true)); {
//     // return allFalse;
//   }
// }


    // var incompleteItems = (notComplete) => notComplete.complete === false;
    // console.log(incompleteItems);
    // if(toDoList.tasks[j].complete === true); {
    //
    // }

    // toDoList.tasks[j].(item => item.complete === true);


  // for(var j = 0; j < toDoList.tasks.length; j++) {
  //   var completedItem = toDoList.tasks[j].completed;
