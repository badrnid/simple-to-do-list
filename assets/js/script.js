
let input = document.querySelector('.input');
let add = document.querySelector('.add');
let tasks = document.querySelector('.tasks');

let tasksArray = [];


// ##### LOAD TASKS #####


if (localStorage.getItem('tasks')) {
    tasksArray = JSON.parse(localStorage.getItem('tasks'));
    addTaskToForm(tasksArray);
}

// ######################

add.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};

function addTaskToArray(task) {
    
    const taskData = {
     id: Date.now(),
     title: task,
     completed: false,
    };

    tasksArray.push(taskData);

    
    // ######### STORE TASKS ###########

    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    // #################################
    addTaskToForm(tasksArray);
}




function addTaskToForm(tasksArray) {

    tasks.innerHTML = ""; // Empty tasks div

    tasksArray.forEach((taskData) => {

        let div = document.createElement('div');
        div.className = "task";

        if (taskData.completed) {
            div.classList.add('done');
        }

        div.setAttribute("data-id", taskData.id);
        div.appendChild(document.createTextNode(taskData.title));
        
        div.onclick = function () {
            div.classList.toggle('done'); 
            taskCompleted(taskData.id);
     
        }


        tasks.appendChild(div);

        let span = document.createElement('span');
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);

        
        span.onclick = function () {
            deleteTask(taskData.id);
        };

        tasks.appendChild(div);
               
        
    });
}


function deleteTask(id) {

        tasksArray = tasksArray.filter((task) => task.id !== id);

        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        addTaskToForm(tasksArray);

    }
    function taskCompleted(id) {

        tasksArray = tasksArray.map((task) => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
             
          localStorage.setItem('tasks', JSON.stringify(tasksArray));
          addTaskToForm(tasksArray);
            return task;
            
        });
        



}
