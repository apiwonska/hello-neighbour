import React from 'react';
import { connect } from 'react-redux';

import { fetchCategories as fetchCategories_ } from '../../redux/actions';
import Spinner from '../../components/spinner';
import { CategoryContainer, CategoryLink } from './style';
import { ContainerDiv } from '../../components/styledDivs';
import { DefaultError } from '../../components/errors';

class CategoryList extends React.Component {
  componentDidMount() {
    const { categories, fetchCategories } = this.props;

    if (!categories.fetched) {
      fetchCategories();
    }
  }

  renderCategoryList() {
    const { categories } = this.props;

    const categoryList = categories.data.map((category) => (
      <CategoryContainer key={category.id}>
        <CategoryLink to={`/categories/${category.id}`}>
          {category.name}
        </CategoryLink>
      </CategoryContainer>
    ));
    return categoryList;
  }

  render() {
    const { categories } = this.props;

    if (categories.fetching) {
      return <Spinner />;
    }

    if (categories.errors) {
      return <DefaultError />;
    }

    if (categories.fetched) {
      return <ContainerDiv>{this.renderCategoryList()}</ContainerDiv>;
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { fetchCategories: fetchCategories_ })(
  CategoryList
);
