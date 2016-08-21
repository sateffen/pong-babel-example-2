const babel = require('rollup-plugin-babel');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage'],
        files: [
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                babel({
                    exclude: 'node_modules/**',
                    presets: [
                        ['es2015', { modules: false }]
                    ],
                    plugins: [
                        'external-helpers',
                        'istanbul'
                    ]
                })
            ],
            format: 'iife',
            sourceMap: 'inline'
        },
        coverageReporter: {
            reporters: [
                { type: 'text' }
            ]
        }
    });
};