const { StatusCodes } = require('http-status-codes');
const resp = require('./response');
const { inacbgDecrypt } = require('./utils');
const log = require('./winston');

const eKlaimResponse = (req, res, data) => {
    try {
        log.warn(
            'WS E-Klaim Response => ' +
                JSON.stringify(JSON.parse(inacbgDecrypt(data.data)))
        );
        
        const decryptedData = JSON.parse(inacbgDecrypt(data.data));
        res.status(decryptedData.metadata.code || StatusCodes.OK);
        res.setHeader('Content-Type', 'application/json');

        return decryptedData;
    } catch (error) {
        return resp(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message ||
                'Terjadi kesalahan saat memproses response E-Klaim.'
        );
    }
};

module.exports = eKlaimResponse;
