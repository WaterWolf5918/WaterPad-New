let hostname = self.location.hostname
let socket = io(`ws://${hostname}:4000`,{
	reconnectionAttempts : 2,
	reconnectionDelay : 259,
})


// $('#button').click(function() {
// 	console.log('help');
// });
socket.on('connect',() => {
	socket.emit('connected','Client')
})





socket.on('disconnect',() =>{
	console.error('socket disconnected')
})

function apple(button) {
	let hostname = self.location.hostname
	let socket = io(`ws://${hostname}:65525`);
	console.log(button);
	socket.on('connect',() => {
		socket.emit('buttonClick',button)
		socket.destroy()
})}




