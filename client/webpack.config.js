const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
                        { loader: 'css-loader', options: { sourceMap: !isProduction } }
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/i,
                    use: [{ loader: 'file-loader', options: { outputPath: 'fonts' } }]
                },
                {
                    test: /\.(png|jpg|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { limit: 10 * 1024, outputPath: 'assets' }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/favicon.ico'
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? 'css/[contenthash].css' : 'css/[name].css'
            }),
            new CopyWebpackPlugin({
                patterns: [{ from: './assets/category', to: 'assets/category' }]
            })
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
