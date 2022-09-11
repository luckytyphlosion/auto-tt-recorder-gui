import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

const rootPath = path.resolve(__dirname, "..");

const isDevelopment = process.env.NODE_ENV === 'development';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: path.resolve(rootPath, "src", "index.js"),
  target: "web",
  devtool: "source-map",
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(rootPath, "src"),
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  devServer: {
    host: 'localhost',
    hot: true,
    compress: true,
    port: process.env.PORT || 3000,
    headers: { 'Access-Control-Allow-Origin': '*' },
    static: {
      directory: path.resolve(rootPath, "dist/renderer"),
      publicPath: '/'
    },
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(rootPath, "dist/renderer"),
    filename: "js/[name].js",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(rootPath, "index.html") }),
  ],
};

export default config;