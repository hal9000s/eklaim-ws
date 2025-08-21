const { NODE_ENV } = require('../app.constant');

const DocsIndexController = (req, res) => {
    const protocol = req.secure ? 'https' : 'http';
    const baseUrl = `${protocol}://${req.headers.host}`;
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Klaim API Documentation Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            padding: 3rem;
            max-width: 600px;
            width: 90%;
            text-align: center;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: white;
            font-size: 2rem;
            font-weight: bold;
        }
        
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 3rem;
            line-height: 1.6;
        }
        
        .docs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .doc-card {
            background: #f8f9ff;
            border: 2px solid transparent;
            border-radius: 12px;
            padding: 1.5rem;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .doc-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 15px 30px rgba(102, 126, 234, 0.2);
        }
        
        .doc-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        .doc-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        
        .doc-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .doc-desc {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.4;
        }
        
        .api-links {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        
        .api-link {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            text-decoration: none;
            color: #475569;
            font-size: 0.9rem;
            transition: all 0.2s ease;
        }
        
        .api-link:hover {
            background: #e2e8f0;
            border-color: #667eea;
        }
        
        .env-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            background: ${NODE_ENV === 'production' ? '#dc2626' : '#16a34a'};
            color: white;
            font-size: 0.75rem;
            border-radius: 9999px;
            font-weight: 500;
            margin-bottom: 2rem;
        }
        
        @media (max-width: 640px) {
            .docs-grid {
                grid-template-columns: 1fr;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            .container {
                padding: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">EK</div>
        <div class="env-badge">${NODE_ENV.toUpperCase()} Environment</div>
        <h1>E-Klaim API Portal</h1>
        <p class="subtitle">
            Choose your preferred API documentation format below. 
            Both provide complete documentation for the E-Klaim iDRG and INACBG system.
        </p>
        
        <div class="docs-grid">
            <a href="${baseUrl}/api-catalogue" class="doc-card">
                <div class="doc-icon">📚</div>
                <div class="doc-title">Swagger UI</div>
                <div class="doc-desc">Interactive API documentation with try-it-out functionality</div>
            </a>
            
            <a href="${baseUrl}/api-docs" class="doc-card">
                <div class="doc-icon">📖</div>
                <div class="doc-title">ReDoc</div>
                <div class="doc-desc">Clean, responsive documentation with better readability</div>
            </a>
        </div>
    </div>
</body>
</html>
    `;
    
    res.send(html);
};

module.exports = DocsIndexController;