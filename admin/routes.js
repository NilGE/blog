import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Editor from './components/editor';
import Posts from './components/posts';
import Tags from './components/tags';
import TagEditor from './components/tagEditor';

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Editor}></IndexRoute>
    <Route path="/admin/posts" component={Posts}></Route>
    <Route path="/admin/editor" component={Editor}></Route>
    <Route path="/admin/tags" component={Tags}>
      <IndexRoute component={TagEditor}></IndexRoute>
      <Route path="/admin/tags/tag" component={TagEditor}></Route>
    </Route>
  </Route>
);
