
var request = require('supertest');
var api = require('../index.js');


describe('GET /result', function(){
     //this.timeout(15000);
  it('should respond with a single result Page', function(done){
    var app = api;

    request(app.listen())
    .get('/result?rollno=0000000')
    .set('Accept-Encoding', 'gzip')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end(function(err, res){
    if (err) throw err;
    else {
        done();
    }
  });
  })
})

describe('GET /phone', function(){
  it('should respond with a single result', function(done){
    var app = api;

    request(app.listen())
    .get('/phone?phone=0000000') // No actual no.s are written here for privacy reasons
    .set('Accept-Encoding', 'gzip')
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8')
    .end(function(err, res){
    if (err) throw err;
    else {
        done();
    }
  });
  })
})