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



// var { Logger } = require('./src/imports/LoggerLib');
var parser = require("./src/imports/ParserLib");
var express = require('express');
var { exec } = require('child_process');
var os = require('os');
var fs = require('fs');
var { json } = require('express/lib/response');
var ws = require('ws');
var nconf = require('nconf');
// var logger = new Logger(true);
var app2 = express();
var wsServer = new ws.Server({ noServer: true });
var prompt = require('prompt-sync')();
var force_quit = false;
var logger = require("./Log4Water")
logger.start()





let { app, BrowserWindow } = require('electron');
const { stringify } = require('querystring');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
	width: 1280,
	height: 720,
	webPreferences: {
	  preload: __dirname + "/src/desktop_1/preload.js"
	}
  });

  mainWindow.loadFile("src/desktop_1/index.html");
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
	runserver();
  	createWindow();
  	app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
	app.on('will-quit', () => {
		if (process.platform !== 'darwin') app.quit();
	});
});


app.on('quit', () => {
	saveJSON()
});



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




function runserver() {
	//=====================================
	var thing = parser.getINI(__dirname + "/config.ini");
	var port = parser.findINI(thing,"port");
	var debug = parser.findINI(thing,"DEBUG");
	// logger.c433();
	


	//WebServer======
	try {
		app2.use(express.static(__dirname +"/src/website"));

		app2.get('/', (req, res) => {
			res.sendFile(__dirname + "/src/website/index.html");
			logger.log("Sent File To Client");
		})

		if (debug == true){
			logger.debug("Server Port:"+ port,"");
		}
	} catch (err){
		logger.error(err)
	}
	//WebServer======
  
  
  
  
	//WebSocket


	  wsServer.on('connection', socket => {
		socket.on('message', message => {
			logger.log(message)
				if (message==11) {
					logger.log(nconf.get('files:1'))
					socket.send(nconf.get('files:1'))
					wsServer.on("connection",socket => {
						socket.on('message', message1 => {
							logger.log(message1);	
							nconf.set("files:1",(message1))
							return;
						})
					})
					}

				else {
					try{
					exec(nconf.get('files' + message));
					logger.log(`Executed File #${message}!`);
					} catch (err){
						errorCheck("Somthing went wrong",err)
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
  
	  app2.listen(65535);
	};







