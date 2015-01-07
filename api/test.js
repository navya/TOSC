
var request = require('supertest');
var api = require('../index.js');


describe('GET /single', function(){
  it('should respond with a single result', function(done){
    var app = api;

    request(app.listen())
    .get('/result')
    .query({ rollno: 'new' })
    .set('Accept-Encoding', 'gzip')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
    if (err) throw err;
    else {
        if (!('_id' in res.body)) return "missing id";
    if (!('rollno' in res.body)) throw new Error("missing rollno");
        done();
    }
  });
  })
})

describe('GET /phone', function(){
  it('should respond with a single result', function(done){
    var app = api;

    request(app.listen())
    .get('/phone')
    .query({ phone: '00000000' }) // No actual no.s are written here for privacy reasons
    .set('Accept-Encoding', 'gzip')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
    if (err) throw err;
    else {
        if (!('_id' in res.body)) return "missing id";
    if (!('phone' in res.body)) throw new Error("missing phone");
        done();
    }
  });
  })
})