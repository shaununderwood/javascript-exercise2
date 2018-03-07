import React, { Component } from 'react';

class EditingButtons extends Component {
  render() {
    const { editing, text, onChange, onToggle, onClick } = this.props;
    let html = (
      <span>
        {text}
        <button name="edit" onClick={onToggle}>Edit</button>
        <button name="add-item" onClick={onClick}>+ item</button>
      </span>
    );

    if (editing) {
      html = (
        <span>
          <input value={text} onChange={onChange} />
          <button name="cancel" onClick={onToggle}>Cancel</button>
          <button name="save" onClick={onClick}>Save</button>
        </span>
      );
    }

    return html;
  }
}

export default EditingButtons;