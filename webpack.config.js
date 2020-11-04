const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");


module.exports = {
    entry: {
        app: './src/init.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        open: 'Google Chrome'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "node_modules/@arcgis/core/assets",
                    to: "assets"
                }, {
                    from: "./src/assets",
                    to: "assets"
                }
            ]
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            /* title: 'Config App Demo',
             meta: {
                 "viewport": "width=device-width,initial-scale=1,user-scaleable=yes",
                 "mobile-web-app-capable": "yes",
                 "apple-mobile-web-app-capable": "yes",
                 "apple-mobile-web-app-status-bar-style": "default"
             }*/
            chunksSortMode: "none",
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new MomentLocalesPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve('./tsconfig.json'),
                    }
                }],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed"
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            // fonts 
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
}