const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    
    app.use(
            createProxyMiddleware('/endpoint',
                        { 
                            target: 'https://cyan-encouraging-chiton.cyclic.app', 
                            changeOrigin: true 
                        })
    )      
};
