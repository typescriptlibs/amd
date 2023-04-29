/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
function define(e,r,i){const u=define.prefix;var n=e=>require(u+e)||require(e);i.apply(void 0,[n,require.module[u+e]={},...r.slice(2).map(n)])}function require(e){return require.module[e]}define.prefix="",require.module={};
//# sourceMappingURL=amd.js.map