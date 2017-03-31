import React from 'react';
import marked from 'marked';
import prism from 'prismjs';
import file from './README.md';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    prism.highlightAll();
  }

  render() {
    return (
      <div className="container">
        <div dangerouslySetInnerHTML = {{ __html: marked(file.toString()) }} />
      </div>
    );
  }
};

export default Article;
