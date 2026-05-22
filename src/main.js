const path = require('node:path');
const { app, BrowserWindow, ipcMain, Notification, shell } = require('electron');

const iconPath = path.join(__dirname, '..', 'Logo.png');

app.setPath('userData', path.join(app.getPath('appData'), 'StudyTimer'));
app.setPath('sessionData', path.join(app.getPath('userData'), 'session-data'));
app.commandLine.appendSwitch('disk-cache-dir', path.join(app.getPath('temp'), 'StudyTimer-cache'));
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1160,
    height: 780,
    minWidth: 760,
    minHeight: 540,
    backgroundColor: '#090d16',
    title: 'StudyTimer',
    frame: false,
    titleBarStyle: 'hidden',
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const sendWindowState = () => {
    mainWindow.webContents.send('window-state', {
      isMaximized: mainWindow.isMaximized()
    });
  };

  mainWindow.on('maximize', sendWindowState);
  mainWindow.on('unmaximize', sendWindowState);

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  mainWindow.webContents.once('did-finish-load', sendWindowState);
};

app.whenReady().then(() => {
  app.setName('StudyTimer');
  app.setAppUserModelId('com.floriroemer.studytimer');

  if (process.platform === 'darwin' && app.dock) {
    app.dock.setIcon(iconPath);
  }

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle('timer-complete', (_event, payload) => {
  const notification = new Notification({
    title: payload?.title || 'Timer finished',
    body: payload?.body || 'Your session is over.'
  });

  notification.show();
  shell.beep();
  return true;
});

ipcMain.handle('window:minimize', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

ipcMain.handle('window:toggle-maximize', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);

  if (!window) {
    return false;
  }

  if (window.isMaximized()) {
    window.unmaximize();
    return false;
  }

  window.maximize();
  return true;
});

ipcMain.handle('window:close', (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});