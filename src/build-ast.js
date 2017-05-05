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

const buildDiff = (before, after, depth = 0) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKeyDiff(key, before[key], after[key], depth));

export default buildDiff;
