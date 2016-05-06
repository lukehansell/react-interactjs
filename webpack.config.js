var webpack = require('webpack')

module.exports = {
	entry: "./src/Interactable.js",
  output: {
    path: __dirname,
    filename: "Interactable.js"
  },
  module: {
	  loaders: [
	    { 
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader"
	    }
	  ]
	}
};