import React from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../../redux/actions';
import Spinner from '../../components/common/spinner';
import { 
  CategoryContainer,
  CategoryLink
} from './style';
import { ContainerDiv } from '../../components/common/styledDivs';
import { DefaultError } from '../../components/common/errors';

class MainPage extends React.Component {
  componentDidMount() {
    const { categories } = this.props;
    if (!categories.fetched) {
      this.props.fetchCategories();
    }
  }

  renderCategoryList() {
    const { categories } = this.props
    const categoryList = categories.data.map(category => {
      return (
        <CategoryContainer key={category.id}>
          <CategoryLink to={`/categories/${category.id}`}>
            {category.name}
          </CategoryLink>
        </CategoryContainer>
      )
    })
    return categoryList;
  }

  render() {
    const { categories } = this.props;

    if (categories.fetching) {
      return <Spinner/>;
    }

    if (categories.errors) {
      return <DefaultError />;
    }

    if (categories.fetched) {
      return (
        <ContainerDiv>
          {this.renderCategoryList()}
        </ContainerDiv>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps, {fetchCategories})(MainPage);