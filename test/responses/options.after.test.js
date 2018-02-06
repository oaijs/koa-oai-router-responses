const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option after', () => {
  it('after is custom function, should success', async () => {
    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          after: (ctx, { catched, validRet, validErrs }) => {
            ctx.throw(401, 'go away..');
          },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(401);
  });
});
