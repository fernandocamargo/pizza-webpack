const path = require('path')

module.exports = {
  paths: {
    src: path.join(process.cwd(), 'src'),
    dist: path.join(process.cwd(), 'dist'),
    assets: 'assets',
    index: './markup/index.html',
    ignore: [/node_modules/],
    static: ['font', 'image', 'json', 'svg']
  },
  extensions: {
    style: ['css', 'scss'],
    markup: ['htm', 'html'],
    image: ['gif', 'jpg', 'png'],
    font: ['eot', 'ttf', 'woff', 'woff2'],
    vector: ['svg']
  },
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080
}
