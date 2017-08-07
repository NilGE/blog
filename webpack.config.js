module.exports = {
  entry: {
    public: './client/index.js',
    admin: './admin/index.js'
  },
  output: {
    path: __dirname + '/public',
		filename: '[name].js'
  },
  module: {
    loaders: [
      {
				test: /\.json$/,
				include: __dirname + '/client',
				loader: 'json-loader'
			},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.md$/,
        loaders: ["html-loader", "markdown-loader"]
      }
    ]
  }
};
