import * as test from './socket.io.js';
import * as linut from './linit.mjs';

const socket = io('ws://localhost:65525');

socket.on('connect', () => {
  // either with send()
  socket.emit('connected', 'Desktop Manager');
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


// let note = new linut.Notification("test","test");
// linut.pushNotification(note);


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