const es = require('./es'),
    config = require('config'),
    schema = require('./schema'),
    getIndex = require('./getIndex');

module.exports = async () => {
    const exists = await es.indices.exists({
        index: config.search.index,
        type: config.search.type
    });
    if (!exists) {
        await es.indices.create({
            index: config.search.index,
            type: config.search.type,
            body: schema
        });
    }

    return getIndex();
}
