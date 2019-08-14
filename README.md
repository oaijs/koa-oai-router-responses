# Koa-OAI-Router-Responses

[license-img]: http://img.shields.io/badge/license-MIT-green.svg
[license-url]: http://opensource.org/licenses/MIT

[node-image]: https://img.shields.io/badge/node.js-v7.6.0-blue.svg
[node-url]: http://nodejs.org/download/

[npm-img]: https://img.shields.io/npm/v/koa-oai-router-responses.svg
[npm-url]: https://npmjs.org/package/koa-oai-router-responses

[travis-img]: https://travis-ci.org/oaijs/koa-oai-router-responses.svg
[travis-url]: https://travis-ci.org/oaijs/koa-oai-router-responses

[coveralls-img]: https://coveralls.io/repos/github/oaijs/koa-oai-router-responses/badge.svg
[coveralls-url]: https://coveralls.io/github/oaijs/koa-oai-router-responses

[downloads-image]: https://img.shields.io/npm/dm/koa-oai-router-responses.svg
[downloads-url]: https://npmjs.org/package/koa-oai-router-responses

[david-img]: https://img.shields.io/david/oaijs/koa-oai-router-responses.svg
[david-url]: https://david-dm.org/oaijs/koa-oai-router-responses

[router]: https://github.com/BiteBit/koa-oai-router

[resp]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#responses-object
[ajv]: https://github.com/epoberezkin/ajv
[ajv-error]: https://github.com/epoberezkin/ajv#error-objects

[![License][license-img]][license-url]
[![Node Version][node-image]][node-url]
[![NPM Version][npm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
[![Test Coverage][coveralls-img]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![Dependency Status][david-img]][david-url]

Responses validator plugin for [koa-oai-router][router].

# Installation
```bash
npm i koa-oai-router-responses --save
```

# Info
|field|type|info|
|---|---|---|
|name|`string`|`responses`|
|evoked fields|`string`| `responses`|
|evoked value|`object`| [OpenApi responses object][resp]|
|options|`object`| `ajv`, `before`, `after` |

* `options` `{object}`
  * `enable` `{boolean}` Enable or disable ajv validator.
  * `ajv` `{object|function}` `object` Options of [Ajv][ajv]. `function` is a factory with arguments `(Ajv)` and must return a ajv instance.
  * `before` `{function}` Before validte. Having arguments `(ctx, {catched, data, validRet, validErrs, endpoint, field, fieldValue, operation, operationValue})`.
    * `catched` `{boolean}` unexpected error.
    * `data` `{any}` response body or error.
    * `validRet` `{boolean}` valid result.
    * `validErrs` `{[object]}` valid errors.
    * `endpoint` `{string}`
    * `field` `{string}`
    * `fieldValue` `{object}`
    * `operation` `{string}`
    * `operationValue` `{object}`
  * `after` `{function}` After validte.

---

Simple code:
```js
const Koa = require('koa');
const Router = require('koa-oai-router');
const middlewareLoader = require('koa-oai-router-middleware');
const responsesHandler = require('koa-oai-router-responses');

const app = new Koa();
const router = new Router({
  apiDoc: './api',
});

router.mount(responsesHandler());
router.mount(middlewareLoader('./controllers'));

app.use(bodyParser());
app.use(router.routes());
```
