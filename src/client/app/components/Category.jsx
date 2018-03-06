import React, { Component } from 'react';
import { updateCategory } from '../services/actions';
import { connect } from 'react-redux';

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
      this.props.onUpdateCategory(this.props.id, this.state.text);
    }
  }
  render() {
    const { text, position, list } = this.props;
    return (
      <div>
        <h3>({position}):

        {this.state.editing ?
            (
              <span>
                <input value={this.state.text} onChange={this.onChangeHandler} />
                <button name="cancel" onClick={this.toggleEdit}>Cancel</button>
                <button name="save" onClick={this.onClickHandler}>Save</button>
              </span>
            ) :
            (
              <span>
                {text}
                <button name="edit" onClick={this.toggleEdit}>Edit</button>
              </span>
            )}

        </h3>
        <ul>
          {list.length === 0 ? <li><i>No items</i></li> : ''}
          {list.map(item => <li key={item.id}>({item.position}): {item.text}</li>)}
        </ul>
      </div >
    );
  }
}
const mapStateToProps = (state) => {
  return state
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCategory: (id, text) => dispatch(updateCategory({ text: text, id: id }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);