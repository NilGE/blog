import React from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';

class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: '',
      backgroundImagePath: ''
    };
    this.onDrop = this.onDrop.bind(this);
    this.deleteBackgroundImg = this.deleteBackgroundImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  /**
   * Handle common inputs change
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onDrop(files) {
    let data = new FormData();
    data.append('backgroundImg', files[0]);
    axios.post('api/img/upload', data).then(res => {
      this.setState({
        backgroundImagePath: 'img/upload/' + res.data
      });
      console.log(res.data);
    }).catch(err => console.error(err));
  }

  deleteBackgroundImg() {
    axios.post('/api/img/delete', { backgroundImagePath: this.state.backgroundImagePath }).then(res => {
      console.log(res.data);
      this.setState({
        backgroundImagePath: ''
      });
    }).catch(err => console.error(err));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const imgUploader = this.state.backgroundImagePath == '' ?
    (<DropZone
        onDrop={this.onDrop}
        multiple={false}
        style={{}}
        className="dropZone"
        name="background-imgs"
      ><div className="btn add-img-btn">Add post image</div>
      </DropZone>) :
    (<div className="thumbnail">
      <div className="btn img-del-btn" onClick={this.deleteBackgroundImg}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </div>
      <img src={this.state.backgroundImagePath} alt="thumbnail"/>
    </div>);
    return (
      <div className="editor">
        <form className="editor-form" onSubmit={this.handleSubmit}>
          <div className="tagSetting tag-setting-special-setting">
              <div className="setting-menu-header">
                <h4>Tag Settings</h4>
              </div>
              <div className="form-group">
                {imgUploader}
              </div>
              <div className="form-group">
                <label htmlFor="tagName">Tag Name</label>
                <div>
                  <input  type="text" name="tagName" value={this.state.tagName}
                    onChange={this.handleChange} />
                </div>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TagEditor;
