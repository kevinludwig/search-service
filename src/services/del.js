const es = require('./es'),
    config = require('config');

module.exports = (id) => {
    return es.delete({
        index: config.search.writeAlias,
        type: config.search.type,
        id: id,
        ignore: [404]
    });
}
