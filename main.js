const path = require('path')
const { app, BrowserWindow, Tray, Menu } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 48,
    webPreferences: {
      nodeIntegration: true,
    },
    frame: false,
    alwaysOnTop: true,
    resizable: false,
  })

  win.setVisibleOnAllWorkspaces(true)

  win.loadFile('index.html')

  return win
}

let tray

function createTray(win) {
  const contextMenu = Menu.buildFromTemplate([
    { role: 'quit', accelerator: 'Command+Q' },
  ])

  tray = new Tray(path.join(__dirname, './images/IconTemplate.png'))
  tray.setIgnoreDoubleClickEvents(true)
  tray.on('click', () => (win.isVisible() ? win.hide() : win.show()))
  tray.on('right-click', () => tray.popUpContextMenu(contextMenu))
}

app.whenReady().then(() => {
  const win = createWindow()

  createTray(win)

  app.dock.hide()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
