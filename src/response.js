const Plugin = require('koa-oai-router').Plugin;
const compose = require('koa-compose');

const defaultHandler = require('./handler');
const { getValidatorsQuick, getValidate } = require('./filter');


async function track(ctx, next) {
  try {
    await next();

    ctx.oaiTmp = ctx.response.body;
  } catch (error) {
    ctx.oaiTmp = error;

    // since we handled this manually we'll want to delegate to the regular app
    // level error handling as well so that centralized still functions correctly.
    ctx.app.emit('error', error, ctx);
  }
}

/**
 * Response validator
 * @param {object} args
 * @param {function} args.ajv options of ajv or factory of ajv.
 * @param {function} args.handler custom response handler.
 */
class ResponsePlugin extends Plugin {
  constructor() {
    super();

    this.pluginName = 'responses';
    this.field = 'responses';
  }

  async handler(docOpts) {
    const {
      handler = defaultHandler,
      ajv,
    } = this.args || {};
    const { fieldValue } = docOpts;
    const fieldValidators = getValidatorsQuick(ajv, fieldValue);

    return compose([async (ctx, next) => {
      await next();

      const response = ctx.oaiTmp;
      delete ctx.oaiTmp;

      const validate = getValidate(ctx.response.status, fieldValidators);
      const validRet = validate(response);
      const errors = validate.errors;

      // valid success, go next;
      if (!validRet) {
        handler(ctx, Object.assign({}, docOpts, { response, errors }));
      }
    }, track]);
  }
}

module.exports = ResponsePlugin;
