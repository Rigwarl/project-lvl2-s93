#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import config from '../../package.json';
import gendiff from '../index';

const getConfig = path => JSON.parse(fs.readFileSync(path));

program
  .version(config.version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(gendiff(getConfig(first), getConfig(second))))
  .parse(process.argv);
