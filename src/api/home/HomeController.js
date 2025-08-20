const { Router } = require('baskom');
const { authenticate } = require('../../middlewares/AuthMiddleware');
const Service = require('./HomeServices');

const service = new Service();

class HomeController extends Router {
    constructor() {
        super();
        this.get('/', authenticate, (req, res) => service.index(req, res));
    }
}

module.exports = new HomeController();
