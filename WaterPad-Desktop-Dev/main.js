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
const { app, BrowserWindow } = require('electron');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const nconf = require('nconf');
const express = require('express');
const { Server } = require('socket.io');
const webserver = express();

const logger = require("./Log4Water");
const linin = require('./linin');
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
		logger.debug(nconf.get(`files:${num}`));
		exec(nconf.get(`files:${num}`),(err,stdout,stderr) => {
			if (debug){
				logger.log(stdout);
				logger.log(stderr);
			}
			if(err) {
				logger.error(err);
			}
		});
	})

	socket.on('connected', (data) => {
		logger.log(`[Socket.Connect] ${data} connected ${socket.id}`);
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
});


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
	res.sendFile(__dirname + "/src/website/index.html");
	// res.sendFile(__dirname + "/src/website/css/");
	logger.log("Sent file to client");
})