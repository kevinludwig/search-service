const es = require('./es'),
    config = require('config');

module.exports = (contents) => {
    let body = [];
    contents.forEach((content) => {
        body.push({
            index: {
                _index: config.search.writeAlias,
                _type: config.search.type,
                _id: content.id
            }
        });
        body.push(content);
    });

    return es.client.bulk({
        body
    });
}
