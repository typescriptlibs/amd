AMD: Basic loader for TypeScript AMD bundles
============================================

This package provides the necessary functions to load and run a TypeScript AMD
bundle as created by the `outFile` option of a `tsconfig.json`.

It does not support loading of external files. Each external dependency must
also be created as a TypeScript AMD bundle instead.



[![CodeQL](https://github.com/typescriptlibs/amd/workflows/CodeQL/badge.svg)](https://github.com/typescriptlibs/amd/actions/workflows/codeql.yml)
[![Node.js](https://github.com/typescriptlibs/amd/workflows/Node.js/badge.svg)](https://github.com/typescriptlibs/amd/actions/workflows/node.js.yml)
[![npm](https://img.shields.io/npm/v/@typescriptlibs/amd.svg)](https://www.npmjs.com/package/@typescriptlibs/amd)
[![license](https://img.shields.io/npm/l/@typescriptlibs/amd.svg)](https://github.com/typescriptlibs/amd/blob/main/LICENSE.md)



Example
-------

``` TypeScript
// MyBundle.ts
export function hello () {
    alert( 'Hello, world!' );
}
```

``` HTML
<!-- my-app.html -->
<html lang="en">
    <head>
        <script src="amd.js"></script>
        <script src="my-ts-amd-bundle.js" async></script>
        <script>
            window.addEventListener( 'load', () => require('MyBundle').hello() );
        </script>
    </head>
    <body>
    </body>
</html>
```
