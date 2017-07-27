import React from 'react';
import Remarkable from 'remarkable';
import axios from 'axios';
import prism from '../../common/prism';
import { WithContext as ReactTags } from 'react-tag-input';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      author: '',
      content: '',
      tags: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleTagsChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  componentDidMount() {
    if (this.props.location.query.post) {
      axios.get('/api/post/'+this.props.location.query.post).then(res => {
        let post = res.data;
        axios.post('/api/getTags', post.tags).then(res => {
          this.setState({
            _id: post._id,
            title: post.title,
            subtitle: post.subtitle,
            author: post.author,
            content: post.content,
            tags: res.data
          });
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    }
    prism.highlightAll();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.location.query.post) {
      this.setState({
        title: '',
        subtitle: '',
        author: '',
        content: '',
        tags: []
      });
    }
  }

  componentDidUpdate() {
    prism.highlightAll();
  }

  handleSubmit(e) {
    e.preventDefault();
    // add tags
    let tags = this.state.tags;
    let promises = [];
    for (let i = 0; i < tags.length; i++) {
      if (!tags[i]._id) {
        let curr = axios.post('/api/addTag', tags[i]);
        curr.then(res => {
          tags[i] = {
            _id: res.data._id,
            name: res.data.name
          };
        }).catch(err => console.error(err));
        promises.push(curr);
      }
    }

    axios.all(promises).then(() => {
      this.setState({tags: tags});
      // add post
      let path = this.props.location.query.post == null? '/api/addPost' : '/api/updatePost';
      axios.post(path, this.state).then(res => {
        // associate tags with post
        let promises = [];
        tags.map(tag => {
          let curr = axios.post('/api/addPostIntoTagList', {
            tag_id: tag._id,
            post_id: res.data._id
          });
          promises.push(curr);
        });
        axios.all(promises).then(() => {
          this.context.router.push('/post/'+res.data._id);
        });
      }).catch(err => console.error(err));
    });
  }

  // tag operations
  handleDelete(i) {
        let tags = this.state.tags;
        if (tags[i]._id && this.state._id) {
          let data = {
            tag_id: tags[i]._id,
            post_id: this.state._id
          };
          axios.post('/api/removePostFromTagList', data).then(res => {
            tags.splice(i, 1);
            this.setState({tags: tags});
          }).catch(err => console.error);
        } else {
          tags.splice(i, 1);
          this.setState({tags: tags});
        }
  }
  handleAddition(tag) {
      let tags = this.state.tags;
      axios.post('/api/getTagByName', {name: tag}).then(res => {
        if (!res.data) {
          tags.push({name: tag});
        } else {
          tags.push({
            _id: res.data._id,
            name: res.data.name
          });
        }
        this.setState({tags: tags});
      }).catch(err => console.error(err));
  }
  handleDrag(tag, currPos, newPos) {
      let tags = this.state.tags;
      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: tags });
  }

  openNav() {
    document.getElementById("postSetting").style.width = "300px";
  }

  closeNav() {
    document.getElementById("postSetting").style.width = "0";
  }

  render() {
    const md = new Remarkable();
    return (
      <main className="editor">
        <form className="editor-form" onSubmit={this.handleSubmit}>
          <div className="title">
            <input type="text" name="title" placeholder="Your Post Title" value={this.state.title}
              className="title-input" onChange={this.handleChange} />
            <a href="javascript:void(0)" className="setting" onClick={this.openNav}>
              <i className="fa fa-lg fa-cog fa-spin setting-icon"></i>
            </a>
            <button type="submit" className="btn submit-btn">Sumbit</button>
            <div id="postSetting" className="postSetting">
                <div className="setting-menu-header">
                  <h4>Post Settings</h4>
                  <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                </div>

                <div className="form-group">
                  <label for="subtitle">Subtitle</label>
                  <input type="text" name="subtitle" value={this.state.subtitle}
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label for="author">Author</label>
                  <input  type="text" name="author" value={this.state.author}
                    onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <label for="tags">Tags</label>
                  <ReactTags
                                tags={this.state.tags}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                handleDrag={this.handleDrag}
                                placeholder={''}
                                labelField={'name'}
                                />
                </div>
            </div>
          </div>
          <div className="content">

              <textarea id="markdown" className="markdown" name="content" placeholder="Type Markdown Here"
                value={this.state.content} onChange={this.handleChange}></textarea>


              <div className="preview" id="preview" dangerouslySetInnerHTML = {{ __html: md.render(this.state.content) }}></div>

          </div>
         </form>
      </main>
  	);
  }
}

MarkdownEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MarkdownEditor;
