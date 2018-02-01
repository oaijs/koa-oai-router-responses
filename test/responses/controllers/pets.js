
async function findPets(ctx, next) {
  ctx.response.body = 'find success';
}

async function findPetsOk(ctx, next) {
  ctx.response.body = [{
    id: 1234,
    name: 'luck',
    tag: 'dog',
  }];
}

async function findPetsDefault(ctx, next) {
  ctx.response.body = {
    code: -1,
    message: 'what?',
  };
}

async function addPet(ctx, next) {
  ctx.throw(401, 'Not login');
}

module.exports = {
  findPets,
  findPetsOk,
  findPetsDefault,
  addPet,
};
