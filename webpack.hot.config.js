var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/public/bundle.js'
    ],
    output: {
        path: path.join(__dirname, '.build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: ["node_modules"],
            loader: 'babel'
        }, {
            test: /\.json$/,
            exclude: ["node_modules"],
            loader: 'json'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            '__DEVELOPMENT__': process.env.NODE_ENV !== 'production'
        })
    ]
};
