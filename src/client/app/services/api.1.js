import Promise from 'promiscuous';
import getJSON from 'get-json';

const defaultConfig = {
  getDeviceList: '/devices',
  hostname: '',
  port: 0,
};

const C = {
  GET_DEVICE_LIST: 'devices'
};
class API {
  constructor(config) {
    this.config = Object.assign({}, defaultConfig, config);
  }
  getUrl(url) {
    // TODO
    return 'http://192.168.1.30:7990/devices';
  }
  getDeviceList() {
    console.log('API.getDeviceList');
    return fetch(this.getUrl(C.GET_DEVICE_LIST))
      .then(response => response.json())
      .then(data => data);
  }
}

export default function (config) {
  return new API(config);
};
