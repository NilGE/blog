import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Editor from './components/editor';
import Posts from './components/posts';
import Tags from './components/tags';
import Setting from './components/setting'

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={Editor}></IndexRoute>
    <Route path="/admin/posts" component={Posts}></Route>
    <Route path="/admin/editor" component={Editor}></Route>
    <Route path="/admin/tags" component={Tags}></Route>
    <Route path="/admin/setting" component={Setting}></Route>
  </Route>
);
