import _ from 'lodash';

const build = (node, depth) => {
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
    return node;
  }

  const pad = _.repeat(' ', depth * 3);
  // eslint-disable-next-line no-use-before-define
  const rows = node.map(key => buildKey(key, depth));

  return `{\n${rows.join('\n')}\n${pad}}`;
};

const keyBuilder = {
  same: (key, depth) => [`   ${key.name}: ${build(key.before, depth)}`],
  new: (key, depth) => [` + ${key.name}: ${build(key.after, depth)}`],
  removed: (key, depth) => [` - ${key.name}: ${build(key.before, depth)}`],
  changed: (key, depth) => [
    ` - ${key.name}: ${build(key.before, depth)}`,
    ` + ${key.name}: ${build(key.after, depth)}`,
  ],
};

const buildKey = (key, depth) => {
  const pad = _.repeat(' ', depth * 3);
  const diff = _.flatten(keyBuilder[key.type](key, depth + 1));

  return diff.map(row => pad + row).join('\n');
};

export default ast => build(ast, 0);
