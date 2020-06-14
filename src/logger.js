const {createLogger, format, transports} = require('winston'),
    config = require('config'),
    {splat, timestamp, combine, json} = format;

module.exports = new createLogger({
    transports: [
        new transports.Console({
            level: config.logLevel,
            format: combine(timestamp(), splat(), json())
        })
    ]
});
