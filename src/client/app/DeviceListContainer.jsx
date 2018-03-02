import React, { Component } from 'react';
import DeviceList from './DeviceList.jsx';
import API from './services/api';

let api = API();

class DeviceListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: []
    };
    this.handleDeviceListClick = this.handleDeviceListClick.bind(this);
  }
  render() {
    return <DeviceList devices={this.state.devices} onButtonClick={this.handleDeviceListClick} />;
  }
  handleDeviceListClick(e) {
    let target = e.target;
    if (target.type === "checkbox") this.toggleDeviceChecked(target);
    if (target.name === "select-all") this.toggleAllDevices();
  }
  toggleAllDevices() {
    let firstDevice = this.state.devices[0];
    let toggleValue = !firstDevice.checked;
    let updatedDevices = this.state.devices.map((device => Object.assign({}, device, { checked: toggleValue })));
    this.setState({
      devices: updatedDevices
    })
  }
  toggleDeviceChecked(target) {
    let updatedDevices = this.state.devices.map(device => {
      if (device.id == target.id) {
        return Object.assign({}, device, { checked: target.checked });
      }
      return device;
    });
    this.setState({
      devices: updatedDevices
    });
  }
  componentDidMount() {
    let self = this;
    api
      .getDeviceList()
      .then(
        data => {
          let devices = data.map(device => Object.assign({}, device, { checked: false }));
          self.setState({ devices: devices });
        },
        (e) => {
          // TODO handle this correctly
          console.log(e);
        }
      );
  }
}

export default DeviceListContainer;