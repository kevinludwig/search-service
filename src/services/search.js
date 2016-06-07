import es from './es'
import {
    aggs,
    query
} from './query'
import config from 'config'

export default function*(term, skip, limit) {
    let results = yield es.search({
        index: config.search.readAlias,
        type: config.search.type,
        body: {
            query: query(term),
            aggs: aggs(skip, limit)
        }
    });

    let rv = {
        skip: skip,
        limit: limit
    };
    results.aggregations.top_content_type.buckets.forEach((bucket) => {
        rv[bucket.key] = bucket.content_type_hits.hits.hits.map((hit) => {
            return hit._source;
        });
        rv[bucket.key + '_total'] = bucket.content_type_hits.hits.total;
    });
    return Promise.resolve(rv);
}