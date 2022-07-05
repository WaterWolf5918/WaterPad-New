const OBSWebSocket = require('obs-websocket-js');
module.exports = {
	name: 'test',
	obs: false,
	cb: (callback) => {
		console.log('it works')
	}
}