import gendiff from '../src/index';

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
};
const after = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const getResultStr = arr => `{\n${arr.join('\n')}\n}`;

test('empty configs', () => {
  expect(gendiff({}, {})).toBe('{\n\n}');
});

test('first empty config', () => {
  const result = [
    ' + timeout: 20',
    ' + verbose: true',
    ' + host: hexlet.io',
  ];
  expect(gendiff({}, after)).toBe(getResultStr(result));
});

test('second empty config', () => {
  const result = [
    ' - host: hexlet.io',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
  ];
  expect(gendiff(before, {})).toBe(getResultStr(result));
});

test('custom configs', () => {
  const result = [
    '   host: hexlet.io',
    ' - timeout: 50',
    ' + timeout: 20',
    ' - proxy: 123.234.53.22',
    ' + verbose: true',
  ];
  expect(gendiff(before, after)).toBe(getResultStr(result));
});
