import React from 'react';
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
      content: ''
    };
  }

  componentWillMount() {
    axios.get('/api/post/'+this.props.params.post_id).then(res => {
      let post = res.data;
      this.setState({
        title: post.title,
        subtitle: post.subtitle,
        author: post.author,
        date: this.formatDate(post.date),
        content: post.content
      })
    }).catch(err => console.error(err));
  }

  componentDidMount() {
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
    const {title, subtitle, author, date, content} = this.state;
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
        </div>
      </div>
    );
  }
};

export default Article;
