class ToDoList {
  constructor(id, title, urgent, tasks, allComplete) {
    this.id = id;
    this.title = title;
    this.urgent = false;
    this.tasks = [];
    this.allComplete = [];
  }

  saveToStorage() {
    var stringedTask = JSON.stringify(this);
    var savedTask = window.localStorage.setItem(this.id, stringedTask);
  }

  deleteFromStorage() {
    for(var i = 0; i < window.localStorage.length; i++) {
      var toDoId = window.localStorage.key(i);
      if(event.target.parentNode.parentNode.parentNode.classList.contains(toDoId)) {
      var savedToDo = window.localStorage.removeItem(toDoId);
      }
    }
  }

  updateToDo() {
    for(var i = 0; i < window.localStorage.length; i++) {
      var toDoId = window.localStorage.key(i);
      if(event.target.parentNode.parentNode.parentNode.classList.contains(toDoId)) {
      var savedToDo = window.localStorage.getItem(toDoId);
      var parsedToDo = JSON.parse(savedToDo);
      console.log(parsedToDo);
      }
    }
    parsedToDo.urgent = true;
    var stringedTask = JSON.stringify(parsedToDo);
    var savedTask = window.localStorage.setItem(parsedToDo.id, stringedTask);
    }

  updateTask(event) {
    for(var i = 0; i < window.localStorage.length; i++) {
      var toDoId = window.localStorage.key(i);
      if(event.target.parentNode.parentNode.parentNode.classList.contains(toDoId)) {
      var savedToDo = window.localStorage.getItem(toDoId);
      var parsedToDo = JSON.parse(savedToDo);
      }
    }
    for(var j = 0; j < parsedToDo.tasks.length; j++) {
      var taskId = parsedToDo.tasks[j].id;
      if(event.target.parentNode.classList.contains(taskId)) {
      parsedToDo.tasks[j].complete = true;
      var completedItem = parsedToDo.tasks[j].complete;
      console.log(completedItem);
      parsedToDo.allComplete.push(completedItem);
      var stringedTask = JSON.stringify(parsedToDo);
      var savedTask = window.localStorage.setItem(parsedToDo.id, stringedTask);
      }
    }
  }
}
