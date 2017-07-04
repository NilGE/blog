import React from 'react';
import {Link} from 'react-router';
import ImageHeader from './common/imageHeader';
import axios from 'axios';
import List from './post/list';
import NavBtns from './post/navBtns';

class Home extends React.Component {
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
    axios.post('/api/postList', {limit: limit, skip: skip}).then(res => {
      this.setState({posts: res.data});
    }).catch(err => console.log(err));
  }

  componentDidMount() {
    const { limit, skip } = this.state;
    axios.get('/api/getNumOfPosts').then(res => {
      this.setState({total: res.data.count});
    });
    this.refreshPosts(skip, limit);
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
      backgroundImage: 'url(http://www.nxworld.net/codepen/css-scroll-down-button/bg05.jpg)'
    };
    return (
      <div id="body-wrapper">
        <ImageHeader
          imageStyle={imageStyle}
          type={"header full-screen parallax"}
          heading={"Tech Blog"}
          other={'<a class="scroll-btn" href="#content"><span></span></a>'}
        />
        <main id="content">
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
        </main>
      </div>
    );
  }
}

export default Home;
