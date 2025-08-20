const logger = require('./winston');
const moment = require('moment');

let getTimeStamp;

setInterval(() => {
    getTimeStamp = moment().utcOffset('+0700').format('YYYY-MM-DD HH:mm:ss');
}, 1000);

exports.info = (namespace, message, object) => {
    if (object) {
        logger.info(`[${getTimeStamp}] [${namespace}] ${message}`, object);
    } else {
        logger.info(`[${getTimeStamp}] [${namespace}] ${message}`);
    }
};

exports.warn = (namespace, message, object) => {
    if (object) {
        logger.warn(`[${getTimeStamp}] [${namespace}] ${message}`, object);
    } else {
        logger.warn(`[${getTimeStamp}] [${namespace}] ${message}`);
    }
};

exports.error = (namespace, message, object) => {
    if (object) {
        logger.error(`[${getTimeStamp}] [${namespace}] ${message}`, object);
    } else {
        logger.error(`[${getTimeStamp}] [${namespace}] ${message}`);
    }
};

exports.debug = (namespace, message, object) => {
    if (object) {
        logger.debug(`[${getTimeStamp}] [${namespace}] ${message}`, object);
    } else {
        logger.debug(`[${getTimeStamp}] [${namespace}] ${message}`);
    }
};
