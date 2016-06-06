import es from './es'
import config from 'config'

export default function*() {
    let exists = yield es.indices.existsAlias({
        index: '_all',
        name: config.search.readAlias
    });
    if (exists) {
        // atomic alias swap
        return es.indices.updateAliases({
            body: {
                actions: [{
                    remove: {
                        index: '_all',
                        alias: config.search.readAlias
                    }
                }, {
                    add: {
                        index: config.search.index,
                        alias: config.search.readAlias
                    }
                }]
            }
        });
    } else {
        return es.indices.putAlias({
            index: config.search.index,
            name: config.search.readAlias
        });
    }
}