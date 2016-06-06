import es from './es'
import config from 'config'

export default function*(id, skip, limit) {
    let results = yield es.search({
        index: config.search.readAlias,
        type: config.search.type,
        body: {
            query: {
                more_like_this: {
                    fields: ['title', 'tags', 'description'],
                    like: [
                        _index: config.search.readAlias,
                        _type: config.search.type,
                        _id: id
                    ],
                    min_term_frequency: 1,
                    max_query_terms: 10,
                    analyzer: 'text_analyzer'
                }
            },
            from: skip,
            size: limit
        }
    });

    Promise.resolve({
        skip: skip,
        limit: limit,
        total: results.hits.total, 
        results: results.hits.hits.map((hit) => {
            return hit._source;
        }
    });
}
