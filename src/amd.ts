/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

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
 * @param m
 * Module path of definition.
 *
 * @param io
 * Module imports of definition.
 *
 * @param fn
 * Module definition.
 */
function define ( m: string, io: Array<string>, fn: Function ): void {
    fn.apply( undefined, [require, require.module[define.prefix + m] = {}, ...io.slice( 2 ).map( require )] );
}

/**
 * Returns a TypeScrip AMD module.
 *
 * @param m
 * Module path to return.
 *
 * @return
 * Module or `undefined`, if not found.
 */
function require (
    m: string
): ( AMDModule | undefined ) {
    return require.module[m];
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
