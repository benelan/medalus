var geojsonMerge = require('@mapbox/geojson-merge');
var fs = require("fs");
var path = require('path');

module.exports = {
  mergeGeoJSON: function () {
    // io paths
    var appDir = path.dirname(require.main.filename);
    var input = appDir + "/models/input/";
    var output = appDir + "/models/output/output.geojson"

    var jsons = [];

    // Loop through all the files in the input directory
    console.log("reading files");
    fs.readdir(input, function (err, files) {
      if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
      }

      files.forEach(function (file, index) {
        // get content from file
        var content = fs.readFileSync(input + file);
        //  parse the json
        var json = JSON.parse(content);
        // add the json to the array
        jsons.push(json);
      });

      console.log("merging ", jsons.length, "geojson files");
      // merge the array of jsons
      var mergedGeoJSON = geojsonMerge.merge(jsons);

      // write to a output geojson file
      fs.writeFile(output, JSON.stringify(mergedGeoJSON), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('merge successful, output created');
      });
    });
  }
}