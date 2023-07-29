import * as path from "path";
import { Configuration } from "webpack";

const rootPath = path.resolve(__dirname, "..");
const isDevelopment = process.env.NODE_ENV === 'development';

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: {
    main: path.resolve(rootPath, "src/main/electron.ts"),
    preload: path.resolve(rootPath, "src/main/preload.js")
  },
  target: "electron-main",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [
          /node_modules/,
          /auto-tt-recorder-gui-v[^-]+-win32-x64/,
          /auto-tt-recorder_v[^-]+_for_gui/,
          path.resolve(rootPath, "./src/renderer")
        ],
        include: [
          path.resolve(rootPath, "./src/main"),
          path.resolve(rootPath, "./src/shared"),
        ],
        use: {
          loader: "ts-loader",
        },
      }
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(rootPath, "dist/main"),
    filename: "[name].js",
  },
  optimization: {
    minimize: false,
  },
};

export default config;
