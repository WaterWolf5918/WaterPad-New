/* OLD CODE THAT WE MIGHT NEED */

const express = require('express');
// const ws = require('ws');
// const webserver = express();
// const wsServer = new ws.Server({ noServer: true});

const server = webserver.listen(65525);
server.on('upgrade', (request, socket, head) => {
	wsServer.handleUpgrade(request, socket, head, socket => {
		wsServer.emit('connection', socket, request)
	})
})

logger.start();

//WebSocket



// *** WebServer *** \\

// Sends files to the client
webserver.use(express.static(__dirname +"/src/website"));

// This is so we don't have to use `localhost/index.html`, but instead `localhost/`
webserver.get('/', (req, res) => {
	res.sendFile(__dirname + "/src/website/index.html"); 
	logger.log("Sent File To Client");
})

// *** WebServer *** \\



//serverState = false

// packetManager.send('test');

// wsServer.on('connection', socket => {

// 	socket.on('message', message => {
// 		logger.log(message)
// 		let nmessage = Number(message)
// 		//converts object to number and checks the number
// 		if (nmessage <= 10){
// 			exec(nconf.get(`files:${message}`))
// 			logger.log(`running ` + nconf.get(`files:${message}`))
// 		}else{
// 			if (message == "serverState5"){
// 				socket.send(serverState.toString())
// 				logger.debug(serverState)
// 				switch (serverState){
// 					case true:
// 						serverState = false;
// 						logger.log('Server Shuting Down');
// 						web.close(() => {
// 							logger.warn('Server Closed')
// 						})
// 						break;
// 					case false:
// 				 		serverState = true
// 				 		logger.log('server is starting')
// 						web = webserver.listen(port, () => {	if (debug == true){		logger.debug("Server Port:"+ port,"");	}});
// 						break;
// 				}		
// 			}
// 		}
// 	})
// })