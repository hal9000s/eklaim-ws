const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const moment = require('moment');

let dateTime = moment().utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss');
let date = moment().format('YYYY-MM-DD');

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: dateTime }),
        format.align(),
        format.printf(
            (info) => `[${info.level}]: ${info.message}`
            // (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    ),
    transports: [
        // new transports.File({
        //     filename: path.join(__dirname, `/../../logs/` + date + `.log`),
        //     json: false,
        //     maxsize: 5242880,
        //     maxFiles: 5
        // }),
        new DailyRotateFile({
            filename: path.join(__dirname, `/../../logs/` + '%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            handleExceptions: true,
            colorize: true,
            json: false,
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new transports.Console({
            format: format.combine(
                format.colorize({
                    all: true
                })
            )
        })
    ]
});

module.exports = logger;
