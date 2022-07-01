function split(string) {
    if (!string.includes('\r\n')) {
        return string.split('\n');
    } else {
        return string.split('\r\n');
    }
}

function getINI(iniFile) {
    let fs = require('fs');

    let ini = [];
    let rini = fs.readFileSync(iniFile).toString();
    rini = split(rini);

    // Make the Settings arrays etc. [START, 0]
    for (let i = 0; i < rini.length; i++) {
        if(rini[i][0] == '#' || rini[i] == '') {
            continue;
        } else {
            // This if statement is for if the comment is in a line
            if(rini[i].includes('#')) {
                let tokens = '';

                // Loop
                for(let x = 0; x < rini[i].length; x++) {
                    if(rini[i][x] == '#') {
                        break;
                    } else {
                        if(rini[i][x] == ' ') {
                            continue;
                        } else {
                            tokens += rini[i][x];
                        }
                    }
                };

                // Split it and push it
                ini.push(tokens.split('='));

            } else {
                ini.push(rini[i].split('='));
            }
        }
    };
    
    return ini;
}

/**
 * @param {String[][]} iniFile The setting array to find it
 * @param {String} iniToken The token to find
 * @returns The value of the token, and if it doesn't exist, it returns -1
 */
 function findINI(iniFile, iniToken) {
    let tok = iniToken.toLowerCase();

    for (let i = 0; i < iniFile.length; i++) {
        if (iniFile[i][0].toLowerCase() == tok) return iniFile[i][1];
    }

    return -1;
};

let TYPES = {BOOL: 'boolean', NUM: 'num', NULL: 'null', STRING: 'str'};

function getINILabelType(iniFile, iniToken) {
    let tok = '';

    for(let i = 0; i < iniFile.length; i++) {
        if(iniFile[i][0] == iniToken) {
            tok = iniFile[i][1].toLowerCase();
            break;
        }
    }

    if(tok == 'true' || tok == 'false') {
        return TYPES.BOOL;
    } else if(!isNaN(parseInt(tok))) {
        return TYPES.NUM;
    } else if(tok == 'NULL') {
        return TYPES.NULL;
    } else {
        return TYPES.STRING;
    }
};

/**
 * 
 * @param {string[][]} jsonData The json data to be turned into a string.
 * @returns A string that can be written to a file and read back again
 */
 function turnParsedINIToFile(jsonData) {
    let finished = "";
    
    for(let i = 0; i < jsonData.length; i++) {
        finished += `${jsonData[i][0]}=${jsonData[i][1]}\n`;
    }

    return finished;
}

/**
 * 
 * @param {string} pathto The path to the file
 * @param {string} token The token that will be created (if not already created, it will change it)
 * @param {*} value The value to set the entry to
 */
function setINI(pathto, token, value) {
    let fs = require('fs');
    let tok = token.toLowerCase();
    let tempSettings = getINI(pathto);

    for(let i = 0; i < tempSettings.length; i++) {
        if(tempSettings[i][0].toLowerCase() == tok) {
            tempSettings[i][1] = value;
            fs.writeFileSync(`${pathto}`, turnParsedINIToFile(tempSettings));
            break;
        }
    }

    // If the token doesn't exist:
    let file = turnParsedINIToFile(tempSettings);
    file += `${token.toUpperCase()}=${value}\n`;

    fs.writeFileSync(`${pathto}`, file);
}

module.exports = {getINI, findINI, setINI, turnParsedINIToFile, getINILabelType};