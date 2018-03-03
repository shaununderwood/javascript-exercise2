import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, dragEnd, dragStart, dragOver } = this.props;
    return (
      <div>
        <ul onDragOver={dragOver}>
          {items.map(item => <li data-id={item.position} key={item.id} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>{item.text}({item.position})</li>)}
        </ul>
      </div>
    );
  }
}

export default Category;