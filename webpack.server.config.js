const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { universalServer: './universalServer.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'production',
  node: false,
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/node_modules/],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  plugins: []
};

