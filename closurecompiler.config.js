const JAVA_PATH = 'java';
const JAR_PATH = require.resolve('google-closure-compiler/compiler.jar');
const spawn = require('child_process').spawn;
const glob = require('glob');
const args = ['-jar', JAR_PATH];

args.push('--env', 'BROWSER');
args.push('--js_output_file', 'dist/closurecompiler.js');
args.push('--language_in', 'ECMASCRIPT6');
args.push('--compilation_level', 'ADVANCED_OPTIMIZATIONS');

glob('src/**/*.js', {}, (err, files) => {
    if (err) {
        throw err;
    }

    files.forEach((aFile) => {
        args.push('--js', aFile);
    });

    spawn(JAVA_PATH, args, { stdio: 'inherit' });
});