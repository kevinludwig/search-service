import es from './es'
import config from 'config'

export default function() {
    return es.indices.get({
        index: config.search.index
    });
}
