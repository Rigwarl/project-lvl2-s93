import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import gendiff from './gendiff';

const parser = {
  ini: file => ini.parse(file),
  yml: file => yaml.safeLoad(file) || {},
  json: file => JSON.parse(file),
};
const getExt = p => path.extname(p).substr(1);
const getConfig = p => parser[getExt(p)](fs.readFileSync(p, 'utf-8'));

export default (before, after) => {
  const lines = gendiff(getConfig(before), getConfig(after));

  return `{\n${lines.join('\n')}\n}`;
};
