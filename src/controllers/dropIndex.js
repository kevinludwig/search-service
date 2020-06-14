const dropIndex = require('../services/dropIndex');

module.exports = async (ctx) => {
    await dropIndex();
    ctx.status = 200;
}
