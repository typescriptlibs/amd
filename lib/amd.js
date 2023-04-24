"use strict";
/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
function define(path, imports, definition) {
    const prefix = define.prefix;
    const prequire = (path) => (require(prefix + path) ||
        require(path));
    definition.apply(undefined, [
        prequire,
        require.module[prefix + path] = {},
        ...imports.slice(2).map(prequire)
    ]);
}
function require(path) {
    return require.module[path];
}
define.prefix = '';
require.module = {};
//# sourceMappingURL=amd.js.map