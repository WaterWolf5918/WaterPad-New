const path = require('path')
const {ScriptAPI} = require('./imports/ScriptAPI')
const scriptAPI = new ScriptAPI(path.join(__dirname,'imports/scripts')).loadScripts()
scriptAPI.runScriptFromName('test')