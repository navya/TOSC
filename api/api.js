var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/mydb');
var views = require('co-views');
var render = views(__dirname + '/../' + "templates", { ext: "ejs" });



var result = wrap(db.get('results'));

/**
 * GET a single result.
 */
exports.result = function *(){
  if(this.request.query.rollno){ 
  var res = yield result.findOne({ "Rollno" : this.request.query.rollno });
 this.body = yield render('result.ejs', { "res": res});
  } else {
    this.response.status = yield render('result.ejs', { "res": 0});
  }
};


exports.phone = function *(){
  if(this.request.query.phone){
  var res = yield result.findOne({ "Phone Number" : this.request.query.phone });
 this.body = yield render('result.ejs', { "res": res});
  } else {
    this.response.status = yield render('result.ejs', { "res": 0});
  }
};

exports.home = function *(){
 this.body = yield render('home.ejs');
};