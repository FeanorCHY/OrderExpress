var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        main: "./js/main.js"
    },
    output: {
        path: path.resolve(__dirname, 'bin'),
        filename: "[name].entry.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    externals: {
        'jquery': 'jQuery',
        'bootstrap': 'bootstrap'
    }
}
