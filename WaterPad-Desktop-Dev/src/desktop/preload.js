const nconf = require('nconf');
nconf.use('file', { file: './config.json' });
nconf.load();

const { contextBridge, ipcRenderer } = require('electron')
var ipc = require('electron');

contextBridge.exposeInMainWorld(
	'API',
	{
		send: (point,text) => {
			let vc = ['server','Error']
			if (vc.includes(point)){
				ipcRenderer.send(point,text)
			}else{
				console.error("[IPC] Point may not be safe")
			}
		},
		receive: (point,func) => {
			let vc = ['server','Error']
			if (vc.includes(point)){
				ipcRenderer.on(point,(event,arg) => func(arg))
				console.debug(arg)
				return func
			}else{
				console.error("[IPC] Point may not be safe")
			}
		},
		nconf:nconf, 
		getv: () =>{
			return process.env.npm_package_version
			
		},
	}
)



console.log(__dirname)


window.addEventListener('DOMContentLoaded', () => {
  var element = document.getElementById('WaterPad-Text');
  if (element) {
    element.innerText = (`WaterPad - ${process.env.npm_package_version}`)
  }
});

//   const button_2 = document.getElementById("button-2")
// 	button_2.addEventListener(onclick, () => {
// 		console.log("user clicked server start")
// 	})

// });