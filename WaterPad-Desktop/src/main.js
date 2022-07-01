// Imports \\
import * as electron from "electron";
import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from 'node:url';

// Imports \\


// Variables \\
const port = 4000;
const debug = true;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
})
// Socket.io \\


// After Init\\
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})

console.log(server);
console.log(__dirname)
console.log()
