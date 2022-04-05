

let socket = io('ws://localhost:65525');

socket.on('connect', () => {
  // either with send()
  socket.emit('connected', 'Desktop Manager Editor');
  socket.on("message", (...args) => {
	console.log(args);
});
});
// const socket = test('ws://localhost:65525');

let waterpadVersion = 'https://raw.githubusercontent.com/Nightowl2007W/WaterPad-New/main/WaterPad-Desktop-Dev/version.txt';

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

$('#server-button').click(function() {
	doAction('server');
});

$('#settings-button').click(function() {
	doAction('settings');

});

$('#help-button').click(function() {
	doAction('help');
});

function apple(num){
	document.getElementById('picker-button-list').classList.replace('hidden','show');
	document.getElementById('button-list').classList.replace('button-list','hidden');
	// let socket = io('ws://localhost:65525');
	// socket.on('connect',() => {
	// 	socket.emit('newFilePath', num);
	// 	console.log(num)
	// })
}

// let note = new linut.Notification("test","test");
// linut.pushNotification(note);

function test(num){
	console.log('test' + num);
}

function picker(num){
	document.getElementById('picker-button-list').classList.add('hidden');
	document.getElementById('button-list').classList.replace('hidden','button-list');
}



function hellotest(num){
	let socket = io('ws://localhost:65525');
	socket.on('connect',() => {
		socket.emit('newImage', num);
		console.log(num)
	})
}



async function doAction(action) {
	switch(action) {
		case 'server':
			socket.send('server info')
		break;

		case 'help':
			// Set GUI to the help menu

		break;
		
		case 'settings':
			// Set GUI to settings :)
		break;
	}
}