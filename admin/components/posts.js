import React from 'react';
import axios from 'axios';
import List from './list';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('/api/posts').then(res => {
      console.log(res.data);
      this.setState({posts: res.data});
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <div className="post-list">
        <div className="post-list-title">
          <h1>Your Posts</h1>
        </div>
        <List posts={this.state.posts} />
      </div>
    );
  }
}

export default Posts;
