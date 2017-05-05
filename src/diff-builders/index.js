import padded from './padded';
import plain from './plain';
import json from './json';

const builders = {
  padded,
  plain,
  json,
};

export default format => builders[format];
