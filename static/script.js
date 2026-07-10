const button = document.getElementById("addTaskButton");
button.addEventListener("click", addTask);
const taskInput = document.getElementById("taskInput");

console.log(button);
console.log(taskInput);




async function addTask() {
    
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please, enter a task");
        return;
    }

    const response = await fetch("/api/tasks", {
        method: "POST", 
        headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: taskText
            })

    })
    const taskList = await response.json();
    displayTasks(taskList);
    taskInput.value = "";

}

function displayTasks(tasks) {



    const taskList = document.querySelector('ul');
    taskList.innerHTML="";

    tasks.forEach(task => {
        const liElement = document.createElement('li');

        liElement.className="list-group-item";
        liElement.textContent = task.title;
        taskList.appendChild(liElement);
        
    });





    



    
    

}

function buttonToggler() {
    button.addEventListener("click", async (event) => {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: taskText
            })
        });
    });
}




