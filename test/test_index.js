import sinon from 'sinon'
import 'sinon-as-promised'
import chai from 'chai'
import restify from 'restify-clients'
import config from 'config'
import app from '../app'

const should = chai.should();

let client = restify.createJsonClient({
    url: 'http://localhost:' + config.port,
    retry: {
        retries: 0
    },
    connectTimeout: 500,
    requestTimeout: 500,
    agent: false
});

describe('test index create, get, swap-alias, drop', () => {
    let server = null,
        sandbox;

    before((done) => {
        server = app(done);
    });
    after(() => {
        server.close();
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should create the index', (done) => {
        client.post(config.prefix + '/index', (err, req, res) => {
            should.not.exist(err);
            res.statusCode.should.be.eql(200);
            done();
        });
    });
    it('should get the index after create', (done) => {
        client.get(config.prefix + '/index', (err, req, res, data) => {
            should.not.exist(err);
            res.statusCode.should.be.eql(200);
            data.should.have.property('mappings');
            data.should.have.property('settings');
            data.should.have.property('aliases');
            data.aliases.should.have.keys('content-index-write');
            done();
        });
    });
    it('should swap the read alias in', (done) => {
        client.post(config.prefix + '/alias/swap', (err, req, res) => {
            should.not.exist(err);
            res.statusCode.should.be.eql(200);
            client.get(config.prefix + '/index', (err, req, res, data) => {
                res.statusCode.should.be.eql(200);
                data.should.have.property('aliases');
                data.aliases.should.have.keys('content-index-write', 'content-index-read');
            });
        });
    });
    it('should drop the index', (done) => {
        client.del(config.prefix + '/index', (err, req, res) => {
            should.not.exist(err);
            res.statusCode.should.be.eql(200);
            client.get(config.prefix + '/index', (err, req, res) => {
                res.statusCode.should.not.eql(200);
                done();
            });
        });
    });
});
