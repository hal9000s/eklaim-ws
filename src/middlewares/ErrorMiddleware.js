const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const resp = require('../helpers/response');
const log = require('../helpers/winston');

exports.ErrorMiddleware = (app) => async (err, req, res) => {
    let data = app.getError(err, req, res);
    log.error(
        'Error => ' +
            'message: ' +
            JSON.stringify(data.message) +
            ', ' +
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
            JSON.stringify(req.body) +
            ', ' +
            'ua: ' +
            JSON.stringify(
                req.headers['user-agent'] ? req.headers['user-agent'] : '-'
            )
    );
    // return resp(res, data.statusCode, data.message);
    return resp(
        res,
        data.statusCode,
        'Terjadi kesalahan. Silakan coba lagi nanti.'
    );
};

exports.NotFoundRouteErrorMiddleware = (app) => {
    app.use('*', (req, res, run) => {
        log.error(
            'Not found => ' +
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
                JSON.stringify(req.body) +
                ', ' +
                'ua: ' +
                JSON.stringify(
                    req.headers['user-agent'] ? req.headers['user-agent'] : '-'
                )
        );
        return resp(res, StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
    });
};
