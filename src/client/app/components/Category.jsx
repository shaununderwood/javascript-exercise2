import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class Category extends Component {
  // static propTypes = {
  //   text: React.PropTypes.string.isRequired,
  //   list: React.PropTypes.array.isRequired,
  //   position: React.PropTypes.number.isRequired,
  //   // onClick: React.PropTypes.func.isRequired,
  // }
  render() {
    const { text, position, list } = this.props;
    return (
      <div>
        <h3>({position}): {text} <button>Edit</button></h3>
        <ul>
          {list.length === 0 ? <li><i>No items</i></li> : ''}
          {list.map(item => <li key={item.id}>({item.position}): {item.text}</li>)}
        </ul>
      </div>
    );
  }
}

