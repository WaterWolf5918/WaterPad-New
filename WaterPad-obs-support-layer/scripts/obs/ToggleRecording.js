const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

module.exports = {
	name: 'ToggleRecording',
	cb: (callback) => {
		obs.connect().then(() => {
			obs.send('StartStopRecording')
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

