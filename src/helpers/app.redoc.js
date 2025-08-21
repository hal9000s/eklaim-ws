const generateRedocHTML = (apiSpec, options = {}) => {
    const displayApiSpec = JSON.parse(JSON.stringify(apiSpec));

    if (displayApiSpec.components?.securitySchemes) {
        delete displayApiSpec.components.securitySchemes;
    }
    if (displayApiSpec.security) {
        delete displayApiSpec.security;
    }
    if (displayApiSpec.paths) {
        Object.keys(displayApiSpec.paths).forEach((path) => {
            Object.keys(displayApiSpec.paths[path]).forEach((method) => {
                if (displayApiSpec.paths[path][method]?.security) {
                    delete displayApiSpec.paths[path][method].security;
                }
            });
        });
    }

    const defaultOptions = {
        theme: {
            colors: { primary: { main: '#1976d2' } }
        },
        noAutoAuth: true,
        hideLoading: true,
        hideDownloadButton: true,
        ...options
    };

    const redocOptionsStr = JSON.stringify(defaultOptions);
    const apiSpecStr = JSON.stringify(displayApiSpec);

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${displayApiSpec.info?.title || 'E-Klaim API Documentation'}</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="description" content="${displayApiSpec.info?.description || 'API documentation'}"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
          }
          .redoc-wrap {
            background: #fafafa;
          }
          .api-logo img {
            max-height: 40px;
          }

          /* Hide footer "API docs by Redocly" */
          .redoc-wrap > div:last-child,
          [class*="poweredBy"],
          [class*="redocly"],
          a[href*="redocly.com"],
          a[href*="redoc.ly"],
          footer,
          .redoc-footer {
            display: none !important;
          }

          /* Hide authorize button & inputs */
          button[class*="auth"],
          button:contains("Authorize"),
          .auth-button,
          .authorize-button,
          [class*="authorize-btn"],
          input[placeholder*="api"],
          input[placeholder*="key"],
          input[type="password"] {
            display: none !important;
          }

          /* Hide tombol Download OpenAPI specification */
          button[title="Download OpenAPI specification"],
          button:has(svg[viewBox="0 0 24 24"]) {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div id="redoc-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
        <script>
          Redoc.init(${apiSpecStr}, ${redocOptionsStr}, document.getElementById('redoc-container'));

          // Fallback untuk sembunyikan tombol & footer bila masih muncul
          setTimeout(() => {
            document.querySelectorAll('button').forEach((btn) => {
              const txt = (btn.textContent || "").toLowerCase();
              if (txt.includes('download') || txt.includes('authorize')) {
                btn.style.display = 'none';
              }
            });

            document.querySelectorAll('input').forEach((input) => {
              const placeholder = (input.getAttribute('placeholder') || '').toLowerCase();
              if (placeholder.includes('api') || placeholder.includes('key') || placeholder.includes('token')) {
                input.style.display = 'none';
              }
            });

            document.querySelectorAll('a[href*="redoc"], .redoc-footer, [class*="redocly"]').forEach((el) => {
              el.style.display = 'none';
            });
          }, 2000);
        </script>
      </body>
    </html>
  `;
};

module.exports = generateRedocHTML;
