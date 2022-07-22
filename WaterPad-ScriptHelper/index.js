const path = require('path')
const {ScriptAPI} = require('./imports/ScriptAPI')
const scriptAPI = new ScriptAPI(path.join(__dirname,'imports/scripts'))
scriptAPI.loadScripts()
scriptAPI.runScriptFromName('test')