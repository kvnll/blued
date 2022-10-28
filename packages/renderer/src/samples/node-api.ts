// import { lstat } from "fs/promises"
const lstat = require("fs").promises
import { cwd } from "process"
import { ipcRenderer } from "electron"

// Usage of ipcRenderer.on
ipcRenderer.on("main-process-message", (_event, ...args) => {
  console.log("[Receive Main-process message]:", ...args)
})

lstat(cwd())
  .then((stats: any) => {
    console.log("[fs.lstat]", stats)
  })
  .catch((err: any) => {
    console.error(err)
  })
