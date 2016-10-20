var express = require('express');
var router = express.Router();
var request = require('request');
var f = require('fs');
var slug = require('slug');
var rimraf = require('rimraf');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
      request(uri).pipe(f.createWriteStream(filename)).on('close', callback);
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skycams' });
});

var re= function(){
    var a = Math.ceil(Math.random() * 10) - 1;
    if (a < 0) a = 0;
    return a
}

router.post('/', function(req, res, next) {
  if (req.body.imgurl) {
    var filename = slug(req.body.imgurl);

    var filename2 = filename+""+re()+""+re()+""+""+re()+""+re()+""+re();

    rimraf("public/temp/"+filename+"*", {}, function(){
      download(req.body.imgurl,"public/temp/" +filename2, function(e) {
        if (e) {
          res.send('');
        }
        else
          res.send("temp/"+filename2);
      })
    });

  }
});
module.exports = router;
