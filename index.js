const { app, BrowserWindow } = require('electron')
const ipc = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true // <---  for web workers
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
   })

  win.on('close',(event) =>{
      win.webContents.send('app-close');
      event.preventDefault()
  });
}
ipc.on('closed', (result, arg) => {
    if (arg == true)
    {
        var choice = require('electron').dialog.showMessageBoxSync(win,
        options = {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'You have unsaved changes in your file.\n\nAre you sure you want exit before saving?'
      });
      if(choice == 0){
        win = null;
        app.quit()
      }
    }
    else{
      win = null;
      app.quit()
    }
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.