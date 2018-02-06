const middleware = require('koa-oai-router-middleware');

const { init } = require('../helpers');
const responses = require('../..');

describe('option enable', () => {
  it('enable is false, should success', async () => {
    let valid = false;

    const { request } = await init({
      apiDoc: './test/responses/api',
      plugins: [
        responses,
        middleware,
      ],
      options: {
        middleware: './test/responses/controllers',
        responses: {
          enable: false,
          after: (ctx, { validRet, validErrs, data }) => {
            ctx.response.body = data;
            valid = validRet;
          },
        },
      },
    });

    await request
      .get('/api/pets')
      .expect(200);

    expect(valid).toBe(true);
  });
});
