const Ajv = require('ajv-oai');

const schema = {
  description: 'pet response',
  type: 'object',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      required: ['name', 'id'],
      properties: {
        name: { type: 'string' },
        tag: { type: 'string' },
        id: { type: 'integer', format: 'int64' },
      },
    },
    // {
    //   type: 'object',
    //   allOf:
    //     [{
    //       type: 'object',
    //       required: ['name'],
    //       properties: { name: { type: 'string' }, tag: { type: 'string' } }
    //     },
    //     {
    //       required: ['id'],
    //       properties: { id: { type: 'integer', format: 'int64' } }
    //     }],
    // },
  },
};

const ajv = new Ajv();

console.log(ajv.compile(schema)('aa'));
