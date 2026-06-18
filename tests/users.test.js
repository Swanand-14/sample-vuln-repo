const request = require('supertest');
const app = require('../server');

describe('User routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password123' });
    expect(res.statusCode).toBe(201);
  });

  it('should log in an existing user', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ username: 'loginuser', password: 'password123' });

    const res = await request(app)
      .post('/api/users/login')
      .send({ username: 'loginuser', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should return health check ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });
});
