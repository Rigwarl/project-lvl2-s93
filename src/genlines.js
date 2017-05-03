export default (before, after) => {
  const keyDiff = {
    same: key => [`   ${key}: ${before[key]}`],
    new: key => [` + ${key}: ${after[key]}`],
    removed: key => [` - ${key}: ${before[key]}`],
    changed: key => [` - ${key}: ${before[key]}`, ` + ${key}: ${after[key]}`],
  };

  const keyCheck = {
    same: key => before[key] === after[key],
    new: key => before[key] === undefined,
    removed: key => after[key] === undefined,
    changed: () => true,
  };

  const getKeyType = key => ['same', 'new', 'removed', 'changed']
    .find(type => keyCheck[type](key));

  const getKeyDiff = key => keyDiff[getKeyType(key)](key);

  const keys = Object.keys({ ...before, ...after });
  const result = keys.map(getKeyDiff).reduce((acc, curr) => [...acc, ...curr], []);

  return result;
};
