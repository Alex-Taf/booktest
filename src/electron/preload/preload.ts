import { contextBridge } from "electron/renderer";
import { join } from "path";
import fs from "fs-extra";
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

contextBridge.exposeInMainWorld("api", {
  getAppPath: () => `${join(__dirname, '../../')}`,
  readBooksData: async () => {
    const books = fs.readJsonSync(join(__dirname, "../../data/books.json"));
    const items = books.items.map((book: any) => {
      return {
        id: book.id,
        title: book.title,
        desc: book.desc,
        link: book.link,
      };
    });
    console.log(books.items);
    return items;
  },
  writeBooksData: async (data: any) => {
    // data[data.length - 1].link = join(__dirname, `../../${data[data.length - 1].link}`)
    // // modified.link = join(__dirname, `../../${data[data.length - 1].link}`)
    // console.log(data)
    // // const serialized = JSON.stringify(data.splice(data.length - 1, 1, modified))
    fs.writeJson(`${join(__dirname, "../../data/books.json")}`, JSON.stringify(data), (err) => {
      if (err) return console.error(err);
      console.log("success!");
    });
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
