import React, { Component } from 'react';
import { updateCategory, addItem } from '../services/actions';
import { connect } from 'react-redux';
import ItemListContainer from './ItemListContainer.jsx';
import EditingButtons from './EditingButtons.jsx';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      text: props.text
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  toggleEdit(e) {
    this.setState((prevState, props) => {
      return {
        editing: !prevState.editing,
        text: props.text
      }
    });
  }
  onChangeHandler(e) {
    this.setState({
      text: e.target.value
    });
  }
  onClickHandler(e) {
    if (e.target.name === 'save') {
      this.setState(prevState => {
        return {
          editing: !prevState.editing,
        }
      });
      this.props.onUpdateCategory(this.props.id, this.state.text);
      return;
    }
    if (e.target.name === 'add-item') {
      this.props.onAddItem(this.props.id, 'New Item');
      return;
    }
  }
  render() {
    const { text, position, list, itemsMap } = this.props;
    return (
      <div>
        <h3>({position}):
        <EditingButtons editing={this.state.editing} text={this.state.text} onChange={this.onChangeHandler} onToggle={this.toggleEdit} onClick={this.onClickHandler} />
        </h3>
        <ItemListContainer list={list} />
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return state
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCategory: (id, text) => dispatch(updateCategory({ text: text, id: id })),
    onAddItem: (categoryId, text) => dispatch(addItem({ categoryId: categoryId, text: text })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);