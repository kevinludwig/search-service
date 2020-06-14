const createIndex = require('../services/createIndex');

module.exports = async (ctx) => {
    await createIndex();
    ctx.status = 200;
}
