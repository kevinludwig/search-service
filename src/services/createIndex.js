import es from './es'
import config from 'config'
import schema from './schema'

export default function*() {
    let exists = yield es.indices.exists({
        index: config.search.index,
        type: config.search.type
    });
    if (!exists) {
        // create the index
        yield es.indices.create({
            index: config.search.index,
            type: config.search.type,
            body: schema
        });

        // delete any writeAlias that might be hanging around
        yield es.indices.deleteAlias({
            index: '_all',
            name: config.search.writeAlias,
            ignore: [404]
        });

        // set up the new write alias
        yield es.indices.putAlias({
            index: config.search.index,
            name: config.search.writeAlias
        });
    }
    return Promise.resolve({});
}
