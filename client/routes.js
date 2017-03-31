import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Sample from './components/sample';
import Article from './components/article';
import MarkdownEditor from './components/markdownEditor';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/home" component={Home}></Route>
    <Route path="/about" component={About}></Route>
    <Route path="/posts" component={Sample}></Route>
    <Route path="/contact" component={Contact}></Route>
    <Route path="/sample" component={Sample}></Route>
    <Route path="/article" component={Article}></Route>
    <Route path="/markdownEditor" component={MarkdownEditor}></Route>
  </Route>
);
