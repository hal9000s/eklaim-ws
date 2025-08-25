const os = require('os');
require('dotenv').config();

const getIp = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const iface of interfaces) {
            if (!iface.internal && iface.family === 'IPv4') {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
};
exports.getIp = getIp;
exports.EKLAIM_URI = process.env.EKLAIM_URI;
exports.EKLAIM_ENCRYPTION_KEY = process.env.EKLAIM_ENCRYPTION_KEY;
exports.EKLAIM_DEBUG = process.env.EKLAIM_DEBUG;
exports.API_KEY = process.env.API_KEY;
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.NODE_PORT;
exports.PATH_API = '/eklaim-rest';
exports.DOCUMENT_ALLOWED_EXTENSIONS = [
    'application/pdf',
    'image/jpg',
    'image/jpeg'
];
exports.ALLOWED_HOST = [
    `${getIp()}:${process.env.NODE_PORT}`,
    'eklaim.rsudmajalengka.co.id',
    'eklaim.rsudmajalengka.my.id'
];
exports.USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
];
