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
  const testDVM = { email: 'descartes@mail.com', ordinal_number: '123456', password: '1234' };
  const testDVM2 = { email: 'voltaire@mail.com', ordinal_number: '111111', password: '4321' };
  beforeEach((done) =>
    connection.query('SET FOREIGN_KEY_CHECKS = 0', () =>
      connection.query('TRUNCATE DVM_Legal_Entity', () =>
        connection.query('SET FOREIGN_KEY_CHECKS = 1', () =>
          connection.query('INSERT INTO DVM_Legal_Entity SET ?', testDVM, () =>
            connection.query('INSERT INTO DVM_Legal_Entity SET ?', testDVM2, done)
          )
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
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'User ID not found' }
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
      .then((response) => {
        expect(response.body.email).toEqual(testDVM.email)
        expect(response.body.ordinal_number).toEqual(testDVM.ordinal_number)
        done();
      });
  });
  it('POST / field missing', (done) => {
    request(app)
      .post('/users')
      .send({})
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
      .send(testDVM)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { ...testDVM, id: expect.any(Number) }
        delete expected.password
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
      .then(response => {
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
  it('POST / Necessary field empty', (done) => {
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
  });
  it('POST / Missing necessary field', (done) => {
    request(app)
      .post('/activities')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: "Necessary fields are empty" }
        expect(response.body).toEqual(expected);
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
  it('PUT / Correct Id', (done) => {
    request(app)
      .put('/activities/1')
      .send({
        title: "cardiologie"
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


// Activities_Products test

describe('Test Activities_Products', () => {
  it('GET / All Activities_Products', (done) => {
    request(app)
      .get('/activitiesproducts')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });

  it('GET / ID not found', (done) => {
    request(app)
      .get('/activitiesproducts/15')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Activities_Products ID not found' }
        expect(response.body).toEqual(expected);
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
  it('GET / Id purchasesOrders : bad ID', (done) => {
    request(app)
      .get('/purchasesOrders/noId')
      .expect(404)
      .then(response => {
        done();
      });
  });
  it('GET / Id purchasesOrders : ID not found', (done) => {
    request(app)
      .get('/purchasesOrders/2000')
      .expect(404)
      .then(() => {
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
        expect(response.body).toEqual(expected)
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
        done();
      });
  });
  it('POST / field null from purchasesOrders', (done) => {
    request(app)
      .post('/purchasesOrders')
      .send({

      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(() => {
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
});

//test routes products//

describe('Test products:', () => {
  it('GET / All products', (done) => {
    request(app)
      .get('/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        done();
      });
  });
});

describe('Test Products :', () => {
  const testDVM = { type_logo: "1", film_personnalisé_anesthésie: "1", film_personnalisé_activités: "0", WallOfFame_sticker: "0" };
  beforeEach((done) =>
    connection.query('SET FOREIGN_KEY_CHECKS = 0', () =>
      connection.query('TRUNCATE Products', () =>
        connection.query('SET FOREIGN_KEY_CHECKS = 1', () =>
          connection.query('INSERT INTO Products SET ?', testDVM, done)
        )
      )
    )
  );

  it('GET / Id products : ID not found', (done) => {
    request(app)
      .get('/products/15')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(() => {
        done();
      });
  });

  it('POST / Correct from products', (done) => {
    request(app)
      .post('/products')
      .send({
        type_logo: "1",
        film_personnalisé_anesthésie: 1,
        film_personnalisé_activités: 0,
        WallOfFame_sticker: 0
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), type_logo: "1", film_personnalisé_anesthésie: 1, film_personnalisé_activités: 0, WallOfFame_sticker: 0 }
        expect(response.body).toEqual(expected);
        done();
      });
  });


  it('GET / Id products : Correct', (done) => {
    request(app)
      .get('/products/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), type_logo: "1", film_personnalisé_anesthésie: 1, film_personnalisé_activités: 0, WallOfFame_sticker: 0 }
        expect(response.body[0]).toEqual(expected)
        done();
      });
  });

  it('PUT / ID not found from products', (done) => {
    request(app)
      .put('/products/15')
      .send({
        type_logo: "12"
      })
      .expect(404)
      .then(() => {
        done();
      });
  });
  it('PUT / Id Correct', (done) => {
    request(app)
      .put('/products/1')
      .send({
        type_logo: "12"
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