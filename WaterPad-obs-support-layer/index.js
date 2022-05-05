// const OBSLib = require('./OBSLib');
const { OBSLibrary } = require('./obsAPI');
//OBSLib.ToggleRecording((data,err) => {console.log(data,err)})
var prompt = require('prompt-sync')();



const obs = new OBSLibrary();
// GOTTA GO :E
obs.loadScripts();
// obs.runScriptFromName('startRecording', (...args) => {
// 	console.log('startRecording', ...args)
// })


// var scene = prompt('Enter scene name: ');
// obs.runScriptFromName('sceneSwitch', scene, (...args) => {
// 	console.log('sceneSwitch', ...args)
// })

obs.runScriptFromName('ToggleRecording', (...args) => {
	console.log('ToggleRecording', ...args)
})


// obs.runScriptFromName('startRecording', (data,err) => {console.log(data,err)})
// obs.getScriptByName('startRecording')();
// obs.startRecording();
// const OBSWebSocket = require('obs-websocket-js');
// const obs = new OBSWebSocket();

// var prompt = require('prompt-sync')();
//  var scene = prompt('Enter scene name: ');
//  OBSLib.sceneSwitch(scene,(data,err) => {
//  	console.log(data,err);
//  })

// function sceneSwitch(scene,callback) {
// 	obs.connect().then(() => {
// 	obs.send('SetCurrentScene', {
// 		"scene-name": scene
// 	})
// 	.then((data) => {
// 		console.log(data);
// 		callback(data);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		callback(err);
// 	})
// 	})
// }

// // Declare some events to listen for.
// obs.on('ConnectionOpened', () => {
//   console.log('Connection Opened');
// });

// 	var scene = prompt('Enter scene name: ');
// 	sceneSwitch(scene,(data) => {
// 		console.log(data);
// 	})



// // obs.on('SwitchScenes', data => {
// //   console.log('SwitchScenes', data);
// // });



