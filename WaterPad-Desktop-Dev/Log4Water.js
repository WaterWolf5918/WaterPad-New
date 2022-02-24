
var fs = require('fs');
var Red = "\u001b[31m";
var Green = "\u001b[32m";
var Yellow = "\u001b[33m";
var Blue = "\u001b[38;5;27m";
var Gray = "\u001b[38;5;250m";
var darkGray = "\u001b[30;1m";
var Reset = "\u001b[0m";
var date = new Date();
var sec = date.getSeconds();
var mins = date.getMinutes();
var hours = date.getHours();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDay();
var file = `${month}-${day}-${year}  ${hours}-${mins}-${sec}`;
var stream = fs.createWriteStream(`./logs/${file}.log`);
var time = `[${hours}:${mins}:${sec}]${darkGray}|${Reset}`;
var time2 = `[${hours}:${mins}:${sec}]`;
month = month + 1
if (mins < 10){mins = '0' + mins}
exports.start = () => {
	try { if (!fs.existsSync("./logs")) { fs.mkdirSync("./logs"); } } catch (err) { console.error(err); }
	fs.writeFileSync(`./logs/${file}.log`, " ");
}
/**@param {string} logText The Text To Log*/
exports.log = async function (logText){console.log(`${Blue}${time}${Blue}[Info]> ${Gray}${logText}`)};
// stream.write(`${time2}[Info]>${logText}\n`,'utf-8')};
/**@param {string} logText The Text To Log*/
exports.warn = async function (logText){console.log(`${Yellow}${time}${Yellow}[Warn]> ${Gray}${logText}`)};
// stream.write(`${time2}[Warn]>${logText}\n`,'utf-8')};
/**@param {string} logText The Text To Log*/
exports.error = async function (logText){console.log(`${Red}${time}${Red}[Error]> ${Gray}${logText}`)};
// stream.write(`${time2}[Error]>${logText}\n`,'utf-8')};
/**@param {string} logText The Text To Log*/
exports.debug = async function (logText){console.log(`${Green}${time}${Green}[Debug]> ${Gray}${logText}`)};
// stream.write(`${time2}[Debug]>${logText}\n`,'utf-8')};
/*** @description Clears the screen using the ANSI-Escape Code* @returns {void} nothing*/
exports.clear = async function() {console.log("\x1Bc");}
stream.end();

