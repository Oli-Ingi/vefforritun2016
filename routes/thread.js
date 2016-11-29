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
      })
    })
    .catch((error) => {
      res.render("error", { error });
    })
});

module.exports = router;
