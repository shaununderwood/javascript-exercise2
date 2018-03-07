import { connect } from 'react-redux';
import ItemList from './ItemList.jsx';

function onClickHandler(e) {
  if (e.target.name === 'add-category') {
    this.props.onAddCategory();
    return;
  }
}

function mapStateToProps(state, ownProps) { // ownProps will contain a List[] of items within Category.list[]
  let items = [];

  if (ownProps && ownProps.list && ownProps.list.length) {
    items = ownProps.list.map(id => state.categories[id]);
  }
  return { items: items };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAddCategory: () => dispatch(addCategory({ text: 'New Category' })),
  };
};

const ItemListContainer = connect(mapStateToProps, mapDispatchToProps)(ItemList);

export default ItemListContainer;
