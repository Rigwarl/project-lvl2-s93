import genDiff from '../src';

const exts = ['json', 'yml', 'ini'];
const getResultStr = arr => `{\n${arr.join('\n')}\n}`;
const getDiff = (before, after, ext) => genDiff(`__test__/data/${before}.${ext}`, `__test__/data/${after}.${ext}`);
const checkAllExts = (before, after, result) =>
  exts.forEach(ext => expect(getDiff(before, after, ext)).toEqual(result));

test('empty configs', () => {
  checkAllExts('empty', 'empty', '{\n\n}');
});

test('first empty config', () => {
  const result = [
    ' + timeout: 20',
    ' + verbose: true',
    ' + host: hexlet.io',
  ];
  checkAllExts('empty', 'after', getResultStr(result));
});

test('second empty config', () => {
  const result = [
    ' - host: hexlet.io',
    ' - timeout: 50',
    ' - proxy: 123.234.53.22',
  ];
  checkAllExts('before', 'empty', getResultStr(result));
});

test('custom configs', () => {
  const result = [
    '   host: hexlet.io',
    ' - timeout: 50',
    ' + timeout: 20',
    ' - proxy: 123.234.53.22',
    ' + verbose: true',
  ];
  checkAllExts('before', 'after', getResultStr(result));
});

test('deep configs', () => {
  const result = [
    '   common: {',
    '      setting1: Value 1',
    '    - setting2: 200',
    '      setting3: true',
    '    - setting6: {',
    '         key: value',
    '      }',
    '    + setting4: blah blah',
    '    + setting5: {',
    '         key5: value5',
    '      }',
    '   }',
    '   group1: {',
    '    - baz: bas',
    '    + baz: bars',
    '      foo: bar',
    '   }',
    ' - group2: {',
    '      abc: 12345',
    '   }',
    ' + group3: {',
    '      fee: 100500',
    '   }',
  ];
  expect(getDiff('deep-before', 'deep-after', 'json')).toEqual(getResultStr(result));
});
