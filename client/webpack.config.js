const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
    const isProduction = env ? env.production : false

    return {
        entry: { main: './src' },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: isProduction
                                    ? 'tsconfig.json'
                                    : 'tsconfig.development.json'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html', favicon: './src/favicon.ico' })
        ],
        output: {
            path: `${__dirname}/public`,
            filename: 'js/[name].[chunkhash].bundle.js',
            publicPath: '/'
        },
        devServer: {
            contentBase: `${__dirname}/public`,
            historyApiFallback: true,
            compress: true,
            open: true,
            port: 3030,
            proxy: {
                '/api': 'http://localhost:3000/'
            }
        }
    }
}
