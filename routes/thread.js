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
  DBMan.getRepliesInPost(req.params.id)
    .then((replies) => {
      res.render('_replies', { replies });
    })
    .catch((error) => {
      res.render('error', { error });
    })
})

router.post('/:id', (req, res) => {
  const newPost = {
    threadId: req.params.id,
    postName: req.body['post-title'],
    author: req.body['post-author'],
    text: req.body['post-text'],
  };

  DBMan.saveThread(newPost)
    .then((data) => {
      res.redirect('/thread/post/' + data.id);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
