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

//pre-init
console.log(`Getting Directories \nPlease Wait\n`)
const mainDir = __dirname.split('src')[0].toString()
const importsDir = `${__dirname.split('src')[0].toString()}libs/`
const src = `${__dirname.split('src')[0].toString()}src/`

console.log(`\u001b[37;1mMainDir \u001b[32mOK\u001b[37;1m |\u001b[36m${mainDir}\u001b[0m `)
console.log(`\u001b[37;1mImportsDir \u001b[32mOK\u001b[37;1m |\u001b[36m${importsDir}\u001b[0m `)
console.log(`\u001b[37;1mSorceDir \u001b[32mOK\u001b[37;1m |\u001b[36m${src}\u001b[0m `)

//pre-init



//init
const { OBSLibrary } = require(`${importsDir}obsAPI`);






const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const nconf = require('nconf');
const express = require('express');
const { Server } = require('socket.io');
const webserver = express();
const logger = require(`${importsDir}Log4Water`);
const linin = require(`${importsDir}linin`);
const obs = new OBSLibrary(`${mainDir}scripts/obs/`);
//const OBS = require(`${importsDir}obsAPI`);

var os = require('os');

const networkInterfaces = os.networkInterfaces();

if (networkInterfaces.Ethernet[1].address){
	global.ip = networkInterfaces.Ethernet[1].address;
}else{global.ip = networkInterfaces['Wi-Fi'][1].address}







nconf.use('file', { file:`${mainDir}config\\config.json` });
// *** GET CONFIG *** \\
const debug = nconf.get('debug');
const port = nconf.get('port');
console.log(nconf.get('file0'))
console.log(debug)
// *** INIT *** \\

//Socket.Io Server\\
const io = new Server(65525,{  cors: {
    origin: "*",
    methods: "*"
  }});
// ***Socket.Io Server*** \\

webserver.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
  });


//Socket.io event handler\\
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
		// logger.debug(`Num: ${JSON.stringify(data).valueOf()}`);
		let num = JSON.stringify(data).valueOf();
		console.log(nconf.get(`usersettings:file${num}`))
		if (nconf.get(`usersettings:file${num}:obs-toggle`)){
			console.log(nconf.get(`usersettings:file${num}:obs-action`))
			obs.loadScripts()
			if (obs.isScript(nconf.get(`usersettings:file${num}:obs-action`))){
				logger.log(`${nconf.get(`usersettings:file${num}:obs-action`)} is loaded`)
				obs.runScriptFromName(nconf.get(`usersettings:file${num}:obs-action`), nconf.get(`usersettings:file${num}:obs-arg`))
			}else{
				logger.error(`${nconf.get(`usersettings:file${num}:obs-action`)} is not loaded Maybe you miss spelled the name`)
			}
			// obs.runScriptFromName('ToggleRecording', (...args) => {
			// 	console.log('ToggleRecor ding', ...args)
			// })
		}else{
			console.log('false')
			spawn(nconf.get(`usersettings:file${num}:filepath`))
		}
		






		// var file = nconf.get(`files:${num}`);
		// spawn(file);
		// spzawn(`cmd.exe`,['/c','start' + '"' + file + '"']);
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
	socket.on('menu-close', (data) => {
		logger.log(`[menu] ${data}`);
		app.quit();
	})

});

// ***Socket.io event handler*** \\






const createWindow = function() {
	
  	// Create the browser window.x
  	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,		
		minWidth: 480,
		minHeight: 480,
		webPreferences: {
			preload: `${src}/desktop/preload.js`,
			nodeIntegration: false,
			contextIsolation: true,
			
		},
		frame: false,
  	});

	mainWindow.loadFile(`${src}/desktop/index.html`);
	mainWindow.setIcon(`${mainDir}/build/icon.ico`);
	// if(debug) {
	// 	mainWindow.webContents.openDevTools();
	// };
	io.on('connection', (socket) => {
		socket.on('titlebar', (data) => {
			switch(data){
				case 'min':
					mainWindow.minimize();
					break;
				case 'max':
					if (mainWindow.isMaximized()) {
						mainWindow.unmaximize();
					}else{mainWindow.maximize();}
					break;
				case 'exit':
					app.quit()
					break;
			}
			logger.debug(data)
		})
	})
}

app.whenReady().then(() => {
  	createWindow();
  	app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
	app.on('will-quit', () => {
		if (process.platform !== 'darwin') app.quit();
	});
	webserver.listen(65235);
	logger.log(`WebApp Running on http://${global.ip}:65235/`);
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
					fs.copyFileSync(`${result.filePaths[0]}`,__dirname + `WebApp/image/image-${data}.png`);
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
webserver.use(express.static(`${src}/WebApp`));

// This is so we don't have to use `localhost/index.html`, but instead `localhost/`
// webserver.get('/',function (req, res) {
// 	res.sendFile(__dirname + "/src/WebApp/index.html");
// 	logger.log("Sent file to client");
// })


webserver.get('/',(req, res) => {
	res.sendFile(`${src}/WebApp`);
	// res.sendFile(__dirname + "/src/WebApp/css/");
	logger.log("Sent file to client");
})

