module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}