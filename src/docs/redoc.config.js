module.exports = {
    // Pattern files YAML scan
    yamlPatterns: ['./src/api/**/*.yaml', './src/api/**/*.yml'],

    // Base OpenAPI specification
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'E-Klaim API Documentation',
            description: 'API documentation for E-Klaim iDRG and INACBG system',
            version: '1.0.0'
            // contact: {
            //     name: 'E-Klaim API Support',
            //     email: 'support@eklaim.com'
            // },
            // license: {
            //     name: 'MIT',
            //     url: 'https://opensource.org/licenses/MIT'
            // }
        },
        // servers: [
        //     {
        //         url: 'http://localhost:3000',
        //         description: 'Development server'
        //     },
        //     {
        //         url: 'https://api.eklaim.com',
        //         description: 'Production server'
        //     }
        // ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'X-API-Key'
                }
            }
        },
        security: [
            {
                apiKeyAuth: []
            }
        ]
    },

    // ReDoc theme options
    redocOptions: {
        theme: {
            colors: {
                primary: {
                    main: '#1976d2'
                },
                success: {
                    main: '#4caf50'
                },
                warning: {
                    main: '#ff9800'
                },
                error: {
                    main: '#f44336'
                },
                gray: {
                    50: '#fafafa',
                    100: '#f5f5f5'
                }
            },
            typography: {
                fontSize: '14px',
                lineHeight: '1.5em',
                code: {
                    fontSize: '13px',
                    fontFamily:
                        'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    backgroundColor: '#f8f8f2',
                    color: '#272822'
                },
                headings: {
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: '600'
                },
                links: {
                    color: '#1976d2',
                    visited: '#1976d2',
                    hover: '#1565c0'
                }
            },
            sidebar: {
                width: '300px',
                backgroundColor: '#f8f9fa',
                textColor: '#333333'
            },
            rightPanel: {
                backgroundColor: '#263238',
                width: '40%'
            }
        },
        hideHostname: true,
        showExtensions: false,
        expandResponses: 'none',
        noAutoAuth: true,
        hideDownloadButton: true,
        hideLoading: false,
        disableSearch: false,
        scrollYOffset: 0,
        hideRequestPayloadSample: false
    },

    uiOptions: {
        showDownloadButton: false,
        showAuthButton: false,
        showFooter: false
    },

    // Options merge strategy
    mergeOptions: {
        // Skip duplicate tags
        deduplicateTags: true,
        // Skip duplicate servers
        deduplicateServers: true,
        // Merge strategy paths: 'merge' | 'override' | 'skip'
        pathMergeStrategy: 'merge',
        // Merge strategy components: 'merge' | 'override' | 'skip'
        componentMergeStrategy: 'merge'
    },

    // Debug options
    debug: {
        logFileProcessing: false,
        logMergeProcess: false,
        showWarnings: false
    }
};
