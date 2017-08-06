import React from 'react';
import { Link } from 'react-router';
import Remarkable from 'remarkable';
import ImageHeader from '../common/imageHeader.js';
import axios from 'axios';
import prism from '../common/prism';
import mathBlock from '../extension/remarkable-ext/math-block';
import mathInline from '../extension/remarkable-ext/math-inline';
import mathBlockTexlike from '../extension/remarkable-ext/math-block-texlike';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      datetime: '',
      content: '',
      tags: [],
      backgroundImagePath: ''
    };
  }

  componentDidMount() {
    axios.get('/api/post/'+this.props.params.post_id).then(res => {
      console.log(res.data);
      let post = res.data;
      this.setState({
        title: post.title,
        author: post.author,
        datetime: post.datetime,
        content: post.content,
        tags: post.tags,
        backgroundImagePath: post.backgroundImagePath
      });
      prism.highlightAll();
    }).catch(err => console.error(err));
  }

  componentDidUpdate() {
    prism.highlightAll();
  }

  render() {
    const imageStyle = {
      backgroundImage: 'url(' + this.state.backgroundImagePath + ')'
    };
    const {title, author, datetime, content, tags} = this.state;
    const md = new Remarkable();
    md.use(mathBlock);
    md.use(mathInline);
    md.use(mathBlockTexlike);
    return (
      <div id="body-wrapper">
        <ImageHeader
          imageStyle={imageStyle}
          type={"header parallax"}
          heading={title}
        />
        <main id="content">
          <article className="post post-article">
            <div className="post-header">
              <h1 className="post-title">{title}</h1>
              <div className="post-meta">
                  <img className="author-thumb" src="img/avatar.JPG" alt="Nilge" />
                  <Link to="/contact">{author}</Link> on
                    {tags.map(tag =>
                      <Link key={tag._id} to={{ pathname: '/tagList', query: {tag: tag._id, tagName: tag.name} }} > {tag.name} | </Link>
                    )} <time>{datetime}</time>
              </div>
            </div>
            <div className="post-content">
              <div dangerouslySetInnerHTML = {{ __html: md.render(content) }}></div>
            </div>
          </article>
        </main>
      </div>
    );
  }
};

export default Post;
