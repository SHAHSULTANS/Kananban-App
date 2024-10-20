let currenColumn=null;
let currentTask=null;
let transferData=null;


const globalMenu=document.getElementById("globalMenu");


document.querySelectorAll(".task-container").forEach(container=>{
    //console.log(container);
   container.addEventListener("dragover",dragOver);
   container.addEventListener("dragleave",dragLeave);
   container.addEventListener("drop",drop);


});


function dragOver(event){
    event.preventDefault();
    //console.log(event.target);
    event.target.classList.add("hovered");
    

}

function dragLeave(event){
    event.preventDefault();
    event.target.classList.remove("hovered");
   
}

function drop(event){
    event.preventDefault();
    if(transferData){
       // console.log(transferData);
       // console.log(event.target);
       event.target.appendChild(transferData);
        event.target.classList.remove("hovered");


    }
    

}




function dragStart(){
    //console.log(this);
    globalMenu.style.display='none';
    transferData=this;
    this.classList.add("dragging");

}

function dragEnd(){
    this.classList.remove("dragging");
}




function addTask(){
    currenColumn="toDo";

    document.getElementById("task-input").value="";
    document.getElementById("task-modal").style.display='flex';
}


function saveTask(){
    const taskContent=document.getElementById("task-input").value.trim();

    if(taskContent==''){
        alert("Task content can not be empty");
        return;
    }

    const task=document.createElement("DIV");
    task.className="task";
    task.draggable=true;
    task.innerHTML=`<span class='task-text'>${taskContent}</span>`;

    const span=document.createElement("span");
    span.innerHTML="⋮";
    span.className="threeDots";
    task.appendChild(span);

    task.addEventListener("dragstart",dragStart);
    task.addEventListener("dragend",dragEnd);



    task.querySelector(".threeDots").addEventListener("click",(event)=>{
        //console.log(event.target); 
        //globalMenu.style.display="block";
        currentTask=task;


        event.stopPropagation();//Used to prevent parent event triggered when an event occurs on a child element.

        ShowEditDeleteBtn(event,task);

    });

    

    document.getElementById("toDo").appendChild(task);
    document.querySelector(".close").click();
}


function ShowEditDeleteBtn(event,task){
    event.preventDefault();
    //console.log(task);
    //console.log(event.target);

    const rect=task.getBoundingClientRect();

    //console.log(rect.top);
    //console.log(window.scrollY);
    globalMenu.style.top=`${rect.top+window.scrollY+10}px`;

    //console.log(task.offsetWidth);
    globalMenu.style.left=`${rect.left+window.scrollX+task.offsetWidth-100}px`;

    globalMenu.style.display="block";


    //Close when click outside.
    document.addEventListener("click",closeEditDeleteBtnClickOutside);

}


//Close the golabal Edit & Delete Button when Clicking outise
function closeEditDeleteBtnClickOutside(event){
    //console.log("YES");
    //console.log(event.target);

    if(!globalMenu.contains(event.target)){
        globalMenu.style.display='none';

        window.removeEventListener("click",closeEditDeleteBtnClickOutside);
    }

}


document.getElementById("editBtn").addEventListener("click",()=>{
    if(currentTask){
        //console.log(currentTask.textContent);
        const taskText=currentTask.querySelector(".task-text");
        //console.log(taskText);

        const newText=prompt("Edit Task:",taskText.textContent);

        if(newText!=null && newText.trim()!==''){
            taskText.textContent=newText;
        }

        closeGlobalMenu();
        
    }
    

});

document.getElementById("deleteBtn").addEventListener("click",()=>{
    if(currentTask){
        currentTask.remove();
    }
    closeGlobalMenu();

});


function closeGlobalMenu(){
    globalMenu.style.display='none';
    currentTask=null;
}






//used to getting year for footer.
document.getElementById("year").innerText=new Date().getFullYear();