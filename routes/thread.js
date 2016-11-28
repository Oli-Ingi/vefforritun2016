const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

function capitalize(str) {
  if (str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }
  return str;
}

router.get('/:name', (req, res) => {
  const threadTitle = capitalize(req.params.name);

  // DBManager(title); get all that is needed from DBManager to render page
  res.render('thread', { threadTitle });
});


module.exports = router;
