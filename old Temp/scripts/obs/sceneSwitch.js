const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

module.exports = {
	name: 'sceneSwitch',
	cb: (scene, callback) => {
		obs.connect().then(() => {
			obs.send('SetCurrentScene', {
				"scene-name": scene
			})
			.then((data) => {
				callback(data);
			})
			.catch((err) => {
				callback(err);
			})
			obs.disconnect();
		});
	}
}