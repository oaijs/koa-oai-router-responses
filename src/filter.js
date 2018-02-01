const Ajv = require('ajv-oai');
const each = require('lodash.foreach');
const isPlainObject = require('lodash.isplainobject');
const isFunction = require('lodash.isfunction');

/**
 * Get ajv instance.
 * @param {object|function} ajv -
 *  if `ajv` is object just optioins.
 *  if `ajv` is function must be a ajv factory with (Ajv) arguments and return a ajv instance.
 */
function getAjv(ajv) {
  let validator = null;
  const preset = { logger: false };

  // Call custom factory to create
  if (isFunction(ajv)) {
    validator = ajv(Ajv);
  } else if (isPlainObject(ajv)) {
    validator = new Ajv(Object.assign({}, ajv, preset));
  } else {
    validator = new Ajv(preset);
  }

  return validator;
}

/**
 * Get compiled responses validator.
 * @param {object} ajv ajv instance.
 * @param {*} responseSchemas responseSchemas
 */
function getValidators(ajv, responseSchemas) {
  const obj = {};
  each(responseSchemas, (responseSchema, statusCode) => {
    const schema = responseSchema.schema ? responseSchema.schema : {};
    obj[String(statusCode)] = ajv.compile(schema);
  });

  return obj;
}

/**
 * Get schema by status code
 * @param {string} status statusCode
 * @param {object} filed response schemas
 */
function getValidate(status, filed) {
  const statusCode = String(status);

  return filed[statusCode] || filed.default;
}

/**
 * Get validators by ajv and response schemas
 * @param {object|function} ajv
 * @param {*} responseSchemas
 */
function getValidatorsQuick(ajv, responseSchemas) {
  const validator = getAjv(ajv);

  return getValidators(validator, responseSchemas);
}

module.exports = {
  getAjv,
  getValidatorsQuick,
  getValidators,
  getValidate,
};
