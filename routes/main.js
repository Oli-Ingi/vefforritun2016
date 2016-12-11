const express = require('express');
const DBMan = require('../DBManager');
// disable-um linter þar sem við verðum að nota Router með stóru 'R' til
// að geta sótt og notað express.Router
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  DBMan.getThreads()
    .then((threads) => {
      const title = 'The Mega Forum';

      res.render('main', {
        title,
        threads,
      });
    })
    .catch((error) => {
      res.render('error', { error });
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
      res.redirect(`/thread/${data.id}`);
    })
    .catch((error) => {
      res.render('error', { error });
    });
});

module.exports = router;
