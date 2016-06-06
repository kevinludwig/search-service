import winston from 'winston'
import config from 'config'

export default new winston.Logger({
    transports: [
        new(winston.transports.Console)({
            logstash: true,
            timestamp: true,
            stderrLevels: ['debug', 'info', 'warn', 'error']
        })
    ],
    level: config.logLevel
});