//selektory
const todoInput = document.querySelector('.todotext');
const todoButton = document.querySelector('.todobutt');
const todoList = document.querySelector('.todolist');
const filterOption = document.querySelector('.filtrtodo');


//eventy
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);




//funckje

function addTodo(event){
    event.preventDefault();


//todo div
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
const newTodo = document.createElement('li');
newTodo.innerText = todoInput.value;
newTodo.classList.add('todoitem');
todoDiv.appendChild(newTodo);
//dodawanie do localstorage
saveLocalTodos(todoInput.value);
//button check
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("completebtn");
todoDiv.appendChild(completedButton);
//button none
const delButton = document.createElement('button');
delButton.innerHTML = '<i class="fas fa-trash"></i>';
delButton.classList.add("delbtn");
todoDiv.appendChild(delButton);
//dolaczanie do listy
todoList.appendChild(todoDiv);
//czyszczenie 
todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //usuwanie
    if(item.classList[0] === 'delbtn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo); todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    
//akceptowanie
    if(item.classList[0] === 'completebtn'){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                     todo.style.display = "none";
                }
                 break;
                case "deleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                        }else{
                          todo.style.display = "none";
                      }
                    break;
              
              }    
    });
}


//localstorage

function saveLocalTodos(todo){
    //sprawdzanie czy cos jest
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");
const newTodo = document.createElement('li');
newTodo.innerText = todo;
newTodo.classList.add('todoitem');
todoDiv.appendChild(newTodo);
//button check
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("completebtn");
todoDiv.appendChild(completedButton);
//button none
const delButton = document.createElement('button');
delButton.innerHTML = '<i class="fas fa-trash"></i>';
delButton.classList.add("delbtn");
todoDiv.appendChild(delButton);
//dolaczanie do listy
todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


