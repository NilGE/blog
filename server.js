const express = require('express');
const path = require('path');
const config = require('./config/configCloud.js');

const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const apiRouter = require('./server/api/index.js');
const bodyParser = require('body-parser');

const app = express();

app.use(sassMiddleware({
	src: path.join(__dirname, '/sass'),
	dest: path.join(__dirname, '/public'),
	outputStyle: 'compressed'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri, (error) => {
  if (error) {
    console.error('lease make sure Mongodb is installed and running!');
    throw error;
  }
});
app.use('/api', apiRouter);

// Setup view engine
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(path.join(__dirname, '/public'))));

app.get('/admin', (req, res) => {
  res.render('admin', {
    content: 'dummy content'
  });
});
app.get('/admin/*', (req, res) => {
  res.render('admin', {
    content: 'dummy content'
  });
});
app.get('*', (req, res) => {
  res.render('index', {
    content: 'dummy content'
  });
});

app.listen(config.port, () => {
  console.info('Blog running at port ', config.port);
});
