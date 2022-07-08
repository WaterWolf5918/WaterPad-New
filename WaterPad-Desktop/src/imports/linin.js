const nconf = require('nconf');
const fs = require('fs');
const chalk = require('chalk');
// const { OBSLibrary } = require('./obsAPI.js');
const path = require('path');
// const obsLib = new OBSLibrary(path.join(__dirname, 'scripts'));

// class configManager {
// 	constructor(configFile) {
// 		this.configFile = configFile;
// 		this.config = nconf.get('config');
// 		this.chalk = chalk;
// 	}
// 	checkConfig() {
// 		if (fs.existsSync(this.configFile)) {
// 			return true;
// 		} else {
// 			this.createConfig(this.configFile);
// 			return false;

// 		}

// 	}
// 	createConfig(filename){
// 		let config = {
// 			"debug": false,
// 			"port": 4000,
// 			"blocks": 100,
// 			"obsactions":[],
// 			"actions": [],
// 			"usersettings": {}
// 		}
// 		obsLib.loadScripts();
// 		let temp_obs = obsLib.scripts
// 		for(let i=0;i<temp_obs.length;i++){
// 			if(obsLib.isOBSScript(temp_obs[i].name)){
// 				config.obsactions.push(temp_obs[i].name)
// 			}else{
// 				config.actions.push(temp_obs[i].name)
// 			}
// 		}
// 		console.log(config)
// 	}
// }










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

function saveJSON(){
    console.log("Saving JSON File","JSON")
	try{
		nconf.save()
		console.log("Saved JSON","JSON")
	}catch (error){
		outputError('CannotSaveJSON', 85, false);
	}
}


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
    saveJSON,
	getIP,
	// configManager
}