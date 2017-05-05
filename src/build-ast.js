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

const buildValue = (value, before, after, type) => {
  if (!(value instanceof Object)) {
    return value;
  }

  const newBefore = type === 'new' ? after : before;
  const newAfter = type === 'removed' ? before : after;

  // eslint-disable-next-line no-use-before-define
  return build(newBefore, newAfter);
};

const buildKey = (name, before, after) => {
  const type = getKeyType(before, after);

  return {
    name,
    type,
    before: buildValue(before, before, after, type),
    after: buildValue(after, before, after, type),
  };
};

const build = (before, after) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKey(key, before[key], after[key]));

export default build;
