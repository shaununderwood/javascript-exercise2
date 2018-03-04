import React, { Component } from 'react';
import ApplicationLayoutContainer from './ApplicationLayoutContainer.jsx';
import API from './services/api';

class ApplicationContainer extends Component {
  constructor(props) {
    super(props);
    this.api = new API({});
    this.state = {
      items: [],
      nextId: 1
    };

    this.placeholder = document.createElement("li");
    this.placeholder.className = "placeholder";

    let self = this;
    this.actions = ['dragStart', 'dragEnd', 'dragOver'];
    this.actions.forEach(fName => self[fName] = self[fName].bind(self));

    let otherFunctions = ['addItem', 'onClickHandler', 'onChange'];
    otherFunctions.forEach(fName => self[fName] = self[fName].bind(self));
  }
  addItem(text, isNew = false) {
    let items = this.state.items.map(item => Object.assign({}, item));
    let id = this.state.nextId;
    // next and position of new item are synonymous
    items.push({
      text: text,
      id: id,
      position: id,
      isNew: isNew
    });
    this.setState({ items: items, nextId: id + 1 });
  }
  componentDidMount() {
    let id = 0;
    let items = ['Electronics', 'Destinations', 'People', 'Cars', 'Computers'].map(text => {
      id++;
      return Object.assign({}, { id: id, position: id, text: text, type: 'category' });
    });
    id++;
    this.setState({
      items: items, nextId: id
    });
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", e.currentTarget);
  }
  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(this.placeholder);

    // Update state
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if (from < to) to--;
    if (this.nodePlacement == "after") to++;

    this.moveItem(from, to);
  }
  moveItem(from, to) {
    if (from === to) return;
    to = parseInt(to);
    from = parseInt(from);

    let items = this.state.items.map(item => {
      let newItem = Object.assign({}, item);

      if (from < to) {
        if (newItem.position > from && newItem.position <= to) {
          newItem.position = newItem.position - 1;

        } else if (newItem.position === from) {
          newItem.position = to;

        }

      } else { // from > to
        if (newItem.position >= to && newItem.position < from) {
          newItem.position = newItem.position + 1;

        } else if (newItem.position === from) {
          newItem.position = to;

        }
      }
      return newItem;
    });
    items = items.sort((a, b) => {
      return a.position - b.position;
    })
    this.setState({ items: items })
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className == "placeholder") return;
    this.over = e.target;

    var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
    }
    else if (relY < height) {
      this.nodePlacement = "before"
      parent.insertBefore(this.placeholder, e.target);
    }
  }
  onClickHandler(e) {
    if (e.target.name === "add-category") {
      this.addItem('new category', true);
    }
  }
  onChange(e) {
    if (e.target.name === 'new-category') {

    }
  }
  render() {
    let onChange = this.onChange;
    return <ApplicationLayoutContainer {...this.state} onChange={this.onChange} onClickHandler={this.onClickHandler} dragStart={this.dragStart} dragOver={this.dragOver} dragEnd={this.dragEnd} />;
  }
}

export default ApplicationContainer;