#!/usr/bin/env node

import { Command } from 'commander';
import initialize from './commands/charmtop.js';
import chalk from 'chalk';


const program = new Command();

program
  .name('charmtopcli')
  .description('✨ Organize your messy desktop! ✨')
  .version('1.0.0')
  .action(() => {
    console.log(`Welcome to ${chalk.magentaBright('CharmTopCLI 💖')} :) \n`);
    console.log(`Use the command ${chalk.yellowBright('charmtopcli charm')} to organize your desktop \n`);
    console.log(`Use the ${chalk.dim('--help')} option to see available commands.`);
  });

program
  .command('charm')
  .description('Charmes your desktop')
  .action(() => {
    import('./commands/charmtop.js').then(charmtop => initialize());
  });

program.parse();
