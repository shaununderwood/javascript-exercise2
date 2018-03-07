import { connect } from 'react-redux';
import CategoryList from './CategoryList.jsx';

function mapStateToProps(state) {
  let list = {
    categories: Object.keys(state.categories).map(key => state.categories[key].type === 'CATEGORY' ? state.categories[key] : null).filter(i => i !== null) || [],
  };

  return list;
}
function mapDispatchToProps() {
  return {};
}

const CategoryListContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryList);

export default CategoryListContainer;