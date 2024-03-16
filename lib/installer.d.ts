/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
export declare class Installer {
    constructor(argv: Array<string>);
    readonly argv: Array<string>;
    readonly target: string;
    run(): Promise<void>;
}
export declare namespace Installer {
    interface Args extends Partial<Record<string, (boolean | string)>> {
        help?: boolean;
        recursive?: boolean;
        source?: string;
        verbose?: boolean;
        version?: boolean;
    }
    const CWD: string;
    const DIR: string;
    const VERSION: string;
    const HELP: string[];
    function run(argv: Array<string>): Promise<void>;
}
export default Installer;
