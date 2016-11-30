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
      res.send("Error");
    });
});

router.post('/', (req, res) => {
  const newThread = new DBMan.Thread(req.body.thread-title, req.body.thread-author, req.body.thread-description);
  const id = DBMan.saveThread(newThread)
    .then( (data) => {
      return data.id;
    })
    .catch((error) => {
      return 0;
    });
  res.redirect('/'+id);
});

module.exports = router;
