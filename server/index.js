import express from 'express';
import config from '../config/config';

// add webpack modules
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

const app = express();

// use webpack module to resolve js
app.use(webpackMiddleware(webpack(webpackConfig)));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  res.render('index', {
    content: 'dummy content'
  });
});

app.listen(config.port, config.host, () => {
  console.info('Magic happens at port ', config.port);
});
