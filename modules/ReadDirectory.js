var fs = require('fs');
module.exports = function(dir,enc){
  return new Promise(function (res, rej){
    fs.readdir(dir, enc, function (err, files){
      if (err) rej(err);
      else res(files);
    });
  });
}