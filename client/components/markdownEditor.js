import React from 'react';
import marked from 'marked';
import prism from 'prismjs';

class MarkdownEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '## Type Markdown Here'
    }

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    return (
  		<div className="container-fluid">
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
  			</div>
  		</div>
  	);
  }
}

export default MarkdownEditor;
