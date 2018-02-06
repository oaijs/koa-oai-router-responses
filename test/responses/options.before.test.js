const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option before', () => {
  it('before is custom function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          before: (ctx) => {
            ctx.throw(500, 'just for fun.');
          },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(500);
  });
});
