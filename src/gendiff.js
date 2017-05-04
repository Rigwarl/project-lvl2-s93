import _ from 'lodash';

const keyChecker = {
  same: (before, after) =>
    before === after || (before instanceof Object && after instanceof Object),
  new: before => before === undefined,
  removed: (before, after) => after === undefined,
  changed: () => true,
};

const getKeyType = (before, after) => ['same', 'new', 'removed', 'changed']
  .find(type => keyChecker[type](before, after));

const buildKeyDiff = (name, before, after, depth) => ({
  name,
  depth,
  type: getKeyType(before, after),
  before: before instanceof Object ? buildDiff(before, after, depth + 1) : before,
  after: after instanceof Object ? buildDiff(before, after, depth + 1) : after,
});

export const buildDiff = (before, after, depth = 0) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKeyDiff(key, before[key], after[key], depth));

const keyBuilder = {
  same: key => [`   ${key.name}: ${stringifyDiff(key.before)}`],
  new: key => [` + ${key.name}: ${stringifyDiff(key.after)}`],
  removed: key => [` - ${key.name}: ${stringifyDiff(key.before)}`],
  changed: key => [
    ` - ${key.name}: ${stringifyDiff(key.before)}`,
    ` + ${key.name}: ${stringifyDiff(key.after)}`
  ],
};

const stringifyKey = (key) => {
  const pad = _.repeat(' ', key.depth * 3);
  const diff = _.flatten(keyBuilder[key.type](key));

  return diff.map(row => pad + row).join('\n');
};

export const stringifyDiff = (diff) => {
  if (typeof diff === 'string' || typeof diff === 'number' || typeof diff === 'boolean') {
    return diff;
  }

  const rows = diff.map(key => stringifyKey(key));

  return `{\n${rows.join('\n')}\n}`;
};
