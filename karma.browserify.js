
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'browserify'],
        reporters: ['progress', 'coverage'],
        files: [
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['browserify']
        },
        browserify: {
            transform: [
                ['babelify', {
                    presets: ['es2015'],
                    plugins: ['istanbul']
                }],
                'brfs'
            ]
        },
        coverageReporter: {
            reporters: [
                { type: 'text' }
            ]
        }
    });
};