const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 8000
    },
    mode: "development",
    experiments: {
        asyncWebAssembly: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        fallback: {
            os: require.resolve("os-browserify/browser"),
            path: require.resolve("path-browserify"),
            fs: false,
            child_process: false,
            util: require.resolve("util/"),
            zlib: require.resolve("browserify-zlib"),
            stream: require.resolve("stream-browserify"),
            assert: require.resolve("assert/"),
            https: require.resolve("https-browserify"),
            http: require.resolve("stream-http")
        }
    },
}
