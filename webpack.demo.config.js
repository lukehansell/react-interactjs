var config = require('./webpack.config')
var path = require('path')

module.exports = Object.assign({}, config, {
	entry: './demo/src/demo.js',
	output:  {
		path: path.resolve(__dirname, 'demo/js'),
		publicPath: 'js',
		filename: 'demo.js'
	}
})