const build = node =>
  // eslint-disable-next-line no-use-before-define
  node.map(key => buildKey(key))
    .reduce((acc, key) => ({ ...acc, [key.name]: key.body }), {});

const buildValue = (children, value) => (children ? build(children) : value);

const keyBuilder = {
  same: key => ({ value: buildValue(key.children, key.before) }),
  new: key => ({ value: buildValue(key.children, key.after) }),
  removed: key => ({ value: buildValue(key.children, key.before) }),
  changed: key => ({
    value: buildValue(key.children, key.after),
    prevValue: buildValue(key.children, key.before),
  }),
};

const buildKey = key => ({
  name: key.name,
  body: { type: key.type, ...keyBuilder[key.type](key) },
});

export default ast => JSON.stringify(build(ast), null, '  ');
