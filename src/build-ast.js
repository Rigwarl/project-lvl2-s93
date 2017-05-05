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

const buildKey = (name, before, after) => {
  const type = getKeyType(before, after);
  // eslint-disable-next-line no-use-before-define
  const buildValue = value => (value instanceof Object ? build(before, after, type) : value);

  return {
    name,
    type,
    before: buildValue(before),
    after: buildValue(after),
  };
};

const build = (before, after, parentType) => {
  const newBefore = parentType === 'new' ? after : before;
  const newAfter = parentType === 'removed' ? before : after;

  return _.union(Object.keys(newBefore), Object.keys(newAfter))
  .map(key => buildKey(key, newBefore[key], newAfter[key]));
};

export default (before, after) => build(before, after, null);
