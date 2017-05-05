import _ from 'lodash';

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

const stringifyDiff = (diff, depth = 0) => {
  if (typeof diff === 'string' || typeof diff === 'number' || typeof diff === 'boolean') {
    return diff;
  }

  const rows = diff.map(key => stringifyKey(key));
  const pad = _.repeat(' ', depth * 3);

  return `{\n${rows.join('\n')}\n${pad}}`;
};

export default stringifyDiff;
