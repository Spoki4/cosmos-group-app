const {format} = require('url');
const electron = require('electron');
const isDev = require('electron-is-dev');
const {resolve} = require('app-root-path');

const {BrowserWindow, app} = electron;

app.on('ready', async () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width: width * 0.9,
    height: height * 0.9,
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools({mode: 'bottom'});
    }
  });

  const devPath = 'http://localhost:1124';
  const prodPath = format({
    pathname: resolve('app/renderer/.parcel/production/index.html'),
    protocol: 'file:',
    slashes: true
  });
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on('window-all-closed', app.quit);
