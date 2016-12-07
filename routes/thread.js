const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const DBMan = require('../DBManager');

router.get('/:id', (req, res) => {
  DBMan.threadWithPosts(req.params.id)
    .then((data) => {
      const thread = data[0];
      const posts = data[1];

      for (let i = 0; i < posts.length; i += 1) {
        if (posts[i].date.getMinutes() < 10) {
          posts[i].correctMins = `0${posts[i].date.getMinutes()}`;
        } else {
          posts[i].correctMins = posts[i].date.getMinutes();
        }
      }

      res.render('thread', {
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
      for (let i = 0; i < replies.length; i += 1) {
        if (replies[i].date.getMinutes() < 10) {
          // eslint-disable-next-line no-param-reassign
          replies[i].correctMins = `0${replies[i].date.getMinutes()}`;
        } else {
          // eslint-disable-next-line no-param-reassign
          replies[i].correctMins = replies[i].date.getMinutes();
        }
      }
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
