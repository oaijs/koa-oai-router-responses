/**
 * Default response handler
 * @param {object} ctx
 * @param {function} next
 * @param {object} param2
 * @param {string} param2.endpoint
 * @param {string} param2.field
 * @param {object} param2.fieldValue
 * @param {string} param2.operation
 * @param {object} param2.operationValue
 * @param {object} param2.response error or response body
 * @param {object} param2.errors
 */
function responseHandler(ctx, { response, errors }) {
  ctx.response.status = 500;
  ctx.response.body = {
    message: 'Response body invalid, please check the api doc.',
    errors,
    response,
  };
}

module.exports = responseHandler;
