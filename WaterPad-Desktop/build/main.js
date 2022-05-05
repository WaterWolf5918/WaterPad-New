// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Logger } = require('./imports/LoggerLib');
const logger = new Logger(true);
const parser = require("./imports/ParserLib")
const { exit } = require('process');
const express = require('express')
const app2 = express()
const ws = require('ws');
const wsServer = new ws.Server({ noServer: true })
const { exec } = require('child_process');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 240,
    webPreferences: {
      preload: path.join(__dirname, 'desktop/js/preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('desktop/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})






app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


	//=====================================
	let thing = parser.getINI("config.ini")
	let port = parser.findINI(thing,"port")
	// let debug = true
	let debug = parser.findINI(thing,"DEBUG")
	let test = parser.findINI(thing,"test")
	let dir_ = (__filename)
	//=====================================


	//=====================================
	let file_1 = parser.findINI(thing,"file-1")
	let file_2 = parser.findINI(thing,"file-2")
	let file_3 = parser.findINI(thing,"file-3")
	let file_4 = parser.findINI(thing,"file-4")
	let file_5 = parser.findINI(thing,"file-5")
	let file_6 = parser.findINI(thing,"file-6")
	let file_7 = parser.findINI(thing,"file-7")
	let file_8 = parser.findINI(thing,"file-8")
	let file_9 = parser.findINI(thing,"file-9")
	let file_10 = parser.findINI(thing,"file-10")

	// let file_full1 = "" + file_1 + " " + file_2 + " " + file_3 + " " + file_4 + " " + file_5 + " "
	// let file_full2 = "" + file_6 + " " + file_7 + " " + file_8 + " " + file_9 + " " + file_10 + " "
	// if (debug == 1){
	// 	logger.debug("File_Path-1:File_Path-2:File_Path-3:File_Path-4:File_Path-5",file_full1)
	// 	logger.debug("File_Path-6:File_Path-7:File_Path-8:File_Path-9:File_Path-10",file_full2)
	// }
	// make this a aray later



	//WebServer======
	app2.use('/website', express.static(__dirname + '/website'))
	app2.get('/', (req, res) => {
	  res.sendFile(__dirname + '/website/index.html')
	  logger.log("Sent File To Client")
	})

	if (debug == 1){
		logger.debug("Server Port:"+ port,"")
	}
	//WebServer======




	//WebSocket
	wsServer.on('connection', socket => {
	  socket.on('message', message => {
		const block = message
		if (debug == 1){
			logger.debug("block picked up",block)
		}
		if (block == 1){
			logger.log("button " + block + " was pressed")
			exec(file_1)
		}
		else if (block == 2){
			logger.log("button " + block + " was pressed")
			exec(file_2)
		}
		else if (block == 3){
			logger.log("button " + block + " was pressed")
			exec(file_3)
		}
		else if (block == 4){
			logger.log("button " + block + " was pressed")
			exec(file_4)
		}
		else if (block == 5){
			logger.log("button " + block + " was pressed")
			exec(file_5)
		}
		else if (block == 6){
			logger.log("button " + block + " was pressed")
			exec(file_6)
		}
		else if (block == 7){
			logger.log("button " + block + " was pressed")
			exec(file_7)
		}
		else if (block == 8){
			logger.log("button " + block + " was pressed")
			exec(file_8)
		}
		else if (block == 9){
			logger.log("button " + block + " was pressed")
			exec(file_9)
		}
		else if (block == 10){
			logger.log("button " + block + " was pressed")
			exec(file_10)
		}



	  })
	})

	const server = app2.listen(3000);
	server.on('upgrade', (request, socket, head) => {
	  wsServer.handleUpgrade(request, socket, head, socket => {
		wsServer.emit('connection', socket, request)
	  })
	})

	app2.listen(5000);

// main()

// while (true){
// 	if (block == 1){
// 		logger.log("button " + block + "was pressed")
// 	}
// }
