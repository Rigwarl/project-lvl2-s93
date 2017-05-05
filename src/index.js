import fs from 'fs';
import path from 'path';

import getParser from './parsers';
import buildDiff from './build-diff';
import buildAST from './build-ast';

const getExt = p => path.extname(p).substr(1);
const getConfig = p => getParser(getExt(p))(fs.readFileSync(p, 'utf-8'));

export default (before, after) => {
  const ast = buildAST(getConfig(before), getConfig(after));

  return buildDiff(ast);
};
