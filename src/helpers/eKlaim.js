const axios = require('axios');
const http = require('http');
const https = require('https');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { EKLAIM_URI, EKLAIM_DEBUG, USER_AGENTS } = require('../app.constant');
const log = require('./winston');
const moment = require('moment');
const resp = require('./response');

const eKlaim = () => {
    var axiosInstance, maxRequestCount, intervalMs, pendingRequest;
    maxRequestCount = 5;
    intervalMs = 10;
    pendingRequest = 0;
    randomUserAgent =
        USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    header = {
        'User-Agent': randomUserAgent
    };
    axiosInstance = axios.create({
        baseURL:
            EKLAIM_DEBUG === 'false' ? EKLAIM_URI : EKLAIM_URI + '?mode=debug',
        headers: header,
        httpAgent: new http.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 10,
            timeout: 60000,
            freeSocketTimeout: 60000,
            socketActiveTTL: 1000 * 60 * 10,
            rejectUnauthorized: false
        }),
        httpsAgent: new https.Agent({
            keepAlive: true,
            maxSockets: 100,
            maxFreeSockets: 10,
            timeout: 60000,
            freeSocketTimeout: 60000,
            socketActiveTTL: 1000 * 60 * 10,
            rejectUnauthorized: false
        })
    });

    const access_date = moment()
        .utcOffset('+0700')
        .format('YYYY-MM-DD HH:mm:ss');

    // Request interceptor
    axiosInstance.interceptors.request.use((config) => {
        log.info(
            'WS E-Klaim Request => ' +
                `{ access_date: ${access_date}, base_url: ${config.baseURL}, method: ${config.method} }`
        );
        config.meta = config.meta || {};
        config.meta.requestStartedAt = new Date().getTime();
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                if (pendingRequest < maxRequestCount) {
                    pendingRequest++;
                    clearInterval(interval);
                    resolve(config);
                }
            }, intervalMs);
        });
    });

    // Response interceptor with centralized error handling
    axiosInstance.interceptors.response.use(
        (response) => {
            log.info(
                `Execution time for => ${response.config.url} - ${
                    new Date().getTime() - response.config.meta.requestStartedAt
                } ms`
            );
            pendingRequest = Math.max(0, pendingRequest - 1);
            return Promise.resolve(response);
        },
        (error) => {
            pendingRequest = Math.max(0, pendingRequest - 1);

            // Log error details
            log.error(
                'Response E-Klaim Error => ' +
                    (JSON.stringify(error.message) !== undefined
                        ? JSON.stringify(error.message)
                        : JSON.stringify(error))
            );

            if (error.config) {
                log.info(
                    `Execution time for => ${error.config.url} - ${
                        new Date().getTime() -
                        error.config.meta.requestStartedAt
                    } ms`
                );
            }

            // Create standardized error object for service layer
            const standardizedError = createStandardizedError(error);
            return Promise.reject(standardizedError);
        }
    );

    axiosInstance.defaults.headers['Content-Type'] =
        'application/json; charset=utf-8';
    axiosInstance.defaults.headers['Accept'] =
        'application/json, text/plain, */*';
    axiosInstance.defaults.timeout = 18000;

    return axiosInstance;
};

// Centralized error handling function
const createStandardizedError = (error) => {
    const standardized = {
        originalError: error,
        isNetworkError: false,
        isResponseError: false,
        isRequestError: false,
        statusCode: null,
        message: null,
        data: null
    };

    // Network/Connection errors
    if (error.code) {
        standardized.isNetworkError = true;

        switch (error.code) {
            case 'ECONNRESET':
                standardized.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
                standardized.message =
                    'Server E-Klaim tidak dapat dijangkau. Koneksi terputus.';
                break;
            case 'ENOTFOUND':
                standardized.statusCode = StatusCodes.NOT_FOUND;
                standardized.message =
                    'Alamat server E-Klaim tidak ditemukan. Pastikan server tersedia.';
                break;
            case 'EAI_AGAIN':
                standardized.statusCode = StatusCodes.GATEWAY_TIMEOUT;
                standardized.message =
                    'Jaringan bermasalah. Silakan coba lagi beberapa saat lagi.';
                break;
            case 'ECONNREFUSED':
                standardized.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
                standardized.message =
                    'Server E-Klaim menolak koneksi. Pastikan server aktif.';
                break;
            case 'ENETUNREACH':
                standardized.statusCode = StatusCodes.GATEWAY_TIMEOUT;
                standardized.message =
                    'Jaringan tidak dapat dijangkau. Pastikan koneksi internet Anda stabil.';
                break;
            case 'ETIMEDOUT':
                standardized.statusCode = StatusCodes.GATEWAY_TIMEOUT;
                standardized.message =
                    'Permintaan Anda memakan waktu terlalu lama. Coba lagi nanti.';
                break;
            default:
                standardized.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                standardized.message =
                    'Terjadi kesalahan jaringan. Silakan coba beberapa saat lagi.';
        }

        return standardized;
    }

    // Response errors (server responded with error status)
    if (error.response) {
        console.log('Error Response Data =>', error.response.data);
        console.log('Error Response Status =>', error.response.status);
        console.log('Error Response Headers =>', error.response.headers);

        standardized.isResponseError = true;
        standardized.statusCode = error.response.status;
        standardized.message = getReasonPhrase(error.response.status);
        standardized.data = error.response.data;

        return standardized;
    }

    // Request errors (request was made but no response received)
    if (error.request) {
        console.log('Error Request =>', error.request);

        standardized.isRequestError = true;
        standardized.statusCode = StatusCodes.BAD_REQUEST;
        standardized.message =
            'Permintaan tidak mendapatkan respons dari server.';

        return standardized;
    }

    // Other errors
    if (error.message) {
        console.log('Error Message =>', error.message);

        standardized.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        standardized.message =
            'Terjadi kesalahan pada sistem. Silakan coba beberapa saat lagi.';

        return standardized;
    }

    // Unknown errors
    console.log('Unknown Error =>', error);

    standardized.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    standardized.message =
        'Terjadi kesalahan tak terduga. Silakan coba lagi nanti.';

    return standardized;
};

// Helper function to handle errors in service layer
const handleEklaimError = (res, error) => {
    return resp(res, error.statusCode, error.message, error.data);
};

module.exports = {
    eKlaim,
    handleEklaimError
};
