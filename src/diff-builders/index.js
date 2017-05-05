import padded from './padded';
import plain from './plain';

const builders = {
  padded,
  plain,
};

export default format => builders[format];
