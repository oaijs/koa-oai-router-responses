const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option handler', () => {
  it('handler is custom function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          handler: (ctx, { response, errors }) => {
            ctx.response.body = response;
          },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(200);
  });
});
