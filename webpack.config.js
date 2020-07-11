const path = require('path');

module.exports = env => ({
  entry: (env && env.learn) ? './src/eloquent.js': './src/exercise.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true, 
      port: 9000
  }
});