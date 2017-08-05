import React from 'react';
import axios from 'axios';
import TagEditor from './tagEditor';

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tag_id: ''
    };
  }

  componentDidMount() {
    axios.get('/api/getAllTags').then(res => {
      this.setState({
        tags: res.data
      });
    }).catch(err => console.log(err));
  }

  handleTagClick(_id) {
    if (this.state.tag_id != '') {
      document.getElementById(this.state.tag_id).classList.remove("active");
    }
    document.getElementById(_id).classList.add("active");
    this.setState({
      tag_id: _id
    });
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
                  <div id={tag._id} className="tag-content" onClick={() => {this.handleTagClick(tag._id)}}>
                    <div className="tag-name">{tag.name}</div>
                    <div className="tag-count">{tag.count}</div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="tag-editor">
            <TagEditor _id={this.state.tag_id} />
          </div>
        </div>
      </div>
    );
  }
}

export default Tags;
