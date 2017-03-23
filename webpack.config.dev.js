
export default {
  devtool: 'eval-source-map',
  entry: ['./client/index.js'],
  output: {
    path: __dirname + '/public',
		filename: 'bundle.js',
		publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
};
