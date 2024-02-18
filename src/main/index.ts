import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import * as fs from 'node:fs'
import { readFile as prmsReadFile } from 'node:fs/promises'
// import { Buffer } from 'node:buffer'

console.log('__dirname:', __dirname)
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  console.log('preload:', join(__dirname, '../preload/index.js'))

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    const size = {
      width: 900,
      height: 670
    }
    mainWindow.webContents.send('main to render', JSON.stringify(size))
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.handle('ping-ping', () => 'pong-pong')
  // ipcMain.handle('app-mounted', () => 'app.mounted: pong-pong')
  ipcMain.handle('app-mounted', async () => {
    const result = 'ipcMain.handle-app-mounted' //await doSomeWork(someArgument)
    return result
  })

  ipcMain.handle('app-init', async () => {
    const result = 'ipcMain.handle: app-init' //await doSomeWork(someArgument)
    return result
  })

  ipcMain.handle('all_codes', async () => {
    const content = await prmsReadFile('F:\\build\\public\\f10\\codes.json')
    //console.log('content:', content.toString('utf8'))
    return content.toString('utf8')
    // await fs.readFile('F:\\build\\public\\f10\\codes.json', (err, data) => {
    //   if (err) throw err
    //   rslt = data.toString()
    //   console.log('rslt:', rslt)
    // })
    // return rslt
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // let iCounter = 0
  // setInterval(() => {
  //   iCounter++
  //   console.log(`hello[${iCounter}]`)
  //   if(win && win.webContents){
  //     console.log('webContents.send')
  //     win.webContents.send('main-to-render',iCounter);
  //   }
  // }, 1000, '2000ms')
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
