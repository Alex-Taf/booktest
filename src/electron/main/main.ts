import { join } from "path";
import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs-extra";

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, "../preload/preload.js"),
    },
  });

  // and load the index.html of the app.
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000"); // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, "../../index.html"));
  }
  // mainWindow.loadURL( //this doesn't work on macOS in build and preview mode
  //     isDev ?
  //     'http://localhost:3000' :
  //     join(__dirname, '../../index.html')
  // );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ipcMain.handle("isDev", async (event, mess) => {
//   try {
//     return isDev;
//   } catch (error) {
//     return error;
//   }
// });

// ipcMain.on("get-app-path", async (event, mess) => {
//   try {
//     return {
//       path: `${join(__dirname, "/")}`,
//     };
//   } catch (error) {
//     return error;
//   }
// });

// ipcMain.handle("read-books-data", async (event, mess) => {
//   try {
//     const books = fs.readJsonSync(join(__dirname, "../../data/books.json"));
//     const items = books.map((book: any) => {
//       return {
//         id: book.id,
//         title: book.title,
//         desc: book.desc,
//         link: book.link,
//       };
//     });
//     console.log(books.items);
//     return items;
//   } catch (error) {
//     return error;
//   }
// });

// ipcMain.on("write-books-data", async (event, data) => {
//   try {
//     fs.writeJson(`${join(__dirname, "../../data/books.json")}`, data, (err) => {
//       if (err) return console.error(err);
//       console.log("success!");
//     });
//   } catch (error) {
//     return error;
//   }
// });

// ipcMain.on("save-local-file", async (event, data) => {
//   try {
//     fs.copy(
//       data.sourcePath,
//       join(__dirname, `../../books/${data.fileName}`),
//       (err: Error) => {
//         if (err) throw err;
//         console.log("Rename complete!");
//       }
//     );
//   } catch (error) {
//     return error;
//   }
// });
