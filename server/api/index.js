import express from 'express';
import Post from '../model/post';
import Tag from '../model/tag';

const router = express.Router();

// get all posts
router.get('/posts', (req, res) => {
  Post.find({}).then(doc => res.send(doc)).catch(console.error);
});

// add a new post
router.post('/addPost', (req, res) => {
  new Post(req.body).save().then(post => res.send(post)).catch(console.error);
});

// update a post
router.post('/updatePost', (req, res) => {
  Post.findOneAndUpdate({'_id':req.body._id}, { $set: {
    title: req.body.title,
    subtitle: req.body.subtitle,
    author: req.body.author,
    content: req.body.content,
    tags: req.body.tags
  }}, {new: true}).then(post => {res.send(post)}).catch(console.error);
});

// get a post by id
router.get('/post/:_id', (req, res) => {
  Post.findOne({'_id': req.params._id}).then(response => res.send(response)).catch(console.error);
});

// get tags with ids
router.post('/getTags', (req, res) => {
  Tag.find({'_id': { $in: req.body }}).select("name").then(response => res.send(response)).catch(console.error);
});

// get posts with ids
router.post('/getPosts', (req, res) => {
  Post.find({'_id': { $in: req.body }}).select("title").then(response => res.send(response)).catch(console.error);
});

// get a tag by its name
router.post('/getTagByName', (req, res) => {
  Tag.findOne({'name': req.body.name}).then(response => res.send(response)).catch(console.error);
});

// add a new tag
router.post('/addTag', (req, res) => {
  new Tag({
    name: req.body.name,
    posts: []
  }).save().then(tag => res.send(tag)).catch(console.error);
});

// add a post to tag's posts list
router.post('/addPostIntoTagList', (req, res) => {
  Tag.findOne({'_id': req.body.tag_id}).then(tag => {
    tag.posts.addToSet(req.body.post_id);
    tag.save().then(tag => res.send(tag)).catch(console.error);
  }).catch(console.error);
});

// remove the current post from tag's posts list
router.post('/removePostFromTagList', (req, res) => {
  Tag.findOne({'_id': req.body.tag_id}).then(tag => {
    tag.posts.pull(req.body.post_id);
    tag.save().then(tag => res.send(tag)).catch(console.error);
  }).catch(console.error);
});


export default router;
