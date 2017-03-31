import express from 'express';
import config from '../config/config';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import mongoose from 'mongoose';
import apiRouter from './api/index';
import bodyParser from 'body-parser';

const app = express();

// webpack and hotlaod configuration
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

// Database configuration
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, (error) => {
  if (error) {
    console.error('lease make sure Mongodb is installed and running!');
    throw error;
  }
});
app.use('/api', apiRouter);
app.use(bodyParser.urlencoded({ extended: true }));

// ejs view and public folder configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('*', (req, res) => {
  res.render('index', {
    content: 'dummy content'
  });
});

// port listening
app.listen(config.port, config.host, () => {
  console.info('Magic happens at port ', config.port);
});