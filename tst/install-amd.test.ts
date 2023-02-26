/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

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
 *  Functions
 *
 * */

function exec ( command: string ): Promise<[string, string]> {
    return new Promise( ( resolve, reject ) => {
        ChildProcess.exec( command, {
            cwd: 'tst-run'
        }, ( error, stdout, stderr ) => {

            if ( stdout ) {
                console.log( stdout );
            }

            if ( stderr ) {
                console.log( stderr );
            }

            if ( error ) {
                reject( error );
            } else {
                resolve( [stdout, stderr] );
            }
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
