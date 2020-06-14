const es = require('./es'),
    config = require('config');

module.exports = (id, doc) => {
    return es.index({
        index: config.search.writeAlias,
        type: config.search.type,
        id: doc.id,
        body: doc
    });
}
