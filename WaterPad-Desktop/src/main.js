// Imports \\
const electron = require('electron')
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const path = require("path")
const { fstat } = require('fs')
const { Log4Water,colors } = require(path.join(__dirname,"imports/Log4Water.js"))
const fs = require('fs')
const config2 = require('./config.json')
// Imports \\


// Variables \\
const config = {
	"port": 4000,
	"debug": true,
	"blocks": 100
}


const port = config.port;
const debug = config.debug;
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
		socket.emit('blocks',config.blocks)
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
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})
if (config2.usersettings.file9){
	console.log(true)
}else{console.log(false)}
console.log(__dirname)

