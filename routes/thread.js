const express = require('express');
// disable-um linter þar sem við verðum að nota Router með stóru 'R' til
// að geta sótt og notað express.Router
// eslint-disable-next-line new-cap
const router = express.Router();
const DBMan = require('../DBManager');

router.get('/:id', (req, res) => {
  DBMan.threadWithPosts(req.params.id)
    .then((data) => {
      const thread = data[0];
      const posts = data[1];
      const title = `Thread - ${thread.threadname}`;

      res.render('thread', {
        title,
        thread,
        posts,
      });
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
    .then(() => {
      res.redirect(`/thread/${req.params.id}`);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

router.get('/replies/:id', (req, res) => {
  const postid = req.params.id;
  DBMan.getRepliesInPost(postid)
    .then((replies) => {
      res.render('_replies', {
        replies,
        postid,
      });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

router.post('/replies/:id', (req, res) => {
  const newReply = {
    postId: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };

  DBMan.saveReply(newReply)
    .then((data) => {
      DBMan.getReply(data.id)
        .then((data2) => {
          const reply = data2[0];
          res.render('_reply', { reply });
        })
        .catch((error) => {
          res.render('error', { error });
        });
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
