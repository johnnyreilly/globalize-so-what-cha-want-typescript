# Globalize So What'cha Want - TypeScript

[![Build Status](https://ci.appveyor.com/api/projects/status/github/johnnyreilly/globalize-so-what-cha-want-typescript?retina=false)](https://ci.appveyor.com/project/JohnReilly/globalize-so-what-cha-want-typescript)

This is an attempted port of [Globalize So What'cha Want](https://github.com/johnnyreilly/globalize-so-what-cha-want) to TypeScript for @mhegazy to illustrate problems experienced in https://github.com/Microsoft/TypeScript/issues/4337#issuecomment-137993365.

Globalize So What'cha Want is made up of 2 things:

1. an [npm package](https://www.npmjs.com/package/globalize-so-what-cha-want)
2. an [online tool](http://johnnyreilly.github.io/globalize-so-what-cha-want/) which provides a nice UI for the package

The npm package is vanilla JS, the online tool is built using the following technologies:
- Browserify
- React
- Babel

The idea is to migrate this repo to TypeScript to get the benefit of static typing whilst still using Babel for transpilation to present day JS (we will target ES6 as the output of the TypeScript compilation).  We will use TSIFY for the TS compilation.

Last time I attempted this (on a similar codebase) the latest version of TS available was 1.5 beta.  Now that 1.6 beta is out perhaps more success will be experienced.  Or not.  But here goes.

# Getting Up and Running

This has been ported across to TypeScript using the mighty fine atom-typescript plugin.  

At present this does not work :sob:.  You can check out the state of the build [here](https://ci.appveyor.com/project/JohnReilly/globalize-so-what-cha-want-typescript)
