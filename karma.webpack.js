module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],
        files: [
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015'],
                            plugins: ['istanbul']
                        }
                    }
                ]
            }
        },
        coverageReporter: {
            reporters: [
                { type: 'text' }
            ]
        }
    });
};