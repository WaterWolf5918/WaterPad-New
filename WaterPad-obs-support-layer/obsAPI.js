const fs = require('fs');
const totalscripts = 0 // Bruh this is a const... but it changes :facepalm:

// fs.readdirSync(`./obsScripts`).forEach((file) => {
// 	scripts.push(file)
// 	totalscripts++
// 	console.log(file)
// 	require(`./obsScripts/${file}`)
// });

class OBSLibrary {
	scripts = [];

	constructor() {}

	loadScripts(loc='./scripts/obs') {
		this.scripts = [];

		fs.readdirSync(loc).forEach(file => {
			this.scripts.push(require(loc + '/' + file));
		});
	}

	getScripts() {
		return this.scripts;
	}

	getScriptByName(str) {
		for(let i=0;i<this.scripts.length;i++) {
			if(this.scripts.name == str) {
				return this.scripts[i].cb;
			}
		}
	}

	runScriptFromName(name, ...args) {
		for(let i=0;i<this.scripts.length;i++) {
			if(this.scripts[i].name == name) {
				return this.scripts[i].cb(...args);
			}
		}
	}
}

module.exports = { OBSLibrary };