const build = (node, path) =>
  // eslint-disable-next-line no-use-before-define
  node.map(key => buildKey(key, path)).filter(key => !!key).join('\n');

const buildValue = (value, children) => (children ? 'complex value' : value);

const buildNewValue = (value, children) => (children ? 'complex value' : `value: ${value}`);

const keyBuilder = {
  same: (key, path) => (key.children ? build(key.children, path) : null),
  new: (key, path) => `Property '${path.join('.')}' was added with ${buildNewValue(key.after, key.children)}`,
  removed: (key, path) => `Property '${path.join('.')}' was removed`,
  changed: (key, path) => `Property '${path.join('.')}' was updated. From '${buildValue(key.before, key.children)}' to '${buildValue(key.after, key.children)}'`,
};

const buildKey = (key, path) => keyBuilder[key.type](key, path.concat(key.name));

export default ast => build(ast, []);
