import React from 'react';
import {Link} from 'react-router';
import ImageHeader from './common/imageHeader';
import axios from 'axios';
import dateFormat from 'dateformat';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('./api/posts').then(res => {
      this.setState({ posts: res.data})
    }).catch(err => console.error(err));
  }

  formatDate(raw_date) {
    let date = new Date(raw_date);
    return dateFormat(date, "mmmm dd, yyyy");
  }

  render() {
    const imageStyle = {
      backgroundImage: 'url(img/home-bg.jpg)'
    };

    return (
      <div>
        <ImageHeader
          imageStyle={imageStyle}
          type={"site-heading"}
          heading={"Clean Blog"}
          subheading={"A Blog Theme by Start Bootstrap"}
        />
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                    {this.state.posts.map(post =>
                      <div>
                        <div className="post-preview" key={post._id}>
                            <Link to={{ pathname: `/article/${post._id}` }}>
                                <h2 className="post-title">
                                    {post.title}
                                </h2>
                                <h3 className="post-subtitle">
                                    {post.subtitle}
                                </h3>
                            </Link>
                            <p className="post-meta">Posted by <Link to="/contact">{post.author}</Link> on {this.formatDate(post.date)}</p>
                        </div>
                        <hr />
                      </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    );
  }

};

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Home;
