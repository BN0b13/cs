const express = require('express');
const path = require('path');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res) => {
  const homepage = (path.join(process.cwd(), '/public/html/index.html'));
  res.sendFile(homepage);
});

module.exports = router;