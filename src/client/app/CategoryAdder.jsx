import React, { Component } from 'react';

class CategoryAdder extends Component {
  render() {
    const { onClickHandler } = this.props;
    return (
      <div>
        <button name="add-category" onClick={onClickHandler}>Click to add a category</button>
      </div>
    );
  }
}

export default CategoryAdder;