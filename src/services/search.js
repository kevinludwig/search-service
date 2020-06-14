const es = require('./es'),
    query = require('./query'),
    config = require('config');

module.exports = async (term, skip, limit) => {
    const results = await es.search({
        index: config.search.readAlias,
        type: config.search.type,
        body: {
            query: query(term)
        }
    });

    return {
        results: results.hits.hits.map(r => r._source),
        skip,
        limit
    };
}
