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
  const newThread = new DBMan.Thread(req.body.threadtitle, req.body.threadauthor, req.body.threaddescription);
  DBMan.saveThread(newThread)
    .then( (data) => {
      res.redirect('/'+data.id);
    })
    .catch((error) => {
      res.sent("Error");
    });
});

module.exports = router;
