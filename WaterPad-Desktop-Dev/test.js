

// var fs = require('fs');
// var fileContents = fs.readFileSync('./config.json', 'utf8')

// function _() {
// 	this.readJSON = function(path) {
// 		return JSON.parse(fs.readFileSync(path));
// 	}

// 	return this;
// }

// console.log(_().readJSON('config.json').debug);


let fs = require('fs');
let nconf = require('nconf');
let prompt = require('prompt-sync')();

nconf.use('file', { file: './config.json' });
nconf.load();


nconf.save(function (err) {
	if (err) {
	  console.error(err.message);
	  return;
	}
	console.log('Configuration saved successfully.');
  });





