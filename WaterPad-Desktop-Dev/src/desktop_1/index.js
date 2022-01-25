
const {ipcRenderer} = require('electron')
let test = document.getElementById("button-1")


const server = document.getElementById("button-2")
server.addEventListener("click",function () {
	ipcRenderer.send("serverstart","true")
	document.getElementById("server-running").innerText("Stop Server")
	let server_running = true
	console.log(`set server_running to ${server_running}`)
})



function linux(text){
	if (text == 1){
		help_info
	}

}





function help_info(){
	alert("Work on this later")
}




$(document).ready(function(){
    // jQuery methods go here...
    console.log("test")
    });