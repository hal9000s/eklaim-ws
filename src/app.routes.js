const EklaimController = require('./api/eklaim/EklaimController');
const LogController = require('./api/logs/LogController');

const createRoutes = () => {
    return [EklaimController, LogController];
};

module.exports = createRoutes;
