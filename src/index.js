import fs from 'fs';
import path from 'path';

import gendiff from './gendiff';
import getParser from './parsers';

const getExt = p => path.extname(p).substr(1);
const getConfig = p => getParser(getExt(p))(fs.readFileSync(p, 'utf-8'));

export default (before, after) => {
  const lines = gendiff(getConfig(before), getConfig(after));

  return `{\n${lines.join('\n')}\n}`;
};
