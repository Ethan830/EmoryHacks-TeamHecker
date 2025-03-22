const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        include: path.join(__dirname, "src"),
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "./assets/[name]__[hash].[ext]",
        },
      },
      {
        test: /^(?!.*\.inline\.svg$).*\.svg$/,
        include: path.join(__dirname, "src"),
        use: [
          "@svgr/webpack",
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "./assets/[name]__[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.inline.svg$/,
        include: path.join(__dirname, "src"),
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [{ cleanupIDs: false }, { removeViewBox: false }],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "manifest.json", to: "../manifest.json" }],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "React extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
