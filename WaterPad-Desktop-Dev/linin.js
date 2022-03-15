const logger = require('./Log4Water');
const nconf = require('nconf')

/**
 * @param {string} error The name of the error (ex. `CannotEnableServer`)
 * @param {number} errorCode The error code of the error (ex. `90`)
 * @param {boolean} clear Clears the screen with true does nothing with false
 */
function outputError(error, errorCode, clear) {
	if(clear) { logger.clear(); }
	logger.error("==== Error ====");
	logger.error(error);
	logger.error("Error Code: " + errorCode);
	logger.error("Stack Trace:");
	logger.error(getStackTrace());
}

function getStackTrace() {
    let obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
};
function saveJSON(){
    logger.log("Saving JSON File")
	try{
		nconf.save()
		logger.log("Saved JSON")
	}catch (error){
		outputError('CannotSaveJSON', 85, false);
	}
}

module.exports = {
    outputError,
    getStackTrace,
    saveJSON
}