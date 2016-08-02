module.exports = {
	entry: './blocks/app/app.js',
	output: {
		path: './',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
			{test: /\.js$/, loader: 'babel', query: { presets: ['es2015']}},
			{test: /\.pug$/, loader: 'pug-loader'}
		]
	},
	postcss: function () {
		return [require('autoprefixer'), require('precss')];
	}
};
