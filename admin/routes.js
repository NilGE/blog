import React  from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import MarkdownEditor from './components/markdownEditor';

export default (
  <Route path="/admin" component={App}>
    <IndexRoute component={MarkdownEditor}></IndexRoute>
  </Route>
);
