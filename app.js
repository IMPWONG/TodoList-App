//Selectors
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addTodo(event){
    //Prevent form from submities
    event.preventDefault();
    //TodoDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to a local storage
    saveLocalTodos(todoInput.value);
    //Complete button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear todo Input Value
    todoInput.value ="";
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall"); 
        //removeLocalTodos(todo);
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        });    
    }
        //Complete Button
        if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
            todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"; 
                }       
            break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";  
                }
            break;            
        }
    });
}

function saveLocalTodos(todo){
    // Check do I already have things in there ?
    let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        } else {todos = JSON.parse(localStorage.getItem('todos'));
        }
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
        if (localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
    todos.forEach(function(todo){
        //TodoDiv
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item'); 
        todoDiv.appendChild(newTodo);
        //Complete button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
        if (localStorage.getItem("todos") === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
            const todoIndex = todo.children[0].innerText;
            todos.splice(todos.indexOf(todoIndex), 1);
            localStorage.setItem("todos", JSON.stringify(todos));
}

