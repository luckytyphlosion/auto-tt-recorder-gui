const electronInstaller = require("electron-winstaller");
const packageJson = require("../package.json");
const AUTO_TT_RECORDER_GUI_VERSION = packageJson.version;
const AUTO_TT_RECORDER_GUI_PREFIX = `auto-tt-recorder-gui-v${AUTO_TT_RECORDER_GUI_VERSION}`;

async function main() {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: `${AUTO_TT_RECORDER_GUI_PREFIX}-win32-x64`,
      outputDirectory: "installers",
      authors: "luckytyphlosion",
      exe: `auto-tt-recorder-gui.exe`,
      setupExe: `${AUTO_TT_RECORDER_GUI_PREFIX}-setup.exe`,
      noMsi: true
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}

main().then();
