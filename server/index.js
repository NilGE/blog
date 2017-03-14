import express from 'express';
import config from '../config/config';

const app = express();

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  res.render('index', {
    content: 'dummy content'
  });
});

app.listen(config.port, config.host, () => {
  console.info('Magic happens at port ', config.port);
});
