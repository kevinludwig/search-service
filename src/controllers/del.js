const del = require('../services/del');

module.exports = async(ctx) => {
    await del(ctx.request.params.id);
    ctx.status = 200;
}
