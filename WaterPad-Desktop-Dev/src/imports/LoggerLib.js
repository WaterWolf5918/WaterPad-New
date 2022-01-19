class Logger {
    /* Constants */
    RESET='\u001b[0m';
    CYAN='\u001b[36m';
    GRAY='\u001b[90m';
    GREEN='\u001b[32m';
    YELLOW='\u001b[33m';
    RED='\u001b[31m';
    MAGENTA='\u001b[35m';

    /**
     * @param {boolean} useDebug Allow for the debug function to output text.
     */
    constructor(useDebug) {
        this.useDebug = useDebug;
    }

    /**
     * @param {string} text The text to print
     */
    log(text) {
        console.log(`[${this.gray(this.getTime())} - ${this.gray('INFO')}] ${text}`);
    }

    /**
     * @param {string} text The text to print
     */
    warn(text) {
        console.log(`[${this.gray(this.getTime())} - ${this.yellow('WARN')}] ${text}`);
    }

    /**
     * @description Clears the screen using the ANSI-Escape Code
     * @returns {void} nothing
     */
	clear() {
		console.log("\x1Bc");
	}

    /**
     * @param {string} text The text to print
     */
    error(text) {
        console.log(`[${this.gray(this.getTime())} - ${this.red('ERROR')}] ${text}`);
    }

    /**
     * @param {string} current The label
     * @param {string} text The text to print
     * @param {boolean} newLine should there be a new line at the end of the message
     */
    debug(current, text, newLine=true) {
        if(!this.useDebug) return; // If the use debug is off, return (decreases in size)

        let cur = current.split(':');
        let fmessage = '';
        for(let i = 0; i < cur.length; i++) { fmessage += this.setColorByNumber(i, cur[i]); if(i != cur.length - 1) fmessage += this.yellow('::'); }
        process.stdout.write(`[${this.getTime()} - ${this.cyan('DEBUG')} - ${this.green(fmessage)}] ${text}`);
        if(newLine) process.stdout.write('\n');
    }

    getTime() {
        let d = new Date();

        var years = d.getFullYear();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;

        minutes = minutes < 10 ? '0'+minutes : minutes;
        
        return this.gray(`${hours}:${minutes} ${ampm}`);
    }


    /* Color Functions */
    /** @argument {string} t */ cyan(t) { return this.CYAN + t + this.RESET };
    /** @argument {string} t */ green(t) { return this.GREEN + t + this.RESET };
    /** @argument {string} t */ gray(t) { return this.GRAY + t + this.RESET };
    /** @argument {string} t */ yellow(t) { return this.YELLOW + t + this.RESET };
    /** @argument {string} t */ red(t) { return this.RED + t + this.RESET };
    /** @argument {string} t */ magenta(t) { return this.MAGENTA + t + this.RESET };

    /**
     * 
     * @param {number} num Number to be converted into a color
     * @param {string} text The text to be colored
     */
    setColorByNumber(num, text) {
        switch(num) {
            case 0:
                return this.green(text);
            case 1:
                return this.cyan(text);
            case 2:
                return this.gray(text)
            case 3:
                return this.red(text);
            case 4:
                return this.magenta(text);
        }
    }
}


module.exports = {Logger};