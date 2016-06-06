import es from './es'
import config from 'config'
import schema from './schema'
import getIndex from './getIndex'

function* establishWriteAlias() {
    let exists = yield es.indices.existsAlias({
        index: '_all',
        name: config.search.writeAlias
    });

    if (exists) {
        yield es.indices.deleteAlias({
            index: '_all',
            name: config.search.writeAlias,
            ignore: [404]
        });
    }

    // set up the new write alias
    yield es.indices.putAlias({
        index: config.search.index,
        name: config.search.writeAlias
    });
}

function* establishReadAlias() {
    let exists = yield es.indices.existsAlias({
        index: '_all',
        name: config.search.readAlias
    });

    /* if the readAlias already exists we leave it in place. The idea is to do a full
     * load on the new index and then /swap-index afterwords.
     * */
    if (!exists) {
        yield es.indices.putAlias({
            index: config.search.index,
            name: config.search.readAlias
        });
    }
}

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

        yield establishWriteAlias();
        yield establishReadAlias();
    }

    // return the thing we just created
    return getIndex();
}
