var express = require('express');
// eslint-disable-next-line new-cap
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.render('main', { title: 'Express' });
});

module.exports = router;
