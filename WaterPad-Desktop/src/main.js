// Imports \\
const electron = require('electron')
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")
const { fstat } = require('fs')
const { Log4Water,colors } = require(path.join(__dirname,"imports/Log4Water.js"))
const linin = require(path.join(__dirname,"imports/linin.js"))
const { configManager } = require(path.join(__dirname,"imports/linin.js"))
const fs = require('fs')
const nconf = require('nconf')
const { spawn } = require('child_process');
const configM = new configManager(path.join(__dirname,'../','settings.json'),()=>{
	configM.checkConfig()
	// nconf.use('file', { file: `${path.join(__dirname,'../','settings.json')}` });
})
const { ScriptAPI } = require('./imports/ScriptAPI')












// Imports \\

// Variables \\
// let basicSettings = require('../settings.json')
let blocks = nconf.get('blocks')
let blocksStart = nconf.get('blocks')		

const port = nconf.get('port');
const debug = nconf.get('debug');
//--------------------\\

const logger = new Log4Water('test')
const webserver = express();
const server = http.Server(webserver);
const io = new Server(server,{ cors: {origin: "*",methods: "*"}});
const scriptAPI = new ScriptAPI(path.join(__dirname,'imports/scripts'))


// Variables \\


// Web Server \\ 
webserver.use(express.static(path.join(__dirname,"WebApp")));
webserver.get('/',(req, res) => {
	res.sendFile(path.join(__dirname,"WebApp"));
	logger.log("Sent file to client");
})
webserver.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	next();
});
// Web Server \\ 





// Socket.io \\
io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('blocks', (data) =>{
		console.log('[Socket-Event] blocks called')
		socket.emit('blocks',blocks)
		console.log('[Socket-Event] blocks handled')
	});
	socket.on('checkImage', (image) => {
		const actualPath = path.join(__dirname,`WebApp/image/image-${image}.png`)
		let badGood = {bad:[],good:[]}
		if (fs.existsSync(actualPath)){
			socket.emit('ImageGood',image)
		}else{
			socket.emit('ImageBad',image)
		}
	});

	setInterval(() => {
		//event loop called every 1 sec
		scriptAPI.loadScripts();
		nconf.load() //loads config
		blocks = nconf.get('blocks');
		if(nconf.get('blocks') !== blocksStart){
			console.log('blocks changed');
			socket.emit('webRefresh');console.log('[Socket] Sent Refresh Packet');
			socket.on('webRefresh',(data) =>{
				console.log(data)
				if (data == 'ok'){blocksStart = nconf.get('blocks');console.log('Refresh Packet [OK]')}
				else{socket.emit('webRefresh');console.log('[Socket] Sent Refresh Packet')}
			})
		}
	}, 1000);


	socket.on("buttonPress",(data) =>{
		console.log(`[buttonPress-Event] Event called with ${data}`)
		let button = nconf.get('buttons')[`button=${data}`]
		if(button['script-toggle'] == true){
			//code for button press with script
			console.log(`[buttonPress-Event] Button ${data} is script`)
			console.log(`[buttonPress-Event] script args: ${button['script-args']}`)
			console.log(`[buttonPress-Event] script: ${button['script']}`)
			scriptAPI.runScriptFromName(button['script'],button['script-args'])
			scriptAPI.getScriptByName(button['script'])
		}else{
			//code for button press without script
			console.log(`[buttonPress-Event] Button ${data} is not script`)
			spawn(`${button['filepath']}`,{detached: true,})
			console.log(`[buttonPress-Event] Spawned New Process ${button['filepath']}`)
		}

	})
})

// Socket.io \\


// After Init\\
server.listen(port, () => {
	console.log(`Server listening on http://${linin.getIP()}:${port}`);
})

configM.checkConfig()

