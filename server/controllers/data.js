const express = require('express')
  , router = express.Router()
  , path = require('path')
  , dm = require('../models/merge');

const appDir = path.dirname(require.main.filename);

router.get('/api/mergeData', (req, res) => {
  dm.mergeGeoJSON();
  res.send('merged');
});


router.get('/api/getData', (req, res) => {
  // const child = require("child_process").spawnSync;
  // var process = child('python', [appDir + "\\models\\python\\clip.py",
  // req.query.county]);
  const child = require("child_process").spawnSync;
  var process = child('python', ["D:\ReactApps\hackathon\medalus\server\models\python\clip.py", req.query.county]);

  //Takes stdout data from script which executed 
  //with arguments and logs it
//   process.stdout.on('data', function(data) { 
//     res.send(data.toString()); 
// } ) 

//  process.on('exit', function(exit) {
//     console.log('exited with code: ' + exit)
//     dm.mergeGeoJSON();
//     console.log("geojsons merged");
//   })
  if(process.stderr != null){
    var errorText = process.stderr.toString().trim();
    if (errorText) {
      console.log('Fatal error from `git log`.  You must have one commit before deploying.');
      throw new Error(errorText);
    }
  }
  


});

module.exports = router