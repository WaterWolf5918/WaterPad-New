const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

module.exports = {
	name: 'startRecording',
	obs: true,
	cb: (callback) => {
		obs.connect().then(() => {
			obs.send('StartRecording')
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				callback(err);
			})
			obs.disconnect();
		})
	}
};

