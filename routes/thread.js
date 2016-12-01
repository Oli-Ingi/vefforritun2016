const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const DBMan = require('../DBManager');

router.get('/:id', (req, res) => {
  DBMan.threadWithPosts(req.params.id)
    .then((data) => {
      const thread = data[0];
      const posts = data[1];

      res.render('thread', {
        thread,
        posts,
      });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

router.get('/replies/:id', (req, res) => {
  console.log(req.params.id);
  DBMan.getRepliesInPost(req.params.id)
    .then((replies) => {
      console.log(replies);
      res.render('_replies', { replies });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

router.post('/:id', (req, res) => {
  const newPost = {
    threadId: req.params.id,
    postName: req.body['new-title'],
    author: req.body['new-author'],
    text: req.body['new-post'],
  };


  DBMan.savePost(newPost)
    .then((data) => {
      console.log(data);
      console.log(data.id);
      res.redirect(`/thread/'${req.params.id}`);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
