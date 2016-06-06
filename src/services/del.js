import es from './es'
import config from 'config'

export default function(id) {
    return es.delete({
        index: config.search.writeAlias,
        type: config.search.type,
        id: id,
        ignore: [404]
    });
}