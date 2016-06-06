import es from './es'
import config from 'config'

export default function*(id, doc) {
    let result = yield es.index({
        index: config.search.writeAlias,
        type: config.search.type,
        id: doc.id,
        body: doc
    });
    return result;
}
