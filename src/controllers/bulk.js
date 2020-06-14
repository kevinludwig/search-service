const upsert = require('../services/bulk');

module.exports = async(ctx) => {
    const body = ctx.request.body;

    ctx.assert(body.content, 400, 'missing body.content');
    ctx.assert(Array.isArray(body.content), 400, 'body.content must be array');
    ctx.assert(body.content.every((elem) => elem.id), 400, 'all body.content elems must have id');

    await bulk(body.content);
    ctx.status = 200;
}
