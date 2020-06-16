const request = require('supertest');
const app = require('../app');
const connection = require('../conf');

//npm run test:watch

describe('Test routes', () => {
  it('GET / Bienvenu sur Express', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .then(response => {
        const expected ='Bienvenue sur Express';
        expect(response.body).toEqual(expected);
        done();
      });
  });
}); 