import React from 'react';
import axios from 'axios';
import TagEditor from './tagEditor';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tag: {}
    };
  }

  componentDidMount() {
    axios.get('/api/getAllTags').then(res => {
      this.setState({
        tags: res.data
      });
    }).catch(err => console.log(err));
  }

  handleTagClick() {

  }

  render() {
    return (
      <div className="tags">
        <div className="tags-header">
          <h2>
            Tags
          </h2>
        </div>
        <div className="tags-body">
          <div className="tags-list">
            {
              this.state.tags.map(tag =>
                <div className="tag-panel" key={tag._id}>
                  <div className="tag-content" onClick={this.handleTagClick}>
                    <div className="tag-name">{tag.name}</div>
                    <div className="tag-count">{tag.count}</div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="tag-editor">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Tags;
