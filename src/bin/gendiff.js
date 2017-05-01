#!/usr/bin/env node

import program from 'commander';

program
  .version('0.2.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(first, second))
  .parse(process.argv);
