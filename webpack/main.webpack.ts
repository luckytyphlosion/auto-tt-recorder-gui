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
    main: path.resolve(rootPath, "public", "electron.ts"),
    preload: path.resolve(rootPath, "public", "preload.js")
  },
  target: "electron-main",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [
          /node_modules/,
          /auto-tt-recorder-gui-v[^-]+-win32-x64/,
        ],
        include: [
          path.resolve(rootPath, "./src/shared"),
          /public/
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
    path: path.resolve(rootPath, "dist"),
    filename: "[name].js",
  },
  optimization: {
    minimize: false,
  },
};

export default config;
