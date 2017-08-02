import React from 'react';
import Remarkable from 'remarkable';
import axios from 'axios';
import prism from '../../common/prism';
import { WithContext as ReactTags } from 'react-tag-input';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import DropZone from 'react-dropzone';
import TagsInput from 'react-tagsinput';

class MarkdownEditor extends React.Component {

  /**
   * constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      content: '',
      tags: [],
      date: moment(),
      time: moment().format("hh:mm a"),
      backgroundImagePath: '',
      tags2: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagsDelete = this.handleTagsDelete.bind(this);
    this.handleTagsAddition = this.handleTagsAddition.bind(this);
    this.handleTagsDrag = this.handleTagsDrag.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.deleteBackgroundImg = this.deleteBackgroundImg.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  /**
   * If post id is not null, fetch post date from database.
   * Reset the button style, when reload the page, if we changes the button before
   */
  componentDidMount() {
    if (this.props.location.query.post) {
      axios.get('/api/post/'+this.props.location.query.post).then(res => {
        let post = res.data;
        console.log(post);
        let datetime = post.datetime.split(' ');
        axios.post('/api/getTags', post.tags).then(res => {
          this.setState({
            _id: post._id,
            title: post.title,
            author: post.author,
            content: post.content,
            tags: res.data,
            date: moment(datetime[0]),
            time: datetime[1] + ' ' + datetime[2],
            backgroundImagePath: post.backgroundImagePath
          });
        }).catch(err => console.error(err));
      }).catch(err => console.error(err));
    }
    prism.highlightAll();
    document.getElementById('submit-btn').classList.remove("success-btn");
    document.getElementById('submit-btn').classList.add("publish-btn");
    document.getElementById('submit-btn').innerHTML = this.props.location.query.post == null ? "Publish" : "Update";
  }

  /**
   * If we click new post when the current page is editor, we will clear the page
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.location.query.post) {
      this.setState({
        title: '',
        subtitle: '',
        author: '',
        content: '',
        tags: [],
        date: moment(),
        time: moment().format("hh:mm a"),
        backgroundImagePath: ''
      });
    }
  }

  /**
   * If the page updates (edit the content), the page will re-render the markdown
   */
  componentDidUpdate() {
    prism.highlightAll();
  }

  /**
   * submit the current post to backend by api using ajax
   */
  handleSubmit(e) {
    e.preventDefault();


    // create new tags for those tags do not exist
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
      // create a post obj
      let postObj = {
        title: this.state.title,
        author: this.state.author,
        content: this.state.content,
        tags: tags,
        datetime: this.state.date.format('YYYY-MM-DD') + ' ' + this.state.time,
        backgroundImagePath: this.state.backgroundImagePath
      };
      this.setState({tags: tags});
      // if current post does exist, update current post, otherwise create a post
      let path = this.props.location.query.post == null? '/api/addPost' : '/api/updatePost';
      if (this.state._id) {
        postObj._id = this.state._id;
      }
      axios.post(path, postObj).then(res => {
        // associate tags with post
        let promises = [];
        tags.map(tag => {
          let curr = axios.post('/api/addPostIntoTagList', {
            tag_id: tag._id,
            post_id: res.data._id
          });
          promises.push(curr);
        });
        console.log(res);
        document.getElementById('submit-btn').classList.remove("publish-btn");
        document.getElementById('submit-btn').classList.add("success-btn");
        document.getElementById('submit-btn').innerHTML = this.props.location.query.post == null ? "Published" : "Updated";
      }).catch(err => console.error(err));
    });
  }

  /**
   * Handle common inputs change
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  /**
   * Handle tags input changes
   */
  handleTagsDelete(i) {
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
  handleTagsAddition(tag) {
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
  handleTagsDrag(tag, currPos, newPos) {
      let tags = this.state.tags;
      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: tags });
  }

  /**
   * Handle date input changes
   */
  handleDateChange(date) {
    this.setState({
      date: date
    });

    // TEST:
    console.log(this.state.date.format('MM-DD-YYYY, hh:mm:ssa z'));
  }

  /**
   * Post setting control
   */
  openNav() {
    document.getElementById("postSetting").style.width = "350px";
  }

  closeNav() {
    document.getElementById("postSetting").style.width = "0";
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

  handleTagsChange(tags2) {
    this.setState({tags2});
  }

  render() {
    const md = new Remarkable();
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
      <main className="editor">
        <form className="editor-form" onSubmit={this.handleSubmit}>
          <div className="title">
            <input type="text" name="title" placeholder="Your Post Title" value={this.state.title}
              className="title-input" onChange={this.handleChange} />
            <a href="javascript:void(0)" className="setting" onClick={this.openNav}>
              <i className="fa fa-lg fa-cog fa-spin setting-icon"></i>
            </a>
            <button id="submit-btn" type="submit" className="btn publish-btn">Sumbit</button>

            <div id="postSetting" className="postSetting">
                <div className="setting-menu-header">
                  <h4>Post Settings</h4>
                  <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                </div>
                <div className="form-group">
                  {imgUploader}
                </div>
                <div className="form-group">
                  <label htmlFor="author">Author</label>
                  <div>
                    <input  type="text" name="author" value={this.state.author}
                      onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <ReactTags
                                tags={this.state.tags}
                                handleDelete={this.handleTagsDelete}
                                handleAddition={this.handleTagsAddition}
                                handleDrag={this.handleTagsDrag}
                                placeholder={''}
                                labelField={'name'}
                                />
                </div>

                <div className="form-group">
                  <label htmlFor="tags2">Tags2</label>
                  <TagsInput
                    value={this.state.tags2}
                    onChange={this.handleTagsChange}
                    inputProps={{placeholder: ''}}
                    />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Publish Date</label>
                    <div className="date-time-group">
                      <DatePicker
                        className="date"
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                      />
                    <div>
                      <input type="text" name="time" className="time" onChange={this.handleChange} value={this.state.time} />
                    </div>

                    </div>
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
