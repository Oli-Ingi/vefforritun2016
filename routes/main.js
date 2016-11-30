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

module.exports = router;
