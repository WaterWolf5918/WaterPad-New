

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
	picknum = num;
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


function titlebar(button){
	socket.emit('titlebar', button);
}

function exit(){
	socket.emit('menu-close')
}
$('#Exit-button').click(function() {
	console.log()
});


function picker(num2){
	let socket = io('ws://localhost:65525');
	socket.on('connect',() => {
		switch(num2){
			case 1:
				socket.emit('newImage', picknum);
				document.getElementById('picker-button-list').classList.add('hidden');
				document.getElementById('button-list').classList.replace('hidden','button-list');
				break;
			case 2:
				socket.emit('newFilePath', picknum);
				document.getElementById('picker-button-list').classList.add('hidden');
				document.getElementById('button-list').classList.replace('hidden','button-list');
				break;
		}		
	})

	document.getElementById('picker-button-list').classList.add('hidden');
	document.getElementById('button-list').classList.replace('hidden','button-list');
}

$( "#server-button" ).hover(
	function() {
		document.getElementById('server-info-text').classList.replace('hidden','showi');
		serverInfo()
	  console.log('hover');
	}, function() {
		document.getElementById('server-info-text').classList.replace('showi','hidden');
	  console.log('hover out');
	}
  );

function serverInfo(){
	let socket = io('ws://localhost:65525');
	socket.on('connect',() => {
		socket.emit('connected', 'Desktop Manager Editor[sevrer info]');
		socket.emit('serverInfo');
		socket.on('serverInfo',(data) => {
			console.log(data)
			document.getElementById('server-info-text-1').innerHTML = `Server IP: ${data.ip}`;
			document.getElementById('server-info-text-2').innerHTML = `Server Port: ${data.port}`;
			document.getElementById('server-info-text-3').innerHTML = `Server Version: ${data.status}`;
		})
	})

}



$('server-img').hover(function() {
	console.log('test')
})

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