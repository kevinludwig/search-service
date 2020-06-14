const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),
    cors = require('@koa/cors'),
    config = require('config'),
    log = require('./logger'),
    routes = require('./routes'),
    app = new Koa();

app.use(async(ctx, next) => {
    try {
        await next();
    } catch (ex) {
        log.error(ex.message, ex.stack);
        ctx.status = 500;
    }
});

app.use(bodyParser());
app.use(cors({
    credentials: true
}));
app.use(routes);

module.exports = () => {
    return new Promise((resolve) => {
        const server = app.listen(config.port, () => resolve(server));
    });
}
