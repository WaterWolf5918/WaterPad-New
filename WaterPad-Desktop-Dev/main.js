//@ts-check

/*
  *** Do Not Remove ***

  Made with love by WaterWolf#5918
  Nostalgia3 also helped I guess ¯\_(ツ)_/¯
  
  Nostalgia3's Discord: Baroque Obama#5128
  WaterWolf's Discord: WaterWolf#5918
  
  Waterwolf's Email: firewolf@null.net
*/

/*
 █     █░ ▄▄▄     ▄▄▄█████▓▓█████  ██▀███   ██▓███   ▄▄▄      ▓█████▄ 
 ▓█░ █ ░█░▒████▄   ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒▓██░  ██▒▒████▄    ▒██▀ ██▌
 ▒█░ █ ░█ ▒██  ▀█▄ ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒▓██░ ██▓▒▒██  ▀█▄  ░██   █▌
 ░█░ █ ░█ ░██▄▄▄▄██░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  ▒██▄█▓▒ ▒░██▄▄▄▄██ ░▓█▄   ▌
 ░░██▒██▓  ▓█   ▓██▒ ▒██▒ ░ ░▒████▒░██▓ ▒██▒▒██▒ ░  ░ ▓█   ▓██▒░▒████▓ 
 ░ ▓░▒ ▒   ▒▒   ▓▒█░ ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░▒▓▒░ ░  ░ ▒▒   ▓▒█░ ▒▒▓  ▒ 
   ▒ ░ ░    ▒   ▒▒ ░   ░     ░ ░  ░  ░▒ ░ ▒░░▒ ░       ▒   ▒▒ ░ ░ ▒  ▒ 
   ░   ░    ░   ▒    ░         ░     ░░   ░ ░░         ░   ▒    ░ ░  ░ 
     ░          ░  ░           ░  ░   ░                    ░  ░   ░    
                                                                ░      
*/


//init
const { app, BrowserWindow, ipcMain } = require('electron');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const nconf = require('nconf');
const express = require('express');
const { Server } = require('socket.io');
const webserver = express();
const logger = require("./Log4Water");
const linin = require('./linin');
const {dialog} = require('electron');

var os = require('os');

var networkInterfaces = os.networkInterfaces();

if (networkInterfaces.Ethernet[1].address){
	global.ip = networkInterfaces.Ethernet[1].address;
}else{global.ip = networkInterfaces['Wi-Fi'][1].address}





nconf.use('file', { file: './config.json' });
// *** GET CONFIG *** \\
const debug = nconf.get('debug');
const port = nconf.get('port');

// *** INIT *** \\
const io = new Server(65525,{  cors: {
    origin: "*",
    methods: "*"
  }});
const cors = require('cors');
const { electron } = require('process');
const path = require('path');

webserver.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
  });



io.on("connection", (socket) => {
	// console.log(socket)
	// send a message to the client
	socket.emit('connected', 'server');
	// receive a message from the client
	socket.on("message", (data) => {
		logger.log(JSON.stringify(data));
	});
	socket.on('buttonClick', (data) => {
		// logger.log(`got buttonClick: ${data}`);
		logger.debug(`Num: ${JSON.stringify(data).valueOf()}`);
		let num = JSON.stringify(data).valueOf();
		var file = nconf.get(`files:${num}`);
		spawn(file);
		// spawn(`cmd.exe`,['/c','start' + '"' + file + '"']);
	})

	socket.on('connected', (data) => {
		logger.log(`[Socket.Connect] ${data} connected ${socket.id}`);
	})

	socket.on('serverInfo', (data) => {
		logger.log(`[Socket.Connect] ${data} connected ${socket.id}`);
		socket.emit('serverInfo', {
			"ip": global.ip,
			"port": "65235",
			"status": "0.3.0"
		})
	})

});

// if (nconf.get('debug')){
// 	logger.debug('Server is running on \n http://localhost:65235/')
// }





const createWindow = function() {
  	// Create the browser window.
  	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,		
		minWidth: 480,
		minHeight: 480,
		webPreferences: {preload: __dirname + "/src/desktop/preload.js"}
  	});

	mainWindow.loadFile("src/desktop/index.html");
	mainWindow.setIcon(`${__dirname}/build/icon.ico`);
	if(debug) {
		mainWindow.webContents.openDevTools();
	};
}

app.whenReady().then(() => {
  	createWindow();

  	app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
	app.on('will-quit', () => {
		if (process.platform !== 'darwin') app.quit();
	});
	// webserver.use(cors());
	webserver.listen(65235);
	// webserver.use(cors())
	logger.log("Client is running on \n http://localhost:65235/");
	io.on("connection", (socket) => {
		socket.on('newImage', (data) => {
			dialog.showOpenDialog({
				title: 'Select an image',
				filters: [
					{ name: 'Images', extensions: ['png']},		
				],
				properties: ['openFile']
			  }).then(result => {
				console.log(result.canceled)
				console.log(JSON.stringify(result.filePaths[0]))
				if(!result.canceled) {
					fs.copyFileSync(`${result.filePaths[0]}`,__dirname + `/src/website/image/image-${data}.png`);
				}
			  }).catch(err => {
				console.log(err)
			  })
		})
		socket.on('newFilePath', (data) => {
			dialog.showOpenDialog({
				properties: ['openFile', 'multiSelections'],
			  }).then(result => {
				console.log(result.canceled)
				if(!result.canceled) {
					let file = JSON.stringify(result.filePaths[0])
					let file2 = file.replace(/\\\\/g, '/');
					logger.debug(`New File Path: ${file2.toString()}`)
					
					nconf.set(`files:${data}`,result.filePaths[0]);
					linin.saveJSON()
				}
			  }).catch(err => {
				logger.error(err)
			  })
		})
	});

});




// app.on('ready',() => {
// 	socket.on('any',(data) => {
// 		console.log(data)
// 	})
// })

app.on('quit', () => {
	linin.saveJSON();
});








// Sends files to the client
webserver.use(express.static(__dirname + "/src/website"));

// This is so we don't have to use `localhost/index.html`, but instead `localhost/`
// webserver.get('/',function (req, res) {
// 	res.sendFile(__dirname + "/src/website/index.html");
// 	logger.log("Sent file to client");
// })


webserver.get('/',(req, res) => {
	res.sendFile(__dirname + "/src/website/");
	// res.sendFile(__dirname + "/src/website/css/");
	logger.log("Sent file to client");
})

