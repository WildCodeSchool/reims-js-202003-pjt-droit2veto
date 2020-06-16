const request = require('supertest');
const app = require('../app');
const connection = require('../conf');

//npm run test:watch

describe('Test routes :', () => {
  it('GET / Bienvenue sur Express', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected ={message: 'Bienvenue sur Express'};
        expect(response.body).toEqual(expected);
        done();
      });
  });
});

describe('Test DVM_Legal_Entity :', () => {
  it('GET / All DVM_Legal_Entity', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
  it('GET / Id DVM_Legal_Entity : bad ID', (done) => {
    request(app)
      .get('/users/noId')
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = {message: "No correct ID"}
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('GET / Id DVM_Legal_Entity : ID not found', (done) => {
    request(app)
      .get('users/15424155')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = {message: 'User ID not found'}
        expect(response.body).toEqual(expected);
        done();
      })
  })
});


describe('Test Activities:', () => {
  it('GET / All Activities', (done) => {
    request(app)
      .get('/activities')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
});