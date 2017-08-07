import React from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '5988592c91e121e8c8089029',
      userName: '',
      blogTitle: '',
      backgroundImagePath: ''
    };

    this.onDrop = this.onDrop.bind(this);
    this.deleteBackgroundImg = this.deleteBackgroundImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Handle common inputs change
   */

  componentDidMount() {
    axios.post('/api/getUser', {_id: this.state._id}).then(res => {
      this.setState({
        userName: res.data.userName,
        blogTitle: res.data.blogTitle,
        backgroundImagePath: res.data.backgroundImagePath
      });
    }).catch(err => console.error(err));
    document.getElementById('save-btn').classList.add("save-btn");
    document.getElementById('save-btn').classList.remove("success-btn");
    document.getElementById('save-btn').innerHTML = "Save Settings";
  }


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
    axios.post('/api/updateUser', this.state).then(res => {
      console.log(res.data);
      document.getElementById('save-btn').classList.remove("save-btn");
      document.getElementById('save-btn').classList.add("success-btn");
      document.getElementById('save-btn').innerHTML = "Saved";
      document.getElementById('save-btn').disabled = true;
    }).catch(err => console.error(err));
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
      <form onSubmit={this.handleSubmit}>
        <div className="setting">
          <div className="setting-header">
            <div className="title">
              <h2>General Setting</h2>
            </div>
            <div>
              <button id="save-btn" className="btn default-btn save-btn">Save Settings</button>
            </div>
          </div>
          <div className="setting-content">
            <div className="form-group">
              <label htmlFor="userName"><h3>User Name</h3></label>
              <div className="form-input">
                <input  type="text" name="userName" value={this.state.userName}
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="blogTitle"><h3>Blog Title</h3></label>
              <div className="form-input">
                <input  type="text" name="blogTitle" value={this.state.blogTitle}
                  onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="background-img"><h3>Background Image</h3></label>
              <div className="bgd-img">
                {imgUploader}
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Setting;
