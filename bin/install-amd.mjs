#!/usr/bin/env node

import Installer from '../lib/installer.js';

Installer
    .run( process.argv.slice( 1 ) )
    .catch( error => {
        console.error( error.toString() );
        process.exit( 1 );
    } );
