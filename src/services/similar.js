import es from './es'
import {
    similar
} from './query'
import config from 'config'

export default function*(id, skip, limit) {
    let results = yield es.search({
        index: config.search.readAlias,
        type: config.search.type,
        body: {
            query: similar(id),
            from: skip,
            size: limit
        }
    });

    return Promise.resolve({
        skip: skip,
        limit: limit,
        total: results.hits.total,
        results: results.hits.hits.map((hit) => {
            return hit._source;
        })
    });
}