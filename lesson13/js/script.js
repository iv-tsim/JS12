"use sctrict";

const   todoControl = document.querySelector(".todo-control"),
        headerInput = document.querySelector(".header-input"),
        todoList = document.querySelector(".todo-list"),
        todoCompleted = document.querySelector(".todo-completed");

const todoData = JSON.parse(localStorage.data);

const render = function() {
    localStorage.setItem("data", JSON.stringify(todoData));
    todoList.textContent = "";
    todoCompleted.textContent = "";

    todoData.forEach(function(item, index) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = "<span class=\"text-todo\">" + item.value + "</span>" +
            "<div class=\"todo-buttons\">" + 
                "<button class=\"todo-remove\"></button>" +
                "<button class=\"todo-complete\"></button>" +
            "</div>";

        (item.completed) ? todoCompleted.append(li) : todoList.append(li);

        const   btnTodoCompleted = li.querySelector(".todo-complete"),
                btnTodoRemove = li.querySelector(".todo-remove");

        btnTodoCompleted.addEventListener("click", function() {
            item.completed = !item.completed;
            render();
        });
        
        btnTodoRemove.addEventListener("click", function() {
            todoData.splice(index, 1);
            render();
        });
    });
};

todoControl.addEventListener("submit", function(event) {
    event.preventDefault();

    if (headerInput.value === "") {
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    todoData.push(newTodo);
    headerInput.value = "";
    render();
});

render();