import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import MarkdownEditor from './components/markdownEditor';
import Posts from './components/posts';

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Posts}></IndexRoute>
    <Route path="/posts" component={Posts}></Route>
    <Route path="/editor" component={MarkdownEditor}></Route>
  </Route>
);
