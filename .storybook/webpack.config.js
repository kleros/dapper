const { join } = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|png)$/,
        use: ['url-loader']
      }
    ]
  }
}
