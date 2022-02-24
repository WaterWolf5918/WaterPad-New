//Made By WaterWolf#5918 
//Discord: WaterWolf#5918
//Email: firewolf@null.net
//Do Not Remove

/* █     █░ ▄▄▄     ▄▄▄█████▓▓█████  ██▀███   ██▓███   ▄▄▄      ▓█████▄ 
 * ▓█░ █ ░█░▒████▄   ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒▓██░  ██▒▒████▄    ▒██▀ ██▌
 * ▒█░ █ ░█ ▒██  ▀█▄ ▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒▓██░ ██▓▒▒██  ▀█▄  ░██   █▌
 * ░█░ █ ░█ ░██▄▄▄▄██░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  ▒██▄█▓▒ ▒░██▄▄▄▄██ ░▓█▄   ▌
 * ░░██▒██▓  ▓█   ▓██▒ ▒██▒ ░ ░▒████▒░██▓ ▒██▒▒██▒ ░  ░ ▓█   ▓██▒░▒████▓ 
 * ░ ▓░▒ ▒   ▒▒   ▓▒█░ ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░▒▓▒░ ░  ░ ▒▒   ▓▒█░ ▒▒▓  ▒ 
 *   ▒ ░ ░    ▒   ▒▒ ░   ░     ░ ░  ░  ░▒ ░ ▒░░▒ ░       ▒   ▒▒ ░ ░ ▒  ▒ 
 *   ░   ░    ░   ▒    ░         ░     ░░   ░ ░░         ░   ▒    ░ ░  ░ 
 *     ░          ░  ░           ░  ░   ░                    ░  ░   ░    
 *                                                                ░      
*/




var express = require('express');
var { exec, spawn } = require('child_process');
var fs = require('fs');
var ws = require('ws');
var nconf = require('nconf');
var app2 = express();
var wsServer = new ws.Server({ noServer: true });
// var prompt = require('prompt-sync')();
var logger = require("./Log4Water")

logger.start()


const WebSocket = require('ws');
const socket = new WebSocket.Server({ port: 65225 });
logger.start()






let { app, BrowserWindow } = require('electron');
const { stringify } = require('querystring');
const ipcMain = require('electron').ipcMain

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
	width: 900,
	height: 600,
	webPreferences: {
	  preload: __dirname + "/src/desktop/preload.js",
	}
  });

  mainWindow.loadFile("src/desktop/main_menu.html");
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
	if (nconf.get('drun') === true){
		logger.debug(`${nconf.get('drun')}`)
	}
  	createWindow();
  	app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
	app.on('will-quit', () => {
		if (process.platform !== 'darwin') app.quit();
	});
});


app.on('quit', () => {
	saveJSON()
});

ipcMain.on('server',(event,message) => {
	if (message === true){
		var serverstate = true
		runserver();
		return serverstate
	}
	if (message === false){
		var serverstate = true
		app2.close()
	}
	if (message === 'serverState'){
		if (serverstate === null){
			var serverstate = false
		}
		event.sender.send = serverstate
		console.log(`sent serverstate | ${serverstate}`)
	}
})
//WebSocket
serverState = false

wsServer.on('connection', socket => {
	socket.on('message', message => {
		let nmessage = Number(message)
		//converts object to number and checks the number
		if (nmessage <= 10){
			exec(nconf.get(`files:${message}`))
			logger.log(`running ` + nconf.get(`files:${message}`))
		}else{
			if (message == "serverState5"){
				socket.send(serverState.toString())
				logger.debug(serverState)
				switch (serverState){
					case true:
						serverState = false;
						logger.log('Server Shuting Down');
						web.close(() => {
							logger.warn('Server Closed')
						})
						break;
					case false:
				 		serverState = true
				 		logger.log('server is starting')
						web = app2.listen(port, () => {	if (debug == true){		logger.debug("Server Port:"+ port,"");	}});
						 break;
					case undefined:
						serverState = true
						logger.log('server is starting')
				}		
			}
		}
	})
  })





  
  const server = app2.listen(65525);
  server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, socket => {
	  wsServer.emit('connection', socket, request)
	})
  })










/*
   init
*/

nconf.use('file', { file: 'src/desktop/config.json'});
nconf.load();



var saveJSON = () => {
	logger.log("Saving JSON File")
	try{nconf.save()
	}catch (error){logger.error(error)}
	logger.log("Saved JSON")
}


function errorCheck(error, errorValue,clear) {
	try{
	if (clear == true){logger.clear();}
	logger.error("====Error====");
	logger.error(error);
	logger.error("error value = " + errorValue);
	logger.error("stack trace");
	console.trace();
	}catch{
		console.log("\u001b[31m" + "ErrorCheck Has Crashed")
		console.error("Error Code 90")
	}
}


function _() {
	this.readJSON = function(path) {
		return JSON.parse(fs.readFileSync(path).toString());
	}
	this.writeJSON = function(path,data){
		logger.log(data)
		logger.log(JSON.stringify(data));
		fs.writeFileSync(path, JSON.stringify(data));
		logger.log(JSON.parse(path))
		return JSON.stringify(data);
	}

	return this;
}






	//=====================================
	// var thing = parser.getINI(__dirname + "/config.ini");
	var port = nconf.get('port:0')
	var debug = nconf.get('debug')
	




	//WebServer======

	try {
		app2.use(express.static(__dirname +"/src/website"));

		app2.get('/', (req, res) => {
			res.sendFile(__dirname + "/src/website/index.html");
			logger.log("Sent File To Client");
		})


	} catch (err){
		logger.error(err)
	}

