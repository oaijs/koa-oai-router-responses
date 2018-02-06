const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option ajv', () => {
  it('ajv is function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          ajv: (Ajv) => {
            return new Ajv();
          },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(200);
  });

  it('ajv is object, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          ajv: { logger: true },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(200);
  });
});
