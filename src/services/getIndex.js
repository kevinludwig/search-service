const es = require('./es'),
    config = require('config');

module.exports = () => {
    return es.indices.get({
        index: config.search.index
    });
}
