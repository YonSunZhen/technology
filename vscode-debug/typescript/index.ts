import { getTime } from './time';
import { config } from '@config';

function test() {
  const _config = config;
  const _time = getTime();
  return {
    time: _time,
    config: _config
  };
}

const data = test();
console.log(data);
