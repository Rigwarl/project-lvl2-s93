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

test('empty configs', () => {
  expect(gendiff({}, {})).toBe('');
});

test('first empty config', () => {
  const result = `{
    + timeout: 20,
    + verbose: true,
    + host: 'hexlet.io',
  }`;
  expect(gendiff({}, after)).toBe(result);
});

test('second empty config', () => {
  const result = `{
    - host: 'hexlet.io',
    - timeout: 50,
    - proxy: '123.234.53.22',
  }`;
  expect(gendiff(before, {})).toBe(result);
});

test('custom configs', () => {
  const result = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
  }`;
  expect(gendiff(before, after)).toBe(result);
});
