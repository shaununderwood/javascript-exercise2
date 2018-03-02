import React, { Component } from 'react';
import DeviceTableRows from './DeviceTableRows.jsx';

class DeviceList extends Component {
  render() {
    const { devices, onButtonClick } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-6" style={{ margin: 'auto' }}>

            <h3>Device List</h3>
            <div className="form-group">
              <a className="btn btn-info" name="refresh" onClick={onButtonClick}>Refresh</a>
              <a className="btn btn-info pull-right" name="select-all" onClick={onButtonClick}>Select All</a>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Device Name</td>
                  <td className="text-center">Select</td>
                </tr>
              </thead>
              <DeviceTableRows {...this.props} />
            </table>

            <div className="form-group">
              <a className="btn btn-danger" name="download" onClick={onButtonClick}>Download</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default DeviceList;