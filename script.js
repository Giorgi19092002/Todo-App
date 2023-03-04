let form = document.getElementById('form')
let input = document.getElementById('textinput')
let msg = document.getElementById('msg')
let dateInput = document.getElementById('dateinput')
let textarea = document.getElementById('textarea')
let task = document.getElementById('tasks')
let add = document.getElementById('add')

form.addEventListener('submit',(e) => {
    e.preventDefault()

    formValidation()
})

let formValidation = () => {
    if(input.value === ''){
       msg.innerHTML = "Please Fill The Input"
    }
    else{
        msg.innerHTML = ''
        acceptData()
        add.setAttribute('data-bs-dismiss', "modal")
        add.click()

        (() => {
            add.setAttribute('data-bs-dismiss', "modal")
        })()
    }
}

let data = {}

let acceptData = () => {
    data['text'] = input.value
    data['date'] = dateInput.value
    data['desc'] = textarea.value

    localStorage.setItem("data", JSON.stringify(data));
    createTasks()

    
}

let createTasks = () => {
    task.innerHTML += `<div>
    <span class="fw-bold">${data.text}</span>
    <span class="small text-secondary">${data.date}</span>
    <p>${data.desc}</p>

    <span class="options">
        <i onclick="editTask(this)" id="addnew" data-bs-toggle="modal" data-bs-target="#form"  class="bi bi-pencil-square"></i>
        <i onclick = "deleteTask(this)" class="bi bi-trash"></i>
    </span>
    </div>`

    resetForm()
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove()
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

let editTask = (e) => {
   let selecktedTask = e.parentElement.parentElement
   input.value = selecktedTask.children[0].innerHTML
   dateInput.value = selecktedTask.children[1].innerHTML
   textarea.value = selecktedTask.children[2].innerHTML

   selecktedTask.remove()
}

let resetForm = () => {
    input.value = ''
    dateInput.value = ''
    textarea.value = ''
}


