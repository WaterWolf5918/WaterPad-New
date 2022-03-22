//@ts-check
const fs = require('fs');
let fileName = '';

const colors = {
	red: "\u001b[31m",
	green: "\u001b[32m",
	// yellow: "\u001b[33m",
	blue: "\u001b[38;5;27m",
	gray: "\u001b[38;5;250m",
	darkGray: "\u001b[25;1m",
	yellow: "\u001b[33;1m",
	reset: "\u001b[0m"
};

function getTime() {
	var date = new Date();
	var sec = date.getSeconds();
	var mins = date.getMinutes().toString().padStart(2, '0');
	var hours = date.getHours();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDay();

	var fileName = `${month}-${day}-${year} ${hours}-${mins}-${sec}`;
	var coloredTime = `${colors.darkGray}[${colors.gray}${hours}${colors.darkGray}:${colors.gray}${mins}${colors.darkGray}:${colors.gray}${sec}${colors.darkGray}]`;
	var fileTime = `[${hours}:${mins}:${sec}]`;

	return {
		date: date,
		sec: sec,
		mins: mins,
		hours: hours,
		year: year,
		month: month,
		day: day,
		coloredTime: coloredTime,
		fileTime: fileTime,
		fileName: fileName
	}
}

function start() {
	try {
		if(!fs.existsSync('./logs')) {
			fs.mkdirSync('./logs');
		}
	} catch(err) {
		console.error(err);
	}

	fs.writeFileSync(`./logs/${getTime().fileName}.log`, '');
	fileName = `${getTime().fileName}.log`;
}

function log(text) {
	console.log(`${colors.blue}${getTime().coloredTime} ${colors.blue}[INFO] ${colors.gray}${text}`);
	fs.appendFileSync('./logs/' + fileName, `${getTime().fileTime} [INFO] ${text}\n`);
}

function warn(text) {
	console.log(`${colors.blue}${getTime().coloredTime} ${colors.yellow}[WARN] ${colors.gray}${text}`);
	fs.appendFileSync('./logs/' + fileName, `${getTime().fileTime} [WARN] ${text}\n`);
}

function error(text) {
	console.log(`${colors.blue}${getTime().coloredTime} ${colors.red}[ERR] ${colors.gray}${text}`);
	fs.appendFileSync('./logs/' + fileName, `${getTime().fileTime} [ERR] ${text}\n`);
}

function debug(text) {
	console.log(`${colors.blue}${getTime().coloredTime} ${colors.green}[DEBUG] ${colors.gray}${text}`);
	fs.appendFileSync('./logs/' + fileName, `${getTime().fileTime} [DEBUG] ${text}\n`);
}

function clear() {
	console.clear();
	fs.appendFileSync('./logs/' + fileName, `${getTime().fileTime} [SYSTEM] Cleared the console.`);
}

module.exports = { start, log, warn, error, debug, clear };