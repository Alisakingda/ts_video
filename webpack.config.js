const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // Set 'mode' option to 'development' or 'production'
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    port: 9000,
  },
  devtool: "inline-source-map",
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    environment: {
      arrowFunction: false // 关闭webpack的箭头函数，可选
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "chrome": "58",
                      "ie": "11"
                    },
                    "corejs": "3",
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          {
            loader: "ts-loader",
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: [
          path.resolve(__dirname, 'src/components')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              },
            }
          }
        ],
        include: [
          path.resolve(__dirname, 'src/components')
        ]
      },
      {
        test: /\.(eot|woff2|woff|ttf|svg)$/,
        use: 'file-loader'
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'TS project',
      template: 'index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    "extensions": [".ts", ".js", ".json"]
  }
}