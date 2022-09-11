import * as path from "path";
import { Configuration } from "webpack";

const rootPath = path.resolve(__dirname, "..");
const isDevelopment = process.env.NODE_ENV === 'development';

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: path.resolve(rootPath, "public", "electron.ts"),
  target: "electron-main",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
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
