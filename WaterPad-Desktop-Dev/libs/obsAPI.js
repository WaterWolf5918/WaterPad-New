const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

function sceneSwitch(scene,callback) {
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
	})
}
function startRecording(callback) {
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

function StopRecording(callback){
	obs.connect().then(() => {
		obs.send('StopRecording')
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			callback(err);
		})
		obs.disconnect();
	})
}

function ToggleRecording(callback){
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


module.exports = {sceneSwitch,startRecording,ToggleRecording,StopRecording};