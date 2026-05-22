const path = require('node:path');
const { app, BrowserWindow, ipcMain, Notification, shell } = require('electron');

const iconPath = path.join(__dirname, '..', 'Logo.png');
const ZOOM_STEP = 0.1;
const MIN_ZOOM_FACTOR = 0.6;
const MAX_ZOOM_FACTOR = 2.4;

const isZoomInShortcut = (input) => {
  return input.key === '+'
    || input.key === '='
    || input.key === 'Add'
    || input.code === 'NumpadAdd'
    || (input.code === 'Equal' && input.shift);
};

const isZoomOutShortcut = (input) => {
  return input.key === '-'
    || input.key === '_'
    || input.key === 'Subtract'
    || input.code === 'Minus'
    || input.code === 'NumpadSubtract';
};

const updateZoomFactor = (contents, delta) => {
  const nextZoomFactor = Math.min(
    MAX_ZOOM_FACTOR,
    Math.max(MIN_ZOOM_FACTOR, contents.getZoomFactor() + delta)
  );

  contents.setZoomFactor(nextZoomFactor);
};

const registerZoomShortcuts = (window) => {
  window.webContents.on('before-input-event', (event, input) => {
    const isZoomShortcutModifier = (input.control || input.meta) && !input.alt;

    if (!isZoomShortcutModifier) {
      return;
    }

    if (isZoomInShortcut(input)) {
      event.preventDefault();
      updateZoomFactor(window.webContents, ZOOM_STEP);
      return;
    }

    if (isZoomOutShortcut(input)) {
      event.preventDefault();
      updateZoomFactor(window.webContents, -ZOOM_STEP);
      return;
    }

    if (input.key === '0' || input.code === 'Digit0' || input.code === 'Numpad0') {
      event.preventDefault();
      window.webContents.setZoomFactor(1);
    }
  });
};

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
  registerZoomShortcuts(mainWindow);

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