
const OBSWebSocket = require('obs-websocket-js').default;

const obs = new OBSWebSocket();

module.exports = {
	name: 'sceneSwitch',
	obs: true,
	cb: (args, callback) => {
		obs.connect().then(() => {
			obs.send('SetCurrentScene', {
				"scene-name": args[0]
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