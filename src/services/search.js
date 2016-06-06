import es from './es'
import config from 'config'

export default function*(term, skip, limit) {
    yield results = es.search({
        index: config.search.readAlias,
        type: config.search.type,
        from: skip,
        size: limit,
        body: {
            query: {
                match: {
                    text: term
                }
            }
        }
    });

    return {
        total: hits.total,
        skip: skip,
        limit: limit,
        results: results.hits.hits.map((hit) => {
            return hit._source;
        })
    };
}