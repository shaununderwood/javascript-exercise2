import React, { Component } from 'react';
import Category from './Category.jsx';

class ApplicationLayoutContainer extends Component {
  render() {

    return (
      <div className="container">
        <Category {...this.props} />
      </div >

    );
  }
}

export default ApplicationLayoutContainer;