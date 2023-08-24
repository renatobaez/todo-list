const taskJson = [];
const taskList = document.querySelector("#taskList")
const newTask = document.querySelector("#newTask")
const btnAdd = document.querySelector("#btnAdd")
const total = document.querySelector("#total")
const done = document.querySelector("#done")

const renderTask =()=>{
	let contDone = 0 // Variable para contar cuantas tareas estan realizadas
	let html = ""
	if(taskJson.length>0){
		html = `<thead>
						<th>ID</th>
						<th>Tarea</th>
						<th></th>
						<th></th>
					</thead>
					<tbody>`
		for (task of taskJson) {
			if(task.state){
				contDone++
				html += `<tr><td>${task.id}</td><td class="highlight">${task.description}</td><td><input type="checkbox" class="checkbox" onclick="changeDone(${task.id})" id="taskCheck" checked></td><td><img onclick="deleteTask(${task.id})" src="./assets/img/delete.png" alt="Eliminar"></td></tr>`
			}else{
				html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="changeDone(${task.id})" id="taskCheck"></td><td><img onclick="deleteTask(${task.id})" src="./assets/img/delete.png" alt="Eliminar"></td></tr>`
			}
		}
		html += `</tbody>`
	}
	taskList.innerHTML = html
	total.innerHTML = taskJson.length
	done.innerHTML = contDone
	newTask.focus()
}
const addTask = (task) =>{
	/* genera un numero random hasta que no exista en el array */
	let idRand = Math.floor(Math.random()*100)
	const ids = taskJson.map(task => task.id)
	while(ids.includes(idRand) === true){ 
		idRand = Math.floor(Math.random()*100)
	}
	taskJson.push({id: idRand, description: task, state: 0})
}
const deleteTask =(id)=>{
	const indexTask = taskJson.findIndex( searchIndex => searchIndex.id === id)
	taskJson.splice(indexTask, 1)
	renderTask()
}

const changeDone =(id)=>{
	const indexTask = taskJson.findIndex( searchIndex => searchIndex.id === id)
	if(taskJson[indexTask].state === 0){
		taskJson.splice(indexTask, 1 ,{id: taskJson[indexTask].id, description: taskJson[indexTask].description, state: 1})
	}else{
		taskJson.splice(indexTask, 1 ,{id: taskJson[indexTask].id, description: taskJson[indexTask].description, state: 0})
	}
	renderTask()
}
btnAdd.addEventListener("click", () => {
	if(newTask.value){
		addTask(newTask.value)
		newTask.value = ""
		renderTask()
	}else{
		alert("Debe ingresar una tarea")
		newTask.focus()
	}
})