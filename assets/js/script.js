const taskJson = [];
const taskList = document.querySelector("#taskList")
const newTask = document.querySelector("#newTask")
const btnAdd = document.querySelector("#btnAdd")
const total = document.querySelector("#total")
const done = document.querySelector("#done")

let contDone = 0 // Variable para contar cuantas tareas estan realizadas

const renderTask =()=>{
	contDone = 0
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
				html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="changeDone(${task.id})" id="taskCheck" checked></td><td><img onclick="deleteTask(${task.id})" src="./assets/img/delete.png" alt="Eliminar"></td></tr>`
			}else{
				html += `<tr><td>${task.id}</td><td>${task.description}</td><td><input type="checkbox" class="checkbox" onclick="changeDone(${task.id})" id="taskCheck"></td><td><img onclick="deleteTask(${task.id})" src="./assets/img/delete.png" alt="Eliminar"></td></tr>`
			}
		}
		html += `</tbody>`
	}
	taskList.innerHTML = html
	total.innerHTML = taskJson.length
	done.innerHTML = contDone
}
const addTask = (task) =>{
	/* genera un numero random hasta que no exista en el array */
	let idRand = Math.floor(Math.random()*100)
	while(taskJson.includes(idRand) === true){ 
		idRand = Math.floor(Math.random()*100)
	}
	taskJson.push({id: idRand, description: task, state: 0})
}
const deleteTask =(id)=>{
	const indiceTask = taskJson.findIndex( searchIndex => searchIndex.id === id)
	taskJson.splice(indiceTask, 1)
	renderTask()
}
const changeDone =(id)=>{
	const indiceTask = taskJson.findIndex( searchIndex => searchIndex.id === id)
	if(taskJson[indiceTask].state === 0){
		taskJson.splice(indiceTask, 1 ,{id: taskJson[indiceTask].id, description: taskJson[indiceTask].description, state: 1})
		contDone++
	}else{
		taskJson.splice(indiceTask, 1 ,{id: taskJson[indiceTask].id, description: taskJson[indiceTask].description, state: 0})
		contDone--
	}
	done.innerHTML = contDone
}
btnAdd.addEventListener("click", () => {
	addTask(newTask.value)
	newTask.value = ""
	renderTask()
})