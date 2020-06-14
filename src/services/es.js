const elasticsearch = require('elasticsearch'),
    config = require('config');

module.exports = new elasticsearch.Client({
    host: config.search.host,
    log: config.search.log
});
