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

  it('GET / All', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
  it('GET / bad ID', (done) => {
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
  it('GET / ID not found', (done) => {
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
  it('GET / Id Correct', (done) => {
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
  it('POST / field missing', (done) => {
    request(app)
      .post('/users')
      .send({
        lastname: "",
        ordinal_number: ""
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Necessary fields are empty' }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('POST / Correct', (done) => {
    request(app)
      .post('/users')
      .send({
        lastname: "Rousseau",
        ordinal_number: "654321"
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), lastname: "Rousseau", ordinal_number: "654321" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('PUT / bad ID', (done) => {
    request(app)
      .put('/users/noId')
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: "No correct ID" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('PUT / ID not found', (done) => {
    request(app)
      .put('/users/15')
      .send({
        firstname: 'René'
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'User ID not found' }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('PUT / Id Correct', (done) => {
    request(app)
      .put('/users/1')
      .send({
        firstname: 'René'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Changed row 1' }
        expect(response.body).toEqual(expected)
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


it('POST / field missing from purchasesOrders', (done) => {
  request(app)
    .post('/purchasesOrders')
    .send({
      DVM_id: "",
      quantity: ""
    })
    .expect(400)
    .expect('Content-Type', /json/)
    .then(response => {
      const expected = { message: 'Necessary fields are empty' }
      expect(response.body).toEqual(expected);
      done();
    });
});

it('POST / Correct from purchasesOrders', (done) => {
  request(app)
    .post('/purchasesOrders')
    .send({
      DVM_id: "1",
      quantity: "10"
    })
    .expect(201)
    .expect('Content-Type', /json/)
    .then(response => {
      const expected = { id: expect.any(Number), DVM_id: "1", quantity: "10" }
      expect(response.body).toEqual(expected);
      done();
    });
});