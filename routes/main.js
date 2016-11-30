const express = require('express');
const DBMan = require('../DBManager');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  DBMan.getThreads()
    .then((threads) => {
      res.render('main', { threads });
    })
    .catch((error) => {
      res.send('Error');
    });
});

router.post('/', (req, res) => {
  const newThread = {
    threadName: req.body['thread-title'],
    author: req.body['thread-author'],
    description: req.body['thread-description'],
  };

  DBMan.saveThread(newThread)
    .then((data) => {
      res.redirect('/thread/' + data.id);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
