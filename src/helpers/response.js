const { StatusCodes } = require('http-status-codes');

const response = (
    res,
    statusCode = StatusCodes.OK,
    message = '',
    response = undefined
) => {
    res.status(statusCode);
    res.json({
        metadata: {
            code: statusCode,
            message
        },
        response
    });

    res.end();
};

module.exports = response;
