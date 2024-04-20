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

import * as OS from 'node:os';

import * as Path from 'node:path';


/* *
 *
 *  Class
 *
 * */


export class Installer {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        argv: Array<string>
    ) {

        this.argv = argv;

        let target = argv[argv.length - 1];

        if (
            target.startsWith( '-' ) ||
            target.startsWith( '/' )
        ) {
            target = ".";
        }

        this.target = Path.join( '.', target );

    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly argv: Array<string>;


    public readonly target: string;


    /* *
     *
     *  Functions
     *
     * */


    public async run (): Promise<void> {
        const argv = this.argv;
        const verbose = argv.includes( '--verbose' );

        try {

            if (
                argv.includes( '-h' ) ||
                argv.includes( '--help' )
            ) {
                console.info( Installer.HELP.join( OS.EOL ) );
                return;
            }

            if (
                argv.includes( '-v' ) ||
                argv.includes( '--version' )
            ) {
                console.info( Installer.VERSION );
                return;
            }

            const files = ['amd.js'];

            if ( argv.includes( '--sourcemap' ) ) {
                files.push( 'amd.js.map' );
            }

            for ( const file of files ) {
                const source = Path.relative(
                    Installer.CWD,
                    Path.join( Installer.DIR, file )
                );
                const target = Path.join( this.target, file );

                if ( verbose ) {
                    console.log( `Copy ${source} to ${target}` );
                }

                if ( argv.includes( '--recursive' ) ) {
                    await FS.promises.mkdir(
                        this.target,
                        {
                            recursive: true
                        }
                    );
                }
                else if ( !FS.existsSync( this.target ) ) {
                    throw new Error( `Folder does not exist: ./${this.target}` );
                }

                await FS.promises.copyFile( source, target );
            }

        }
        catch ( error ) {
            console.error( verbose ? error : `${error}\n` );
            process.exit( 1 );
        }

    }


}


/* *
 *
 *  Class Namespace
 *
 * */


export namespace Installer {


    /* *
     *
     *  Declarations
     *
     * */


    export interface Args extends Partial<Record<string, ( boolean | string )>> {
        help?: boolean;
        recursive?: boolean;
        source?: string;
        verbose?: boolean;
        version?: boolean;
    }


    /* *
     *
     *  Constants
     *
     * */


    export const CWD = process.cwd();


    export const DIR = Path.dirname( decodeURIComponent( import.meta.url.substring( 7 ) ) );


    export const VERSION = 'Version ' + (
        JSON.parse(
            FS.readFileSync(
                Path.join( DIR, '..', 'package.json' ),
                'utf8'
            )
        ).version ||
        '1.3.0'
    );


    export const HELP = [
        `install-amd: TypeScript AMD - ${VERSION}`,
        '',
        `install-amd [options] [folder]`,
        '',
        'ARGUMENTS:',
        '',
        '  [options]  Optional flags explained in the section below.',
        '',
        '  [folder]   Folder to install to.',
        '',
        'OPTIONS:',
        '',
        '  --help, -h     Prints this help text.',
        '',
        '  --recursive    Recursive creation of missing folders.',
        '',
        '  --sourcemap    Copies also the source map.',
        '',
        '  --verbose      Prints installation details.',
        '',
        '  --version, -v  Prints the version string.',
        '',
        'EXAMPLES:',
        '',
        '  npx install-amd app/',
        '  Copies the AMD file in the "app" folder.',
        '',
        '  npx install-amd --sourcemap scripts/',
        '  Copies both AMD files in the "scripts" folder.',
    ];


    /* *
     *
     *  Functions
     *
     * */


    export async function run (
        argv: Array<string>
    ): Promise<void> {
        return new Installer( argv ).run();
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default Installer;
