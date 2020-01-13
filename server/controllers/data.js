const express = require('express')
  , router = express.Router()
  , path = require('path')
  , cp = require("child_process")
  , dm = require('../models/merge');

const appDir = path.dirname(require.main.filename);

router.get('/api/mergeData', (req, res) => {
  dm.mergeGeoJSON();
  res.send('merged');
});


router.get('/api/getData', (req, res) => {
  // Amador
  // Yuba
  console.log("clipping for", req.query.county, "county")
  var spawn = cp.spawn('python', [appDir + "\\models\\python\\clip.py",
  req.query.county],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr],
    encoding: 'utf-8'
});

 spawn.on('exit', function(exit) {
    console.log('exited with code: ' + exit)
    if (exit == 0) { // only merge if arcy script was successful
      dm.mergeGeoJSON();
      console.log("geojsons merged");
    }
   
    res.json({"exitcode": exit})
  })

  // for sync testing
  // console.log(String(cp.stdout));
  // var errorText = String(cp.stderr);
	// if (errorText) {
	//   throw new Error(errorText);
	// }
});

module.exports = router