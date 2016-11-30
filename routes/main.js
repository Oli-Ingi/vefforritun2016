const express = require('express');
const DBMan = require('../DBManager');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  DBMan.threadsWithCount()
    .then((data) => {
      const counter = data[0];
      const threads = data[1];

      res.render('main', {
        counter,
        threads,
      });
    })
    .catch((error) => {
      res.send("Error");
    });
});

module.exports = router;
