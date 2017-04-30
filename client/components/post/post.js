import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import ImageHeader from '../common/imageHeader.js';
import axios from 'axios';
import dateFormat from 'dateformat';
import prism from '../common/prism';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      author: '',
      date: '',
      content: '',
      tags: []
    };
  }

  componentDidMount() {
    axios.get('/api/post/'+this.props.params.post_id).then(res => {
      let post = res.data;
      this.setState({
        title: post.title,
        subtitle: post.subtitle,
        author: post.author,
        date: this.formatDate(post.date),
        content: post.content,
        tags: post.tags
      });
      prism.highlightAll();
    }).catch(err => console.error(err));
  }

  componentDidUpdate() {
    prism.highlightAll();
  }

  formatDate(raw_date) {
    let date = new Date(raw_date);
    return dateFormat(date, "mmmm dd, yyyy");
  }

  render() {
    const imageStyle = {
      background: 'url(http://www.nxworld.net/codepen/css-scroll-down-button/bg03.jpg) center center / cover no-repeat'
    };
    const {title, subtitle, author, date, content, tags} = this.state;
    return (
      <div id="body-wrapper">
        <ImageHeader
          imageStyle={imageStyle}
          type={"header"}
          heading={title}
          subheading={subtitle}
        />
        <main id="content">
          <article className="post post-article">
            <div className="post-header">
              <h1 className="post-title">{title}</h1>
              <div className="post-meta">
                  <img className="author-thumb" src="img/avatar.JPG" alt="Nilge" />
                  <Link to="/contact">{author}</Link> on
                    {tags.map(tag =>
                      <Link key={tag._id} to={{ pathname: '/tagList', query: {tag: tag._id} }} > {tag.name} | </Link>
                    )} <time>{date}</time>
              </div>
            </div>
            <div className="post-content">
              <div dangerouslySetInnerHTML = {{ __html: marked(content) }}></div>
            </div>
          </article>
        </main>
      </div>
    );
  }
};

export default Post;
