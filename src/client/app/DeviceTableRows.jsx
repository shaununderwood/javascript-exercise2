import React, { Component } from 'react';
import DeviceTableRow from './DeviceTableRow.jsx';

export default class DeviceTableRows extends React.Component {
  render() {
    const { devices, onButtonClick } = this.props;

    let trs = devices.map(device =>
      <tbody key={device.id}>
        <DeviceTableRow onChange={onButtonClick} {...device} />
      </tbody>
    );

    return trs;
  }
};

