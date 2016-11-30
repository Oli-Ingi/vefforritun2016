const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const DBMan = require('../DBManager');

router.get('/:id', (req, res) => {
  DBMan.postWithReplies(req.params.id)
    .then((data) => {
      const post = data[0];
      const replies = data[1];

      res.render('post', {
        post,
        replies,
      })
    })
    .catch((error) => {
      res.render("error", { error });
    })
});

router.post('/:id', (req, res) => {
  const newReply = {
    postId: req.params.id,
    author: req.body['reply-author'],
    text: req.body['reply-text'],
  };

  DBMan.saveThread(newReply)
    .then((data) => {
      res.redirect('/thread/post/' + data.id);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
