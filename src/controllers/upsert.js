const upsert = require('../services/upsert');

module.exports = async (ctx) => {
    const body = ctx.request.body;

    ctx.assert(body.id, 400, 'missing body.id');

    await upsert(body.id, body);
    ctx.status = 200;
}
