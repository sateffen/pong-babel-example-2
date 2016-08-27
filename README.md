# Pong babel example 2 #

This is a second generation of my [pong babel example](https://github.com/sateffen/pong-babel-example),
where I wanted to set up different bundler systems with ES6 code to build minified bundles, as well as
set up karma with tests.

The main setup contains *browserify*, *webpack* and *rollup*. Additionally, there is a build script for
the closurecompiler, because I wanted to test the closurecompiler for quite some time, but had not time
or code for this.

All in all this serves as example, how to set up bundling and testing with the different systems.

If you've got any suggestions for other bundlers, that are great, just tell me.

For me I think I'll think about the bundler choice a little more in my future projects. Usually I'm using
webpack for everything, because of its great loader support, so webpack serves as project-compiler, that
can do everything. But for smaller projects, or ones with special size requirements, I'll think more about
using alternatives.

## Notes to the scripts

The build and test setups are independent from any task runner like grunt or gulp, so you can integrate it
in every project you like just by copying from here.

The build setups are minifiing your code all the way down, so you don't have to add anything else.

The test setups generate coverage reports based on the ES6 code, so the base is set for every project you should
need. Even eslint is used, but that is not difficult to be honest.

## A note about browserify

When looking at the browserify setup you'll recognize, that I'm not using the CLI version, but wrote an own
build script. The reason for this is my integration with uglify. I know about uglifyify, but uglifyify works
on a per module basis, and I wanted an optimized bundle based on bundle basis. This is basically the only
reason for this setup.

## A note about closurecompiler

The closurecompiler is a little out of league, because it integrates its own transpiler, as well as bundler
system. An integration with karma didn't work out of the box, so I just set up a build script, with works
well. You should be able to copy this script in every project, and it should run (maybe change the java
constant).

All in all, if you never used the closurecompiler, check if it fulfills your requirements, and give it a shot.
It's a very good tool, that creates very fast and small bundles, even smaller than any other setup here.

Additionally, you get another linter for your source code, that is very strict, but works on a different basis:
It checks types as well. The hints are useful most of the time, so like I said: Give it a shot.