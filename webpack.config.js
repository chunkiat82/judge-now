var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
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
            exclude: [/bower_components/, /node_modules/],
            loader: 'babel'
        }, {
            test: /\.json$/,
            exclude: [/bower_components/, /node_modules/],
            loader: 'json'
        }]
    }
};
