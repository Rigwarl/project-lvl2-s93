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

/* eslint-disable no-use-before-define */
const buildChildren = (value, secondValue = null) =>
  (value instanceof Object ? build(value, secondValue || value) : null);
/* eslint-enable no-use-before-define */

const childBuilder = {
  same: (before, after) => buildChildren(before, after),
  new: (before, after) => buildChildren(after),
  removed: before => buildChildren(before),
  changed: (before, after) => buildChildren(before) || buildChildren(after) || null,
};

const buildValue = value => (value instanceof Object ? null : value);

const buildKey = (name, before, after) => {
  const type = getKeyType(before, after);

  return {
    name,
    type,
    children: childBuilder[type](before, after),
    before: buildValue(before),
    after: buildValue(after),
  };
};

const build = (before, after) =>
  _.union(Object.keys(before), Object.keys(after))
  .map(key => buildKey(key, before[key], after[key]));

export default build;
