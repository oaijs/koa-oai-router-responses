const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('responses default', () => {
  it('response is valid, should ok', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
      },
    });

    await request
      .get('/api/pets-ok')
      .expect(200);
  });

  it('response is invalid, should error', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
      },
    });

    const ret = await request
      .get('/api/pets')
      .expect(500);

    expect(ret.body).toHaveProperty('message');
    expect(ret.body).toHaveProperty('errors');
    expect(ret.body).toHaveProperty('response');
  });

  it('response is throw error, should error', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
      },
    });

    const ret = await request
      .post('/api/pets')
      .expect(500);

    expect(ret.body).toHaveProperty('message');
    expect(ret.body).toHaveProperty('errors');
    expect(ret.body).toHaveProperty('response');
  });

  it('response status code not found, use default schema, should ok', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
      },
    });

    await request
      .get('/api/pets-default')
      .expect(200);
  });

  it('response model have not `schema` object, should ok', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
      },
    });

    await request
      .get('/api/pets-no-schema')
      .expect(200);
  });
});
