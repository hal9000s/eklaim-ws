const log = require('./logging');
const logs = require('./winston');
const resp = require('./response');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { EKLAIM_ENCRYPTION_KEY } = require('../app.constant');

exports.logActivity = (req, res, run) => {
    const namespace =
        process.env.NODE_ENV === 'development' ? 'EKLAIM-DEV' : 'EKLAIM';
    res.on('finish', () => {
        const statusCode = res.statusCode;
        let logLevel = 'info';
        let logMessage = `${req.socket.remoteAddress.replace('::ffff:', '')} (${req.method}) ${req.url} => ${statusCode} ${res.statusMessage} ${req.headers['user-agent'] || '-'}`;

        if (statusCode >= 200 && statusCode < 300) {
            logLevel = 'info';
        } else if (statusCode >= 400 && statusCode < 500) {
            logLevel = 'warn';
        } else if (statusCode >= 500 && statusCode < 600) {
            logLevel = 'error';
        }

        log[logLevel](logMessage, `=> ${namespace}`);
    });
    run();
};

const humanizeString = (value) => {
    if (value) {
        value = value.replace(/-/g, ' ');
        return value.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    } else {
        return '';
    }
};
exports.humanizeString = humanizeString;

exports.generateValidator = (req, res, run) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const arr = errors.array().map((el) => ({
            field: el.param,
            message: humanizeString(el.param) + ' pastikan diisi dengan benar'
        }));
        const message = arr.map((el) => el.message).join(', ');
        logs.warn(
            'Unprocessable Entity => ' +
                'method: ' +
                JSON.stringify(req.method) +
                ', ' +
                'path: ' +
                JSON.stringify(req.path) +
                ', ' +
                'params: ' +
                JSON.stringify(req.params) +
                ', ' +
                'body: ' +
                JSON.stringify(req.body)
        );
        return resp(res, StatusCodes.UNPROCESSABLE_ENTITY, message);
    }
    run();
};

exports.inacbgEncrypt = (data) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);
    }
    let keys = Buffer.from(EKLAIM_ENCRYPTION_KEY, 'hex');
    let data_encoded = Buffer.from(data);
    let iv = crypto.randomBytes(16);
    let enc = crypto.createCipheriv('aes-256-cbc', keys, iv);
    let encrypt = Buffer.concat([enc.update(data_encoded), enc.final()]);
    let signature = crypto
        .createHmac('sha256', keys)
        .update(encrypt)
        .digest()
        .slice(0, 10);

    return Buffer.concat([signature, iv, encrypt]).toString('base64');
};

const inacbgCompare = (signature, encrypt) => {
    let keys = Buffer.from(EKLAIM_ENCRYPTION_KEY, 'hex');
    let calc_signature = crypto
        .createHmac('sha256', keys)
        .update(encrypt)
        .digest()
        .slice(0, 10);
    if (signature.compare(calc_signature) === 0) {
        return true;
    }
    return false;
};
exports.inacbgCompare = inacbgCompare;

exports.inacbgDecrypt = (data) => {
    if (typeof data === 'string') {
        data = data.replace(
            /----BEGIN ENCRYPTED DATA----|----END ENCRYPTED DATA----/g,
            ''
        );
    } else {
        return `Should be string input`;
    }
    let keys = Buffer.from(EKLAIM_ENCRYPTION_KEY, 'hex');
    let data_decoded = Buffer.from(data, 'base64');
    let iv = Buffer.from(data_decoded.slice(10, 26));
    let dec = crypto.createDecipheriv('aes-256-cbc', keys, iv);
    let encoded = Buffer.from(data_decoded.slice(26));
    let signature = data_decoded.slice(0, 10);
    if (!inacbgCompare(signature, encoded)) {
        return 'SIGNATURE_NOT_MATCH';
    }
    let decrypted = Buffer.concat([dec.update(encoded), dec.final()]);

    return decrypted.toString('utf8');
};
