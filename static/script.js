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

async function deleteTask(id) {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
    

    });
    const taskList = await response.json();
    displayTasks(taskList);




}

function displayTasks(tasks) {



    const taskList = document.querySelector('ul');
    taskList.innerHTML="";

    tasks.forEach(task => {
        const liElement = document.createElement('li');

        liElement.className = "list-group-item d-flex justify-content-between align-items-center";
        liElement.textContent = task.title;
        taskList.appendChild(liElement);

        const buttonContainer = document.createElement("div");
        const iconDelete = document.createElement("i");
        const iconChange = document.createElement("i");
        iconDelete.className = "bi bi-trash";
        iconChange.className = "bi bi-pencil";
        buttonContainer.className = "deleteTaskbtn";
    
        const DeleteBtn = document.createElement("button");
        const EditBtn = document.createElement("button");
        EditBtn.appendChild(iconChange);
        DeleteBtn.appendChild(iconDelete);
        buttonContainer.appendChild(EditBtn);
        buttonContainer.appendChild(DeleteBtn);
        EditBtn.className = "btn btn-outline-primary";
        DeleteBtn.className = "btn btn-outline-danger";

        DeleteBtn.addEventListener("click", async () => {
            await deleteTask(task.id);
        });
  





        liElement.appendChild(buttonContainer);

        
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




