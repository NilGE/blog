import React from 'react';
import {Link} from 'react-router';
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
        <List posts={this.state.posts} />
      </div>
    );
  }
}

export default Posts;
