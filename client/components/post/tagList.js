import React from 'react';
import {Link} from 'react-router';
import ImageHeader from '../common/imageHeader';
import axios from 'axios';
import List from './list';
import NavBtns from './navBtns';

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      limit: 5,
      skip: 0,
      total: 0
    };
    this.handleClickOlderPost = this.handleClickOlderPost.bind(this);
    this.handleClickNewerPost = this.handleClickNewerPost.bind(this);
  }

  refreshPosts(skip, limit) {
    axios.post('/api/getPostsWithCurrentTag', {_id: this.props.location.query.tag, limit: limit, skip: skip}).then(res => {
      this.setState({posts: res.data.posts, total: res.data.total});
    }).catch(err => console.error(err));
  }

  componentDidMount() {
    const { limit, skip } = this.state;
    this.refreshPosts(skip, limit);
  }

  componentWillReceiveProps(nextProps) {
    let skip = 0;
    let limit = 5;
    this.setState({ skip: skip, limit: limit});
    axios.post('/api/getPostsWithCurrentTag', {_id: nextProps.location.query.tag, limit: limit, skip: skip}).then(res => {
      this.setState({posts: res.data.posts, total: res.data.total});
    }).catch(err => console.error(err));
  }

  handleClickOlderPost(e) {
    let {skip, limit, total} = this.state;
    skip += limit;
    if (skip + limit > total) {
      limit = total - skip;
    }
    this.setState({skip: skip, limit: limit});
    this.refreshPosts(skip, limit);
  }

  handleClickNewerPost(e) {
    let {skip, limit, total} = this.state;
    if (limit != 5) {
      limit = 5;
    }
    skip -= limit;
    this.setState({skip: skip, limit: limit});
    this.refreshPosts(skip, limit);
  }

  render () {
    const imageStyle = {
      backgroundImage: 'url(img/home-bg.jpg)',
      height: '100px'
    };
    return (
      <div>
        <ImageHeader
          imageStyle={imageStyle}
          type={"header"}
          heading={'Tag List'}
        />
        <div>
          <List
            posts={this.state.posts}
          />
          <NavBtns
            skip={this.state.skip}
            limit={this.state.limit}
            total={this.state.total}
            handleClickNewerPost={this.handleClickNewerPost}
            handleClickOlderPost={this.handleClickOlderPost}
          />
        </div>
      </div>
    );
  }
}

export default TagList;
