import React, { Component } from 'react';

export default class DeviceTableRow extends React.Component {
  render() {
    const { onChange, id, name, checked } = this.props;
    let tr = (
      <tr>
        <td><span className="device-id">{id}</span></td>
        <td><span className="device-name">{name}</span></td>
        <td className="text-center"><input type="checkbox" id={id} checked={checked} onChange={onChange} /></td>
      </tr>
    );
    return tr;
  }
};
