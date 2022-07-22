const nconf = require('nconf');
const fs = require('fs');
const chalk = require('chalk');
// const { OBSLibrary } = require('./obsAPI.js');
const path = require('path');
// const obsLib = new OBSLibrary(path.join(__dirname, 'scripts'));
const { ScriptAPI } = require('./ScriptAPI.js');
const scriptLib = new ScriptAPI(path.join(__dirname, 'scripts'));
nconf.use('file', { file: `${path.join(__dirname,'../../','settings.json')}` });
class configManager {
	constructor(configFile) {
		this.configFile = configFile;
		this.config = nconf.get('config');
		this.chalk = chalk;
	}
	checkConfig() {
		if (fs.existsSync(this.configFile)) {
			console.log(this.chalk.green(`Config file found |${this.configFile}|`));
			nconf.use('file', { file: `${this.configFile}` });
			scriptLib.loadScripts();
			let temp_obs = scriptLib.scripts
			let obsactions = []
			let actions = []
			for(let i=0;i<temp_obs.length;i++){
				if(scriptLib.isOBSScript(temp_obs[i].name)){
					obsactions.push(temp_obs[i].name)
				}else{
					actions.push(temp_obs[i].name)
				}
			}
			console.log(obsactions)
			console.log(actions)
			nconf.set('obsactions',obsactions);
			nconf.set('actions',actions);
			nconf.save();
			return true;
		} else {
			this.createConfig(this.configFile);
			return false;
		}

	}
	createConfig(filename){
		let config = {
			"debug": false,
			"port": 4000,
			"blocks": 10,
			"obsactions":[],
			"actions": [],
			"appSettings": {}
		}
		scriptLib.loadScripts();
		let temp_obs = scriptLib.scripts
		for(let i=0;i<temp_obs.length;i++){
			if(scriptLib.isOBSScript(temp_obs[i].name)){
				config.obsactions.push(temp_obs[i].name)
			}else{
				config.actions.push(temp_obs[i].name)
			}
		}
		console.log(config)
		fs.writeFileSync(filename,JSON.stringify(config,null,2));
	}
}










/**
 * @param {string} error The name of the error (ex. `CannotEnableServer`)
 * @param {number} errorCode The error code of the error (ex. `90`)
 * @param {boolean} clear Clears the screen with true does nothing with false
 */
function outputError(error, errorCode, clear) {
	if(clear) { console.clear(); }
	console.error("==== Error ====");
	console.error(error);
	console.error("Error Code: " + errorCode);
	console.error("Stack Trace:");
	console.error(getStackTrace());
}

function getStackTrace() {
    let obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};

// function saveJSON(){
//     console.log("Saving JSON File","JSON")
// 	try{
// 		nconf.save()
// 		console.log("Saved JSON","JSON")
// 	}catch (error){
// 		outputError('CannotSaveJSON', 85, false);
// 	}
// }


function getIP() {
	const os = require('os');
	const networkInterfaces = os.networkInterfaces();
	let ip = '';

	if (os.platform() === 'win32') {
		ip = (networkInterfaces.Ethernet[1].address) ? networkInterfaces.Ethernet[1].address : networkInterfaces['Wi-Fi'][1].address;
	} else {
		//@TODO Add support for other operating systems
		ip = -1;
	}
	return ip;
}











module.exports = {
    outputError,
    getStackTrace,
	getIP,
	configManager
}