import genDiff from '../src';

const getResultStr = arr => `{\n${arr.join('\n')}\n}`;
const getDiff = (before, after) => genDiff(`__test__/data/${before}`, `__test__/data/${after}`);

test('empty configs', () => {
  expect(getDiff('empty.json', 'empty.json')).toEqual('{\n\n}');
});

test('first empty config', () => {
  const result = [
    ' + timeout: 20',
    ' + verbose: true',
    ' + host: hexlet.io',
  ];
  expect(getDiff('empty.json', 'after.json')).toEqual(getResultStr(result));
});

test('second empty config', () => {
  const result = [
    ' - host: hexlet.io',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
  ];
  expect(getDiff('before.json', 'empty.json')).toEqual(getResultStr(result));
});

test('custom configs', () => {
  const result = [
    '   host: hexlet.io',
    ' - timeout: 50',
    ' + timeout: 20',
    ' - proxy: 123.234.53.22',
    ' + verbose: true',
  ];
  expect(getDiff('before.json', 'after.json')).toEqual(getResultStr(result));
});
