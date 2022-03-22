var hostname = self.location.hostname
var ip = "ws://" + hostname +":65525"
import * as socketIO from './socket.io.js';

const socket = io('ws://localhost:65525');


function apple(button) {
	socket.on('connect',() =>{
		socket.send(button)
})}