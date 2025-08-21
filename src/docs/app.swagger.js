const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('../helpers/swagger-ui');
const { basicAuth } = require('../middlewares/AuthMiddleware');
const { NODE_ENV } = require('../app.constant');

const appSwagger = (app) => {
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

    let swaggerHtml = swaggerUi.generateHTML(swaggerSpec, {
        explorer: false,
        customSiteTitle: 'E-Klaim Web Service Catalog',
        customCss: '.topbar { display: none }'
    });

    swaggerHtml = swaggerHtml.replace(/<link rel="icon"[^>]*>/g, '');

    app.use(
        '/api-catalogue',
        NODE_ENV !== 'development' ? basicAuth : (req, res, next) => next(),
        swaggerUi.serve,
        (req, res) => res.send(swaggerHtml)
    );
};

module.exports = appSwagger;
