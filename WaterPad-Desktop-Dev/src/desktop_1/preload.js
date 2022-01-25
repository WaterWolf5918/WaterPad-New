var nconf = require('nconf');
nconf.use('file', { file: './config.json' });
nconf.load();

console.log(__dirname)



const {ipcRenderer} = require('electron')
let test = document.getElementById("button-1")





window.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('path_text');
  if (element) {
    element.innerText = (__dirname)
  }
  
});