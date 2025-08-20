const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const resp = require('../../helpers/response');

const logsDir = path.resolve('logs');

class LogServices {
    constructor() {}

    /*==================== Get Attendance Log ====================*/
    async getLogs(req, res) {
        fs.readdir(logsDir, (err, files) => {
            if (err) {
                return resp(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    'Error reading logs directory'
                );
            }

            const logFiles = files.filter(
                (file) => file.endsWith('.gz') || file.endsWith('.log')
            );

            return resp(res, StatusCodes.OK, ReasonPhrases.OK, {
                list: logFiles
            });
        });
    }

    /*==================== Read File Log ====================*/
    async getLogsFile(req, res) {
        const { fileName } = req.params;
        const filePath = path.resolve(logsDir, fileName);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return resp(res, StatusCodes.NOT_FOUND, 'File not found');
            }

            if (fileName.endsWith('.gz')) {
                res.setHeader('Content-Type', 'text/plain');
                fs.createReadStream(filePath)
                    .pipe(zlib.createGunzip())
                    .pipe(res)
                    .on('error', (err) => {
                        console.log('Error during decompression:', err);
                        return resp(
                            res,
                            StatusCodes.INTERNAL_SERVER_ERROR,
                            'Error decompressing file'
                        );
                    });
            } else {
                res.setHeader('Content-Type', 'text/plain');
                fs.createReadStream(filePath)
                    .pipe(res)
                    .on('error', (err) => {
                        console.error('Error during reading file:', err);
                        return resp(
                            res,
                            StatusCodes.INTERNAL_SERVER_ERROR,
                            'Error reading file'
                        );
                    });
            }
        });
    }

    /*==================== Remove File Log ====================*/
    async removeLogsFile(req, res) {
        const { fileName } = req.params;
        const filePath = path.resolve(logsDir, fileName);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return resp(res, StatusCodes.NOT_FOUND, 'File not found');
            }
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    return resp(
                        res,
                        StatusCodes.INTERNAL_SERVER_ERROR,
                        'Error deleting the file'
                    );
                }
                return resp(res, StatusCodes.OK, 'File successfully deleted');
            });
        });
    }
}

module.exports = LogServices;
