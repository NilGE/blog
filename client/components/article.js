import React from 'react';
import marked from 'marked';
import prism from 'prismjs';
import file from './README.md';
import ImageHeader from './common/imageHeader.js';

class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    prism.highlightAll();
  }

  render() {
    return (
      <div>
        <ImageHeader
          imagePath={"img/post-bg.jpg"}
          type={"post-heading"}
          heading={"Man must explore, and this is exploration at its greatest"}
          subheading={"Problems look mighty small from 150 miles up"}
          other={'Posted by <a href="#">Start Bootstrap</a> on August 24, 2017'}
        />

        <div className="container">
          <div dangerouslySetInnerHTML = {{ __html: marked(file.toString()) }} />
        </div>
      </div>
    );
  }
};

export default Article;
