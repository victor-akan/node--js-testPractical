const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');


// Create a contact
describe('Creating user', function () {
    let object = {
        "name": "Victor",
        "phone_number": "09023444678",
        'email': 'victorakan70@gmail.com'
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/')
            .send(object)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


describe('Contact', function(){
   // Testing get all contact endpoint
  describe('Get all contact List', function () {
      it('respond with json containing a list of all users', function (done) {
          request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });

   // Testing get a contact endpoint
  describe('Get a contact with an existing id', function () {
      it('respond with json containing a list of all users', function (done) {
          request(app)
            .get('/:id')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });

  //Testing get a user endpoint by giving a non-existing user
  describe(' Get a non-existing user/:idDosntExist', function () {
    it('return user not found', function (done) {
        request(app)
        .get('/idDosntExist')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404) //expecting HTTP status code
        .expect('"user not found"') // expecting content value
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
  });



});