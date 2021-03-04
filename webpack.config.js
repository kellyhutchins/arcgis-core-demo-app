const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const ArcGISPlugin = require('@arcgis/webpack-plugin');

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
        new ArcGISPlugin({
            features: {
                "3d": true
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: "./src/assets",
                to: "assets"
            }, {
                from: "./src/HelloWorld/assets",
                to: "assets"
            }
            ]
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
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
            }
        ]
    },
}