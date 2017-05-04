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

const buildKeyDiff = (name, before, after, depth) => {
  const type = getKeyType(before, after);
  const newBefore = type === 'new' ? after : before;
  const newAfter = type === 'removed' ? before : after;
  const buildValue = value =>
    (value instanceof Object ? buildDiff(newBefore, newAfter, depth + 1) : value);

  return {
    name,
    depth,
    type,
    before: buildValue(before),
    after: buildValue(after),
  };
};

export const buildDiff = (before, after, depth = 0) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKeyDiff(key, before[key], after[key], depth));

const keyStringifier = {
  same: key => [`   ${key.name}: ${stringifyDiff(key.before, key.depth + 1)}`],
  new: key => [` + ${key.name}: ${stringifyDiff(key.after, key.depth + 1)}`],
  removed: key => [` - ${key.name}: ${stringifyDiff(key.before, key.depth + 1)}`],
  changed: key => [
    ` - ${key.name}: ${stringifyDiff(key.before, key.depth + 1)}`,
    ` + ${key.name}: ${stringifyDiff(key.after, key.depth + 1)}`
  ],
};

const stringifyKey = (key) => {
  const pad = _.repeat(' ', key.depth * 3);
  const diff = _.flatten(keyStringifier[key.type](key));

  return diff.map(row => pad + row).join('\n');
};

export const stringifyDiff = (diff, depth = 0) => {
  if (typeof diff === 'string' || typeof diff === 'number' || typeof diff === 'boolean') {
    return diff;
  }

  const rows = diff.map(key => stringifyKey(key));
  const pad = _.repeat(' ', depth * 3);

  return `{\n${rows.join('\n')}\n${pad}}`;
};
