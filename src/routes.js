const Router = require('koa-router'),
    search = require('./controllers/search'),
    upsert = require('./controllers/upsert'),
    bulk = require('./controllers/bulk'),
    del = require('./controllers/del'),
    getIndex = require('./controllers/getIndex'),
    createIndex = require('./controllers/createIndex'),
    dropIndex = require('./controllers/dropIndex');

const router = new Router();

router.get('/search/:term', search);
router.post('/upsert', upsert);
router.post('/upsert/bulk', bulk);
router.post('/delete/:id', del);
router.get('/index', getIndex);
router.post('/index', createIndex);
router.delete('/index', dropIndex);

module.exports = router.routes();
