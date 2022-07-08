// Imports \\
const electron = require('electron')
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")
const { fstat } = require('fs')
const { Log4Water,colors } = require(path.join(__dirname,"imports/Log4Water.js"))
const fs = require('fs')
const nconf = require('nconf')
nconf.use('file', { file: `${path.join(__dirname,'../','settings.json')}` });
// Imports \\


// Variables \\
let basicSettings = require('../settings.json')



setInterval(() => {
	nconf.load()
	console.debug(`${nconf.get('blocks')} | ${blocksStart}`)
	if(nconf.get('blocks') !== blocksStart){
		console.log('blocks changed')
	}
}, 1000);



const blocksStart = nconf.get('blocks')		
const port = basicSettings.port;
const debug = basicSettings.debug;
//--------------------\\

const logger = new Log4Water('test')
const webserver = express();
const server = http.Server(webserver);
const io = new Server(server,{  cors: {origin: "*",methods: "*"}});
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
		socket.emit('blocks',basicSettings.blocks)
		console.log('[Socket-Event] blocks handled')
	});

	socket.on('checkImage', (image) => {
		const actualPath = path.join(__dirname,`WebApp/image/image-${image}.png`)
		if (fs.existsSync(actualPath)){
			socket.emit('ImageGood',image)
			console.log(`${actualPath} : True`)
		}else{
			socket.emit('ImageBad',image)
			console.log(`${actualPath} : False`)
		}
	});
})






// Socket.io \\


// After Init\\
server.listen(basicSettings.port, () => {
	console.log(`Server listening on port ${port}`);
})


