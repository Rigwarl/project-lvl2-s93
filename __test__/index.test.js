import gendiff from '../src/index';

test('empty configs', () => {
  expect(gendiff({}, {})).toBe('');
});

test('custom configs', () => {
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
  const result = `{
      host: hexlet.io
    + timeout: 20
    - timeout: 50
    - proxy: 123.234.53.22
    + verbose: true
  }`;

  expect(gendiff(before, after)).toBe(result);
});
