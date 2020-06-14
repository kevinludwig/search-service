const chai = require('chai'),
    request = require('superagent'),
    config = require('config'),
    app = require('../src/app');

const should = chai.should();

describe(config.prefix + '/search/:term', () => {
    let server = null;

    before(async() => {
        server = await app();
        await request(server)
            .post(config.prefix + '/index')
            .expect(200);
    });

    after(async () => {
        await request(server)
            .delete(config.prefix  + '/index')
            .expect(200);
        server.close();
    });

    it('should return 200 OK for search', async () => {
        await request(server)
            .get(config.prefix + '/search/test')
            .expect(200);
    });
});
