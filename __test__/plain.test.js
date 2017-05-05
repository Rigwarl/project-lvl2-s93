import genDiff from '../src';

const exts = ['json', 'yml', 'ini'];
const getDiff = (before, after, ext) => genDiff(`__test__/data/${before}.${ext}`, `__test__/data/${after}.${ext}`, 'plain');
const checkAllExts = (before, after, result) =>
  exts.forEach(ext => expect(getDiff(before, after, ext)).toEqual(result));

test('empty configs', () => {
  checkAllExts('empty', 'empty', '{\n\n}');
});

test('first empty config', () => {
  const result = [
    "Property 'timeout' was added with value: 20",
    "Property 'verbose' was added with value: true",
    "Property 'host' was added with value: 'hexlet.io'",
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
