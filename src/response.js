const Plugin = require('koa-oai-router').Plugin;
const compose = require('koa-compose');

const defaultHandler = require('./handler');
const { getValidatorsQuick, getValidate } = require('./filter');


async function track(ctx, next) {
  try {
    await next();

    ctx.oaistack = {
      catched: false,
      data: ctx.response.body,
    };
  } catch (error) {
    ctx.oaistack = {
      catched: true,
      data: error,
    };

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
      enable = true,
      before = () => { },
      after = defaultHandler,
      ajv,
    } = this.args || {};
    const { fieldValue } = docOpts;
    const fieldValidators = getValidatorsQuick(ajv, fieldValue);

    return compose([async (ctx, next) => {
      await next();

      const { catched, data } = ctx.oaistack;
      delete ctx.oaistack;

      let validRet = true;
      let validErrs = [];

      await before(ctx, Object.assign({}, docOpts, { catched, data }, { validRet, validErrs }));

      if (enable) {
        const validate = getValidate(ctx.response.status, fieldValidators);
        validRet = validate(data);
        validErrs = validate.errors;
      }

      await after(ctx, Object.assign({}, docOpts, { catched, data }, { validRet, validErrs }));
    }, track]);
  }
}

module.exports = ResponsePlugin;
