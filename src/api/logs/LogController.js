const { Router } = require('baskom');
const { basicAuth } = require('../../middlewares/AuthMiddleware');
const Service = require('./LogServices');

const service = new Service();

class LogController extends Router {
    constructor() {
        super();
        this.get('/logs', basicAuth, (req, res) =>
            service.getLogs(req, res)
        );

        this.get('/logs/:fileName', basicAuth, (req, res) =>
            service.getLogsFile(req, res)
        );

        this.delete('/logs/:fileName', basicAuth, (req, res) =>
            service.removeLogsFile(req, res)
        );
    }
}

module.exports = new LogController();
