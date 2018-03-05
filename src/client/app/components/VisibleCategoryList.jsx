import { connect } from 'react-redux';
import CategoryList from './CategoryList.jsx';

function mapStateToProps(state) {
  let list = {
    categories: Object.keys(state.categories).map(key => state.categories[key]).sort((a, b) => a - b)
  };

  return list;
}

const VisibleCategoryList = connect(
  mapStateToProps
)(CategoryList);

export default VisibleCategoryList;