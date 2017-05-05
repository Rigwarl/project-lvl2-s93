import genDiff from '../src';

const exts = ['json', 'yml', 'ini'];
const getDiff = (before, after, ext) => genDiff(`__test__/data/${before}.${ext}`, `__test__/data/${after}.${ext}`, 'json');

const numToStr = value => (typeof value === 'number' ? String(value) : value);
const changeNumToStr = result =>
  Object.keys(result).reduce((acc, key) => ({ ...acc, [key]: numToStr(result[key]) }), {});
const fixIni = (result, ext) => (ext === 'ini' ? changeNumToStr(result) : result);
const stringify = result => (result ? JSON.stringify(result, null, '  ') : '{}');
const getResult = (result, ext) => stringify(fixIni(result, ext));
const checkAllExts = (before, after, result) =>
  exts.forEach(ext => expect(getDiff(before, after, ext)).toEqual(getResult(result, ext)));

test('empty configs', () => {
  checkAllExts('empty', 'empty', '');
});

test('first empty config', () => {
  const result = {
    '+timeout': 20,
    '+verbose': true,
    '+host': 'hexlet.io',
  };

  checkAllExts('empty', 'after', result);
});

test('second empty config', () => {
  const result = {
    '-host': 'hexlet.io',
    '-timeout': 50,
    '-proxy': '123.234.53.22',
  };
  checkAllExts('before', 'empty', result);
});

test('custom configs', () => {
  const result = {
    host: 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '+verbose': true,
  };
  checkAllExts('before', 'after', result);
});

test('deep configs', () => {
  const result = {
    common: {
      setting1: 'Value 1',
      '-setting2': '200',
      setting3: true,
      '-setting6': {
        key: 'value',
      },
      '+setting4': 'blah blah',
      '+setting5': {
        key5: 'value5',
      },
    },
    group1: {
      '-baz': 'bas',
      '+baz': 'bars',
      foo: 'bar',
    },
    '-group2': {
      abc: '12345',
    },
    '+group3': {
      fee: '100500',
    },
  };

  expect(getDiff('deep-before', 'deep-after', 'json')).toEqual(JSON.stringify(result, null, '  '));
});
