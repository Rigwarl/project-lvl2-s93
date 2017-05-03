import fs from 'fs';
import yaml from 'js-yaml';
import genLines from './genlines';

const parse = {
  yml: file => yaml.safeLoad(file) || {},
  json: file => JSON.parse(file),
};
const getExt = path => path.split('.').slice(-1)[0];
const getConfig = path => parse[getExt(path)](fs.readFileSync(path));

export default (before, after) => {
  const lines = genLines(getConfig(before), getConfig(after));

  return `{\n${lines.join('\n')}\n}`;
};
