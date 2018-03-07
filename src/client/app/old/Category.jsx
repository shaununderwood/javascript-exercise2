import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, dragEnd, dragStart, dragOver, onChange } = this.props;
    return (
      <div>
        <ul onDragOver={dragOver}>
          {items.map(item => {
            if (item.isNew) {
              return (
                <li data-id={item.position} key={item.id} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>
                  ({item.position}):<input id={item.id} value={item.text} onChange={onChange} />
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </li>
              );
            }
            return <li data-id={item.position} key={item.id} draggable="true" onDragEnd={dragEnd} onDragStart={dragStart}>({item.position}):{item.text}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Category;