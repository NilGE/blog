import express from 'express';
import Post from '../model/post';
import Tag from '../model/tag';
import User from '../model/user';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

/* -------------- post api --------------- */

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
    author: req.body.author,
    content: req.body.content,
    tags: req.body.tags,
    datetime: req.body.datetime,
    backgroundImagePath: req.body.backgroundImagePath
  }}, {new: true}).then(post => {res.send(post)}).catch(console.error);
});

// get a post by id
router.get('/post/:_id', (req, res) => {
  Post.findOne({'_id': req.params._id}).then(response => res.send(response)).catch(console.error);
});

// get posts with ids
router.post('/getPosts', (req, res) => {
  Post.find({'_id': { $in: req.body }}).select("title").then(response => res.send(response)).catch(console.error);
});

// get list from skip with number of limit
router.post('/postList', (req, res) => {
  Post.find({}).select("_id title subtitle author tags datetime")
               .sort({datetime: -1})
               .skip(req.body.skip)
               .limit(req.body.limit)
               .then(doc => res.send(doc))
               .catch(console.error);
});

// get the total number of posts
router.get('/getNumOfPosts', (req, res) => {
  Post.count().then(count => res.send({count})).catch(console.error);
});

router.post('/searchPost', (req, res) => {
  Post.find({ $text: {
      $search: req.body.query,
      $language: 'en'
  }}).select("_id title subtitle author tags datetime")
     .sort({datetime: -1})
     .skip(req.body.skip)
     .limit(req.body.limit)
     .then(posts => res.send({ posts: posts, total: posts.length }))
     .catch(console.error);
});

router.post('/searchPostByTag', (req, res) => {
  Tag.findOne({'name': req.body.query}).then(tag => {
    if (tag) {
      Post.find({'_id': { $in: tag.posts}})
          .select("_id title subtitle author tags datetime")
          .sort({datetime: -1})
          .skip(req.body.skip)
          .limit(req.body.limit)
          .then(posts => res.send({ posts: posts, total: tag.posts.length }))
          .catch(console.error);
    } else {
      res.send({posts: [], total: 0});
    }
  }).catch(console.error);
});


/* -------------- tags api --------------- */

// get all tags
router.get('/getAllTags', (req, res) => {
  Tag.find({}).select("name posts").then(doc => {
    res.send(doc.map(tag => {return {_id:tag._id, name: tag.name, count: tag.posts.length} }));
  }).catch(console.error);
});

// get a tag by id
router.post('/getTagById', (req, res) => {
  Tag.findOne({'_id': req.body._id}).then(response => res.send(response)).catch(console.error);
});

// get tags with ids
router.post('/getTags', (req, res) => {
  Tag.find({'_id': { $in: req.body }}).select("name").then(response => res.send(response)).catch(console.error);
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
  }).save().then(response => res.send(response)).catch(console.error);
});

// update a tag
router.post('/updateTag', (req, res) => {
  Tag.findOneAndUpdate({'_id':req.body._id}, { $set: {
    name: req.body.name,
    backgroundImagePath: req.body.backgroundImagePath
  }}, {new: true}).then(tag => {res.send(tag)}).catch(console.error);
});


//get post tags
router.post('/getTagsByPostId', (req, res) => {
  Post.findOne({'_id': req.body._id}).then(response => res.send(response.tags)).catch(console.error);
});

// add a post to tag's posts list
router.post('/addPostIntoTagList', (req, res) => {
  Tag.findOne({'_id': req.body.tag_id}).then(tag => {
    tag.posts.addToSet(req.body.post_id);
    tag.save().then(tags => {
      res.send(tags);
    }).catch(console.error);
  }).catch(console.error);
});

// remove the current post from tag's posts list
router.post('/removePostFromTagList', (req, res) => {
  Tag.findOne({'_id': req.body.tag_id}).then(tag => {
    tag.posts.pull(req.body.post_id);
    tag.save().then(tags => {
      res.send(tags);
    }).catch(console.error);
  }).catch(console.error);
});

router.post('/getPostsWithCurrentTag', (req, res) => {
  Tag.findOne({'_id': req.body._id}).then(tag => {
    Post.find({'_id': { $in: tag.posts}})
        .select("_id title subtitle author tags datetime")
        .sort({datetime: -1})
        .skip(req.body.skip)
        .limit(req.body.limit)
        .then(posts => res.send({ posts: posts, total: tag.posts.length }))
        .catch(console.error);
  }).catch(console.error);
});

/* -------------- user api --------------- */
router.post('/getUser', (req, res) => {
  User.findOne({'_id' : req.body._id}).then(user => res.send(user)).catch(console.error);
});

router.post('/updateUser', (req, res) => {
  User.findOneAndUpdate({'_id':req.body._id}, { $set: {
    userName: req.body.userName,
    blogTitle: req.body.blogTitle,
    backgroundImagePath: req.body.backgroundImagePath
  }}, {new: true}).then(user => {res.send(user)}).catch(console.error);
});

// NOTICE!!!, do not use this api in the project, just for test
router.post('/addUser', (req, res) => {
  new User(req.body).save().then(user => res.send(user)).catch(console.error);
});

/* ----------- upload images ------------- */
const upload = multer({ dest: 'public/img/upload' });
router.post('/img/upload', upload.single('backgroundImg'), (req, res) => {
  res.status(201).send(req.file.filename);
});

router.post('/img/delete', (req, res) => {
  fs.unlink('public/' + req.body.backgroundImagePath, err => {
    if (err) {
      console.log(err);
    }
    res.send({message: 'file removed'});
  });
});

export default router;
