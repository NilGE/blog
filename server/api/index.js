import express from 'express';
import Post from '../model/post';

const router = express.Router();

router.get('/posts', (req, res) => {
  Post.find({}).then(doc => res.send(doc)).catch(console.error);
});

router.post('/addPost', (req, res) => {
  new Post(req.body).save().then(doc => res.send({ postinfo: doc })).catch(console.error);
});

export default router;
