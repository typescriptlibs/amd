/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript AMD Loader

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
import * as FS from 'node:fs';
import * as OS from 'node:os';
import * as Path from 'node:path';
export class Installer {
    constructor(argv) {
        this.argv = argv;
        let target = argv[argv.length - 1];
        if (target.startsWith('-') ||
            target.startsWith('/')) {
            target = "./";
        }
        this.target = target;
    }
    async run() {
        try {
            const argv = this.argv;
            if (argv.includes('-h') ||
                argv.includes('--help')) {
                console.info(Installer.HELP.join(OS.EOL));
                return;
            }
            if (argv.includes('-v') ||
                argv.includes('--version')) {
                console.info(Installer.VERSION);
                return;
            }
            const files = ['amd.js'];
            if (argv.includes('--sourcemap')) {
                files.push('amd.js.map');
            }
            for (const file of files) {
                const source = Path.relative(Installer.CWD, Path.join(Installer.DIR, '..', 'lib', file));
                const target = Path.join(Installer.CWD, Path.join(this.target, file));
                if (argv.includes('--verbose')) {
                    console.log(`Copy ${source} to ${target}`);
                }
                await FS.promises.mkdir(Path.dirname(target), { recursive: true });
                await FS.promises.copyFile(source, target);
            }
        }
        catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}
(function (Installer) {
    Installer.CWD = process.cwd();
    Installer.DIR = Path.dirname(import.meta.url.substring(7));
    Installer.VERSION = 'Version 1.1.0';
    Installer.HELP = [
        `install-amd: TypeScript AMD - ${Installer.VERSION}`,
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
    async function run(argv) {
        return new Installer(argv).run();
    }
    Installer.run = run;
})(Installer || (Installer = {}));
export default Installer;
//# sourceMappingURL=installer.js.map