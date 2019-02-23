'use strict';

/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const DiscordRPC = require('discord-rpc');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: true,
    titleBarStyle: 'hidden',
    frame: false,
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'connection.html'),
    protocol: 'file:',
    slashes: true,
  }));

  exports.openWindow = (filename) => {
    let win = new BrowserWindow({
      width: 500,
      height: 400,
      resizable: true,
      titleBarStyle: 'hidden',
      frame: false,
    });
    win.loadURL(`file://${__dirname}/`+ filename +`.html`);

  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//const clientId = '384424063491244033';
//DiscordRPC.register(clientId);


const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

const {ipcMain} = require('electron');

ipcMain.on('id', (event, value) => {
  const clientId = value;
  DiscordRPC.register(clientId);
  console.log("Connecté avec l'ID " + clientId);
  rpc.login({ clientId }).catch(console.error);

});


async function setActivity(value) {
  
  var texte1 = value.split("&&&")[0];
  var texte2 = value.split("&&&")[1];
  var bimgid = value.split("&&&")[2];
  var bimgte = value.split("&&&")[3];
  var simgid = value.split("&&&")[4];
  var simgte = value.split("&&&")[5];
  console.log('RPC updated');
    rpc.setActivity({
      details: texte1,
      state: texte2,
      startTimestamp,
      largeImageKey: bimgid,
      largeImageText: bimgte,
      smallImageKey: simgid,
      smallImageText: simgte,
      instance: false,
    });
};


// receive message from index.html
  ipcMain.on('value', (event, value) => {
    console.log("message reçu " + value);
    //event.sender.send('asynchronous-reply', 'hello' );
    setActivity(value);

  });
