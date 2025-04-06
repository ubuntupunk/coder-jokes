const config = require('./webpack.config.js');

module.exports = {
  ...config,
  output: {
    ...config.output,
    publicPath: './'  // Use relative path for production/GitHub Pages
  },
  mode: 'production'
};
