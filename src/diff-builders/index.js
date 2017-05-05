import padded from './padded';

const builders = {
  padded,
};

export default format => builders[format];
