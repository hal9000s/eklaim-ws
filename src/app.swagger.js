const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('./helpers/swagger-ui');
const { basicAuth } = require('./middlewares/AuthMiddleware');
const { NODE_ENV } = require('../src/app.constant');

const appSwagger = (app) => {
    var swaggerOptions = {
        explorer: false,
        customSiteTitle: `E-Klaim Web Service Catalog`,
        customCss: '.topbar { display: none }'
    };

    const swaggerDefinition = {
        openapi: '3.0.3',
        info: {
            title: `E-Klaim Web Service Catalog`,
            version: '1.0.0'
        }
    };

    const options = {
        swaggerDefinition,
        apis: ['./src/api/**/*.yaml']
    };
    const swaggerSpec = swaggerJSDoc(options);
    app.use(
        '/api-catalogue',
        NODE_ENV === 'production' ? basicAuth : undefined,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, swaggerOptions)
    );
};

module.exports = appSwagger;
