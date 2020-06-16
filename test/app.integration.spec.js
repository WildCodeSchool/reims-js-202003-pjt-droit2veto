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
        const expected = { message: 'Bienvenue sur Express' };
        expect(response.body).toEqual(expected);
        done();
      });
  });
});

describe('Test DVM_Legal_Entity :', () => {
  const testDVM = { lastname: 'Descartes', ordinal_number: '123456' };
  beforeEach((done) =>
    connection.query('SET FOREIGN_KEY_CHECKS = 0', () =>
      connection.query('TRUNCATE DVM_Legal_Entity', () =>
        connection.query('SET FOREIGN_KEY_CHECKS = 1', () =>
          connection.query('INSERT INTO DVM_Legal_Entity SET ?', testDVM, done)
        )
      )
    )
  );

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
        const expected = { message: "No correct ID" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('GET / Id DVM_Legal_Entity : ID not found', (done) => {
    request(app)
      .get('/users/15')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'User ID not found' }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('GET / Id DVM_Legal_Entity : Correct', (done) => {
    request(app)
      .get('/users/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), firstname: null, lastname: 'Descartes', ordinal_number: 123456 }
        expect(response.body[0]).toEqual(expected)
        done();
      });
  });
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

//test routes PurchasesOrders//

describe('Test purchasesOrders:', () => {
  it('GET / All purchasesOrders', (done) => {
    request(app)
      .get('/purchasesOrders')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
});

it('GET / Id purchasesOrders : bad ID', (done) => {
  request(app)
    .get('/purchasesOrders/noId')
    .expect(400)
    .expect('Content-Type', /json/)
    .then(response => {
      const expected = { message: "No correct ID" }
      expect(response.body).toEqual(expected);
      done();
    });
});

it('GET / Id purchasesOrders : ID not found', (done) => {
  request(app)
    .get('/purchasesOrders/15')
    .expect(404)
    .expect('Content-Type', /json/)
    .then(response => {
      const expected = { message: 'PurchasesOrders ID not found' }
      expect(response.body).toEqual(expected);
      done();
    });
});

it('GET / Id purchasesOrders : Correct', (done) => {
  request(app)
    .get('/purchasesOrders/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .then(response => {
      const expected = { DVM_id: expect.any(Number), id: expect.any(Number), quantity: expect.any(Number), }
      expect(response.body[0]).toEqual(expected)
      done();
    });
});
