import genDiff from '../src';

const exts = ['json', 'yml', 'ini'];
const getDiff = (before, after, ext) => genDiff(`__test__/data/${before}.${ext}`, `__test__/data/${after}.${ext}`, 'plain');
const checkAllExts = (before, after, result) =>
  exts.forEach(ext => expect(getDiff(before, after, ext)).toEqual(result));

test('empty configs', () => {
  checkAllExts('empty', 'empty', '');
});

test('first empty config', () => {
  const result = [
    "Property 'timeout' was added with value: 20",
    "Property 'verbose' was added with value: true",
    "Property 'host' was added with value: hexlet.io",
  ].join('\n');

  checkAllExts('empty', 'after', result);
});

test('second empty config', () => {
  const result = [
    "Property 'host' was removed",
    "Property 'timeout' was removed",
    "Property 'proxy' was removed",
  ].join('\n');

  checkAllExts('before', 'empty', result);
});

test('custom configs', () => {
  const result = [
    "Property 'timeout' was updated. From '50' to '20'",
    "Property 'proxy' was removed",
    "Property 'verbose' was added with value: true",
  ].join('\n');

  checkAllExts('before', 'after', result);
});

test('deep configs', () => {
  const result = [
    "Property 'common.setting2' was removed",
    "Property 'common.setting6' was removed",
    "Property 'common.setting4' was added with value: blah blah",
    "Property 'common.setting5' was added with complex value",
    "Property 'group1.baz' was updated. From 'bas' to 'bars'",
    "Property 'group2' was removed",
    "Property 'group3' was added with complex value",
  ].join('\n');

  expect(getDiff('deep-before', 'deep-after', 'json')).toEqual(result);
});
