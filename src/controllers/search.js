const search = require('../services/search');

module.exports = async (ctx) => {
    const {
        skip = 0, limit = 25
    } = ctx.request.query;
    ctx.body = await search(ctx.params.term, skip, limit);
}
