const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studyTimerApi', {
  notifyTimerComplete(payload) {
    return ipcRenderer.invoke('timer-complete', payload);
  },
  minimizeWindow() {
    return ipcRenderer.invoke('window:minimize');
  },
  toggleMaximizeWindow() {
    return ipcRenderer.invoke('window:toggle-maximize');
  },
  closeWindow() {
    return ipcRenderer.invoke('window:close');
  },
  onWindowStateChange(listener) {
    const wrappedListener = (_event, value) => listener(value);
    ipcRenderer.on('window-state', wrappedListener);

    return () => {
      ipcRenderer.removeListener('window-state', wrappedListener);
    };
  }
});