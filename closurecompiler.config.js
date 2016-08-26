// first we setup some constants. First of all the java command, and then the path
// to the closure compiler jar file
const JAVA_PATH = 'java';
const JAR_PATH = require.resolve('google-closure-compiler/compiler.jar');
// then we load our dependencies, the spawn function and glob
const spawn = require('child_process').spawn;
const glob = require('glob');
// and we setup an array for all arguments we want to pass to the command line
const args = ['-jar', JAR_PATH];

// then setup some command line flags, that configure the input, optimizations and
// output
args.push('--env', 'BROWSER');
args.push('--language_in', 'ECMASCRIPT6');
args.push('--compilation_level', 'ADVANCED_OPTIMIZATIONS');
args.push('--js_output_file', 'dist/closurecompiler.js');

// and now search for all sourcefiles
glob('src/**/*.js', {}, (aError, aFiles) => {
    // if an error occured simply rethrow it
    if (aError) {
        throw aError;
    }
    // else convert each file to a commandline flag for the compiler
    aFiles.forEach((aFile) => {
        args.push('--js', aFile);
    });

    // now we have all commandline flags together, so we can spawn the main
    // process with all args, and tell it to share the same stdio as this process,
    // so we know everything that happens.
    spawn(JAVA_PATH, args, { stdio: 'inherit' });
});