import React, { Component } from 'react';
import Category from './Category.jsx';
import CategoryAdder from './CategoryAdder.jsx';

class ApplicationLayoutContainer extends Component {
  render() {

    return (
      <div className="container">
        <CategoryAdder {...this.props}></CategoryAdder>
        <Category {...this.props} />
      </div >

    );
  }
}

export default ApplicationLayoutContainer;