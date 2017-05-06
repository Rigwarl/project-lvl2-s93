import _ from 'lodash';

const build = (node, depth) => {
  const pad = _.repeat(' ', depth * 3);
  // eslint-disable-next-line no-use-before-define
  const rows = node.map(key => buildKey(key, depth));

  return `{\n${rows.join('\n')}\n${pad}}`;
};

const buildValue = (value, children, depth) => (children ? build(children, depth) : value);

const keyBuilder = {
  same: (key, depth) => [`   ${key.name}: ${buildValue(key.before, key.children, depth)}`],
  new: (key, depth) => [` + ${key.name}: ${buildValue(key.after, key.children, depth)}`],
  removed: (key, depth) => [` - ${key.name}: ${buildValue(key.before, key.children, depth)}`],
  changed: (key, depth) => [
    ` - ${key.name}: ${buildValue(key.before, key.children, depth)}`,
    ` + ${key.name}: ${buildValue(key.after, key.children, depth)}`,
  ],
};

const buildKey = (key, depth) => {
  const pad = _.repeat(' ', depth * 3);
  const diff = _.flatten(keyBuilder[key.type](key, depth + 1));

  return diff.map(row => pad + row).join('\n');
};

export default ast => build(ast, 0);
