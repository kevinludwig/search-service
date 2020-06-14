const config = require('config'),
    es = require('./es');

module.exports = () => {
    return es.indices.delete({
        index: config.search.index,
        ignore: [404]
    });
}
