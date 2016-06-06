import config from 'config'
import es from './es'

export default function() {
    return es.indices.delete({
        index: config.search.index,
        ignore: [404]
    });
}