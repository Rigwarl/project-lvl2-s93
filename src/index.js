import fs from 'fs';
import genLines from './genlines';

const getConfig = path => JSON.parse(fs.readFileSync(path));

export default (before, after) => {
  const lines = genLines(getConfig(before), getConfig(after));

  return `{\n${lines.join('\n')}\n}`;
};
