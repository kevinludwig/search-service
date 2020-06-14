const getIndex = require('../services/getIndex');

module.exports = async (ctx) => {
    ctx.body = await getIndex();
}
