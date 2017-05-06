import _ from 'lodash';

const isObj = val => val instanceof Object;

const keyChecker = {
  same: (before, after) => before === after || (isObj(before) && isObj(after)),
  new: before => before === undefined,
  removed: (before, after) => after === undefined,
  changed: () => true,
};

const getKeyType = (before, after) => ['same', 'new', 'removed', 'changed']
  .find(type => keyChecker[type](before, after));

const buildValue = value => (isObj(value) ? null : value);

const buildKey = (name, before, after) => {
  const type = getKeyType(before, after);

  return {
    name,
    type,
    // eslint-disable-next-line no-use-before-define
    children: build(before, after),
    before: buildValue(before),
    after: buildValue(after),
  };
};

const buildIter = (before, after) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKey(key, before[key], after[key]));

const build = (before, after) => {
  if (!isObj(before) && !isObj(after)) {
    return null;
  }
  const newBefore = isObj(before) ? before : after;
  const newAfter = isObj(after) ? after : before;

  return buildIter(newBefore, newAfter);
};

export default build;
