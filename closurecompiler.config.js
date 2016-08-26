// first we setup some constants. First of all the java command, and then the path
// to the closure compiler jar file
const JAVA_PATH = 'java';
const JAR_PATH = require.resolve('google-closure-compiler/compiler.jar');
// then we load our dependencies, the spawn function and glob
const spawn = require('child_process').spawn;
// and we setup an array for all arguments we want to pass to the command line
const args = ['-jar', JAR_PATH];

// first we specify some flags about the compilation process
args.push('--env', 'BROWSER');
args.push('--language_in', 'ECMASCRIPT6');
args.push('--language_out', 'ECMASCRIPT5');
args.push('--compilation_level', 'ADVANCED_OPTIMIZATIONS');
args.push('--warning_level', 'VERBOSE');

// then we define how to get all the sourcefiles. With the dependency_mode and entry_point
// we tell the closure compiler how to build it's sourcecode tree
args.push('--dependency_mode', 'STRICT');
args.push('--entry_point', 'src/main.js');
// and yes, we need to specify this twice, because we need to mention the entry poit
// specifically, and the glob pattern for everything else
args.push('--js', 'src/main.js');
args.push('--js', 'src/**/*.js');

// and finally we define where to write the output
args.push('--js_output_file', 'dist/closurecompiler.js');

// finally execute the java process with shared stdio
spawn(JAVA_PATH, args, { stdio: 'inherit' });