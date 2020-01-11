const express = require('express')
  , router = express.Router()
  , path = require('path')
  , dm = require('../models/merge');

const appDir = path.dirname(require.main.filename);

// this is our get method
router.get('/api/mergeData', (req, res) => {
  dm.mergeGeoJSON();
  res.send('merged');
});

router.get('/api/getData', (req, res) => {
  const { spawn } = require("child_process");
  var process = spawn('python', [appDir + "/models/python/test.py",
  req.query.county,
  req.query.name]);

  // Takes stdout data from script which executed 
  // with arguments and send this data to res object 
  process.stdout.on('data', function (data) {
    res.send(data.toString());
  })

 process.on('exit', function() {
    console.log('python script finished')
  })
});

module.exports = router