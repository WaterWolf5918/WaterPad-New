
const server = document.getElementById("button-2")

const ip = "ws://" + '127.0.0.1' +":65525"


function linux(num){
	if (num == '2'){
		const sock = new WebSocket(ip);
		sock.addEventListener('open', function (event){
			sock.send(`serverState5`)
			sock.addEventListener('message',(event) => {
				console.log(event)
				if (event.data == 'false'){
					document.getElementById('server-running').innerHTML = 'Stop Server'
				}
				if (event.data == 'true'){
					document.getElementById('server-running').innerHTML = 'Start Server'
				}
				
			})
			sock.close
		})
	}
}








function apple(button){
	const block = button
		// alert(ip)
		const sock = new WebSocket(ip);
		sock.addEventListener('open', function (event){
			sock.send(parseInt(block))
			sock.close
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