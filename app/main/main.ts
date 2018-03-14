const { format } = require("url");

const { BrowserWindow, app } = require("electron");
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  });

  const splash = new BrowserWindow({
    width: 508,
    height: 316,
    frame: false,
    transparebt: true,
    alwaysOnTop: true,
    resizable: false
  });

  splash.loadURL(
    format({
      pathname: resolve("app/splash/splash.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    splash.destroy();
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: "bottom" });
    }
  });

  const devPath = "http://localhost:1124";
  const prodPath = format({
    pathname: resolve("app/renderer/.parcel/production/index.html"),
    protocol: "file:",
    slashes: true
  });
  const url = isDev ? devPath : prodPath;

  mainWindow.setMenu(null);
  mainWindow.loadURL(url);
});

app.on("window-all-closed", app.quit);
