const path = require("path");
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const env = process.env.NODE_ENV;


module.exports = {
    context: __dirname,
    entry: './apps/frontEnd/js/app.js',

    output: {
        filename: "[name]-[hash].js",
        path: path.resolve('./static/bundles/'),
        // publicPath: '/'
    },

    plugins: [
        new BundleTracker({ filename: './webpack-stats.json' }),
        new VueLoaderPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            "node_modules"
        ],
        alias: {
            'vue': path.resolve('./node_modules/vue/dist/vue.js'),
        }
    },
}