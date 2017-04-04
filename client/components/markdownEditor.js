import React from 'react';
import marked from 'marked';
import axios from 'axios';
import ImageHeader from './common/imageHeader';
import prism from './common/prism';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      author: '',
      content: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  componentDidMount() {
    if (this.props.params._id != '0') {
      axios.get('/api/post/'+this.props.params._id).then(res => {
        let post = res.data;
        this.setState({
          title: post.title,
          subtitle: post.subtitle,
          author: post.author,
          content: post.content
        });
      }).catch(err => console.error(err));
    }
    prism.highlightAll();
  }

  componentDidUpdate() {
    prism.highlightAll();
  }

  handleSubmit(e) {
    e.preventDefault();
    let path = this.props.params._id == '0' ? '/api/addPost' : '/api/updatePost';
    axios.post(path, this.state).then(res => {
      this.context.router.push('/article/'+res.data._id);
    }).catch(err => console.error(err));
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
