const OBSWebSocket = require('obs-websocket-js');
const obs = new OBSWebSocket();

function sceneSwitch(scene) {
	
}
// Declare some events to listen for.
obs.on('ConnectionOpened', () => {
  console.log('Connection Opened');

  // Send some requests.
  obs.sendCallback('GetSceneList', (err, data) => {
    console.log('Using callbacks:', err, data);
  });


});

obs.on('SwitchScenes', data => {
  console.log('SwitchScenes', data);
});



obs.connect();
