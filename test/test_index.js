const chai = require('chai'),
    request = require('supertest'),
    config = require('config'),
    app = require('../src/app');

const should = chai.should();

describe('test index create, get, and drop', () => {
    let server = null;

    before(async () => {
        server = await app();
    });
    after(() => {
        server.close();
    });

    it('should create the index', async () => {
        await request(server)
            .post(config.prefix + '/index')
            .expect(200);
    });
    
    it('should get the index after create', async () => {
        const {body} = await request(server)
            .get(config.prefix + '/index')
            .expect(200);
        body.should.have.property('content-index-v1');

        body['content-index-v1'].should.have.property('mappings');
        body['content-index-v1'].should.have.property('settings');
    });
    
    it('should drop the index', async () => {
        await request(server)
            .delete(config.prefix + '/index')
            .expect(200);
        await request(server)
            .get(config.prefix + '/index')
            .expect(404);
    });
});
