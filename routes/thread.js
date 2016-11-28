const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) => {
  res.render('thread', { title: 'Express' });
});

module.exports = router;
