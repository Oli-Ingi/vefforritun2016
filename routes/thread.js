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

router.post('/:id', (req, res) => {
  const newPost = {
    threadId: req.params.id,
    postName: req.body['new-title'],
    author: req.body['new-author'],
    text: req.body['new-post'],
  };

  DBMan.savePost(newPost)
    .then((data) => {
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
      console.log(replies);
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
  console.log("anybody here?");
  const newReply = {
    postId: req.params.id,
    author: req.body.author,
    text: req.body.text,
  };
  console.log(newReply.postId);
  console.log(newReply.author);
  console.log(newReply.text);
  console.log("We're here in post replies!");
  DBMan.saveReply(newReply)
    .then((data) => {
      console.log("inside then of newReply");
      DBMan.getReply(data.id)
        .then((reply) => {  
          console.log("inside then of getReply");
          res.render('_reply', { reply })
        })
        .catch((error) => {
          console.log("inside error of getReply");
          console.log(error.stack);
          res.render('error', { error });
        })
    })
    .catch((error) => {
      console.log(error.stack);
      res.render('error', { error });
    })
})

module.exports = router;
