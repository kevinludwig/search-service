import elasticsearch from 'elasticsearch'
import config from 'config'

export default new elasticsearch.Client({
    host: config.search.host,
    log: config.search.log
});