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
            target = ".";
        }
        this.target = Path.join('.', target);
    }
    async run() {
        const argv = this.argv;
        const verbose = argv.includes('--verbose');
        try {
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
                const source = Path.relative(Installer.CWD, Path.join(Installer.DIR, file));
                const target = Path.join(this.target, file);
                if (verbose) {
                    console.log(`Copy ${source} to ${target}`);
                }
                if (argv.includes('--recursive')) {
                    await FS.promises.mkdir(this.target, {
                        recursive: true
                    });
                }
                else if (!FS.existsSync(this.target)) {
                    throw new Error(`Folder does not exist: ./${this.target}`);
                }
                await FS.promises.copyFile(source, target);
            }
        }
        catch (error) {
            console.error(verbose ? error : `${error}\n`);
            process.exit(1);
        }
    }
}
(function (Installer) {
    Installer.CWD = process.cwd();
    Installer.DIR = Path.dirname(decodeURIComponent(import.meta.url.substring(7)));
    Installer.VERSION = 'Version ' + (JSON.parse(FS.readFileSync(Path.join(Installer.DIR, '..', 'package.json'), 'utf8')).version ||
        '1.3.0');
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
    async function run(argv) {
        return new Installer(argv).run();
    }
    Installer.run = run;
})(Installer || (Installer = {}));
export default Installer;
//# sourceMappingURL=installer.js.map