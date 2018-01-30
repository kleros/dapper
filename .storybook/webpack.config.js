const { join } = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.png$/,
        use: ['url-loader']
      }
    ]
  }
}
