var taskItem = new Task(Date.now());
var toDoList = new ToDoList(Date.now());
var taskTitleInput = document.querySelector(".task-title-input");
var addTaskButton = document.querySelector(".add-task-btn");
var taskItemInput = document.querySelector(".task-item-input"
);
var taskItemsContainer = document.querySelector(".task-area");
var taskToDoCard = document.querySelector(".task-cards-container");
var makeTaskButton = document.querySelector(".make-task-btn");
var clearAllButton = document.querySelector(".clear-all-btn");
var defaultText = document.querySelector(".default-area");
var rightDiv = document.querySelector(".task-cards-container");
var searchInput = document.querySelector('.search-input');
var urgencyFilter = document.querySelector('.urgency-filter-btn');
var urgencyMessage = document.querySelector('.urgent-tasks-message');

addTaskButton.addEventListener('click', populateDraftTasks);
taskItemInput.addEventListener('keyup', validateItemInput);
taskItemsContainer.addEventListener('click', clearTaskItem);
makeTaskButton.addEventListener('click', makeTaskList);
taskTitleInput.addEventListener('keyup', nameTaskTitle);
clearAllButton.addEventListener('click', clearDraftTaskList);
rightDiv.addEventListener('click', rightDivHandler);
searchInput.addEventListener('keyup', searchTasks);
urgencyFilter.addEventListener('click', selectUrgentButton);


window.onload = function() {
  reloadSavedCards();
  for(var i = 0; i < rightDiv.children.length; i++) {
    if(rightDiv.children[i].classList.contains('active-urgent-card')) {
      urgencyMessage.remove();
    }
  }
}

function rightDivHandler() {
  toDoList.updateTask(event);
  markToDoUrgent(event);
  deleteToDoCard(event);
  markTaskComplete(event);
}

function searchTasks() {
  if(urgencyFilter.classList.contains('selected-btn')) {
    searchUrgentTasks()
  } else {
  searchToDos();
  }
}

function reloadSavedCards() {
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
function makeTaskList() {
  toDoList.title = taskTitleInput.value;
  populateToDoCard();
  addToDoItems();
  toDoList.saveToStorage();
  clearDraftTaskList();
  toDoList = new ToDoList(Date.now());
}

function nameTaskTitle() {
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
  taskItemsContainer.insertAdjacentHTML('afterbegin', `<div class = "draft-task-list">
    <img class = "draft-delete-btn" src="./assets/check-yo-self-icons/delete.svg" alt="">
    <p>${taskItemInput.value}</p>
  </div>`);
  taskItem = new Task(Date.now(), taskItemInput.value);
  toDoList.tasks.push(taskItem);
  taskItemInput.value = "";
  addTaskButton.disabled = true;
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
        <img class = "urgent-btn" src="./assets/check-yo-self-icons/urgent.svg" alt="Urgent Icon">
      <p>URGENT</p>
      </div>
      <div class="task-delete-btn">
        <img class = "delete-btn" src="./assets/check-yo-self-icons/delete.svg" alt="">
      <p>DELETE</p>
      </div>
    </div>
  </div>`);
  defaultText.remove();
  reloadUrgentItems();
  }

function reloadUrgentItems() {
  var savedCardDiv = document.querySelector('.saved-task-cards');
  var urgentButton = document.querySelector('.urgent-btn');
  var urgentDiv = document.querySelector('.task-urgent-btn');
  if(toDoList.urgent === true) {
    savedCardDiv.classList.add('active-urgent-card');
    urgentButton.classList.add('hidden');
    var activeUrgentButton = document.createElement('img');
    activeUrgentButton.classList.add('active-urgent-btn');
    activeUrgentButton.setAttribute("src", "./assets/check-yo-self-icons/urgent-active.svg");
    urgentDiv.prepend(activeUrgentButton);
  }
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
function markTaskComplete(event) {
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
function deleteToDoCard(event) {
  for(var i = 0; i < window.localStorage.length; i++) {
    var toDoId = window.localStorage.key(i);
    if(event.target.parentNode.parentNode.parentNode.classList.contains(toDoId)) {
    var savedToDo = window.localStorage.getItem(toDoId);
    var parsedToDo = JSON.parse(savedToDo);
      }
    }
    if(event.target.classList.contains('active-delete-btn')) {
      var savedToDoCard = event.target.closest('.saved-task-cards');
      toDoList.deleteFromStorage();
      savedToDoCard.remove();
    } else if (parsedToDo.allComplete.length ===            parsedToDo.tasks.length) {
      var deleteButton = event.target.closest('.saved-task-cards').querySelector('.delete-btn');
      var deleteButtonDiv = event.target.closest('.saved-task-cards').querySelector('.task-delete-btn')
      var activeDeleteBtn = document.createElement("img");
      deleteButton.classList.add('hidden');
      activeDeleteBtn.classList.add("active-delete-btn");
      activeDeleteBtn.setAttribute("src", "./assets/check-yo-self-icons/delete-active.svg");
      deleteButtonDiv.prepend(activeDeleteBtn);
    }
  }

  // Function to mark cards as urgent

  function markToDoUrgent() {
    if(event.target.closest('.urgent-btn')) {
      var savedToDoCard = event.target.closest('.saved-task-cards');
      var urgentButton = event.target.closest('.saved-task-cards').querySelector('.urgent-btn');
      var urgentDiv = event.target.closest('.saved-task-cards').querySelector('.task-urgent-btn');
      urgentButton.classList.add('hidden');
      var activeUrgentButton = document.createElement('img');
      activeUrgentButton.classList.add('active-urgent-btn');
      savedToDoCard.classList.add('active-urgent-card');
      activeUrgentButton.setAttribute("src", "./assets/check-yo-self-icons/urgent-active.svg");
      urgentDiv.prepend(activeUrgentButton);
      toDoList.updateToDo();
    }

    hideUrgentMessage()
  }

// Function to filter through cards on search
function searchToDos() {
  for(var i = 0; i < rightDiv.children.length; i++) {
    var cardContent = rightDiv.children[i].textContent.toUpperCase();
    var input = searchInput.value.toUpperCase();
    if(cardContent.indexOf(input) > -1) {
      rightDiv.children[i].style.display = "block";
    } else {
      rightDiv.children[i].style.display = "none";
    }
  }
}

function searchUrgentTasks() {
  for(var i = 0; i < rightDiv.children.length; i++) {
    var cardContent = rightDiv.children[i].textContent.toUpperCase();
    var input = searchInput.value.toUpperCase();
    if(cardContent.indexOf(input) > -1 && rightDiv.children[i].classList.contains('active-urgent-card')) {
      rightDiv.children[i].style.display = "block";
    } else {
      rightDiv.children[i].style.display = "none";
    }
  }
}

function selectUrgentButton() {
  event.target.classList.toggle('selected-btn');
  for(var i = 0; i < rightDiv.children.length; i++) {
    if(event.target.classList.contains('selected-btn')) {
      filterUrgency();
    } else {
    rightDiv.children[i].style.display = 'block';
    }
  }
}

function filterUrgency() {
  for(var i = 0; i < rightDiv.children.length; i++) {
  if(rightDiv.children[i].classList.contains('active-urgent-card')) {
    rightDiv.children[i].style.display = 'block';
    } else {
    rightDiv.children[i].style.display = 'none';
    }
  }
}

function hideUrgentMessage() {
  for(var i = 0; i < rightDiv.children.length; i++) {
    if(event.target.classList.contains('urgent-btn')) {
      urgencyMessage.remove();
    }
  }
}





//
