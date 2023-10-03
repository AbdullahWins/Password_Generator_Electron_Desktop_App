const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

app.on("ready", createWindow);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "./assets/icons/logo.jpg"),
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

function getRandomPassword() {
  const data = fs.readFileSync("./assets/json/passwords.json", "utf8");
  const passwords = JSON.parse(data);
  const randomIndex = Math.floor(Math.random() * passwords.length);
  return passwords[randomIndex];
}

const { ipcMain } = require("electron");
ipcMain.handle("getRandomPassword", (event) => {
  const randomPassword = getRandomPassword();
  return randomPassword;
});
