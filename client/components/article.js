import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import file from './README.md';
import ImageHeader from './common/imageHeader.js';
import axios from 'axios';
import dateFormat from 'dateformat';
import prism from './common/prism';

class Article extends React.Component {
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
      })
    }).catch(err => console.error(err));
    prism.highlightAll();
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
      backgroundImage: 'url(img/post-bg.jpg)'
    };
    const {title, subtitle, author, date, content, tags} = this.state;
    return (
      <div>
        <ImageHeader
          imageStyle={imageStyle}
          type={"post-heading"}
          heading={title}
          subheading={subtitle}
          other={'Posted by <a href="#">'+author+'</a> on '+ date}
        />

        <div className="container">
          <div dangerouslySetInnerHTML = {{ __html: marked(content) }} />
          <br/>

          <span><i className="fa fa-tags" aria-hidden="true"></i>
            {
              tags.map(tag =>
                <Link style={{color: '#0275d8'}} to="#" > {tag.name} </Link>
              )
            }
          </span>
          <hr/>
          <Link style={{color: '#0275d8'}}to={{ pathname: `/markdownEditor/${this.props.params.post_id}` }}>Edit</Link>
        </div>
      </div>
    );
  }
};

export default Article;
