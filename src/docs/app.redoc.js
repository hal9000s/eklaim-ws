const fs = require('fs');
const path = require('path');
const glob = require('glob');
const yaml = require('js-yaml');
const generateRedocHTML = require('../helpers/app.redoc');
const { basicAuth } = require('../middlewares/AuthMiddleware');
const { NODE_ENV } = require('../app.constant');

let redocConfig;
try {
    redocConfig = require('./redoc.config');
} catch (error) {
    // console.log('📄 Using default ReDoc configuration');
    redocConfig = {
        yamlPatterns: ['./src/api/**/*.yaml', './src/api/**/*.yml'],
        swaggerDefinition: {
            openapi: '3.0.3',
            info: {
                title: 'E-Klaim API Documentation',
                description:
                    'API documentation for E-Klaim iDRG and INACBG system',
                version: '1.0.0'
            }
        },
        redocOptions: {
            theme: {
                colors: { primary: { main: '#1976d2' } },
                typography: { fontSize: '14px' }
            },
            expandResponses: 'all',
            pathInMiddlePanel: true
        },
        mergeOptions: {
            deduplicateTags: true,
            deduplicateServers: true
        },
        debug: {
            logFileProcessing: true,
            showWarnings: true
        }
    };
}

const mergeDeep = (target, source) => {
    const isObject = (obj) => obj && typeof obj === 'object';

    if (!isObject(target) || !isObject(source)) {
        return source;
    }

    Object.keys(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(
                Object.assign({}, targetValue),
                sourceValue
            );
        } else {
            target[key] = sourceValue;
        }
    });

    return target;
};

const loadMultipleYamlFiles = (patterns, options = {}) => {
    const {
        deduplicateTags = true,
        deduplicateServers = true,
        logFileProcessing = true,
        showWarnings = true
    } = options;

    let mergedSpec = { ...redocConfig.swaggerDefinition };

    if (!mergedSpec.paths) mergedSpec.paths = {};
    if (!mergedSpec.components) mergedSpec.components = {};
    if (!mergedSpec.tags) mergedSpec.tags = [];
    if (!mergedSpec.servers) mergedSpec.servers = [];

    patterns.forEach((pattern) => {
        try {
            const files = glob.sync(pattern);
            // if (logFileProcessing && files.length > 0) {
            //     console.log(
            //         `📄 Found ${files.length} YAML files for pattern: ${pattern}`
            //     );
            // }

            files.forEach((filePath) => {
                try {
                    const fileContent = fs.readFileSync(filePath, 'utf8');
                    const yamlContent = yaml.load(fileContent);

                    if (yamlContent) {
                        // if (logFileProcessing) {
                        //     console.log(
                        //         `📄 Processing: ${path.relative(process.cwd(), filePath)}`
                        //     );
                        // }

                        mergedSpec = mergeDeep(mergedSpec, yamlContent);

                        if (
                            yamlContent.tags &&
                            Array.isArray(yamlContent.tags) &&
                            deduplicateTags
                        ) {
                            yamlContent.tags.forEach((tag) => {
                                if (
                                    !mergedSpec.tags.find(
                                        (t) => t.name === tag.name
                                    )
                                ) {
                                    mergedSpec.tags.push(tag);
                                }
                            });
                        }

                        if (
                            yamlContent.servers &&
                            Array.isArray(yamlContent.servers) &&
                            deduplicateServers
                        ) {
                            yamlContent.servers.forEach((server) => {
                                if (
                                    !mergedSpec.servers.find(
                                        (s) => s.url === server.url
                                    )
                                ) {
                                    mergedSpec.servers.push(server);
                                }
                            });
                        }
                    }
                } catch (fileError) {
                    if (showWarnings) {
                        console.warn(
                            `⚠️  Warning: Could not process ${filePath}:`,
                            fileError.message
                        );
                    }
                }
            });
        } catch (globError) {
            if (showWarnings) {
                console.warn(
                    `⚠️  Warning: Pattern ${pattern} failed:`,
                    globError.message
                );
            }
        }
    });

    return mergedSpec;
};

const appRedoc = (app) => {
    let apiSpec;
    try {
        // console.log(
        //     '📄 Loading OpenAPI specifications from multiple YAML files...'
        // );
        apiSpec = loadMultipleYamlFiles(redocConfig.yamlPatterns, {
            ...redocConfig.mergeOptions,
            ...redocConfig.debug
        });

        // if (!apiSpec.paths || Object.keys(apiSpec.paths).length === 0) {
        //     console.warn('⚠️  Warning: No paths found in any YAML files');
        // } else {
        //     console.log(
        //         `✅ Successfully loaded OpenAPI spec with ${Object.keys(apiSpec.paths).length} paths`
        //     );
        // }

        // if (apiSpec.tags && apiSpec.tags.length > 0) {
        //     console.log(
        //         `🏷️  Found ${apiSpec.tags.length} tags: ${apiSpec.tags.map((t) => t.name).join(', ')}`
        //     );
        // }

        // if (apiSpec.components && apiSpec.components.schemas) {
        //     console.log(
        //         `📊 Found ${Object.keys(apiSpec.components.schemas).length} schemas`
        //     );
        // }
    } catch (error) {
        console.error('❌ Error loading YAML files:', error.message);
        console.log('ReDoc documentation will not be available');
        return;
    }

    app.get('/api-docs', async (req, res) => {
        try {
            const html = generateRedocHTML(apiSpec, redocConfig.redocOptions);

            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        } catch (error) {
            console.error('Error generating ReDoc:', error);
            res.status(500).json({
                error: 'Failed to generate ReDoc documentation',
                message: error.message
            });
        }
    });

    if (NODE_ENV === 'production') {
        app.use('/api-docs', basicAuth);
    }

    // console.log('✅ ReDoc documentation routes registered');
    // console.log('📖 ReDoc documentation available at: /api-docs');
};

module.exports = appRedoc;
