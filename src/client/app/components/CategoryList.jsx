import React, { Component } from 'react';
import Category from './Category.jsx';

class CategoryList extends Component {
  render() {
    const { categories } = this.props;
    return (
      <ul>
        {categories.map(item =>
          <li key={item.id}>
            <Category id={item.id} text={item.text} position={item.position} list={item.list} />
          </li>
        )}
      </ul>
    );
  }
}

export default CategoryList;