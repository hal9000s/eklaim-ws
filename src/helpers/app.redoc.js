const generateRedocHTML = (apiSpec, options = {}) => {
    const displayApiSpec = JSON.parse(JSON.stringify(apiSpec));

    const defaultOptions = {
        theme: {
            colors: { primary: { main: '#1976d2' } }
        },
        noAutoAuth: true,
        hideDownloadButton: false,
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
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="${displayApiSpec.info?.description || 'API documentation'}">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
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
          div:contains("API docs by Redocly"),
          footer,
          .redoc-footer {
            display: none !important;
          }
    
          /* Hide hanya form authorize button dan input, tapi tetap show info */
          button[class*="auth"],
          button:contains("Authorize"),
          input[placeholder*="api"],
          input[placeholder*="key"],
          .auth-button,
          .authorize-button,
          [class*="authorize-btn"] {
            display: none !important;
          }
          
          /* Tetap tampilkan security info tapi style sebagai info saja */
          .redoc-json [data-section-id*="section/Authentication"] .redoc-json,
          .redoc-json [data-section-id*="section/Authorization"] .redoc-json {
            background: #f8f9fa !important;
            border-left: 4px solid #1976d2 !important;
            padding: 15px !important;
            margin: 10px 0 !important;
          }
        </style>
      </head>
      <body>
        <div id="redoc-container"></div>
        <script src="https://cdn.jsdelivr.net/npm/redoc@2.5.0/bundles/redoc.standalone.js"></script>
        <script>
          Redoc.init(${apiSpecStr}, ${redocOptionsStr}, document.getElementById('redoc-container'));
          
          // Hide hanya form input/button, bukan section info
          setTimeout(() => {
            // Hide authorize buttons and inputs
            const authInputs = document.querySelectorAll([
              'button:contains("Authorize")',
              'button[class*="auth"]',
              'input[placeholder*="api"]',
              'input[placeholder*="key"]',
              'input[type="password"]',
              '.auth-button',
              '.authorize-button'
            ].join(','));
            
            authInputs.forEach(input => {
              input.style.display = 'none';
            });
            
            // Cari button yang textnya mengandung "authorize" 
            document.querySelectorAll('button').forEach(btn => {
              if (btn.textContent && btn.textContent.toLowerCase().includes('authorize')) {
                btn.style.display = 'none';
              }
            });
            
            // Hide input fields untuk API key
            document.querySelectorAll('input').forEach(input => {
              const placeholder = input.getAttribute('placeholder');
              if (placeholder && (
                placeholder.toLowerCase().includes('api') || 
                placeholder.toLowerCase().includes('key') ||
                placeholder.toLowerCase().includes('token')
              )) {
                input.style.display = 'none';
              }
            });

            // Hide Redocly footer dengan berbagai selector
            const footerSelectors = [
              'a[href*="redocly.com"]',
              'a[href*="redoc.ly"]',
              '[class*="poweredBy"]',
              '[class*="redocly"]',
              '.redoc-footer'
            ];
        
            footerSelectors.forEach(selector => {
              document.querySelectorAll(selector).forEach(el => {
                el.style.display = 'none';
                // Hide parent container juga jika perlu
                if (el.parentElement) {
                  const parent = el.parentElement;
                  if (parent.children.length === 1) {
                    parent.style.display = 'none';
                  }
                }
              });
            });
            
            // Hide berdasarkan text content "API docs by Redocly"
            document.querySelectorAll('*').forEach(el => {
              if (el.textContent && 
                  el.textContent.includes('API docs by Redocly') ||
                  el.textContent.includes('Redocly') ||
                  el.textContent.includes('redoc.ly')) {
                el.style.display = 'none';
              }
            });
            
            // Hide last child dari redoc-wrap yang biasanya footer
            const redocWrap = document.querySelector('.redoc-wrap, [class*="redoc"]');
            if (redocWrap && redocWrap.children.length > 0) {
              const lastChild = redocWrap.children[redocWrap.children.length - 1];
              if (lastChild.textContent && 
                  (lastChild.textContent.includes('Redocly') || 
                   lastChild.textContent.includes('API docs by'))) {
                lastChild.style.display = 'none';
              }
            }
            
          }, 2000);
        </script>
      </body>
    </html>
    `;
};

module.exports = generateRedocHTML;
