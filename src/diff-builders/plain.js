const build = (node, path) => {
  if (!(node instanceof Object)) {
    return null;
  }
  // eslint-disable-next-line no-use-before-define
  const rows = node.map(key => buildKey(key, path)).filter(key => !!key);

  return rows.join('\n');
};

const buildValue = (value, add = false) => {
  if (value instanceof Object) {
    return 'complex value';
  }

  return add ? `value: ${value}` : value;
};

const keyBuilder = {
  same: (key, path) => build(key.before, path),
  new: (key, path) => `Property '${path.join('.')}' was added with ${buildValue(key.after, true)}`,
  removed: (key, path) => `Property '${path.join('.')}' was removed`,
  changed: (key, path) => `Property '${path.join('.')}' was updated. From '${buildValue(key.before)}' to '${buildValue(key.after)}'`,
};

const buildKey = (key, path) => keyBuilder[key.type](key, path.concat(key.name));

export default ast => build(ast, []);
