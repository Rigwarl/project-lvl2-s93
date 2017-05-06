import genDiff from '../src';

const exts = ['json', 'yml'];
const getDiff = (before, after, ext) => genDiff(`__test__/data/${before}.${ext}`, `__test__/data/${after}.${ext}`, 'json');
const checkAllExts = (before, after, result) =>
  exts.forEach(ext => expect(getDiff(before, after, ext)).toEqual(JSON.stringify(result, null, '  ')));

test('empty configs', () => {
  checkAllExts('empty', 'empty', {});
});

test('first empty config', () => {
  const result = {
    timeout: {
      type: 'new',
      value: 20,
    },
    verbose: {
      type: 'new',
      value: true,
    },
    host: {
      type: 'new',
      value: 'hexlet.io',
    },
  };

  checkAllExts('empty', 'after', result);
});

test('second empty config', () => {
  const result = {
    host: {
      type: 'removed',
      value: 'hexlet.io',
    },
    timeout: {
      type: 'removed',
      value: 50,
    },
    proxy: {
      type: 'removed',
      value: '123.234.53.22',
    },
  };
  checkAllExts('before', 'empty', result);
});

test('custom configs', () => {
  const result = {
    host: {
      type: 'same',
      value: 'hexlet.io',
    },
    timeout: {
      type: 'changed',
      value: 20,
      prevValue: 50,
    },
    proxy: {
      type: 'removed',
      value: '123.234.53.22',
    },
    verbose: {
      type: 'new',
      value: true,
    },
  };
  checkAllExts('before', 'after', result);
});

test('deep configs', () => {
  const result = {
    common: {
      type: 'same',
      value: {
        setting1: {
          type: 'same',
          value: 'Value 1',
        },
        setting2: {
          type: 'removed',
          value: '200',
        },
        setting3: {
          type: 'same',
          value: true,
        },
        setting6: {
          type: 'removed',
          value: {
            key: {
              type: 'same',
              value: 'value',
            },
          },
        },
        setting4: {
          type: 'new',
          value: 'blah blah',
        },
        setting5: {
          type: 'new',
          value: {
            key5: {
              type: 'same',
              value: 'value5',
            },
          },
        },
      },
    },
    group1: {
      type: 'same',
      value: {
        baz: {
          type: 'changed',
          value: 'bars',
          prevValue: 'bas',
        },
        foo: {
          type: 'same',
          value: 'bar',
        },
      },
    },
    group2: {
      type: 'removed',
      value: {
        abc: {
          type: 'same',
          value: '12345',
        },
      },
    },
    group3: {
      type: 'new',
      value: {
        fee: {
          type: 'same',
          value: '100500',
        },
      },
    },
  };

  expect(getDiff('deep-before', 'deep-after', 'json')).toEqual(JSON.stringify(result, null, '  '));
});
