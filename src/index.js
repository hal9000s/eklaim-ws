process.env.TZ = 'Asia/Jakarta';

require('dotenv').config();

const App = require('./app');
const log = require('./helpers/winston');
const { PORT, NODE_ENV } = require('./app.constant');

const app = new App();

app.start(PORT, () => {
    log.info(
        `Service ${NODE_ENV === 'development' ? 'eklaim-dev' : 'eklaim'} running on port ${PORT}`
    );
});
