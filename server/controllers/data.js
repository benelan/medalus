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
  const spawn = require("child_process").spawnSync;
  var cp = spawn('python', [appDir + "\\models\\python\\clip.py",
  req.query.county],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr],
    encoding: 'utf-8'
});

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

  console.log(cp.stdout.toString().trim());

  var errorText = cp.stderr.toString().trim();

	if (errorText) {
	  throw new Error(errorText);
	}
});

module.exports = router