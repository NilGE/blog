import React from 'react';
import marked from 'marked';
import prism from 'prismjs';
import axios from 'axios';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '## Type Markdown Here'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  componentDidMount() {
    prism.highlightAll();
  }

  componentDidUpdate() {
    prism.highlightAll();
  }

  addNewPost(post) {
    axios.post('/api/addPost', post).then(res => console.log(res)).catch(err => console.error(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.addNewPost(this.state);
  }

  render() {
    return (
  		<div className="container-fluid">
        <form onSubmit={this.handleSubmit}>
          <h1 className="text-center">
            ReactJS Markdown Editor
          </h1>
    			<div className="row">
    				<div className="col-xs-12 col-sm-6">
    					<h3>Markdown</h3>
    					<textarea id="markdown" className="markdown" name="content" defaultValue={this.state.content} onChange={this.handleChange}></textarea>
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
  	);
  }
}

export default MarkdownEditor;
