import React, { Component } from 'react';

class UserAddressDetails extends Component {
  formatAddress(address) {
    if (!address) return '';
    let addr = [address.suite, address.street, address.city, address.zipcode].join(', ');
    return addr;
  }
  formatCompany(company) {
    if (!company) return '';
    return company.name;
  }
  formatMap(address) {
    if (!address) return '';
    return JSON.stringify(address.geo);
  }
  render() {
    const { user } = this.props;
    if (!user) return '';

    return (
      <ul>
        <li>Address: <address>{this.formatAddress(user.address)}</address></li>
        <li>Website: <a href={user.website} target="_blank">{user.website}</a></li>
        <li>Company Name: <b>{this.formatCompany(user.company)}</b> </li>
        <li>Map Link: <a href="#" target="_blank">{this.formatMap(user.address)}</a> </li>
      </ul>
    );
  }
}

export default UserAddressDetails;