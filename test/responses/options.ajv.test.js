const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option ajv', () => {
  it('ajv is function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: {
        responses: responses({
          ajv: (Ajv) => {
            return new Ajv();
          },
        }),
        middleware: middleware(),
      },
      options: {
        middleware: './test/responses/controllers',
      },
    });

    await request
      .get('/api/pets')
      .expect(500);
  });

  it('ajv is object, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: {
        responses: responses({
          ajv: { logger: true },
        }),
        middleware: middleware(),
      },
      options: {
        middleware: './test/responses/controllers',
      },
    });

    await request
      .get('/api/pets')
      .expect(500);
  });
});
