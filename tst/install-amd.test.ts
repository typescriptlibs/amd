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


import * as ChildProcess from 'node:child_process';

import * as FS from 'node:fs';

import * as Path from 'node:path';

import test from '@typescriptlibs/tst';


/* *
 *
 *  Constants
 *
 * */


const OUT_DIR = 'tst-run';


/* *
 *
 *  Functions
 *
 * */


function exec ( command: string ): Promise<[string, string]> {
    return new Promise( ( resolve ) => {
        ChildProcess.exec( command, {
            cwd: OUT_DIR
        }, ( _error, stdout, stderr ) => {
            resolve( [stdout, stderr] );
        } );
    } );
}


async function isFile ( path: string ): Promise<boolean> {
    return ( await FS.promises.lstat( Path.join( 'tst-run', path ) ) ).isFile();
}


/* *
 *
 *  Tests
 *
 * */


test( 'Test install-amd', async ( assert: test.Assert ) => {
    const result = await exec( 'npx install-amd --verbose' );

    assert.ok(
        result[0].startsWith( 'Copy ../lib/amd.js' ),
        'Copy message should start with correct path.'
    );

    assert.ok(
        await isFile( 'amd.js' ),
        'Expected amd.js file should exist in the "tst-run" folder.'
    );

} );


test( 'Test --sourcemap', async ( assert: test.Assert ) => {
    const result = await exec( 'npx install-amd --sourcemap --verbose' );

    assert.ok(
        result[0].startsWith( 'Copy ../lib/amd.js' ),
        'Copy message should start with correct path.'
    );

    assert.ok(
        result[0].includes( 'Copy ../lib/amd.js.map' ),
        'Copy message should continue with correct path.'
    );

    assert.ok(
        await isFile( 'amd.js' ),
        'Expected amd.js file should exist in the "tst-run" folder.'
    );

    assert.ok(
        await isFile( 'amd.js.map' ),
        'Expected amd.js.map file should exist in the "tst-run" folder.'
    );

} );


test( 'Test --recursive', async ( assert: test.Assert ) => {
    const filePath = Path.join( OUT_DIR, 'extras', 'amd.js' );

    FS.rmSync( filePath, { force: true, recursive: true } );

    let result = await exec( 'npx install-amd extras' );

    assert.ok(
        result[1].startsWith( 'Error: Folder does not exist' ),
        'Installer should exit with error message.'
    );

    result = await exec( 'npx install-amd --recursive extras' );

    assert.strictEqual(
        result[1],
        '',
        'Installer should complete without error.'
    );

    assert.ok(
        FS.existsSync( filePath ),
        'Folder should be created.'
    );

} );
