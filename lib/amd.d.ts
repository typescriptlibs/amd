/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
interface AMDModule extends Record<string, any> {
    __esModule?: true;
    default?: any;
}
declare function define(path: string, imports: Array<string>, definition: Function): void;
declare namespace define {
    var prefix: string;
}
declare function require(path: string): (AMDModule | undefined);
declare namespace require {
    var module: Record<string, AMDModule>;
}
