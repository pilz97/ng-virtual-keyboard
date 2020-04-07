let path = require('path');
let webpack = require('webpack');

module.exports = {
  entry: {
    'popup-keyboard': path.join(__dirname, 'src', 'index.ts'),
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.json',
      '.css',
      '.html',
    ],
  },
  /*
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  */
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'popup-keyboard.umd.js',
    library: [
      'popup-keyboard',
    ],
    libraryTarget: 'umd',
  },
  externals: [
    /^rxjs\//,    //.... any other way? rx.umd.min.js does work?
    /^@angular\//,
  ],
  devtool: 'source-map',
  module: {
    rules: [
      { // Support for .ts files.
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
          {
            loader: 'angular2-template-loader',
          },
        ],
      },
    ],
  },
};
