const fs = require('fs');
const browserify = require('browserify');
const uglify = require('uglify-js');

// First tell browserify where to start
browserify('./src/main.js')
    // then configure babelify, so the sourcecode gets transpiled    
    .transform('babelify', {
        presets: ['es2015']
    })
    // and finally bundle everything up
    .bundle((aError, aBuffer) => {
        // then, if anything went wrong, we rethrow it
        if (aError) {
            throw aError;
        }
        // else everything went well
        // so minify the bundle
        const minified = uglify.minify(aBuffer.toString(), {
            fromString: true
        });

        // and write it to it's destination        
        fs.writeFile('./dist/browserify.js', minified.code);
    });