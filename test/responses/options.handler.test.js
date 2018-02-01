const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option handler', () => {
  it('handler is custom function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: {
        responses: responses({
          handler: (ctx, next, { response, errors }) => {
            ctx.response.body = response;
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
      .expect(200);
  });
});
