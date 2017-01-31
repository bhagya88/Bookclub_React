module.exports = {
	entry: "./app/index.js",

	output: {
		filename: "public/bundle.js",
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: /app/,
			loader: "babel",
			query: {
				presets: ["react", "es2015"]
			}
		}]
	},

	devtool: "eval-source-map"
};