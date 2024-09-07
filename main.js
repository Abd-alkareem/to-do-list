const addForm = document.querySelector(".add-form"),
formBtn = document.querySelector(".add-btn"),
addBtn = document.querySelector(".add-form .add"),
editBtn = document.querySelector(".add-form .edit"),
cancelBtn = document.querySelector(".add-form .cancel"),
fild = document.querySelector(".add-form .fild"),
taskDiv = document.querySelector(".task-div"),
delAll = document.querySelector(".header .del-all");


const days = ["Sun","Mon","Tua","Wed","Thr","Fri","Sat"];
const mths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];

let tasks = [];

if(window.localStorage.getItem("tasks") != undefined && window.localStorage.getItem("tasks") != '[]' ){
    tasks = JSON.parse(window.localStorage.getItem("tasks")) ;
    adTPage(tasks);
    //edit function 
    editTask();
    

}

//delete all btn 
delAll.addEventListener("click",()=>{
    tasks = [];
    adTLocStor(tasks);
    adTPage(tasks);
})

//open add task form
formBtn.addEventListener("click",()=>{
    addBtn.classList.add("active");
    addForm.classList.add("open");
    document.querySelector(".overlay").classList.add("active");
    fild.focus();
})

//close add task form 
cancelBtn.addEventListener("click",()=>{
    closingForm();
    fild.value = "";
});

//adding task --creating one--
addBtn.addEventListener("click",()=>{
    // check if the fild is empty
    if(fild.value != ""){
        //close the form
        closingForm();
        // adding task to the array func
        adTAraay(fild.value);
        // adding tasks to the page func
        adTPage(tasks);
        //adding the tasks data to the local storage
        adTLocStor()        
        // clear the fild
        fild.value = ""; 

        //adding functionality to the btns

        //delete function
        deleteTask();
        //done function
        doneTask();
        //edit function 
        editTask();
        
    }

})



//adding to the array func
function adTAraay(titleText){
    let dateNow = new Date();
    let task = {
        title : titleText,
        id : Date.now(),
        completed : false,
        day : dateNow.getDate(),
        dInMth : dateNow.getDate(),
        month : dateNow.getMonth(),
        year : dateNow.getFullYear(),
        sec : dateNow.getSeconds(),
        minute : dateNow.getMinutes(),
        houre : dateNow.getHours(),
        timeZone : Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
    tasks.push(task);
}

// adding to the page func
function adTPage(tasks){
    taskDiv.innerHTML = '';
    if(tasks.lenght != 0){
        tasks.forEach(task => {
            // creating the task div
                // creating elements
            let tempTask = document.createElement("div");
            let type = document.createElement("span"),
            done = document.createElement("button"),
            doneI = document.createElement("i"),
            info = document.createElement("div"),
            titleSpan = document.createElement("div"),
            date = document.createElement("div"),
            day = document.createElement("div"),
            mounth = document.createElement("div"),
            year = document.createElement("div"),
            time = document.createElement("div"),
            buttonsDiv = document.createElement("div"),
            editBtn = document.createElement("button"),
            delBtn = document.createElement("button");
                // adding classes  
            tempTask.classList = "task";
            if(task.completed ){
                tempTask.classList.add("done");
            }
            type.classList= "type";
            done.classList = "done";
            doneI.classList = "fas fa-check";
            info .classList = "info";
            titleSpan.classList = "title"; 
            date.classList = "date";
            day.classList = "day";
            mounth.classList = "mounth";
            year.classList = "year";
            time.classList = "time";
            buttonsDiv.classList = "buttons";
            editBtn.classList = "edit fas fa-pencil";
            delBtn.classList = "delete fas fa-trash";
                // adding the data to the elements
            titleSpan.appendChild(document.createTextNode(task.title));
            day.appendChild(document.createTextNode(`${days[task.day]} ${task.dInMth}`));
            mounth.appendChild(document.createTextNode(task.month + 1));
            year.appendChild(document.createTextNode(task.year));
            time.appendChild(document.createTextNode(`At: ${task.houre}:${task.minute}:${task.sec}..`))
                // adding id to the task
                tempTask.id = task.id;            
                //appending the elements to each other
                date.appendChild(day);
                date.appendChild(mounth);
                date.appendChild(year);
                date.appendChild(time);
                buttonsDiv.appendChild(editBtn);
                buttonsDiv.appendChild(delBtn);
                done.appendChild(doneI);
                info.appendChild(titleSpan);
                info.appendChild(date);

                tempTask.appendChild(type);
                tempTask.appendChild(done);
                tempTask.appendChild(info);
                tempTask.appendChild(buttonsDiv);

            
            // console.log(tempTask);
            taskDiv.append(tempTask);
        });
        //done function
        doneTask();
        //delete function
        deleteTask();
        //edit function 
        editTask();

    }
}
//closing the adding form function
function closingForm(){
    addBtn.classList.remove("active");
    editBtn.classList.remove("active");
    addForm.classList.remove("open");
    document.querySelector(".overlay").classList.remove("active");
    // fild.value = "";
}
// Adding the tasks to local storage
function adTLocStor(){
    window.localStorage.setItem("tasks",JSON.stringify(tasks));
}
// Function to delete the tasks
function deleteTask(){
        document.querySelectorAll(".task .buttons .delete").forEach((e)=>{
            e.addEventListener("click",(e)=>{
            let tempDiv = e.target.parentElement;
            tasks = tasks.filter((ele)=>{
            return ele.id.toString() !== tempDiv.parentElement.id;
            })
            tempDiv.parentElement.remove();
            adTLocStor(tasks);
            })                
        })
}
// Function to finish the tasks
function doneTask(){
        document.querySelectorAll(".task .done").forEach((e)=>{
            e.addEventListener("click",()=>{
                tasks.forEach((ele)=>{
                    if(ele.id == e.parentElement.id){
                        if(ele.completed){
                            ele.completed = false;
                        }else{
                            ele.completed = true;
                        }
                        adTLocStor(tasks);
                        adTPage(tasks);
                    }
                })
            })
        })
        
}
// Editing the tasks
function editTask(){
    document.querySelectorAll(".task .buttons .edit").forEach((e)=>{
        e.addEventListener("click",(e)=>{
            let editt = true;
            
            let tempDiv = e.target.parentElement;

            tasks.forEach((ele)=>{
                if(ele.id.toString() == tempDiv.parentElement.id){
                    fild.value = ele.title;
                    editBtn.classList.add("active");
                    addForm.classList.add("open");
                    document.querySelector(".overlay").classList.add("active");
                    fild.focus();
                    fild.onchange = ()=>{
                        if(editt){
                            ele.title = fild.value;
                            adTLocStor(tasks);
                            adTPage(tasks); 

                        }
                        editt = false;
                    }
                }
            })


        })
    })
}
editBtn.addEventListener("click",()=>{
    closingForm();
    fild.value = '';
})
