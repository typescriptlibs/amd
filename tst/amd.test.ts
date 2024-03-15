/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

/* *
 *
 *  Imports
 *
 * */

import * as FS from 'node:fs';
import test from '@typescriptlibs/tst';

/* *
 *
 *  Declarations
 *
 * */

interface AMD {
    define: AMDDefine;
    require: AMDRequire;
}

interface AMDDefine {
    (
        path: string,
        imports: Array<string>,
        definition: Function
    ): void;
    prefix: string;
}

interface AMDModule extends Record<string, any> {
    __esModule?: true;
    default?: any;
}

interface AMDRequire {
    (
        path: string
    ): ( AMDModule | undefined );
    module: Record<string, AMDModule>;
}

/* *
 *
 *  Constants
 *
 * */

const AMD = {} as AMD;

eval( [
    FS.readFileSync( './lib/amd.js', 'utf-8' ),
    'AMD.define = define;',
    'AMD.require = require;'
].join( '\n' ) );

/* *
 *
 *  Tests
 *
 * */

test( 'Test AMD imports with prefix (#3)', async ( assert: test.Assert ) => {

    assert.strictEqual(
        typeof AMD.define,
        'function',
        'Function `define` should exist.'
    );

    assert.strictEqual(
        typeof AMD.require,
        'function',
        'Function `require` should exist.'
    );

    AMD.define(
        'A',
        ['require', 'exports'],
        function ( _require: AMDRequire, exports: Record<string, any> ) {
            exports.root = true;
        }
    );

    AMD.define.prefix = 'C/';

    AMD.define(
        'A',
        ['require', 'exports'],
        function ( _require: AMDRequire, exports: Record<string, any> ) {
            exports.prefix = true;
        }
    );

    AMD.define(
        'B',
        ['require', 'exports', 'A'],
        function (
            _require: AMDRequire,
            _exports: Record<string, any>,
            A: Record<string, any>
        ) {
            assert.strictEqual(
                A.prefix,
                true,
                'C/A module should be loaded instead of A.'
            );
        }
    );

    assert.deepStrictEqual(
        Object.keys( AMD.require.module ),
        ['A', 'C/A', 'C/B'],
        'Three modules should be defined on require.'
    );

} );
