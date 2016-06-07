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

describe(config.prefix + '/search/:term', () => {
    let server = null,
        sandbox;

    before((done) => {
        server = app(function() {
            // create the index
            client.post(config.prefix + '/index', function(err) {
                should.not.exist(err);
                done();
            });
        });
    });
    after((done) => {
        client.del(config.prefix  + '/index', function(err) {
            should.not.exist(err);
            server.close();
            done();
        });
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return 200 OK for search', (done) => {
        client.get(config.prefix + '/search/test', (err, req, res) => {
            res.statusCode.should.be.eql(200);
            done();
        });
    });

    it('should return 200 OK for similar', (done) => {
        client.get(config.prefix + '/similar/1', (err, req, res, data) => {
            res.statusCode.should.be.eql(200);
            done();
        });
    });
});
