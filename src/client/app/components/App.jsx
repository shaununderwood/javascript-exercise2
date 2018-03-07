import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryListContainer from './CategoryListContainer.jsx';

class App extends Component {

  render() {
    const { onClick } = this.props;
    return (
      <div>
        <h1>Category Manager</h1>
        <button name="add-category" onClick={onClick}>Add Category</button>
        <CategoryListContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}
function mapDispatchToProps() {
  return {};
}

const thing = connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);

export default App;