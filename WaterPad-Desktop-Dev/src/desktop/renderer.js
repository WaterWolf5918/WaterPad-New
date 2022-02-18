
const server = document.getElementById("button-2")



console.log(ws5)





function linux(){
	window.API.send('server','serverState')
	window.API.receive('server',(args) => {
		console.log(args)
	})
}





function help_info(){
	alert("Work on this later")
}




$(document).ready(function(){
    // jQuery methods go here...
	console.log(window.myAPI)
    console.log("test")
});