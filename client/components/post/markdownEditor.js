import React from 'react';
import marked from 'marked';
import axios from 'axios';
import ImageHeader from '../common/imageHeader';
import prism from '../common/prism';
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
    if (this.props.params._id != '0') {
      axios.get('/api/post/'+this.props.params._id).then(res => {
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
      let path = this.props.params._id == '0' ? '/api/addPost' : '/api/updatePost';
      axios.post(path, this.state).then(res => {
        console.log(res);
        // associate tags with post
        let promises = [];
        tags.map(tag => {
          let curr = axios.post('/api/addPostIntoTagList', {
            tag_id: tag._id,
            post_id: res.data._id
          });
          promises.push(curr);
          curr.then(res => console.log(res)).catch(err => console.error(err));
        });
        axios.all(promises).then(() => {
          this.context.router.push('/article/'+res.data._id);
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
            console.log(res);
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
        console.log(res);
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

  render() {
    const imageStyle = {
      backgroundImage: 'url(img/editor-bg-min.jpeg)',
      height: '100px'
    };
    return (
      <div>
        <ImageHeader
          imageStyle={imageStyle}
          type={"post-heading"}
          heading={""}
        />
        <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>
            <div className="col-xs-12 col-sm-12 text-center">
              <input  type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange} />
              <input  type="text" name="subtitle" placeholder="subtitle" value={this.state.subtitle} onChange={this.handleChange} />
              <input  type="text" name="author" placeholder="author" value={this.state.author} onChange={this.handleChange} />
              <ReactTags
                tags={this.state.tags}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                handleDrag={this.handleDrag}
                placeholder={'add tags here'}
                labelField={'name'}
                />
            </div>
      			<div className="row">
      				<div className="col-xs-12 col-sm-6">
      					<h3>Markdown</h3>
      					<textarea id="markdown" className="markdown" name="content" placeholder="Type Markdown Here" value={this.state.content} onChange={this.handleChange}></textarea>
      				</div>
      				<div className="col-xs-12 col-sm-6">
      					<h3>Preview</h3>
      					<div id="preview" dangerouslySetInnerHTML = {{ __html: marked(this.state.content) }}></div>
      				</div>
              <div className="col-xs-12 col-sm-12 text-center">
                <button type="submit" className="btn btn-success btn-lg">Sumbit</button>
              </div>
      			</div>
          </form>
    		</div>
      </div>

  	);
  }
}

MarkdownEditor.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default MarkdownEditor;
