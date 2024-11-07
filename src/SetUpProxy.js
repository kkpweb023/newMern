const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    
    app.use(
            createProxyMiddleware('/endpoint',
                        { 
                            target: 'https://database-production-ba58.up.railway.app/', 
                            changeOrigin: true 
                        })
    )      
};
