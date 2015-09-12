# Globalize So What'cha Want - TypeScript

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

To attempt to build run either of the following commands:

```
npm run build
```

This attempts to build using Gulp / TSIFY etc.  It currently errors like this:

```
C:\Source\globalize-so-what-cha-want-typescript [master +13 ~3 -11 !]> npm run build

> globalize-so-what-cha-want@0.8.2 build C:\Source\globalize-so-what-cha-want-typescript
> gulp build

[06:04:06] Using gulpfile C:\Source\globalize-so-what-cha-want-typescript\gulpFile.js
[06:04:06] Starting 'build'...
[06:04:06] Finished 'build' after 172 ms
[06:04:07] gulp-notify: [APP Bundle] Failing to build...
[06:04:07] { [TypeScript error: src/demo/main.ts(2,24): Error TS2307: Cannot find module 'react'.]
  message: 'src/demo/main.ts(2,24): Error TS2307: Cannot find module \'react\'.',
  fileName: 'src/demo/main.ts',
  line: 2,
  column: 24,
  name: 'TypeScript error' }
[06:04:07] There is a problem in the app bundle!
[06:04:07] gulp-notify: [APP Bundle] Failing to build...
[06:04:07] { [TypeScript error: src/demo/main.ts(3,17): Error TS2307: Cannot find module './components/App'.]
  message: 'src/demo/main.ts(3,17): Error TS2307: Cannot find module \'./components/App\'.',
  fileName: 'src/demo/main.ts',
  line: 3,
  column: 17,
  name: 'TypeScript error' }
[06:04:07] There is a problem in the app bundle!
[06:04:08] gulp-notify: [APP Bundle] Failing to build...
[06:04:08]
C:\Source\globalize-so-what-cha-want-typescript\src\demo\main.ts:1
import * as React from 'react';
^
ParseError: 'import' and 'export' may appear only with 'sourceType: module'
```

```
npm run watch
```

This does the same but using file watchers. It errors like this:

```
C:\Source\globalize-so-what-cha-want-typescript [master +13 ~3 -11 !]> npm run watch

> globalize-so-what-cha-want@0.8.2 watch C:\Source\globalize-so-what-cha-want-typescript
> gulp watch

[06:03:41] Using gulpfile C:\Source\globalize-so-what-cha-want-typescript\gulpFile.js
[06:03:41] Starting 'watch'...
[06:03:41] Finished 'watch' after 163 ms
[06:03:42] gulp-notify: [APP Bundle] Failing to build...
[06:03:42] { [TypeScript error: src/demo/main.ts(2,24): Error TS2307: Cannot find module 'react'.]
  message: 'src/demo/main.ts(2,24): Error TS2307: Cannot find module \'react\'.',
  fileName: 'src/demo/main.ts',
  line: 2,
  column: 24,
  name: 'TypeScript error' }
[06:03:42] There is a problem in the app bundle!
[06:03:42] gulp-notify: [APP Bundle] Failing to build...
[06:03:42] { [TypeScript error: src/demo/main.ts(3,17): Error TS2307: Cannot find module './components/App'.]
  message: 'src/demo/main.ts(3,17): Error TS2307: Cannot find module \'./components/App\'.',
  fileName: 'src/demo/main.ts',
  line: 3,
  column: 17,
  name: 'TypeScript error' }
[06:03:42] There is a problem in the app bundle!
[06:03:43] gulp-notify: [APP Bundle] Failing to build...
[06:03:43]
C:\Source\globalize-so-what-cha-want-typescript\src\demo\main.ts:1
import * as React from 'react';
^
ParseError: 'import' and 'export' may appear only with 'sourceType: module'
[06:03:43] There is a problem in the app bundle!
```
```
