import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/home';
import About from './components/info/about';
import Contact from './components/info/contact';
import Post from './components/post/post';
import TagList from './components/post/tagList';
import SearchList from './components/post/searchList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path="/home" component={Home}></Route>
    <Route path="/about" component={About}></Route>
    <Route path="/contact" component={Contact}></Route>
    <Route path="/post/:post_id" component={Post}></Route>
    <Route path="/tagList" component={TagList}></Route>
    <Route path="/search" component={SearchList}></Route>
  </Route>
);
