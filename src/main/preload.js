
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  openFileDialog: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("open-file-dialog", fileFilters, lastFilename, dialogId),
  openFolderDialog: (lastFolderName, dialogId) => ipcRenderer.invoke("open-folder-dialog", lastFolderName, dialogId),
  openFileDialogAndRead: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("open-file-dialog-and-read", fileFilters, lastFilename, dialogId),
  saveFileDialog: (fileFilters, lastFilename, dialogId) => ipcRenderer.invoke("save-file-dialog", fileFilters, lastFilename, dialogId),
  saveFileDialogAndWriteText: (fileFilters, output, lastFilename, dialogId) => ipcRenderer.invoke("save-file-dialog-and-write-text", fileFilters, output, lastFilename, dialogId),
  overwriteTextFile: (outputFilename, output) => ipcRenderer.invoke("overwrite-text-file", outputFilename, output),
  // this is insecure as hell but making this secure would require every single constant and type from form/layout_components
  // separately from the component file
  ipcReadFileEnforceUTF8: (filename, badEncodingErrorMessage, expectedExtensionAndErrorMessage = undefined) => ipcRenderer.invoke("read-file-enforce-utf8", filename, badEncodingErrorMessage, expectedExtensionAndErrorMessage),
  getAbsolutePathRelativeToFilename: (pathname, filenameRelativeFrom) => ipcRenderer.invoke("get-absolute-path-relative-to-filename", pathname, filenameRelativeFrom),
  isFileReadable: (filename) => ipcRenderer.invoke("is-file-readable", filename),
  isFileWritable_alsoGetExtension: (filename, expectedExtension = undefined) => ipcRenderer.invoke("is-file-writable", filename, expectedExtension),
  spawnAutoTTRec: (templateFilename, autoTTRecArgs) => ipcRenderer.invoke("spawn-auto-tt-rec", templateFilename, autoTTRecArgs),
  waitAutoTTRec: () => ipcRenderer.invoke("wait-auto-tt-rec"),
  handleSendStdout: (callable) => ipcRenderer.on("send-stdout", callable),
  handleSendStderr: (callable) => ipcRenderer.on("send-stderr", callable),
  removeHandleSendStdout: (callable) => ipcRenderer.removeAllListeners("send-stdout"),
  removeHandleSendStderr: (callable) => ipcRenderer.removeAllListeners("send-stderr"),
  terminateAutoTTRec: () => ipcRenderer.invoke("terminate-auto-tt-rec"),
  getGlobalConfig: () => ipcRenderer.invoke("get-global-config"),
  importFormTemplate: (filename) => ipcRenderer.invoke("import-form-template", filename),
  convertAutoTTRecConfigToFormData: (autoTTRecConfig) => ipcRenderer.invoke("convert-auto-tt-rec-config-to-form-data", autoTTRecConfig),
  writeObjectToYAML: (yamlObj, filename) => ipcRenderer.invoke("write-object-to-yaml", yamlObj, filename),
  getLoadFormInputsType: () => ipcRenderer.invoke("get-load-form-inputs-type"),
  saveLoadFormInputsType: (loadFormInputsType) => ipcRenderer.invoke("save-load-form-inputs-type", loadFormInputsType),
  getLastRecordedTemplateFilename: () => ipcRenderer.invoke("get-last-recorded-template-filename"),
  getLastOpenedTemplateFilename: () => ipcRenderer.invoke("get-last-opened-template-filename"),
  getExpandUnselectedChoiceInputs: () => ipcRenderer.invoke("get-expand-unselected-choice-inputs"),
  setAndSaveExpandUnselectedChoiceInputs: (expandUnselectedChoiceInputs) => ipcRenderer.invoke("set-and-save-expand-unselected-choice-inputs", expandUnselectedChoiceInputs),
  getValidateFormOnOpen: () => ipcRenderer.invoke("get-validate-form-on-open"),
  setAndSaveValidateFormOnOpen: (validateFormOnOpen) => ipcRenderer.invoke("set-and-save-validate-form-on-open", validateFormOnOpen)
});
