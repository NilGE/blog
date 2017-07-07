import React from 'react';
import {Link} from 'react-router';
import ImageHeader from '../common/imageHeader';
import axios from 'axios';
import List from './list';
import NavBtns from './navBtns';

class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      posts: [],
      limit: 5,
      skip: 0,
      total: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOlderPost = this.handleClickOlderPost.bind(this);
    this.handleClickNewerPost = this.handleClickNewerPost.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { limit, skip } = this.state;
    let query = this.state.query;
    if (query.includes(":")) {
      query = query.split(":")[1].trim();
      axios.post('/api/searchPostByTag', {query: query, limit: limit, skip: skip}).then(res => {
        this.setState({posts: res.data.posts, total: res.data.total});
      }).catch(err => console.error(err));
    } else {
      if (query.includes(" ")) {
        query = "\""+query+"\"";
      }
      axios.post('/api/searchPost', {query: query, limit: limit, skip: skip}).then(res => {
        this.setState({posts: res.data.posts, total: res.data.total});
      }).catch(err => console.error(err));
    }
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
          type={"header searching-header"}
          heading={'Searching'}
        />
        <div className="search-input-block">
          <form onSubmit={this.handleSubmit} >
            <div className="input-group">
              <input name="query" type="text" className="input-group-input" placeholder="Type what you want to search here" onChange={this.handleChange} />
              <button className="btn input-group-btn" type="submit">
                  Search
              </button>
            </div>
          </form>
        </div>
        <br />
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

export default SearchList;
