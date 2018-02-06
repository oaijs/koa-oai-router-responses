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
 * @param {object} param2.data error or response body
 */
function responseHandler(ctx, { catched, data }) {
  if (catched) {
    ctx.response.status = data.status || 500;
    ctx.response.body = data;
  }
}

module.exports = responseHandler;
