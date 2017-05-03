import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  ini: file => ini.parse(file),
  yml: file => yaml.safeLoad(file) || {},
  json: file => JSON.parse(file),
};

export default ext => parser[ext];
