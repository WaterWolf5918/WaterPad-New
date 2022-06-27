const fs = require('fs');
const totalscripts = 0 // Bruh this is a const... but it changes :facepalm:

// fs.readdirSync(`./obsScripts`).forEach((file) => {
// 	scripts.push(file)
// 	totalscripts++
// 	console.log(file)
// 	require(`./obsScripts/${file}`)
// });

class ScriptAPI {
	scripts = [];

	constructor(loc) {
		this.Loc = loc;
	}

	loadScripts() {
		this.scripts = [];
		//reads the {Loc} folder / scripts folder 
		fs.readdirSync(this.Loc).forEach(file => {
			var stat = fs.lstatSync(this.Loc + "\\" + file)
			if(!stat.isDirectory()){
				//if file is not a Directory it imports it
				this.scripts.push(require(this.Loc + '\\' + file))
			}else{
				//if its a directory it scans it
				fs.readdirSync(this.Loc + "\\" + file).forEach(file => {
					//imports file
					this.scripts.push(require(this.Loc + '\\' + 'obs' + '\\' + file))
				})
			}
		});
	}

	getScripts() {
		return this.scripts;
	}

	isScript(str) {
		for(let i=0;i<this.scripts.length;i++) {
			if(this.scripts[i].name == str) {
				return true;
			}
		}
		return false;
	}

	isOBSScript(str){
		for(let i=0;i<this.scripts.length;i++) {
			if(this.scripts[i].name == str) {
				if(this.scripts[i].obs){
					return true;
				}else{
					return false;
				}
			}
		}
		return false;	
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

module.exports = { ScriptAPI };