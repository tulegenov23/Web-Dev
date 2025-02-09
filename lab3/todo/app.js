
document.addEventListener("DOMContentLoaded", function () {
    loadTodoList();
});

function loadTodoList() {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";

    const todoList = getTodoList();

    todoList.forEach((item, index) => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.done;
        checkbox.addEventListener("change", function () {
            markAsDone(index);
        });

        const taskText = document.createElement("span");
        taskText.innerText = item.task;

        // Add 'done' class to todo-item if the task is completed
        if (item.done) {
            todoItem.classList.add("done");
        }

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<img src="icon.png" alt="Delete">';
        deleteButton.addEventListener("click", function () {
            deleteItem(index);
        });

        todoItem.appendChild(checkbox);
        todoItem.appendChild(taskText);
        todoItem.appendChild(deleteButton);

        todoContainer.appendChild(todoItem);
    });
}


function getTodoList() {
    const todoListString = localStorage.getItem("todoList");
    return JSON.parse(todoListString) || [];
}

function saveTodoList(todoList) {
    const todoListString = JSON.stringify(todoList);
    localStorage.setItem("todoList", todoListString);
}

function addItem() {
    const newItemInput = document.getElementById("new-item");
    const newItemText = newItemInput.value.trim();

    if (newItemText !== "") {
        const todoList = getTodoList();
        todoList.push({ task: newItemText, done: false });
        saveTodoList(todoList);
        loadTodoList();
        newItemInput.value = "";
    }
}

function markAsDone(index) {
    const todoList = getTodoList();
    todoList[index].done = !todoList[index].done;
    saveTodoList(todoList);
    loadTodoList();
}

function deleteItem(index) {
    const todoList = getTodoList();
    todoList.splice(index, 1);
    saveTodoList(todoList);
    loadTodoList();
}
