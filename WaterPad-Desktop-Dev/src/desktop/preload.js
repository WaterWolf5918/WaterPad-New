var nconf = require('nconf');
nconf.use('file', { file: './config.json' });
nconf.load();

console.log(__dirname)






window.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('path_text');
  if (element) {
    element.innerText = (__dirname)
  }
});