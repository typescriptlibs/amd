/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

/* *
 *
 *  Declarations
 *
 * */

/**
 * Expected structure of a TypeScript AMD module.
 */
interface AMDModule extends Record<string, any> {
    __esModule?: true;
    default?: any;
}

/* *
 *
 *  Functions
 *
 * */

/**
 * Defines a TypeScrip AMD module for require.
 *
 * @param path
 * Module path of definition.
 *
 * @param imports
 * Module imports of definition.
 *
 * @param definition
 * Module definition.
 */
function define (
    path: string,
    imports: Array<string>,
    definition: Function
): void {
    const prefix = define.prefix;
    const prequire = ( path: string ): ( AMDModule | undefined ) => (
        require( prefix + path ) ||
        require( path )
    );

    definition.apply(
        undefined,
        [
            prequire,
            require.module[prefix + path] = {},
            ...imports.slice( 2 ).map( prequire )
        ]
    );
}

/**
 * Returns a TypeScrip AMD module.
 *
 * @param path
 * Module path to return.
 *
 * @return
 * Module or `undefined`, if not found.
 */
function require (
    path: string
): ( AMDModule | undefined ) {
    return require.module[path];
}

/* *
 *
 *  Function Properties
 *
 * */

/**
 * Defines a prefix for all new module definitions.
 */
define.prefix = '';

/**
 * Contains the available modules. Usually the path is based on the `rootDir`
 * option of `tsconfig.json`.
 */
require.module = {} as Record<string, AMDModule>;
