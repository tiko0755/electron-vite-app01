import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  hello: () => {
    console.log('preload.api.hello')
  },
  goodbye: () => {
    console.log('preload.api.goodbyd')
  },
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  pingping: () => electronAPI.ipcRenderer.invoke('ping-ping'),
  req: (channel, cb) => {
    electronAPI.ipcRenderer.invoke(channel).then((result) => {
      cb(result)
    })
  }
  // 除函数之外，我们也可以暴露变量
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
console.log('process.contextIsolated:', process.contextIsolated)
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
