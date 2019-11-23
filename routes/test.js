const express = require('express');
const router = express.Router();

const testData = [{id: 1, name: 'asd'}];

router.get('/', (req, res) => {
  res.render('index', {title: 'My Express Demo', message: 'Hello'});
});

router.post('/', (req, res) => {
  const data = {
    id: testData.length + 1,
    name: req.body.name,
  };
  testData.push(data);
  console.log(req.query);
  res.send(data);
});

module.exports = router;
