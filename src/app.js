const { Application } = require('baskom');
const qs = require('qs');
const bodyParser = require('body-parser');
const http = require('http');
const helmet = require('helmet');
const { NODE_ENV, PATH_API } = require('./app.constant');
const cors = require('cors');
const {
    ErrorMiddleware,
    NotFoundRouteErrorMiddleware
} = require('./middlewares/ErrorMiddleware');
const { logActivity } = require('./helpers/utils');
const HomeController = require('./api/home/HomeController');
const createRoutes = require('./app.routes');
const appSwagger = require('./app.swagger');

const config = {
    useParseQueryString: qs.parse,
    useDefaultBody: false
    // useDebugError: NODE_ENV === 'development'
};

const corsOption = {
    origin: '*',
    methods: ['GET, POST, PUT, PATCH, DELETE'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization'
    ]
};

class App extends Application {
    constructor() {
        super(config);
        this.__server = http.createServer(this.lookup);
        this.use(bodyParser.json({ limit: '1mb' }));
        this.use(bodyParser.urlencoded({ extended: true }));
        this.use(cors(corsOption));
        this.use(logActivity);
        this.use(
            helmet({
                contentSecurityPolicy: false,
                frameguard: { action: 'deny' },
                hsts: {
                    maxAge: 31536000,
                    includeSubDomains: true,
                    preload: true
                },
                referrerPolicy: {
                    policy: 'same-origin'
                },
                dnsPrefetchControl: {
                    allow: false
                },
                noSniff: false
            })
        );
        this.use(HomeController);
        this.use(PATH_API, createRoutes());
        this.use(ErrorMiddleware(this));
        this.use(NotFoundRouteErrorMiddleware(this));
        appSwagger(this);
    }

    start(port, cb) {
        this.__server.listen(port, cb);
    }
}

module.exports = App;
