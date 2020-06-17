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

/* ------------------ ACTIVITIES TESTS --------------------- */


describe('Test Activities:', () => {
  const testActivities = { title: "echographie", description: "lorem ipsum", logo: null };
  beforeEach((done) => 
    connection.query('SET FOREIGN_KEY_CHECKS = 0', () => 
      connection.query('TRUNCATE Activities', () =>
        connection.query('SET FOREIGN_KEY_CHECKS = 1', () =>
          connection.query('INSERT INTO Activities SET ?', testActivities, done)
        )
      )
    )
  );
  it('GET / All Activities', (done) => {
    request(app)
      .get('/activities')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
  it('GET / Id Activities: bad ID', (done) => {
    request(app)
      .get('/activities/noId')
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: "No correct ID" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('GET / Id Activities: ID not found', (done) => {
    request(app)
      .get('/activities/8')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: "Activities ID not found" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  it('GET / Id Activities: Correct', (done) => {
    request(app)
      .get('/activities/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), title: "echographie", description: "lorem ipsum", logo: null }
        expect(response.body[0]).toEqual(expected);
        done();
      });
  });
  it('POST / Correct', (done) => {
    request(app)
      .post('/activities')
      .send({
        title: "médecine spécialisée"
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), title: "médecine spécialisée" }
        expect(response.body).toEqual(expected);
        done();
      });
  });
  /* NOT WORKING
  it('POST / Missing necessary field', (done) => {
    request(app)
      .post('/activities')
      .send({
        title: ""
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: "Necessary fields are empty" }
        expect(response.body).toEqual(expected);
        done();
      });
  });*/
  it('PUT / Bad ID', (done) => {
    request(app)
      .put('/activities/noId')
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected =  { message: "No correct ID" }
        expect(response.body).toEqual(expected)
        done();
      });
  });
  it('PUT / ID not found', (done) => {
    request(app)
      .put('/activities/8')
      .send({
        title: "radiographie"
      })
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'User ID not found' }
        expect(response.body).toEqual(expected)
        done();
      });
  });

});