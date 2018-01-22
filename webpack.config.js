const path = require('path');
const cloneDeep = require('clone-deep');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const eslintOptions = {
  fix: true
};

const devConf = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'cb.js',
    library: "cb",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      { test: /\.js$/, include: [path.resolve(__dirname, 'src')], use: [
        'babel-loader',
        { loader: 'eslint-loader', options: eslintOptions }
      ]}
    ]
  },

  plugins: []
};

const minConf = cloneDeep(devConf);

// Min conf output name
minConf.output.filename = 'cb.min.js';

// Min conf plugins
minConf.plugins = minConf.plugins.concat([
  new UglifyJsPlugin({
    uglifyOptions: {
      compress: true,
      max_line_len: 80
    }
  })
]);

module.exports = [
  devConf,
  minConf
];