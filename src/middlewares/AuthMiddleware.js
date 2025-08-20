const { API_KEY } = require('../app.constant');
const log = require('../helpers/winston');
const resp = require('../helpers/response');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

exports.authenticate = async (req, res, next) => {
    let retrieved_api_key;
    retrieved_api_key = req.headers['api_key'];
    if (!retrieved_api_key) {
        log.warn(
            'The request has an invalid header name => ' + retrieved_api_key
        );
        return resp(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
    if (retrieved_api_key !== API_KEY) {
        log.warn(
            'The user key you entered does not exist => ' + retrieved_api_key
        );
        return resp(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    }
    next();
};

exports.basicAuth = (req, res, next) => {
    let authheader = req.headers.authorization;
    if (!authheader || authheader === undefined) {
        res.setHeader('WWW-Authenticate', 'Basic');
        log.error('Error', 'You are not authenticated!');
        log.error(
            'UA => ' +
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
        return resp(res, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    } else {
        let auth = new Buffer.from(authheader.split(' ')[1], 'base64')
            .toString()
            .split(':');
        let user = auth[0];
        let pass = auth[1];
        if (user == API_KEY && pass == API_KEY) {
            // log.info('Access logs => ' + user);
            next();
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            log.error('Error', 'You are not authenticated!');
            log.error(
                'UA => ' +
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
            return resp(
                res,
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            );
        }
    }
};
