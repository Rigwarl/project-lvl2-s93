import _ from 'lodash';

const build = (node) => {
  if (!(node instanceof Object)) {
    return node;
  }

  // eslint-disable-next-line no-use-before-define
  const diff = node.map(key => buildKey(key));
  const flatDiff = _.flatten(diff);

  return flatDiff.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};

const keyBuilder = {
  same: key => [{ [key.name]: build(key.before) }],
  new: key => [{ [`+${key.name}`]: build(key.after) }],
  removed: key => [{ [`-${key.name}`]: build(key.before) }],
  changed: key => [
    { [`-${key.name}`]: build(key.before) },
    { [`+${key.name}`]: build(key.after) },
  ],
};

const buildKey = key => keyBuilder[key.type](key);

export default ast => JSON.stringify(build(ast), null, '  ');
