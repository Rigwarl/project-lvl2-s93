import genLines from '../src/genlines';

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
  expect(genLines({}, {})).toEqual([]);
});

test('first empty config', () => {
  const result = [
    ' + timeout: 20',
    ' + verbose: true',
    ' + host: hexlet.io',
  ];
  expect(genLines({}, after)).toEqual(result);
});

test('second empty config', () => {
  const result = [
    ' - host: hexlet.io',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
  ];
  expect(genLines(before, {})).toEqual(result);
});

test('custom configs', () => {
  const result = [
    '   host: hexlet.io',
    ' - timeout: 50',
    ' + timeout: 20',
    ' - proxy: 123.234.53.22',
    ' + verbose: true',
  ];
  expect(genLines(before, after)).toEqual(result);
});
