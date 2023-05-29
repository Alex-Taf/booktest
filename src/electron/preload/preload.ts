import { contextBridge } from "electron/renderer";
import { join } from "path";
import fs from "fs-extra";

const isDev = process.env.npm_lifecycle_event === "app:dev" ? true : false;

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

contextBridge.exposeInMainWorld("require", require);

contextBridge.exposeInMainWorld("api", {
  getAppPath: () => isDev ? 'http://localhost:3000' : `${join(__dirname, '../../')}`,
  deleteLocalFile: async (dir: string) => {
    fs.removeSync(dir)
  },
  saveLocalFile: async (data: any) => {
    fs.copy(
      data.sourcePath,
      join(__dirname, `../../books/${data.fileName}`),
      (err: Error) => {
        if (err) throw err;
        console.log("Rename complete!");
      }
    );
  }
})
