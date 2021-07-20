let storage = localStorage;
let submitButton = document.getElementById("submit");

submitButton.onclick = () => addTask();

class Task {
    constructor(input) {
        console.log(input, "IIIIIIII")
        this.task = this.generateTask(input);
    }

    getTask(){
        return this.task;
    }

    generateTask (input){
        let task = document.createElement("li", );
        let button = document.createElement("button", );
        button.innerText = "✔️️";
        button.onclick = () => this.deleteTask(input);
        task.appendChild(document.createTextNode(input));
        task.appendChild(button);
        task.className="task";
        let temp = storage.getItem("tasks");
        temp = temp === null ? [] : JSON.parse(temp);
        console.log("Storage: ", temp, input)
        temp.push(input);
        storage.setItem("tasks", JSON.stringify(temp));
        console.log(storage.getItem("tasks"))
        return task;
    }

    deleteTask(input){
        let temp = storage.getItem("tasks");
        temp = JSON.parse(temp);
        temp.splice(temp.indexOf(input), 1);
        storage.setItem("tasks", JSON.stringify(temp));
        console.log(storage.getItem("tasks"))
        this.task.remove();
    }
}

function addTask(){
    let inputArea = document.getElementById("input");
    let tasksList = document.getElementById("tasks");
    console.log(inputArea.value);
    let task = new Task(inputArea.value).getTask();
    console.log(task);
    tasksList.appendChild(task);
}

chrome.runtime.onStartup.addListener(
    () => {
        console.log("Loading task: Extension");
        let tasks = storage.getItem("tasks") ?? [];
        storage.setItem("tasks", tasks);
        console.log(tasks)
        let tasksList = document.getElementById("tasks");
        tasksList.append(...tasks.map(e => new Task(e).getTask()));
    },
);