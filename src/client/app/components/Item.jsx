import React, { Component } from 'react';
import { updateItem } from '../services/actions';
import { connect } from 'react-redux';
import EditingButtons from './EditingButtons.jsx';

class Item extends Component {
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
    this.setState({
      editing: !this.state.editing,
      text: this.props.text
    });
  }
  onChangeHandler(e) {
    this.setState({
      text: e.target.value
    });
  }
  onClickHandler(e) {
    if (e.target.name === 'save') {
      this.setState({
        editing: !this.state.editing
      });
      this.props.onUpdateItem(this.props.id, this.state.text);
      return;
    }
    if (e.target.name === 'cancel') {
      this.setState({
        text: this.props.text
      })
    }
  }
  render() {
    const { id, position, text } = this.props;
    return (
      <li key={id}>({position}):
        <EditingButtons editing={this.state.editing} text={this.state.text} onChange={this.onChangeHandler} onToggle={this.toggleEdit} onClick={this.onClickHandler} />
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateItem: (id, text) => dispatch(updateItem({ id: id, text: text }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);