import React from 'react';
import {Link} from 'react-router';
import config from '../../config/config';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="navbar">
          <div className="header">
            <a href={config.serverUrl}><img className="avatar" src="img/avatar.JPG" alt="avatar"/></a>
            <div>Neil's Blog</div>
          </div>
          <div className="search">
            <input name="query" type="text" className="input-group-input"
              placeholder="Search" />
            <button className="btn input-group-btn" type="submit">
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="body">
            <div className="section">
              <Link to="/admin/editor">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                <span>New Post</span>
              </Link>
            </div>
            <div className="section">
              <Link to="/admin/posts">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span>Posts</span>
              </Link>
            </div>
            <div className="section">
              <Link to="/admin/tags">
                <i className="fa fa-tags" aria-hidden="true"></i>
                <span>Tags</span>
              </Link>
            </div>
            <div className="section">
              <Link to="/admin/setting">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <span>Setting</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default App;
