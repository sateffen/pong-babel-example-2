const fs = require('fs');
const browserify = require('browserify');
const uglify = require('uglify-js');

browserify('./src/main.js')
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle((aError, aBuffer) => {
        if (aError) {
            throw aError;
        }

        const minified = uglify.minify(aBuffer.toString(), {
            fromString: true
        });
        fs.writeFile('./dist/browserify.js', minified.code);
    });