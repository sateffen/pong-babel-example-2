const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

module.exports = {
    entry: 'src/main.js',
    format: 'iife',
    dest: 'dist/rollup.js',
    plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: [
                ['es2015', {modules: false}]
            ],
            plugins: [
                'external-helpers'
            ]
        }),
        uglify()
    ]
};