var path = require('path');
var nodeModules = path.resolve(__dirname, 'node_modules');
var dist = path.resolve(__dirname, 'dist');
var src = path.resolve(__dirname, 'src');
var etty = path.resolve(src, 'etty.js');
var extns = path.resolve(src, 'etty.ext.js');

module.exports = {
	entry: {
		'etty': etty,
		'etty.ext': extns
	},

	output: {
		path: dist,
		filename: '[name].js'
	},

	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
};
