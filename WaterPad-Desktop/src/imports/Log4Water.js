const fs = require('fs');


class Log4Water{
	constructor(logDir){
		this.logDir = logDir;
		this.date = new Date();
		this.sec = this.date.getSeconds();
		this.mins = this.date.getMinutes();
		this.hours = this.date.getHours();
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth() + 1;
		this.day = this.date.getDate();
		this.file = `${this.hours}:${this.mins}:${this.sec}`;
		this.fullfile = `${this.month}/${this.day}/${this.year} : ${this.hours}:${this.mins}:${this.sec}`;
		this.filename = `${this.month}-${this.day}-${this.year}_${this.hours}-${this.mins}-${this.sec}`;
		this.colors = {
			red: "\u001b[31m",
			green: "\u001b[32m",
			// yellow: "\u001b[33m",
			blue: "\u001b[38;5;27m",
			gray: "\u001b[38;5;250m",
			darkGray: "\u001b[25;1m",
			yellow: "\u001b[33m",
			reset: "\u001b[0m"
		};
	}

/**
	@param {string} text - The text to be logged [Hello World] 
	@param {string} type - The type of log [socket.connect, socket.event, etc]
*/
	log(text,type){}
}

module.exports = { Log4Water };