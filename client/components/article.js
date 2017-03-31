import React from 'react';
import marked from 'marked';
import prism from 'prismjs';
import file from './README.md';

var renderer = new marked.Renderer();
renderer.code = function(code, language) {
  return '<pre id = "123">' + code + '</pre>'
};

const Article = () => {
  return (
    <div className="container">
      <div dangerouslySetInnerHTML = {{ __html: marked(file.toString(), {renderer : renderer}) }} />
    </div>
  );
};

export default Article;
