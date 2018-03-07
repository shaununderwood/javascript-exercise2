import React, { Component } from 'react';
import Item from './Item.jsx'

class ItemsList extends Component {
  render() {
    const { items } = this.props;

    let html = <i>No items</i>;

    if (!!items || items.length > 0) {
      html = items.map(item => <Item id={item.id} text={item.text} position={item.position} />);
    }

    return (
      <ul>
        {html}
      </ul>
    );
  }
}

export default ItemsList;