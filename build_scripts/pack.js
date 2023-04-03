const packageJson = require("../package.json");
const electronPackager = require("electron-packager");
const path = require("path");

const AUTO_TT_RECORDER_GUI_VERSION = packageJson.version;

// electron-packager . \"auto-tt-recorder-gui-v0.2.1\" --ignore node_modules --ignore installers --ignore packages --ignore public --ignore src --ignore webpack --overwrite

async function main() {
  const options = {
    dir: path.resolve("."),
    name: `auto-tt-recorder-gui-v${AUTO_TT_RECORDER_GUI_VERSION}`,
    executableName: "auto-tt-recorder-gui",
    ignore: [
      "node_modules",
      "installers",
      "packages",
      "src",
      "webpack",
      ".gitignore",
      "DOCS_todo.txt",
      "README.md",
      "build_scripts",
      "tsconfig.json",
      /auto-tt-recorder-gui-v[0-9]\.[0-9]\.[0-9]-win32-x64/
    ],
    overwrite: true
  };

  const appPaths = await electronPackager(options);
  console.log(`Electron app bundles created:\n${appPaths.join("\n")}`);
}

main().then();
